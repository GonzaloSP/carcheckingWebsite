const MP_API = 'https://api.mercadopago.com/checkout/preferences';

export default async ({ req, res }) => {
  if (req.method !== 'POST') return res.json({ error: 'Method not allowed' }, 405);

  const { dominio } = JSON.parse(req.body || '{}');
  if (!dominio) return res.json({ error: 'Missing dominio' }, 400);

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.json({ error: 'MP not configured' }, 500);

  const siteUrl = process.env.SITE_URL ?? 'https://www.carchecking.com.ar';
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
      back_urls: {
        success: `${siteUrl}/consultar-multa`,
        failure: `${siteUrl}/consultar-multa`,
        pending: `${siteUrl}/consultar-multa`,
      },
    }),
  });

  if (!mpRes.ok) {
    const err = await mpRes.json().catch(() => ({}));
    return res.json({ error: err.message ?? 'MP error' }, 502);
  }

  const { id: preference_id, init_point } = await mpRes.json();
  return res.json({ preference_id, init_point, external_reference });
};
