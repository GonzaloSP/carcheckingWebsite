import fs from 'node:fs';

const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = vercel.redirects || [];

const compile = (source) => {
  // Very small subset of Vercel redirect source syntax used here.
  // Supports literals and `(.*)` capture.
  const hasCapture = source.includes('(.*)');
  const reStr = '^' + source
    .replace(/[.*+?^${}()|[\]\\]/g, (m) => {
      // keep (.*) groups unescaped for now
      if (m === '(' || m === ')' || m === '.' || m === '*') return m;
      return '\\' + m;
    })
    .replace(/\(\.\*\)/g, '(.*)')
    + '$';
  const re = new RegExp(reStr);
  return { re, hasCapture };
};

const compiled = redirects.map((r) => ({ ...r, ...compile(r.source) }));

const applyDest = (dest, match) => {
  let out = dest;
  for (let i = 1; i < match.length; i++) {
    out = out.replaceAll(`$${i}`, match[i] ?? '');
  }
  return out;
};

const testPaths = process.argv.slice(2);
if (testPaths.length === 0) {
  console.error('Usage: node scripts/test-redirect-match.mjs /path /path2 ...');
  process.exit(1);
}

for (const p of testPaths) {
  let hit = null;
  for (const r of compiled) {
    const m = p.match(r.re);
    if (!m) continue;
    hit = { source: r.source, destination: applyDest(r.destination, m), permanent: r.permanent };
    break;
  }
  console.log(JSON.stringify({ path: p, match: hit }, null, 0));
}
