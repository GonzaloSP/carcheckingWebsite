import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const mappingPath = path.join(projectRoot, 'youtube_blog_mapping.csv');
const articlesPath = path.join(projectRoot, 'src', 'data', 'articles.ts');

function parseCsvLine(line) {
  // Minimal CSV parser (handles quotes)
  const out = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ',') {
        out.push(cur);
        cur = '';
      } else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function getSlugFromArticleUrl(url) {
  try {
    const u = new URL(url);
    return u.pathname.split('/').filter(Boolean).pop();
  } catch {
    return url.split('/').filter(Boolean).pop();
  }
}

function getVideoId(youtubeUrl) {
  try {
    const u = new URL(youtubeUrl);
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

const mappingCsv = fs.readFileSync(mappingPath, 'utf8').trim().split(/\r?\n/);
const header = parseCsvLine(mappingCsv.shift());
const idx = (name) => header.indexOf(name);

const slugToVideos = new Map();
for (const line of mappingCsv) {
  if (!line.trim()) continue;
  const cols = parseCsvLine(line);
  const videoUrl = cols[idx('video_url')];
  const articleUrl = cols[idx('matched_article_url')];
  if (!videoUrl || !articleUrl) continue;
  const slug = getSlugFromArticleUrl(articleUrl);
  const videoId = getVideoId(videoUrl);
  if (!slug || !videoId) continue;
  if (!slugToVideos.has(slug)) slugToVideos.set(slug, []);
  slugToVideos.get(slug).push({ videoUrl, videoId });
}

// de-dupe videos per slug
for (const [slug, vids] of slugToVideos) {
  const m = new Map(vids.map((v) => [v.videoId, v]));
  slugToVideos.set(slug, Array.from(m.values()));
}

let src = fs.readFileSync(articlesPath, 'utf8');

let changed = 0;
for (const [slug, vids] of slugToVideos) {
  // Find the article object by slug: '...'
  const slugNeedle = `slug: '${slug}'`;
  const slugPos = src.indexOf(slugNeedle);
  if (slugPos === -1) {
    console.warn(`WARN: slug not found in articles.ts: ${slug}`);
    continue;
  }

  // Find `content: ` that belongs to this object (search forward)
  const contentKey = 'content: `';
  const contentPos = src.indexOf(contentKey, slugPos);
  if (contentPos === -1) {
    console.warn(`WARN: content not found for slug: ${slug}`);
    continue;
  }
  const contentStart = contentPos + contentKey.length;
  const contentEnd = src.indexOf('`', contentStart);
  if (contentEnd === -1) {
    console.warn(`WARN: could not find end backtick for slug: ${slug}`);
    continue;
  }

  const content = src.slice(contentStart, contentEnd);

  // If already has youtube marker, skip
  if (content.includes('[[youtube:')) {
    continue;
  }

  const embedBlock =
    `\n\n---\n\n` +
    vids
      .map((v) => `[[youtube:https://www.youtube.com/watch?v=${v.videoId}]]`)
      .join('\n');

  const newContent = content.replace(/\s*$/,'') + embedBlock + '\n';

  src = src.slice(0, contentStart) + newContent + src.slice(contentEnd);
  changed++;
}

fs.writeFileSync(articlesPath, src, 'utf8');
console.log(`Updated ${changed} article(s) with YouTube embeds.`);
