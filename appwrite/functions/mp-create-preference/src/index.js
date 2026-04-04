import https from 'https';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

export default async ({ req, res }) => {
  if (req.method === 'OPTIONS') return res.text('', 204, CORS);
  const r = (data, status = 200) => res.json(data, status, CORS);
  if (req.method !== 'POST') return r({ error: 'Method not allowed' }, 405);

  const { dominio } = JSON.parse(req.body || '{}');
  if (!dominio) return r({ error: 'Missing dominio' }, 400);

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return r({ error: 'MP not configured' }, 500);

  const siteUrl = process.env.SITE_URL || 'https://www.carchecking.com.ar';
  const external_reference = `${dominio}-${Date.now()}`;

  const body = JSON.stringify({
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
  });

  const mpRes = await httpsRequest('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);

  if (mpRes.status >= 400) {
    return r({ error: mpRes.data?.message || 'MP error' }, 502);
  }

  const { id: preference_id, init_point } = mpRes.data;
  return r({ preference_id, init_point, external_reference });
};
