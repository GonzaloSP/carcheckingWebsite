import fs from 'node:fs';
import path from 'node:path';

// Usage:
//   node scripts/generate-redirects-from-coverage.mjs \
//     "/abs/path/Table.csv" > /tmp/redirects.json

const inputCsv = process.argv[2];
if (!inputCsv) {
  console.error('Provide CSV path as argv[2]');
  process.exit(1);
}

const siteHosts = new Set(['www.carchecking.com.ar', 'carchecking.com.ar']);

const asciiFold = (s) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .toLowerCase();

const normalizePathForMatch = (p) => {
  let s = p;
  // Drop common prefixes
  s = s.replace(/^\/+/, '');
  s = s.replace(/^index\.php\/?/i, '');
  // Remove tracking-ish fragments if they ended up in the path
  s = s.replace(/\?.*$/, '');
  s = s.replace(/#.*$/, '');

  // Remove common WP-ish segments that are not part of the article slug
  s = s.replace(/\b(consejos|guias|category|tag)\b\/?/g, '');
  s = s.replace(/\b(compra-vehiculos|revision-vehiculo|venta-vehiculos|documentacion-vehiculo)\b\/?/g, '');

  // Remove numeric prefixes like "7-consejos-.../25-..."
  s = s.replace(/(^|\/)\d+-/g, '$1');

  // Collapse separators
  s = asciiFold(s);
  s = s.replace(/[^a-z0-9/]+/g, '-');
  s = s.replace(/-+/g, '-');
  s = s.replace(/\/+/, '/');

  // Prefer last meaningful segment(s)
  const parts = s.split('/').filter(Boolean);
  // If path has multiple parts, keep last 2 (sometimes includes nested slug)
  const tail = parts.slice(-2).join('/');
  return tail || s;
};

const tokenize = (s) =>
  asciiFold(s)
    .replace(/[^a-z0-9]+/g, '-')
    .split(/[-/]+/)
    .filter(Boolean)
    // drop ultra-common words
    .filter((t) => !new Set(['de', 'la', 'el', 'un', 'una', 'y', 'en', 'para', 'que', 'como']).has(t));

const diceSimilarity = (a, b) => {
  // Dice coefficient on bigrams
  const bigrams = (str) => {
    const s = ` ${str} `;
    const out = new Map();
    for (let i = 0; i < s.length - 1; i++) {
      const bg = s.slice(i, i + 2);
      out.set(bg, (out.get(bg) || 0) + 1);
    }
    return out;
  };
  const A = bigrams(a);
  const B = bigrams(b);
  let overlap = 0;
  for (const [k, v] of A.entries()) {
    const bv = B.get(k);
    if (bv) overlap += Math.min(v, bv);
  }
  const sizeA = [...A.values()].reduce((x, y) => x + y, 0);
  const sizeB = [...B.values()].reduce((x, y) => x + y, 0);
  return (2 * overlap) / (sizeA + sizeB || 1);
};

const tokenOverlapScore = (a, b) => {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / Math.max(4, Math.min(A.size, B.size));
};

const similarity = (a, b) => {
  const d = diceSimilarity(a, b);
  const o = tokenOverlapScore(a, b);
  return 0.65 * d + 0.35 * o;
};

const readExistingRedirects = () => {
  const vercelPath = path.resolve('vercel.json');
  const json = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  const redirects = json.redirects || [];
  const bySource = new Map();
  for (const r of redirects) bySource.set(r.source, r.destination);
  return { redirects, bySource };
};

const readArticles = () => {
  // Parse src/data/articles.ts without importing TS (similar to generate-sitemap.mjs)
  const articlesPath = path.resolve('src/data/articles.ts');
  const src = fs.readFileSync(articlesPath, 'utf8');

  const slugRe = /\bslug:\s*'([^']+)'/g;
  const titleRe = /\btitle:\s*'([^']+)'/g;

  const slugs = [...src.matchAll(slugRe)].map((m) => m[1]);
  const titles = [...src.matchAll(titleRe)].map((m) => m[1]);

  return slugs.map((slug, i) => ({
    slug,
    title: titles[i] || slug,
    normSlug: asciiFold(slug).replace(/[^a-z0-9]+/g, '-'),
    normTitle: asciiFold(titles[i] || '').replace(/[^a-z0-9]+/g, '-'),
  }));
};

const parseCsvUrls = (csvText) => {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  const urls = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // CSV is simple: URL,Last crawled
    const comma = line.lastIndexOf(',');
    const rawUrl = comma >= 0 ? line.slice(0, comma) : line;
    if (rawUrl) urls.push(rawUrl.trim());
  }
  return urls;
};

const cleanPath = (u) => {
  // returns { path, originalPath }
  try {
    // URL() needs a protocol, ensure it exists
    const withProto = u.startsWith('http://') || u.startsWith('https://') ? u : `https://${u}`;
    const url = new URL(withProto);

    // Only handle our site; otherwise ignore.
    if (url.host && !siteHosts.has(url.host)) return null;

    let p = url.pathname || '/';
    // decode once for matching. If malformed, keep raw.
    try {
      p = decodeURIComponent(p);
    } catch {
      // ignore
    }

    // Strip trailing /feed
    if (p.endsWith('/feed')) p = p.slice(0, -'/feed'.length);

    // Strip /attachment/...
    const attIdx = p.indexOf('/attachment/');
    if (attIdx !== -1) p = p.slice(0, attIdx);

    // Strip trailing slash (except root)
    if (p.length > 1) p = p.replace(/\/+$/, '');

    return { path: p || '/', originalPath: url.pathname || '/' };
  } catch {
    return null;
  }
};

const chooseDestination = ({ path }, { bySource }, articles) => {
  // Exact existing redirect wins
  const exact = bySource.get(path) || bySource.get(path + '/') || null;
  if (exact) return exact;

  // Known non-article pages
  if (path === '/pedi-turno') return '/solicitar-turno';
  if (path === '/solicitar-turno') return '/solicitar-turno';
  if (path.startsWith('/servicio-gestoria')) return '/servicio-gestoria';
  if (path === '/articulos-con-consejos' || path === '/artículos-con-consejos') return '/guias';

  // If already /guias/<slug> and that slug exists, keep.
  if (path.startsWith('/guias/')) {
    const maybe = path.slice('/guias/'.length);
    if (articles.some((a) => a.slug === maybe)) return path;
  }

  // Try to map any other path to the closest article slug
  const candidate = normalizePathForMatch(path);

  let best = { score: 0, slug: null };
  for (const a of articles) {
    const s1 = similarity(candidate, a.normSlug);
    const s2 = a.normTitle ? similarity(candidate, a.normTitle) : 0;
    const score = Math.max(s1, s2);
    if (score > best.score) best = { score, slug: a.slug };
  }

  // Threshold tuned to avoid random matches
  if (best.slug && best.score >= 0.42) return `/guias/${best.slug}`;

  return '/guias';
};

const main = () => {
  const csvText = fs.readFileSync(inputCsv, 'utf8');
  const urls = parseCsvUrls(csvText);

  const existing = readExistingRedirects();
  const articles = readArticles();

  const newRedirects = [];
  const seen = new Set(existing.redirects.map((r) => r.source));

  for (const u of urls) {
    const cleaned = cleanPath(u);
    if (!cleaned) continue;

    const dest = chooseDestination(cleaned, existing, articles);

    // We'll create redirects for both with and without trailing slash.
    // Never redirect the site root.
    if (cleaned.path === '/') continue;

    const sources = new Set([cleaned.path]);
    if (!cleaned.path.endsWith('/')) sources.add(cleaned.path + '/');

    for (const source of sources) {
      if (seen.has(source)) continue;
      // Skip ones that are already valid (e.g., exact article slug)
      if (source === dest) continue;

      newRedirects.push({ source, destination: dest, permanent: true });
      seen.add(source);
    }
  }

  // Sort to keep file stable: longer sources first (more specific)
  newRedirects.sort((a, b) => b.source.length - a.source.length || a.source.localeCompare(b.source));

  process.stdout.write(JSON.stringify(newRedirects, null, 2));
};

main();
