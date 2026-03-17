/**
 * POST /api/mp-create-preference
 * Body: { dominio: string }
 *
 * Creates a MercadoPago Checkout Pro preference for a $2000 ARS multa query.
 * Returns: { preference_id, init_point }
 */

const MP_API = 'https://api.mercadopago.com/checkout/preferences';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { dominio } = req.body ?? {};
  if (!dominio) return res.status(400).json({ error: 'Missing dominio' });

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.status(500).json({ error: 'MP not configured' });

  const siteUrl = process.env.SITE_URL ?? 'https://www.carchecking.com.ar';

  try {
    const external_reference = `${dominio}-${Date.now()}`;

    const mpRes = await fetch(MP_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: `Consulta de multas por patente ${dominio}`,
            quantity: 1,
            unit_price: 2000,
            currency_id: 'ARS',
          },
        ],
        statement_descriptor: 'carChecking',
        external_reference,
      }),
    });

    if (!mpRes.ok) {
      const err = await mpRes.json().catch(() => ({}));
      return res.status(502).json({ error: err.message ?? 'MP error' });
    }

    const { id: preference_id, init_point } = await mpRes.json();
    return res.status(200).json({ preference_id, init_point, external_reference });
  } catch (e) {
    return res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
}
