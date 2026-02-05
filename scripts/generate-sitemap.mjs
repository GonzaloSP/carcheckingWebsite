import fs from 'node:fs';
import path from 'node:path';

// Keep this in sync with SEO.tsx
const siteUrl = 'https://www.carchecking.com.ar';

// NOTE: we don't import TS directly (Node doesn't understand it without extra loaders).
// Instead we do a lightweight parse of src/data/articles.ts.
const articlesPath = path.resolve('src/data/articles.ts');
const src = fs.readFileSync(articlesPath, 'utf8');

// Extract (slug, date) pairs in order of appearance.
// This assumes each article object contains lines like:
//   slug: '...'
//   date: 'YYYY-MM-DD'
const slugRe = /\bslug:\s*'([^']+)'/g;
const dateRe = /\bdate:\s*'([^']+)'/g;

const slugs = [...src.matchAll(slugRe)].map((m) => m[1]);
const dates = [...src.matchAll(dateRe)].map((m) => m[1]);

const articles = slugs.map((slug, i) => ({ slug, date: dates[i] }));

const now = new Date();
const fmt = (d) => d.toISOString().slice(0, 10);

const urls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: fmt(now) },
  { loc: '/guias', changefreq: 'weekly', priority: '0.8', lastmod: fmt(now) },
  { loc: '/solicitar-turno', changefreq: 'monthly', priority: '0.9', lastmod: fmt(now) },
  ...articles.map((a) => ({
    loc: `/guias/${a.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: a?.date && !Number.isNaN(Date.parse(a.date)) ? a.date : fmt(now),
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => {
    const loc = `${siteUrl}${u.loc}`;
    return `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `    <lastmod>${u.lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`;
  }).join('\n') +
  `\n</urlset>\n`;

const outPath = path.resolve('public/sitemap.xml');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✅ Wrote ${outPath} with ${urls.length} URLs`);
