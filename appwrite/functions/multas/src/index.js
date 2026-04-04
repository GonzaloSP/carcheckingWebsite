import handler from './multas.mjs';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Appwrite-Project',
};

export default async ({ req, res, log, error }) => {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.text('', 204, CORS);
  }

  // Wrap res to inject CORS headers on every response
  const wrapped = {
    ...res,
    json: (data, status = 200, headers = {}) => res.json(data, status, { ...CORS, ...headers }),
    text: (data, status = 200, headers = {}) => res.text(data, status, { ...CORS, ...headers }),
    empty: () => res.json({}, 204, CORS),
  };

  return handler({ req, res: wrapped, log, error });
};
