import crypto from 'crypto';
import axios from 'axios';
import handler from './multas.mjs';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Appwrite-Project',
};

// ── Async jobs ────────────────────────────────────────────────────────────────
// Appwrite corta toda ejecución síncrona a los 30s (hardcodeado). Las fuentes
// lentas (captcha) se ejecutan async vía la API de ejecuciones; como Appwrite no
// guarda el body de una ejecución async, la función lo guarda en
// multas/jobs/{jobId} y el frontend lo levanta por polling.
// La colección es legible por "any" (hace falta para que el navegador la lea sin
// sesión) y "read" también permite listar, así que el resultado se guarda cifrado
// con AES-256-GCM usando jobKey: una clave aleatoria que genera el navegador y
// que nunca se persiste. Listar la colección sólo expone texto cifrado.
const JOBS_PATH = '/databases/multas/collections/jobs/documents';
const JOB_ID_RE = /^[a-zA-Z0-9][a-zA-Z0-9_-]{15,35}$/;
const JOB_TTL_MS = 60 * 60 * 1000;

function readJob(req) {
  const jobId = req.query?.jobId;
  const jobKey = req.query?.jobKey;
  if (!jobId || !jobKey || !JOB_ID_RE.test(jobId)) return null;
  const key = Buffer.from(jobKey, 'base64url');
  return key.length === 32 ? { jobId, key } : null;
}

async function saveJob(job, out, req, log, error) {
  const endpoint = process.env.APPWRITE_FUNCTION_API_ENDPOINT || 'https://server.innsimulation.com/v1';
  const headers = {
    'X-Appwrite-Project': process.env.APPWRITE_FUNCTION_PROJECT_ID,
    'X-Appwrite-Key': req.headers['x-appwrite-key'],
    'Content-Type': 'application/json',
  };

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', job.key, iv);
  const plain = JSON.stringify({ status: out.status, body: out.body });
  // WebCrypto espera ciphertext || tag
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final(), cipher.getAuthTag()]);

  try {
    await axios.post(`${endpoint}${JOBS_PATH}`, {
      documentId: job.jobId,
      data: { iv: iv.toString('base64'), data: data.toString('base64') },
    }, { headers, timeout: 10000 });
  } catch (err) {
    error(`[jobs] No se pudo guardar ${job.jobId}: ${err.response?.status || ''} ${JSON.stringify(err.response?.data || err.message)}`);
    return;
  }

  // Limpieza oportunista de resultados viejos (~1 de cada 20 jobs)
  if (Math.random() < 0.05) {
    const before = new Date(Date.now() - JOB_TTL_MS).toISOString();
    const queries = [JSON.stringify({ method: 'lessThan', attribute: '$createdAt', values: [before] })];
    axios.delete(`${endpoint}${JOBS_PATH}`, { headers, data: { queries }, timeout: 10000 })
      .then(r => log(`[jobs] limpieza: ${r.data?.total ?? '?'} borrados`))
      .catch(err => error(`[jobs] limpieza falló: ${err.response?.status || err.message}`));
  }
}

export default async ({ req, res, log, error }) => {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.text('', 204, CORS);
  }

  const job = readJob(req);
  const out = { status: 200, body: '' };

  // Wrap res to inject CORS headers on every response (and capture it for async jobs)
  const wrapped = {
    ...res,
    json: (data, status = 200, headers = {}) => {
      out.status = status; out.body = JSON.stringify(data);
      return res.json(data, status, { ...CORS, ...headers });
    },
    text: (data, status = 200, headers = {}) => {
      out.status = status; out.body = String(data);
      return res.text(data, status, { ...CORS, ...headers });
    },
    empty: () => {
      out.status = 204; out.body = '{}';
      return res.json({}, 204, CORS);
    },
  };

  if (!job) return handler({ req, res: wrapped, log, error });

  let result;
  try {
    result = await handler({ req, res: wrapped, log, error });
  } catch (err) {
    error(`[jobs] ${job.jobId}: ${err.stack || err.message}`);
    result = wrapped.json({ error: 'Error interno al consultar.' }, 500);
  }
  await saveJob(job, out, req, log, error);
  return result;
};
