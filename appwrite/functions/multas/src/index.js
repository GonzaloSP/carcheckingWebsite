import handler from './multas.mjs';

export default async ({ req, res, log, error }) => {
  const mockReq = {
    method: req.method,
    query:  req.query,
    headers: req.headers,
  };

  let statusCode = 200;
  let responseBody = null;

  const mockRes = {
    setHeader: () => mockRes,
    status: (code) => { statusCode = code; return mockRes; },
    json: (body) => { responseBody = body; return mockRes; },
    end: () => { responseBody = ''; return mockRes; },
  };

  try {
    await handler(mockReq, mockRes);
  } catch (err) {
    error('Handler error: ' + (err.message || String(err)));
    return res.json({ error: String(err.message || err) }, 502, {
      'Access-Control-Allow-Origin': '*',
    });
  }

  return res.json(responseBody ?? {}, statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  });
};
