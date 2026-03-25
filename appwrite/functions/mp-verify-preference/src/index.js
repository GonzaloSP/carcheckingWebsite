const MP_SEARCH = 'https://api.mercadopago.com/v1/payments/search';

export default async ({ req, res }) => {
  if (req.method !== 'GET') return res.json({ error: 'Method not allowed' }, 405);

  const external_reference = req.query?.external_reference;
  if (!external_reference) return res.json({ error: 'Missing external_reference' }, 400);

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.json({ error: 'MP not configured' }, 500);

  const url = `${MP_SEARCH}?sort=date_created&criteria=desc&external_reference=${encodeURIComponent(external_reference)}&status=approved&limit=1`;
  const mpRes = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });

  if (!mpRes.ok) {
    const body = await mpRes.text();
    return res.json({ paid: false, error: 'MP error', status: mpRes.status, body }, 502);
  }

  const data = await mpRes.json();
  const results = Array.isArray(data.results) ? data.results : [];
  return res.json({ paid: results.length > 0, total: data.paging?.total ?? results.length });
};
