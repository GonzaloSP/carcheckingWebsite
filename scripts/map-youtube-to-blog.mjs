import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const blogCsvPath = path.join(projectRoot, 'blog_articles.csv');
const outPath = path.join(projectRoot, 'youtube_blog_mapping.csv');

const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://carchecking.com.ar';

// Paste the YouTube list (exported from browser automation) here or pass via a JSON file.
// This script expects a file youtube_videos.json next to it.
const youtubeJsonPath = path.join(projectRoot, 'youtube_videos.json');

function parseCsv(csv) {
  const lines = csv.trim().split(/\r?\n/);
  const header = lines.shift().split(',');
  const rows = [];
  for (const line of lines) {
    // Simple CSV parse for 2 columns with possible quotes
    const m = line.match(/^("(?:[^"]|"")*"|[^,]*),("(?:[^"]|"")*"|.*)$/);
    if (!m) continue;
    const unq = (s) => {
      s = s.trim();
      if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1).replace(/""/g, '"');
      return s;
    };
    rows.push({ title: unq(m[1]), url: unq(m[2]) });
  }
  return { header, rows };
}

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const stop = new Set([
  'el','la','los','las','un','una','unos','unas','de','del','al','a','en','y','o','que','como','para','por','si','se','su','sus','lo','es','son','tiene','tener','debe','debes','puede','pueden','realizar','comprar','compra','comprando','vehiculo','vehiculos','auto','autos','usado','usados','argentina'
]);

function tokens(s) {
  return norm(s)
    .split(' ')
    .filter(Boolean)
    .filter(t => !stop.has(t));
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = new Set([...A, ...B]).size;
  return union ? inter / union : 0;
}

function bestMatch(videoTitle, articles) {
  const vt = tokens(videoTitle);
  let best = null;
  for (const art of articles) {
    const at = tokens(art.title);
    const score = jaccard(vt, at);
    if (!best || score > best.score) best = { ...art, score };
  }
  return best;
}

const MANUAL = new Map([
  ['Contratando un seguro al comprar un vehículo usado', 'seguro-al-comprar-auto-usado'],
  ['¿Qué garantías tiene el comprador al adquirir un auto usado?', 'garantias-al-comprar-un-auto-usado-todo-lo-que-debes-saber'],
  ['¿Qué cantidad de kilómetros debe tener el auto a comprar?', 'cuantos-kilometros-conviene-auto-usado'],
  ['¿Se puede detectar si le han bajado el kilometraje al auto?', 'guia-verificar-cuentakilometros-no-alterado'],
  ['¿Debe realizar la transferencia del vehículo que compra?', 'es-necesario-hacer-transferencia-auto-usado'],
  ['Comprando un Vehículo Usado en una Concesionaria', 'comprar-auto-usado-en-concesionaria-es-seguro'],
  ['Aprendé a Transferir Rápidamente el Auto a Comprar', 'turno-rapido-transferencia-automotor'],
]);

const blogCsv = fs.readFileSync(blogCsvPath, 'utf8');
const { rows: articles } = parseCsv(blogCsv);

if (!fs.existsSync(youtubeJsonPath)) {
  console.error(`Missing ${youtubeJsonPath}. Create it with an array of {title,url}.`);
  process.exit(1);
}

const videos = JSON.parse(fs.readFileSync(youtubeJsonPath, 'utf8'));

const bySlug = new Map(
  articles
    .map((a) => {
      const slug = (() => {
        try {
          const u = new URL(a.url);
          return u.pathname.split('/').filter(Boolean).pop();
        } catch {
          // if it's a relative URL, just take last segment
          return a.url.split('/').filter(Boolean).pop();
        }
      })();
      return [slug, a];
    })
    .filter(([slug]) => slug)
);

const THRESHOLD = 0.15;

const mappings = videos.map((v) => {
  const forcedSlug = MANUAL.get(v.title);
  const forced = forcedSlug ? bySlug.get(forcedSlug) : null;

  const best = forced ? { ...forced, score: 1 } : bestMatch(v.title, articles);
  const ok = best && best.score >= THRESHOLD;

  return {
    video_title: v.title,
    video_url: v.url,
    matched_article_title: ok ? best.title : '',
    matched_article_url: ok
      ? best.url.startsWith('http')
        ? best.url
        : new URL(best.url, SITE_ORIGIN).toString()
      : '',
    match_score: best ? best.score.toFixed(3) : '0.000',
  };
});

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[\n",]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const header = ['video_title','video_url','matched_article_title','matched_article_url','match_score'];
const lines = [header.join(','), ...mappings.map(r => header.map(h => csvEscape(r[h])).join(','))];
fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');

console.log(`Wrote ${mappings.length} rows to ${outPath}`);
