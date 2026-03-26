import https from 'https';

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
  if (req.method !== 'GET') return res.json({ error: 'Method not allowed' }, 405);

  const params = new URLSearchParams(req.path?.split('?')[1] || '');
  const external_reference = params.get('external_reference') || req.query?.external_reference;
  if (!external_reference) return res.json({ error: 'Missing external_reference' }, 400);

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.json({ error: 'MP not configured' }, 500);

  const url = `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${encodeURIComponent(external_reference)}&status=approved&limit=1`;

  const mpRes = await httpsGet(url, { Authorization: `Bearer ${accessToken}` });

  if (mpRes.status >= 400) {
    return res.json({ paid: false, error: 'MP error', status: mpRes.status }, 502);
  }

  const results = Array.isArray(mpRes.data?.results) ? mpRes.data.results : [];
  return res.json({ paid: results.length > 0, total: mpRes.data?.paging?.total || results.length });
};
