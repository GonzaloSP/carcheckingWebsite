/**
 * GET /api/mp-verify-preference?preference_id=XXX
 *
 * Searches MercadoPago for approved payments linked to a preference.
 * Returns: { paid: boolean }
 */

const MP_SEARCH = 'https://api.mercadopago.com/v1/payments/search';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { preference_id } = req.query;
  if (!preference_id) return res.status(400).json({ error: 'Missing preference_id' });

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.status(500).json({ error: 'MP not configured' });

  try {
    const mpRes = await fetch(
      `${MP_SEARCH}?preference_id=${encodeURIComponent(preference_id)}&status=approved&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!mpRes.ok) return res.status(502).json({ paid: false, error: 'MP error' });

    const data = await mpRes.json();
    const paid = Array.isArray(data.results) && data.results.length > 0;
    return res.status(200).json({ paid });
  } catch {
    return res.status(500).json({ paid: false, error: 'Error al verificar pago' });
  }
}
