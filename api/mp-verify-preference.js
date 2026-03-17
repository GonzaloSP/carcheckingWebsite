/**
 * GET /api/mp-verify-preference?external_reference=XXX
 *
 * Searches MercadoPago for approved payments with the given external_reference.
 * Returns: { paid: boolean }
 */

const MP_SEARCH = 'https://api.mercadopago.com/v1/payments/search';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { external_reference } = req.query;
  if (!external_reference) return res.status(400).json({ error: 'Missing external_reference' });

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.status(500).json({ error: 'MP not configured' });

  try {
    const url = `${MP_SEARCH}?sort=date_created&criteria=desc&external_reference=${encodeURIComponent(external_reference)}&status=approved&limit=1`;
    const mpRes = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });

    if (!mpRes.ok) {
      const errBody = await mpRes.text();
      return res.status(502).json({ paid: false, error: 'MP error', status: mpRes.status, body: errBody });
    }

    const data = await mpRes.json();
    const results = Array.isArray(data.results) ? data.results : [];
    const paid = results.length > 0;

    return res.status(200).json({ paid, total: data.paging?.total ?? results.length });
  } catch (e) {
    return res.status(500).json({ paid: false, error: String(e) });
  }
}
