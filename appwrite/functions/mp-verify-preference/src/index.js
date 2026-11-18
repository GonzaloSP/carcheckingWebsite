import https from 'https';
import crypto from 'crypto';

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

function httpsPostJson(url, payload) {
  const body = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => req.destroy(new Error('Meta CAPI timeout')));
    req.write(body);
    req.end();
  });
}

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

/**
 * Server-side twin of the browser Pixel `Purchase` (trackMultaPurchase in
 * src/lib/analytics.ts). Same event_name + event_id (the MP external_reference),
 * so Meta keeps one of the two — and drops repeats from the frontend's polling.
 * Never throws: a Meta outage must not break payment verification.
 */
async function sendMetaPurchase({ external_reference, payment, params, req, log, error }) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return;

  const headers = req.headers || {};
  const ip = String(headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined;
  const userAgent = params.get('ua') || headers['user-agent'] || undefined;
  const email = String(payment?.payer?.email || '').trim().toLowerCase();

  const user_data = {
    ...(email ? { em: [sha256(email)] } : {}),
    ...(ip ? { client_ip_address: ip } : {}),
    ...(userAgent ? { client_user_agent: userAgent } : {}),
    ...(params.get('fbp') ? { fbp: params.get('fbp') } : {}),
    ...(params.get('fbc') ? { fbc: params.get('fbc') } : {}),
  };

  // Payment timestamp, not "now": identical across the repeated verify calls.
  const paidAt = Date.parse(payment?.date_approved || payment?.date_created || '') || Date.now();
  const siteUrl = process.env.SITE_URL || 'https://www.carchecking.com.ar';

  const payload = {
    data: [{
      event_name: 'Purchase',
      event_time: Math.floor(paidAt / 1000),
      event_id: external_reference,
      action_source: 'website',
      event_source_url: params.get('url') || `${siteUrl}/consultar-multa`,
      user_data,
      custom_data: {
        value: Number(payment?.transaction_amount) || 0,
        currency: payment?.currency_id || 'ARS',
        content_type: 'product',
        content_ids: ['consulta-multas'],
        content_name: 'Consulta de multas',
        content_category: 'multas',
        num_items: 1,
        order_id: external_reference,
      },
    }],
    ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
  };

  const version = process.env.META_GRAPH_VERSION || 'v23.0';
  const url = `https://graph.facebook.com/${version}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`;
  try {
    const metaRes = await httpsPostJson(url, payload);
    if (metaRes.status >= 400) error?.(`Meta CAPI ${metaRes.status}: ${JSON.stringify(metaRes.data)}`);
    else log?.(`Meta CAPI Purchase sent for ${external_reference}`);
  } catch (e) {
    error?.(`Meta CAPI failed: ${e.message}`);
  }
}

export default async ({ req, res, log, error }) => {
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
  const paidPayment = results.find(p => PAID_STATUSES.includes(p.status));
  const paid = !!paidPayment;
  if (paidPayment) {
    await sendMetaPurchase({ external_reference, payment: paidPayment, params, req, log, error });
  }
  return r({ paid, total: mpRes.data?.paging?.total || results.length });
};
