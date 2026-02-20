import fs from 'node:fs';

const base = 'https://www.carchecking.com.ar';
const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/check-redirects.mjs /path/to/paths.txt');
  process.exit(1);
}

const paths = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);

const head = async (url, redirect) => {
  const res = await fetch(url, { method: 'HEAD', redirect });
  return res;
};

for (const p of paths) {
  const url = base + p;
  try {
    const res0 = await head(url, 'manual');
    const loc = res0.headers.get('location');
    const status0 = res0.status;

    const resF = await head(url, 'follow');
    const finalUrl = resF.url;
    const statusF = resF.status;

    console.log(JSON.stringify({ path: p, status0, location: loc, finalUrl, statusF }));
  } catch (e) {
    console.log(JSON.stringify({ path: p, error: String(e) }));
  }
}
