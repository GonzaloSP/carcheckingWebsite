/**
 * Vercel serverless proxy for Appwrite function executions.
 * Keeps API keys server-side and avoids CORS issues.
 *
 * POST /api/multa-exec        — create an execution
 * GET  /api/multa-exec?id=xxx — poll an existing execution
 */

const BASE    = 'https://server.innsimulation.com/v1/functions/multas/executions';
const PROJECT = (process.env.VITE_APPWRITE_PROJECT_ID ?? '').trim() || '69ab260c001de147f5d5';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const r = await fetch(BASE, {
      method: 'POST',
      headers: {
        'Content-Type':       'application/json',
        'X-Appwrite-Project': PROJECT,
      },
      body: JSON.stringify(req.body),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  if (req.method === 'GET' && req.query.id) {
    const r = await fetch(`${BASE}/${req.query.id}`, {
      headers: {
        'X-Appwrite-Project': PROJECT,
        'X-Appwrite-Key':     process.env.VITE_APPWRITE_EXEC_READ_KEY,
      },
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
