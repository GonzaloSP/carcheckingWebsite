/**
 * Generates static HTML redirect files for each non-wildcard redirect in redirects.json.
 * Runs after `next build` (output: export) and writes into ./out/.
 *
 * Each source path becomes ./out/{path}/index.html with meta-refresh + JS redirect.
 * Real Next.js pages already present in ./out/ are never overwritten.
 *
 * Wildcard redirects are injected into ./out/404.html so that unmatched URLs
 * are caught and redirected client-side before React hydrates.
 */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Wildcard redirect rules — injected into 404.html
// Order matters: more specific patterns first.
// ---------------------------------------------------------------------------
const WILDCARD_SCRIPT = `<script>
(function(){
  var p = window.location.pathname;
  var m;
  // /blog/* → /guias/*
  if ((m = p.match(/^\\/blog\\/(.+)/))) { window.location.replace('/guias/' + m[1]); return; }
  if (p === '/blog' || p === '/blog/') { window.location.replace('/guias'); return; }
  // /consejos/* → /guias/*
  if ((m = p.match(/^\\/consejos\\/(.+)/))) { window.location.replace('/guias/' + m[1]); return; }
  if (p === '/consejos' || p === '/consejos/') { window.location.replace('/guias'); return; }
  // /revision-vehiculos/* → /solicitar-turno
  if (p.startsWith('/revision-vehiculos')) { window.location.replace('/solicitar-turno'); return; }
  // /category/* → /guias
  if (p.startsWith('/category')) { window.location.replace('/guias'); return; }
  // /tag/* → /guias
  if (p.startsWith('/tag')) { window.location.replace('/guias'); return; }
})();
</script>`;

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

// ---------------------------------------------------------------------------
// Inject wildcard redirect script into 404.html (runs before React hydration)
// ---------------------------------------------------------------------------
const notFoundPath = path.join(OUT_DIR, '404.html');
if (fs.existsSync(notFoundPath)) {
  let html = fs.readFileSync(notFoundPath, 'utf8');
  // Only inject once
  if (!html.includes('revision-vehiculos')) {
    html = html.replace('<head>', '<head>' + WILDCARD_SCRIPT);
    fs.writeFileSync(notFoundPath, html);
    console.log('[generate-static-redirects] Wildcard redirect script injected into 404.html');
  }
} else {
  console.warn('[generate-static-redirects] WARNING: ./out/404.html not found — wildcard redirects not injected');
}
