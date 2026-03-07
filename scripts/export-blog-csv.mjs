import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const articlesPath = path.join(projectRoot, 'src', 'data', 'articles.ts');
const outPath = path.join(projectRoot, 'blog_articles.csv');

const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://carchecking.com.ar';

const src = fs.readFileSync(articlesPath, 'utf8');

/**
 * We avoid importing TS directly (no ts-node). Instead we do a lightweight scan:
 * - find each `slug: '...'`
 * - then, near it, find the next `title: '...'`
 */
const slugRe = /slug:\s*'([^']+)'/g;

function findNearTitle(fromIndex) {
  // Search forward within a window so we stay inside the same object.
  const window = src.slice(fromIndex, fromIndex + 4000);
  const m = window.match(/title:\s*'([\s\S]*?)'/);
  if (!m) return null;
  return m[1]
    .replace(/\s+/g, ' ')
    .trim();
}

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[\n",]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const rows = [];
for (const match of src.matchAll(slugRe)) {
  const slug = match[1];
  const title = findNearTitle(match.index);
  if (!title) {
    console.warn(`WARN: no title found near slug ${slug}`);
    continue;
  }
  const url = new URL(`/guias/${slug}`, SITE_ORIGIN).toString();
  rows.push({ title, url });
}

// Deduplicate by URL (just in case)
const byUrl = new Map();
for (const r of rows) byUrl.set(r.url, r);
const unique = Array.from(byUrl.values());

// Stable order: by title (or keep file order?)
// We'll keep file order by using the first-seen Map above.

const csvLines = ['title,url', ...unique.map((r) => `${csvEscape(r.title)},${csvEscape(r.url)}`)];
fs.writeFileSync(outPath, csvLines.join('\n') + '\n', 'utf8');

console.log(`Wrote ${unique.length} rows to ${outPath}`);
