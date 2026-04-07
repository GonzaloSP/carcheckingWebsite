import https from 'https';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    }).on('error', reject);
  });
}

export default async ({ req, res }) => {
  if (req.method === 'OPTIONS') return res.text('', 204, CORS);
  const r = (data, status = 200) => res.json(data, status, CORS);
  if (req.method !== 'GET') return r({ error: 'Method not allowed' }, 405);

  const params = new URLSearchParams(req.path?.split('?')[1] || '');
  const external_reference = params.get('external_reference') || req.query?.external_reference;
  if (!external_reference) return r({ error: 'Missing external_reference' }, 400);

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return r({ error: 'MP not configured' }, 500);

  // Search without status filter to catch approved + in_process payments
  const url = `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${encodeURIComponent(external_reference)}&limit=5`;

  const mpRes = await httpsGet(url, { Authorization: `Bearer ${accessToken}` });

  if (mpRes.status >= 400) {
    return r({ paid: false, error: 'MP error', status: mpRes.status }, 502);
  }

  const PAID_STATUSES = ['approved', 'in_process', 'authorized'];
  const results = Array.isArray(mpRes.data?.results) ? mpRes.data.results : [];
  const paid = results.some(p => PAID_STATUSES.includes(p.status));
  return r({ paid, total: mpRes.data?.paging?.total || results.length });
};
