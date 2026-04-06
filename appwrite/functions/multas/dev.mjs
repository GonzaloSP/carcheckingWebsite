/**
 * Local dev server — mimics the Appwrite function runtime.
 * Usage:
 *   TWOCAPTCHA_API_KEY=xxx node dev.mjs
 *
 * Then:
 *   curl "http://localhost:3001/?dominio=AA195JD&fuente=cordoba"
 */

import http from 'http';
import { URL } from 'url';
import handler from './src/index.js';

const PORT = 3001;

http.createServer(async (nodeReq, nodeRes) => {
  const url = new URL(nodeReq.url, `http://localhost:${PORT}`);

  // Read body
  const bodyChunks = [];
  for await (const chunk of nodeReq) bodyChunks.push(chunk);
  const rawBody = Buffer.concat(bodyChunks).toString();

  // Build Appwrite-style req/res objects
  const req = {
    method: nodeReq.method,
    url: nodeReq.url,
    path: url.pathname + (url.search || ''),
    query: Object.fromEntries(url.searchParams),
    headers: nodeReq.headers,
    body: rawBody || null,
  };

  const res = {
    json: (data, status = 200, headers = {}) => {
      nodeRes.writeHead(status, { 'Content-Type': 'application/json', ...headers });
      nodeRes.end(JSON.stringify(data));
    },
    text: (data, status = 200, headers = {}) => {
      nodeRes.writeHead(status, { 'Content-Type': 'text/plain', ...headers });
      nodeRes.end(String(data));
    },
    empty: () => {
      nodeRes.writeHead(204);
      nodeRes.end();
    },
  };

  try {
    await handler({ req, res, log: console.log, error: console.error });
  } catch (err) {
    console.error(err);
    nodeRes.writeHead(500, { 'Content-Type': 'application/json' });
    nodeRes.end(JSON.stringify({ error: err.message }));
  }
}).listen(PORT, () => {
  console.log(`Multas dev server running at http://localhost:${PORT}`);
  console.log(`Example: curl "http://localhost:${PORT}/?dominio=AA195JD&fuente=cordoba"`);
});
