/**
 * Generates static HTML redirect files for each non-wildcard redirect in redirects.json.
 * Runs after `next build` (output: export) and writes into ./out/.
 *
 * Each source path becomes ./out/{path}/index.html with meta-refresh + JS redirect.
 * Real Next.js pages already present in ./out/ are never overwritten.
 */

import fs from 'fs';
import path from 'path';

const OUT_DIR = './out';
const REDIRECTS_FILE = './redirects.json';

const redirectsJson = JSON.parse(fs.readFileSync(REDIRECTS_FILE, 'utf8'));
const redirects = redirectsJson.redirects;

function makeRedirectHtml(destination) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Redirigiendo...</title>
<link rel="canonical" href="https://www.carchecking.com.ar${destination}">
<meta http-equiv="refresh" content="0; url=${destination}">
</head>
<body>
<script>window.location.replace("${destination}");</script>
<noscript><p>Si no eres redirigido, <a href="${destination}">haz clic aquí</a>.</p></noscript>
</body>
</html>`;
}

let created = 0;
let skipped_wildcard = 0;
let skipped_real_page = 0;

for (const redirect of redirects) {
  const { source, destination } = redirect;

  // Skip wildcard patterns — can't enumerate all possible paths statically
  if (source.includes('(.*)') || source.includes(':path*')) {
    skipped_wildcard++;
    continue;
  }

  // Decode URL-encoded characters in source path
  let sourcePath;
  try {
    sourcePath = decodeURIComponent(source);
  } catch {
    sourcePath = source;
  }

  // Normalize: remove trailing slash, must start with /
  sourcePath = sourcePath.replace(/\/$/, '');
  if (!sourcePath || sourcePath === '/') continue;

  const dirPath = path.join(OUT_DIR, sourcePath);
  const indexPath = path.join(dirPath, 'index.html');

  // Don't overwrite a real Next.js-generated page
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    if (!content.includes('http-equiv="refresh"')) {
      skipped_real_page++;
      continue;
    }
  }

  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(indexPath, makeRedirectHtml(destination));
  created++;
}

console.log(
  `[generate-static-redirects] Created: ${created} | Skipped (wildcard): ${skipped_wildcard} | Skipped (real page): ${skipped_real_page}`
);
