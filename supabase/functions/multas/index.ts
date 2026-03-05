/**
 * Supabase Edge Function — Argentina Multas Proxy
 *
 * GET /functions/v1/multas?dominio=ABC123&fuente=ansv|pba|caba|...
 *
 * Deploy with:
 *   supabase functions deploy multas --no-verify-jwt
 *
 * Env vars required:
 *   TWOCAPTCHA_API_KEY   — 2captcha.com key (ansv, pba, caba; also rosario if no CAPSOLVER_API_KEY)
 *   CAPSOLVER_API_KEY    — capsolver.com key (optional; enables auto Rosario — better v3 scores)
 *   RECAPTCHA_SECRET_KEY — Google reCAPTCHA v3 secret (optional; skip to allow all requests)
 */

// deno-lint-ignore-file no-explicit-any
import axios from 'npm:axios';
import { wrapper } from 'npm:axios-cookiejar-support';
import { CookieJar } from 'npm:tough-cookie';
import * as cheerio from 'npm:cheerio';
import Captcha from 'npm:2captcha';
import { Buffer } from 'node:buffer';
import { createCipheriv } from 'node:crypto';

// ─── Shared axios instance ────────────────────────────────────────────────────
const http = wrapper(
  axios.create({
    timeout: 25000,
    maxRedirects: 20,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'es-AR,es;q=0.9',
    },
  })
);

// ─── CORS headers ─────────────────────────────────────────────────────────────
const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ─── Lazy captcha solver (2captcha) ───────────────────────────────────────────
function getSolver() {
  const key = Deno.env.get('TWOCAPTCHA_API_KEY') ?? '';
  if (!key) throw new Error('TWOCAPTCHA_API_KEY no está configurada.');
  return new Captcha.Solver(key);
}

// ─── Date helper: converts Unix timestamps (ms or s) to dd/mm/yyyy ────────────
function parseDate(val: any): string | null {
  if (!val) return null;
  const n = Number(val);
  if (!isNaN(n) && n > 1_000_000_000) {
    const ms = n > 9_999_999_999 ? n : n * 1000;
    const d  = new Date(ms);
    if (isNaN(d.getTime())) return String(val);
    return d.toLocaleDateString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  }
  return String(val);
}

// ─── Capsolver v3 solver ──────────────────────────────────────────────────────
async function solveRecaptchaV3(siteKey: string, pageUrl: string, action: string, minScore = 0.3): Promise<string> {
  const capsolverKey = Deno.env.get('CAPSOLVER_API_KEY') ?? '';

  if (capsolverKey) {
    const createRes = await axios.post(
      'https://api.capsolver.com/createTask',
      {
        clientKey: capsolverKey,
        task: {
          type:       'ReCaptchaV3TaskProxyLess',
          websiteURL: pageUrl,
          websiteKey: siteKey,
          pageAction: action,
          minScore,
        },
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
    );
    if (createRes.data.errorId !== 0) {
      throw new Error(`Capsolver error: ${createRes.data.errorDescription}`);
    }
    if (createRes.data.solution?.gRecaptchaResponse) return createRes.data.solution.gRecaptchaResponse;

    const taskId = createRes.data.taskId;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const pollRes = await axios.post(
        'https://api.capsolver.com/getTaskResult',
        { clientKey: capsolverKey, taskId },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );
      if (pollRes.data.errorId !== 0) throw new Error(`Capsolver poll error: ${pollRes.data.errorDescription}`);
      if (pollRes.data.status === 'ready') return pollRes.data.solution.gRecaptchaResponse;
    }
    throw new Error('Capsolver timeout después de 2 minutos.');
  }

  const solver = getSolver();
  const result = await solver.recaptcha(siteKey, pageUrl, { version: 'v3', action, score: minScore });
  return result.data;
}

// ─── Capsolver v2 solver ──────────────────────────────────────────────────────
async function solveRecaptchaV2(siteKey: string, pageUrl: string): Promise<string> {
  const capsolverKey = Deno.env.get('CAPSOLVER_API_KEY') ?? '';

  if (capsolverKey) {
    const createRes = await axios.post(
      'https://api.capsolver.com/createTask',
      {
        clientKey: capsolverKey,
        task: { type: 'ReCaptchaV2TaskProxyLess', websiteURL: pageUrl, websiteKey: siteKey },
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
    );
    if (createRes.data.errorId !== 0) throw new Error(`Capsolver v2 error: ${createRes.data.errorDescription}`);

    if (createRes.data.solution?.gRecaptchaResponse) return createRes.data.solution.gRecaptchaResponse;

    const taskId = createRes.data.taskId;
    for (let i = 0; i < 24; i++) {
      await new Promise(r => setTimeout(r, 3000));
      const pollRes = await axios.post(
        'https://api.capsolver.com/getTaskResult',
        { clientKey: capsolverKey, taskId },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );
      if (pollRes.data.errorId !== 0) throw new Error(`Capsolver v2 poll error: ${pollRes.data.errorDescription}`);
      if (pollRes.data.status === 'ready') return pollRes.data.solution.gRecaptchaResponse;
    }
    throw new Error('Capsolver v2 timeout después de 2 minutos.');
  }

  const solver = getSolver();
  const result = await solver.recaptcha(siteKey, pageUrl);
  return result.data;
}

// ─── ANSV / SINAI (Nacional) ──────────────────────────────────────────────────
async function fetchANSV(dominio: string) {
  if (!/^[A-Z]{3}\d{3}$/.test(dominio)) {
    throw new Error('El portal ANSV/SINAI solo admite patentes en formato antiguo (ABC123).');
  }

  const BASE     = 'https://consultainfracciones.seguridadvial.gob.ar';
  const PAGE_URL = `${BASE}/`;
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const html     = String(home.data);
  const $        = cheerio.load(html);

  const viewState          = $('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $('input[name="__EVENTVALIDATION"]').val()    || '';

  const siteKeyMatch = html.match(/data-sitekey="([^"]+)"/);
  if (!siteKeyMatch) throw new Error('No se encontró la siteKey de reCAPTCHA en el portal ANSV.');
  const siteKey = siteKeyMatch[1];

  const captchaToken = await solveRecaptchaV3(siteKey, PAGE_URL, 'submit', 0.3);

  const cookies = jar.getCookiesSync(BASE).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const formData = new URLSearchParams({
    __EVENTTARGET:          '',
    __EVENTARGUMENT:        '',
    __VIEWSTATE:            String(viewState),
    __VIEWSTATEGENERATOR:   String(viewStateGenerator),
    __EVENTVALIDATION:      String(eventValidation),
    txtDominio:             dominio,
    'g-recaptcha-response': captchaToken,
    btnConsultar:           'Consultar',
  });

  const res = await http.post(PAGE_URL, formData.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $r = cheerio.load(String(res.data));
  if (
    /no se encontraron|sin infracciones|no registra/i.test($r('body').text()) ||
    $r('.no-data, .sin-resultados, .alert-info').length
  ) return [];

  const infracciones: any[] = [];
  $r('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $r(row).find('td').map((_: number, td: any) => $r(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || cols[3] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'ANSV/SINAI',
    });
  });

  return infracciones;
}

// ─── PBA — Policía Bonaerense ─────────────────────────────────────────────────
async function fetchPBA(dominio: string) {
  const PAGE_URL = 'https://www.infracciones.mseg.gba.gov.ar/InfraccionesOnLine/';
  const SITE_KEY = '6LeRBaUUAAAAAIjb-hjfK8OKqJ5tg1OUEQ4OvDVp';

  const captchaToken = await solveRecaptchaV3(SITE_KEY, PAGE_URL, 'consultar', 0.3);

  const res = await http.get(`${PAGE_URL}api/infracciones`, {
    params:  { dominio, captcha: captchaToken },
    headers: { Accept: 'application/json', Referer: PAGE_URL },
    validateStatus: (s: number) => s < 500,
  });

  if (res.status === 404 || !res.data || res.data.length === 0) return [];

  return (res.data as any[]).map(i => ({
    acta:        i.numeroActa      || i.acta     || null,
    fecha:       parseDate(i.fechaEmision || i.fechaInfraccion || null),
    descripcion: i.descripcion     || i.articulo || null,
    lugar:       [i.calle, i.altura ? `N° ${i.altura}` : null].filter(Boolean).join(' ') || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:
      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: `PBA${i.municipio ? ' · ' + i.municipio : ''}`,
  }));
}

// ─── CABA — Ciudad Autónoma de Buenos Aires ───────────────────────────────────
async function fetchCABA(dominio: string) {
  const PAGE_URL = 'https://epec.buenosaires.gob.ar/';
  const SITE_KEY = '6LcH0g8UAAAAABb_IHfhIFJBM_yfE8K9hZPxl3fV';

  const captchaToken = await solveRecaptchaV3(SITE_KEY, PAGE_URL, 'consultar', 0.3);

  const res = await http.get('https://epec.buenosaires.gob.ar/api/infracciones', {
    params:  { patente: dominio, token: captchaToken },
    headers: { Accept: 'application/json', Referer: PAGE_URL },
    validateStatus: (s: number) => s < 500,
  });

  if (res.status === 404 || !res.data) return [];
  const list = res.data.infracciones || res.data || [];
  if (!Array.isArray(list)) return [];

  return list.map((i: any) => ({
    acta:        i.numeroActa    || i.acta    || null,
    fecha:       parseDate(i.fechaLabramiento || i.fecha || null),
    descripcion: i.descripcionInfraccion || i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:      (i.estadoInfraccion || i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'CABA',
  }));
}

// ─── Santa Fe Provincia ───────────────────────────────────────────────────────
async function fetchSantaFe(dominio: string) {
  const res = await http.get('https://multas.santafe.gov.ar/api/infracciones', {
    params:  { dominio },
    headers: { Accept: 'application/json' },
    validateStatus: (s: number) => s < 500,
  });

  if (res.status === 404 || !res.data) return [];
  const list = res.data.infracciones || res.data || [];
  if (!Array.isArray(list)) return [];

  return list.map((i: any) => ({
    acta:        i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || null),
    descripcion: i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Santa Fe',
  }));
}

// ─── Posadas (Misiones) ───────────────────────────────────────────────────────
async function fetchPosadas(dominio: string) {
  const res = await http.get(
    `https://eservicios.posadas.gov.ar/SIF.Infracciones.WA/api/infracciones/patente/${dominio}`,
    { headers: { Accept: 'application/json' }, validateStatus: (s: number) => s < 500 }
  );

  if (res.status === 404 || !res.data) return [];
  const list = Array.isArray(res.data) ? res.data : (res.data.infracciones || []);

  return list.map((i: any) => ({
    acta:        i.acta || i.numero || i.id || null,
    fecha:       parseDate(i.fecha || i.fechaInfraccion || null),
    descripcion: i.descripcion || i.falta || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Posadas',
  }));
}

// ─── Corrientes Capital ───────────────────────────────────────────────────────
async function fetchCorrientes(dominio: string) {
  const PAGE_URL = 'https://digitalfines.corrientes.gob.ar/';
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const $h       = cheerio.load(String(home.data));

  const viewState          = $h('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $h('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $h('input[name="__EVENTVALIDATION"]').val()    || '';

  const formData = new URLSearchParams({
    __EVENTTARGET:        '',
    __EVENTARGUMENT:      '',
    __VIEWSTATE:          String(viewState),
    __VIEWSTATEGENERATOR: String(viewStateGenerator),
    __EVENTVALIDATION:    String(eventValidation),
    tbPatente:            dominio,
    btnConsultaDominio:   'REALIZAR CONSULTA',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no posee infracciones|sin infracciones|no registra/i.test(bodyText)) return [];

  const infracciones: any[] = [];
  $('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Corrientes Capital',
    });
  });

  return infracciones;
}

// ─── Entre Ríos ───────────────────────────────────────────────────────────────
async function fetchEntreRios(dominio: string) {
  const res = await http.get(
    `https://app.entrerios.gov.ar/vias/api/infracciones/${dominio}`,
    { headers: { Accept: 'application/json' }, validateStatus: (s: number) => s < 500 }
  );

  if (res.status === 404 || !res.data) return [];
  const list = Array.isArray(res.data) ? res.data : (res.data.infracciones || []);

  return list.map((i: any) => ({
    acta:        i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || null),
    descripcion: i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Entre Ríos',
  }));
}

// ─── Misiones Provincia ───────────────────────────────────────────────────────
async function fetchMisiones(dominio: string) {
  const res = await http.get(
    `https://multas.misiones.gob.ar/api/consulta/${dominio}`,
    { headers: { Accept: 'application/json' }, validateStatus: (s: number) => s < 500 }
  );

  if (res.status === 404 || !res.data) return [];
  const list = Array.isArray(res.data) ? res.data : (res.data.infracciones || []);

  return list.map((i: any) => ({
    acta:        i.acta || null,
    fecha:       parseDate(i.fecha || null),
    descripcion: i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Misiones',
  }));
}

// ─── Chaco ────────────────────────────────────────────────────────────────────
async function fetchChaco(dominio: string) {
  const res = await http.get(
    `https://api.chaco.gob.ar/viales/infracciones/${dominio}`,
    { headers: { Accept: 'application/json' }, validateStatus: (s: number) => s < 500 }
  );

  if (res.status === 404 || !res.data) return [];
  const list = Array.isArray(res.data) ? res.data : (res.data.infracciones || []);

  return list.map((i: any) => ({
    acta:        i.acta || null,
    fecha:       parseDate(i.fecha || null),
    descripcion: i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Chaco',
  }));
}

// ─── Rosario ──────────────────────────────────────────────────────────────────
async function fetchRosario(dominio: string) {
  const PAGE_URL = 'https://www.rosario.gov.ar/mr/servicios/tramites/obtener-certificado-libre-deuda-de-infracciones';
  const SITE_KEY = '6Ld_9eIUAAAAADLNDP5UTCKvSqHlOJGDWXq0WvlU';

  const capsolverKey = Deno.env.get('CAPSOLVER_API_KEY') ?? '';
  let captchaToken: string;

  if (capsolverKey) {
    const createRes = await axios.post(
      'https://api.capsolver.com/createTask',
      {
        clientKey: capsolverKey,
        task: {
          type:       'ReCaptchaV3TaskProxyLess',
          websiteURL: PAGE_URL,
          websiteKey: SITE_KEY,
          pageAction: 'consultar',
          minScore:   0.5,
        },
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
    );

    if (createRes.data.errorId !== 0) throw new Error('Capsolver Rosario error: ' + createRes.data.errorDescription);

    if (createRes.data.solution?.gRecaptchaResponse) {
      captchaToken = createRes.data.solution.gRecaptchaResponse;
    } else {
      const taskId = createRes.data.taskId;
      captchaToken = '';
      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const pollRes = await axios.post(
          'https://api.capsolver.com/getTaskResult',
          { clientKey: capsolverKey, taskId },
          { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
        );
        if (pollRes.data.errorId !== 0) throw new Error('Capsolver Rosario poll error: ' + pollRes.data.errorDescription);
        if (pollRes.data.status === 'ready') {
          captchaToken = pollRes.data.solution.gRecaptchaResponse;
          break;
        }
      }
      if (!captchaToken) throw new Error('Capsolver Rosario timeout.');
    }
  } else {
    const solver = getSolver();
    const result = await solver.recaptcha(SITE_KEY, PAGE_URL, { version: 'v3', action: 'consultar', score: 0.5 });
    captchaToken = result.data;
  }

  const res = await http.post(
    'https://www.rosario.gov.ar/mr/rest/servicios/multas/consultar',
    { dominio, captchaToken },
    {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: PAGE_URL },
      validateStatus: (s: number) => s < 500,
    }
  );

  if (res.status === 404 || !res.data) return [];
  if (/no registra|sin infraccion|no se encontr/i.test(JSON.stringify(res.data))) return [];

  const list = res.data.infracciones || res.data || [];
  if (!Array.isArray(list)) return [];

  return list.map((i: any) => ({
    acta:        i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || null),
    descripcion: i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Rosario',
  }));
}

// ─── Neuquén Capital ──────────────────────────────────────────────────────────
async function fetchNeuquen(dominio: string) {
  const res = await http.get(
    'https://tramitesonline.neuquen.gov.ar/tramites/infracciones-de-transito/consultar',
    {
      params:  { patente: dominio },
      headers: { Accept: 'application/json' },
      validateStatus: (s: number) => s < 500,
    }
  );

  if (res.status === 404 || !res.data) return [];
  const list = Array.isArray(res.data) ? res.data : (res.data.infracciones || []);

  return list.map((i: any) => ({
    acta:        i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || null),
    descripcion: i.descripcion || null,
    lugar:       i.lugar || null,
    importe:     parseFloat(i.importe || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Neuquén',
  }));
}

// ─── Santa Rosa (La Pampa) ────────────────────────────────────────────────────
async function fetchSantaRosa(dominio: string) {
  const PAGE_URL = 'https://santarosa.gob.ar/transito/infracciones';
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const $h       = cheerio.load(String(home.data));

  const viewState          = $h('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $h('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $h('input[name="__EVENTVALIDATION"]').val()    || '';

  const formData = new URLSearchParams({
    __EVENTTARGET:        '',
    __EVENTARGUMENT:      '',
    __VIEWSTATE:          String(viewState),
    __VIEWSTATEGENERATOR: String(viewStateGenerator),
    __EVENTVALIDATION:    String(eventValidation),
    txtDominio:           dominio,
    btnConsultar:         'Consultar',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no registra|sin infracci|no se encontr/i.test(bodyText)) return [];

  const infracciones: any[] = [];
  $('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || cols[3] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Santa Rosa (La Pampa)',
    });
  });

  return infracciones;
}

// ─── Ciudad de Mendoza ────────────────────────────────────────────────────────
async function fetchMendoza(dominio: string) {
  const BASE = 'https://apex.ciudaddemendoza.gov.ar/apex/produccion/';
  const jar  = new CookieJar();
  const home = await http.get(`${BASE}f?p=204:4000`, { jar, withCredentials: true });
  const $h   = cheerio.load(home.data);
  const session = $h('[name="p_instance"]').val();
  if (!session) throw new Error('No se pudo iniciar sesión en el portal de Mendoza.');

  const isMerc = /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(dominio);
  let itemNames: string, itemValues: string;
  if (isMerc) {
    itemNames  = 'P4000_MZA_PRIMER_LETRA,P4000_MZA_NUM_INTER,P4000_MZA_ULT_LETRA';
    itemValues = `${dominio.slice(0, 2)},${dominio.slice(2, 5)},${dominio.slice(5, 7)}`;
  } else {
    itemNames  = 'P4000_MZA_LETRAS,P4000_MZA_NUMEROS';
    itemValues = `${dominio.slice(0, 3)},${dominio.slice(3, 6)}`;
  }

  const setUrl  = `${BASE}f?p=204:4000:${session}:::RP:${itemNames}:${encodeURIComponent(itemValues)}`;
  const setResp = await http.get(setUrl, { jar, withCredentials: true });
  const $s      = cheerio.load(setResp.data);
  const getVal  = (n: string) => $s(`[name="${n}"],[id="${n}"]`).first().val() || '';
  const cookieStr = jar
    .getCookiesSync('https://apex.ciudaddemendoza.gov.ar')
    .map((c: any) => `${c.key}=${c.value}`)
    .join('; ');

  const plateFields: Record<string, string> = isMerc
    ? {
        P4000_MZA_LETRAS:        '',
        P4000_MZA_NUMEROS:       '',
        P4000_MZA_PRIMER_LETRA:  dominio.slice(0, 2),
        P4000_MZA_NUM_INTER:     dominio.slice(2, 5),
        P4000_MZA_ULT_LETRA:     dominio.slice(5, 7),
      }
    : {
        P4000_MZA_LETRAS:        dominio.slice(0, 3),
        P4000_MZA_NUMEROS:       dominio.slice(3, 6),
        P4000_MZA_PRIMER_LETRA:  '',
        P4000_MZA_NUM_INTER:     '',
        P4000_MZA_ULT_LETRA:     '',
      };

  const form = new URLSearchParams({
    p_flow_id:            '204',
    p_flow_step_id:       '4000',
    p_instance:           String(getVal('p_instance')),
    p_page_submission_id: String(getVal('p_page_submission_id')),
    p_request:            'SUBMIT_MZA',
    p_reload_on_submit:   'A',
    pSalt:                String(getVal('pSalt')),
    pPageItemsProtected:  String(getVal('pPageItemsProtected')),
    pPageItemsRowVersion: '',
    P4000_GO_TO:          '',
    P4000_GO_BACK:        '',
    P4000_MZA_DOC_TIPO:   'DNI',
    P4000_MZA_DOC:        '',
    ...plateFields,
  });

  const res = await http.post(`${BASE}wwv_flow.accept`, form.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        `${BASE}f?p=204:4000`,
      Cookie:         cookieStr,
    },
  });

  const $ = cheerio.load(String(res.data));
  if ($('span.nodatafound').length || $('body').text().includes('No se encontraron datos')) return [];

  const finalUrl = res.request?.res?.responseUrl || '';
  if (finalUrl.includes('success_msg')) {
    const m = finalUrl.match(/success_msg=([^&~]+)/);
    let msg = 'Error en el portal de Mendoza.';
    if (m) {
      try {
        msg = Buffer.from(m[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64')
          .toString('latin1')
          .replace(/[^\x20-\x7E\xA0-\xFF]/g, '');
      } catch (_) { /* ignore */ }
    }
    throw new Error(msg);
  }

  const infracciones: any[] = [];
  $('#report_3278544220698293_catch table tbody tr, .t-Report-report tbody tr').each(
    (_: number, row: any) => {
      const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
      if (cols.length < 10 || !cols[1]) return;
      const importeStr = (cols[8] || cols[7] || '').replace(/[^0-9.,]/g, '').replace(',', '.');
      infracciones.push({
        acta:        cols[9] || cols[3] || null,
        fecha:       cols[1] || null,
        descripcion: cols[11] || null,
        lugar:       null,
        importe:     parseFloat(importeStr) || null,
        estado:      (cols[14] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
        jurisdiccion: 'Ciudad de Mendoza',
      });
    }
  );

  return infracciones;
}

// ─── Mendoza Caminera ─────────────────────────────────────────────────────────
async function fetchMendozaCaminera(dominio: string) {
  const BASE_URL =
    'https://sistemas.seguridad.mendoza.gov.ar/webvialcaminera/servlet/com.pagosdeuda.wpdeudaonline';

  function gxEncrypt(plaintext: string, hexKey: string): string {
    const key    = Buffer.from(hexKey, 'hex');
    const bytes  = Buffer.from(plaintext, 'ascii');
    const padded = Buffer.alloc(Math.ceil(bytes.length / 16) * 16, 0);
    bytes.copy(padded);
    const cipher = createCipheriv('aes-128-ecb', key, null);
    cipher.setAutoPadding(false);
    return Buffer.concat([cipher.update(padded), cipher.final()]).toString('hex');
  }

  function extractGXState(html: string) {
    const nameIdx = html.indexOf('name="GXState"');
    if (nameIdx < 0) throw new Error('MendozaCaminera: GXState hidden field not found.');
    const chunk = html.slice(nameIdx, nameIdx + 10000);
    const m = chunk.match(/value='([\s\S]*?)'(?:\s*\/?>|\s*>)/);
    if (!m) throw new Error('MendozaCaminera: could not extract GXState value.');
    return JSON.parse(
      m[1]
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
    );
  }

  const jar      = new CookieJar();
  const homeResp = await http.get(BASE_URL, { jar, withCredentials: true });
  const gxState  = extractGXState(String(homeResp.data));

  const gxAjaxKey         = gxState['GX_AJAX_KEY'];
  const ajaxSecurityToken = gxState['AJAX_SECURITY_TOKEN'];
  const authJwt           = gxState['GX_AUTH_WPDEUDAONLINE'];
  const websocketId       = gxState['GX_WEBSOCKET_ID'];

  if (!gxAjaxKey || !ajaxSecurityToken || !authJwt) {
    throw new Error('MendozaCaminera: tokens missing from GXState.');
  }

  const encryptedEvt = gxEncrypt('gxfullajaxEvt', gxAjaxKey);
  const ajaxUrl      = `${BASE_URL}?gxfullajaxEvt=${encryptedEvt}`;
  const cookies      = jar
    .getCookiesSync(BASE_URL)
    .map((c: any) => `${c.key}=${c.value}`)
    .join('; ');

  const ajaxHeaders = {
    'Content-Type':        'application/json',
    Accept:                'application/json, text/javascript, */*; q=0.01',
    GxAjaxRequest:         '1',
    AJAX_SECURITY_TOKEN:   ajaxSecurityToken,
    'X-GXAUTH-TOKEN':      authJwt,
    Origin:                'https://sistemas.seguridad.mendoza.gov.ar',
    Referer:               BASE_URL,
    Cookie:                cookies,
  };

  await http.post(
    ajaxUrl,
    JSON.stringify({
      MPage: false, cmpCtx: '', parms: ['', '', '', '', '', ''], hsh: [],
      objClass: 'wpdeudaonline', pkgName: 'com.pagosdeuda',
      events: ['DOMINIO.CLICK'],
      gxstate: { GX_WEBSOCKET_ID: websocketId },
      grids: {},
    }),
    { headers: ajaxHeaders }
  );

  const enterResp = await http.post(
    ajaxUrl,
    JSON.stringify({
      MPage: false, cmpCtx: '', parms: ['', '', '', 'DOM', dominio, 'DOMINIO:', '', ''], hsh: [],
      objClass: 'wpdeudaonline', pkgName: 'com.pagosdeuda',
      events: ['ENTER'],
      gxstate: { GX_WEBSOCKET_ID: websocketId },
      grids: {},
    }),
    { headers: ajaxHeaders }
  );

  const result   = enterResp.data;
  const messages =
    (result.gxMessages && (result.gxMessages.MAIN || result.gxMessages.W0077)) || [];
  if (
    messages.some(
      (m: any) => typeof m.text === 'string' && /no existe ninguna deuda|no se encontr/i.test(m.text)
    )
  )
    return [];

  const infracciones: any[] = [];
  for (const ctx of result.gxValues || []) {
    if (ctx.CmpContext !== 'W0077') continue;
    const titular = ctx.AV9Titular || '';
    const sdtList = ctx.W0077Sdtdetalledeuda || ctx['W0077vSDTDETALLEDEUDA'] || [];

    if (sdtList.length > 0) {
      sdtList.forEach((item: any) =>
        infracciones.push({
          acta:        item.obnId || item.concepto || null,
          fecha:       item.vencimiento || null,
          descripcion: [item.concepto, item.subConcepto].filter(Boolean).join(' - ') || null,
          lugar:       null,
          importe:     parseFloat(item.importeTotal || 0) || null,
          estado:      (item.tipo || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
          jurisdiccion: `Mendoza Caminera${titular ? ' · ' + titular : ''}`,
        })
      );
    } else {
      let objetos: any[] = [];
      try { objetos = JSON.parse(ctx.AV14objetos || '[]'); } catch (_) { /* ignore */ }
      objetos.forEach((item: any) =>
        infracciones.push({
          acta:        item.ObnId || item.tasa || null,
          fecha:       item.ocvfechavto || null,
          descripcion:
            [item.concepto, item.subconcepto].filter(Boolean).join(' - ') || item.tasa || null,
          lugar:       null,
          importe:     parseFloat(item.cuotaDeudaTotal || item.saldoCap || 0) || null,
          estado:      'pendiente',
          jurisdiccion: `Mendoza Caminera${item.persona ? ' · ' + item.persona : titular ? ' · ' + titular : ''}`,
        })
      );
    }
  }

  if (infracciones.length === 0 && result.gxHiddens?.W0077vOBJETOS) {
    let objetos: any[] = [];
    try { objetos = JSON.parse(result.gxHiddens.W0077vOBJETOS || '[]'); } catch (_) { /* ignore */ }
    objetos.forEach((item: any) =>
      infracciones.push({
        acta:        item.ObnId || item.tasa || null,
        fecha:       item.ocvfechavto || null,
        descripcion:
          [item.concepto, item.subconcepto].filter(Boolean).join(' - ') || item.tasa || null,
        lugar:       null,
        importe:     parseFloat(item.cuotaDeudaTotal || item.saldoCap || 0) || null,
        estado:      'pendiente',
        jurisdiccion: 'Mendoza Caminera',
      })
    );
  }

  return infracciones;
}

// ─── Salta Capital ────────────────────────────────────────────────────────────
async function fetchSalta(dominio: string) {
  const res = await http.post(
    'https://rentas.dgrmsalta.gov.ar/api/automotores/multas',
    { dominio, recaptcha: '' },
    {
      headers:        { 'Content-Type': 'application/json', Accept: 'application/json' },
      validateStatus: (s: number) => s === 200 || s === 404 || s === 400,
    }
  );

  if (res.status === 404 || /no pos[eé]{1,2} multas/i.test(res.data?.message || '')) return [];
  if (res.status === 400) throw new Error(`Salta: ${res.data?.message || 'Dominio inválido.'}`);

  const list = res.data?.multas || [];
  if (!Array.isArray(list)) return [];

  return list.map((i: any) => ({
    acta:        String(i.numeroObligacionImpuesto || i.acta || ''),
    fecha:       parseDate(i.fechaInfraccion || null),
    descripcion: [i.descripcion, i.articulo].filter(Boolean).join(' – ') || null,
    lugar:       [i.calle, i.altura ? `N° ${i.altura}` : null].filter(Boolean).join(' ') || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:
      (i.estadoPlanPago || i.estado || 'pendiente').toLowerCase().includes('pag')
        ? 'pagada'
        : 'pendiente',
    jurisdiccion: `Salta Capital${i.titular ? ' · ' + i.titular : ''}`,
  }));
}

// ─── Córdoba Provincia (Caminera) ─────────────────────────────────────────────
async function fetchCordoba(dominio: string) {
  const url = `https://app.rentascordoba.gob.ar/WSRestDeudaAnt/public/all/caminera/dominio/${dominio}`;
  const res = await http.get(url, {
    headers:        { Accept: 'application/json' },
    validateStatus: () => true,
  });

  const body = res.data;

  if (!body || typeof body !== 'object') {
    const finalUrl = res.request?.res?.responseUrl || res.request?.responseURL || '';
    const bodyStr  = typeof body === 'string' ? body : '';
    if (finalUrl.includes('mantenimiento') || bodyStr.includes('mantenimiento')) {
      throw new Error('El portal de Córdoba está en mantenimiento. Intentá más tarde.');
    }
    throw new Error('El portal de Córdoba no está disponible en este momento.');
  }

  if (body.status?.success !== 'TRUE') {
    const msgs = body.status?.messages || [];
    const firstMsg = (msgs[0]?.description || body.status?.message || '').trim();
    if (/no se encontr|sin datos|no registra/i.test(firstMsg)) return [];
    const friendly = firstMsg
      ? firstMsg.replace(/\s*-\s*Mensaje:.*$/, '').trim()
      : 'El portal de Córdoba no está disponible en este momento.';
    throw new Error(friendly);
  }
  if (!body.data) return [];

  const infracciones: any[] = [];
  for (const contribuyente of body.data.contribuyentes || []) {
    const titular = `${contribuyente.nombre || ''} ${contribuyente.apellido || ''}`.trim();
    for (const objeto of contribuyente.objetos || []) {
      for (const ob of objeto.obligaciones || []) {
        infracciones.push({
          acta:        objeto.referencia1 || null,
          fecha:       ob.fechaLabrado || null,
          descripcion: ob.descripcion || null,
          lugar:       null,
          importe:     parseFloat(ob.saldoTotal || 0) || null,
          estado:      (ob.estado || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
          jurisdiccion: `Córdoba Caminera${titular ? ' · ' + titular : ''}`,
        });
      }
    }
  }

  return infracciones;
}

// ─── DNRPA — Identificación de vehículo ──────────────────────────────────────
async function fetchDNRPA(dominio: string) {
  const BASE     = 'https://www2.jus.gov.ar/dnrpa-site';
  const PAGE_URL = `${BASE}/`;
  const SITE_KEY = '6Ld5ZjUUAAAAAJ7zlNNbYOQ9REJyT9LeFH13N-We';

  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  const solver = getSolver();
  const result = await solver.recaptcha(SITE_KEY, PAGE_URL);
  const token  = result.data;

  const cookies = jar.getCookiesSync(BASE).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(`${BASE}/api/site/ObtenerVehiculo`, {
    Dominio:                                      dominio,
    CodigoTramite:                                null,
    ObtenerTurnosDelRegistro:                     false,
    ObtenerTiposTramitesTipoDespachoRecibirEmail: true,
    EsMandatario:                                 false,
    RecaptchaResponse:                            token,
  }, {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept:         'application/json, text/plain, */*',
      Origin:         BASE,
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const d = res.data;
  if (!d || d.Message) throw new Error(d?.Message || 'Sin respuesta del portal DNRPA.');
  if (!d.marca) throw new Error('Vehículo no encontrado en el registro DNRPA.');

  return {
    marca:     d.marca,
    modelo:    d.modelo,
    anio:      d.anio,
    registro:  d.registroDenominacion || null,
    localidad: d.registroLocalidad    || null,
  };
}

// ─── Cloudflare Turnstile solver ──────────────────────────────────────────────
async function solveTurnstile(pageUrl: string, siteKey: string): Promise<string> {
  const create = await axios.post('https://api.2captcha.com/createTask', {
    clientKey: Deno.env.get('TWOCAPTCHA_API_KEY') ?? '',
    task: { type: 'TurnstileTaskProxyless', websiteURL: pageUrl, websiteKey: siteKey },
  });
  if (create.data.errorId !== 0) throw new Error('Turnstile: ' + create.data.errorDescription);
  const taskId = create.data.taskId;
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const poll = await axios.post('https://api.2captcha.com/getTaskResult', {
      clientKey: Deno.env.get('TWOCAPTCHA_API_KEY') ?? '', taskId,
    });
    if (poll.data.errorId !== 0) throw new Error(poll.data.errorDescription);
    if (poll.data.status === 'ready') return poll.data.solution.token;
  }
  throw new Error('Turnstile timeout.');
}

// ─── VTV — Verificación Técnica Vehicular (PBA) ───────────────────────────────
async function fetchVTV(dominio: string) {
  const PAGE_URL = 'https://vtv.gba.gob.ar/consultar-vtv';
  const SITE_KEY = '0x4AAAAAAB8GkEqt6sgz9dUq';

  const token = await solveTurnstile(PAGE_URL, SITE_KEY);
  const res = await axios.get(`https://vtv-web-api.transporte.gba.gob.ar/api/historialvtvs/patente/${dominio}`, {
    headers: {
      'Content-Type':      'application/json',
      'X-Turnstile-Token': token,
      Origin:              'https://vtv.gba.gob.ar',
      Referer:             'https://vtv.gba.gob.ar/',
      'User-Agent':        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36',
    },
    timeout: 20000,
  });

  const data = res.data;
  if (data?.ok === false) throw new Error(data.message || 'Sin datos de VTV.');
  if (!data || data.status !== 'success') throw new Error('No se encontraron datos de VTV para este dominio.');
  if (!Array.isArray(data.payload) || data.payload.length === 0) return [];

  const today = new Date();
  return data.payload.map((entry: any) => {
    const v   = entry.verificacion || {};
    const veh = entry.vehiculo     || {};

    let vigente = false;
    if (v.fecha_vencimiento) {
      const parts = v.fecha_vencimiento.split(' ')[0].split('/');
      if (parts.length === 3) vigente = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`) > today;
    }

    return {
      fecha_verificacion: v.fecha_verificacion ? v.fecha_verificacion.split(' ')[0] : null,
      fecha_vencimiento:  v.fecha_vencimiento  ? v.fecha_vencimiento.split(' ')[0]  : null,
      numero_oblea:       v.numero_oblea || null,
      importe:            v.importe      || null,
      planta:             entry.planta?.nombre || null,
      vigente,
      defectos: (v.defectos || []).map((d: any) => d.detalle_defecto || d.codigo_defecto).filter(Boolean),
      marca:    veh.marca            || null,
      modelo:   veh.modelo           || null,
      anio:     veh.anio_fabricacion || null,
    };
  });
}

// ─── ITV Córdoba Capital ──────────────────────────────────────────────────────
async function fetchVTVCordoba(dominio: string) {
  const PAGE_URL = 'https://itvcordoba.com.ar/Historico.aspx';
  const jar = new CookieJar();

  const home = await http.get(PAGE_URL, { jar, withCredentials: true });
  const html = String(home.data);
  const $    = cheerio.load(html);

  const viewState          = $('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $('input[name="__EVENTVALIDATION"]').val()    || '';

  const num1 = parseInt($('#MainContent_lblNum1').text().trim()) || 0;
  const num2 = parseInt($('#MainContent_lblNum2').text().trim()) || 0;
  const op   = $('#MainContent_lblOperador').text().trim();
  const answer = op.includes('+') ? num1 + num2
               : op.includes('×') || op.includes('*') ? num1 * num2
               : num1 - num2;

  const cookies = jar.getCookiesSync('https://itvcordoba.com.ar').map((c: any) => `${c.key}=${c.value}`).join('; ');
  const form = new URLSearchParams({
    '__EVENTTARGET':                         '',
    '__EVENTARGUMENT':                       '',
    '__VIEWSTATE':                           String(viewState),
    '__VIEWSTATEGENERATOR':                  String(viewStateGenerator),
    '__EVENTVALIDATION':                     String(eventValidation),
    'ctl00$MainContent$DominioHist':         dominio,
    'ctl00$MainContent$tbCaptcha':           String(answer),
    'ctl00$MainContent$SearchButton':        'Buscar',
  });

  const res = await http.post(PAGE_URL, form.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $r = cheerio.load(String(res.data));
  if ($r('#MainContent_PageMessage').length) return [];

  const today = new Date();
  const historial: any[] = [];
  $r('#MainContent_GridResultados tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $r(row).find('td').map((_: number, td: any) => $r(td).text().trim()).get();
    if (cols.length < 2) return;
    const [fecha, vencimiento, estado] = cols;

    let vigente = false;
    if (vencimiento) {
      const parts = vencimiento.split('/');
      if (parts.length === 3) {
        let y = parseInt(parts[2]);
        if (y < 100) y += 2000;
        vigente = new Date(y, parseInt(parts[1]) - 1, parseInt(parts[0])) > today;
      }
    }
    historial.push({ fecha_verificacion: fecha || null, fecha_vencimiento: vencimiento || null, estado: estado || null, vigente, planta: null });
  });

  return historial;
}

// ─── RTO Santa Fe ─────────────────────────────────────────────────────────────
async function fetchVTVSantaFe(dominio: string) {
  const BASE     = 'https://rtosf.3dlink.com.ar';
  const PAGE_URL = `${BASE}/ver_estado.asp`;

  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  const captchaRes = await http.get(`${BASE}/captcha.asp`, {
    jar, withCredentials: true, responseType: 'arraybuffer',
    headers: { Referer: PAGE_URL },
  });
  const base64Image = Buffer.from(new Uint8Array(captchaRes.data)).toString('base64');

  let captchaCode: string | null = null;
  const capsolverKey = Deno.env.get('CAPSOLVER_API_KEY') ?? '';
  if (capsolverKey) {
    try {
      const cr = await axios.post('https://api.capsolver.com/createTask',
        { clientKey: capsolverKey, task: { type: 'ImageToTextTask', body: base64Image } },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });
      if (cr.data.errorId === 0) {
        captchaCode = cr.data.solution?.text || null;
        if (!captchaCode) {
          for (let i = 0; i < 12; i++) {
            await new Promise(r => setTimeout(r, 3000));
            const pr = await axios.post('https://api.capsolver.com/getTaskResult',
              { clientKey: capsolverKey, taskId: cr.data.taskId },
              { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });
            if (pr.data.errorId !== 0) break;
            if (pr.data.status === 'ready') { captchaCode = pr.data.solution?.text || null; break; }
          }
        }
      }
    } catch (_) { /* fall through */ }
  }
  if (!captchaCode) {
    try { const r = await getSolver().normal(base64Image); captchaCode = r.data; } catch (_) { /* ignore */ }
  }
  if (!captchaCode) {
    const err = new Error('MANUAL_REQUIRED') as any;
    err.manualUrl = PAGE_URL;
    throw err;
  }

  const cookies = jar.getCookiesSync(BASE).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const bodyStr = `dominio=${encodeURIComponent(dominio)}&captchacode=${encodeURIComponent(captchaCode)}&Submit=Verificar`;

  const res = await axios.post(`${BASE}/ver_estado2.asp`, bodyStr, {
    maxRedirects: 5,
    headers: {
      'Content-Type':   'application/x-www-form-urlencoded',
      'Content-Length': new TextEncoder().encode(bodyStr).length,
      Cookie:           cookies,
      Referer:          PAGE_URL,
    },
    validateStatus: () => true,
  });

  const finalUrl = res.request?.res?.responseUrl || res.request?.responseURL || '';
  if (/[?&]code=0123/.test(finalUrl)) {
    const err = new Error('MANUAL_REQUIRED') as any;
    err.manualUrl = PAGE_URL;
    throw err;
  }

  const html = String(res.data);
  if (/sin datos|no se encontr|no registra|no hay|inexistente|no existe inform/i.test(html)) return [];

  const $     = cheerio.load(html);
  const today = new Date();
  const historial: any[] = [];
  const dateRe = /\d{1,2}\/\d{1,2}\/\d{2,4}/;

  $('table tr').each((_: number, row: any) => {
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    const vencCol = cols.find(c => dateRe.test(c));
    if (!vencCol) return;
    const parts = vencCol.split('/');
    let y = parseInt(parts[2]); if (y < 100) y += 2000;
    const vigente = new Date(y, parseInt(parts[1]) - 1, parseInt(parts[0])) > today;
    const fechaCol = cols.find(c => c !== vencCol && dateRe.test(c)) || null;
    historial.push({ fecha_verificacion: fechaCol, fecha_vencimiento: vencCol, vigente, estado: vigente ? 'Vigente' : 'Vencida', planta: null });
  });

  return historial;
}

// ─── ACOR — Deuda de Patentes (Corrientes) ────────────────────────────────────
async function fetchACORPatente(dominio: string) {
  const BASE     = 'https://acor.gob.ar';
  const PAGE_URL = `${BASE}/libre_deuda_rod.asp`;
  const POST_URL = `${BASE}/consulta_deuda.asp`;

  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  const cookies = jar.getCookiesSync(BASE).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const body = new URLSearchParams({
    cod_imp: '02',
    objeto:  dominio,
    desde:   'libre_deuda_rod.asp',
    v_donde: '',
    c:       'Consultar',
  });

  const res = await http.post(POST_URL, body.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $ = cheerio.load(String(res.data), { decodeEntities: true });

  const inner  = $('.col-md-12.alert.alert-secondary h5');
  const cls    = (inner.attr('class') || '').toLowerCase();
  const text   = inner.text().trim();

  const anyAlert = $('h5[class*="alert"]').first();
  const clsAny   = (anyAlert.attr('class') || '').toLowerCase();
  const textAny  = anyAlert.text().trim();

  const finalCls  = cls  || clsAny;
  const finalText = text || textAny;

  if (/inexistente/i.test(finalText) || finalCls.includes('alert-danger')) {
    return { tieneDeuda: null, error: 'Patente no registrada en Corrientes (ACOR)' };
  }
  if (/no posee deuda/i.test(finalText) || finalCls.includes('alert-success')) {
    return { tieneDeuda: false };
  }
  if (finalCls.includes('alert-warning') || /deuda|debe\b/i.test(finalText)) {
    const montoMatch = finalText.match(/\$\s*([\d.,]+)/);
    const monto = montoMatch ? parseFloat(montoMatch[1].replace(/\./g, '').replace(',', '.')) : null;
    return { tieneDeuda: true, monto };
  }

  return { tieneDeuda: null, error: 'Respuesta no reconocida de ACOR Corrientes' };
}

// ─── ARBA — Deuda de Patentes (Buenos Aires Provincia) ───────────────────────
async function fetchARBA(dominio: string) {
  const BASE     = 'https://app.arba.gov.ar/AvisoDeudas';
  const PAGE_URL = `${BASE}/?imp=1`;
  const UA       = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
  const capsolverKey = Deno.env.get('CAPSOLVER_API_KEY') ?? '';

  async function solveCaptchaImage(base64Image: string): Promise<string | null> {
    if (capsolverKey) {
      try {
        const createRes = await axios.post('https://api.capsolver.com/createTask', {
          clientKey: capsolverKey,
          task: { type: 'ImageToTextTask', body: base64Image },
        }, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });

        if (createRes.data.errorId === 0) {
          let text = createRes.data.solution?.text || null;
          if (!text) {
            const taskId = createRes.data.taskId;
            for (let i = 0; i < 8; i++) {
              await new Promise(r => setTimeout(r, 2000));
              const pollRes = await axios.post('https://api.capsolver.com/getTaskResult',
                { clientKey: capsolverKey, taskId },
                { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
              );
              if (pollRes.data.errorId !== 0) break;
              if (pollRes.data.status === 'ready') { text = pollRes.data.solution?.text || null; break; }
            }
          }
          if (text) return text;
        }
      } catch (_) { /* fall through */ }
    }
    try {
      const result = await getSolver().normal(base64Image);
      return result.data;
    } catch (_) { return null; }
  }

  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true, headers: { 'User-Agent': UA } });

  const MAX_ATTEMPTS = 2;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const tokenRes = await http.get(`${BASE}/captcha/token`, {
      jar, withCredentials: true,
      headers: { Referer: PAGE_URL, Accept: 'text/plain, */*', 'User-Agent': UA },
    });
    const captchaToken = String(tokenRes.data).trim();
    if (!captchaToken) throw new Error('No se pudo obtener el token de captcha de ARBA.');

    const imgRes = await http.get(`${BASE}/captcha/imagen?token=${captchaToken}`, {
      jar, withCredentials: true, responseType: 'arraybuffer',
      headers: { Referer: PAGE_URL, 'User-Agent': UA },
    });
    const base64Image = Buffer.from(new Uint8Array(imgRes.data)).toString('base64');

    const captchaRespuesta = await solveCaptchaImage(base64Image);
    if (!captchaRespuesta) {
      const err = new Error('MANUAL_REQUIRED') as any;
      err.manualUrl = PAGE_URL;
      throw err;
    }

    const body = new URLSearchParams({
      imp:                 '1',
      patente:             dominio,
      'captcha-token':     captchaToken,
      'captcha-action':    'objetoavisodeudas',
      'captcha-respuesta': captchaRespuesta,
    });
    const res = await http.post(`${BASE}/generarAviso.do`, body.toString(), {
      jar, withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer:        PAGE_URL,
        Origin:         'https://app.arba.gov.ar',
        'User-Agent':   UA,
      },
      validateStatus: () => true,
      maxRedirects: 5,
    });

    const finalUrl    = res.request?.res?.responseUrl || res.request?.responseURL || '';
    const contentType = String(res.headers?.['content-type'] || '');
    if (contentType.includes('pdf') || finalUrl.includes('.pdf')) {
      return { tieneDeuda: true, periodos: [], pdfUrl: finalUrl };
    }

    const html = String(res.data);

    if (/captcha.*(incorrecto|inv[áa]lido|error)|c[oó]digo.*incorrecto/i.test(html)) {
      if (attempt < MAX_ATTEMPTS - 1) continue;
      const err = new Error('MANUAL_REQUIRED') as any;
      err.manualUrl = PAGE_URL;
      throw err;
    }

    const $ = cheerio.load(html);
    const alertDangerText  = ($('.alert-danger p').text()  || $('.alert-danger').text()).trim();
    const alertSuccessText = ($('.alert-success p').text() || $('.alert-success').text()).trim();
    const alertWarningText = ($('.alert-warning p').text() || $('.alert-warning').text()).trim();

    if (/inexistente|no se encontr|no existe|no.*v[aá]lid/i.test(alertDangerText) ||
        /inexistente|no se encontr|no existe/i.test(html)) {
      return { tieneDeuda: null, periodos: [], error: 'Patente no encontrada en ARBA' };
    }

    if (/sin deuda|no registra deuda|no posee deuda|no tiene deuda|libre de deuda/i.test(alertSuccessText) ||
        /sin deuda|no registra deuda|no posee deuda|no tiene deuda|libre de deuda/i.test(html)) {
      return { tieneDeuda: false, periodos: [] };
    }

    const fixEncoding = (s: string) => s ? s.replace(/A[\u00b1\u00f1\ufffd]o/g, 'Año') : s;
    const periodos: any[] = [];
    $('table tr').each((i: number, row: any) => {
      if (i === 0) return;
      const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
      if (cols.length >= 2 && cols[0]) {
        const importeStr = (cols[cols.length - 1] || '').replace(/[^0-9.,]/g, '').replace(',', '.');
        const importeVal = parseFloat(importeStr) || null;
        const importe = (importeVal && !(Number.isInteger(importeVal) && importeVal >= 1900 && importeVal <= 2100))
          ? importeVal : null;
        periodos.push({ periodo: fixEncoding(cols[0]) || null, concepto: fixEncoding(cols[1]) || null, importe });
      }
    });
    if (periodos.length > 0) {
      return { tieneDeuda: true, periodos, total: periodos.reduce((s: number, p: any) => s + (p.importe || 0), 0) };
    }

    if (alertWarningText || /importe.*\$|cuota|vencimiento|deuda.*\$/i.test(html)) {
      return { tieneDeuda: true, periodos: [] };
    }

    return { tieneDeuda: false, periodos: [] };
  }
}

// ─── AGIP — Deuda de Patentes (CABA) ──────────────────────────────────────────
async function fetchAGIP(dominio: string) {
  const SITE_KEY = '6Lex5EkUAAAAAIGTKhHNPHpn7G6l4CHdTuhyidrP';
  const PAGE_URL = 'https://lb.agip.gob.ar/ConsultaPat/';

  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  const captchaToken = await solveRecaptchaV2(SITE_KEY, PAGE_URL);

  const cookies = jar.getCookiesSync('https://lb.agip.gob.ar').map((c: any) => `${c.key}=${c.value}`).join('; ');
  const body = new URLSearchParams({
    dominio:                   dominio,
    dominio2:                  dominio,
    dv:                        '',
    recaptcha_challenge_field:  '',
    recaptcha_response_field:   captchaToken,
  });

  const res = await http.post(
    'https://lb.agip.gob.ar/Empadronados/json/captcha/GetDatos',
    body.toString(),
    {
      jar, withCredentials: true,
      headers: {
        'Content-Type':      'application/x-www-form-urlencoded; charset=UTF-8',
        Referer:             PAGE_URL,
        Origin:              'https://lb.agip.gob.ar',
        'X-Requested-With':  'XMLHttpRequest',
        Cookie:              cookies,
      },
    }
  );

  const data = res.data;

  if (!data || data.statusCode !== 0) {
    const status = data?.status || '';
    const notFound = /no existe|no se encontr|sql: 10|no es av|inscripto/i.test(status);
    return { tieneDeuda: null, error: notFound ? 'Patente no registrada en AGIP (CABA)' : (status || 'Vehículo no registrado en AGIP (CABA)') };
  }

  const cabecera = data.result?.cabecera;
  if (!cabecera) return { tieneDeuda: null, error: 'Vehículo no encontrado en AGIP' };

  const dv = cabecera.dv != null ? String(cabecera.dv) : '';

  const currentYear = new Date().getFullYear();
  const deudaBody   = new URLSearchParams({
    codImpuesto: '8',
    anioInicio:  String(currentYear - 6),
    dominioI:    dominio,
    dv,
  });

  const cookies2 = jar.getCookiesSync('https://lb.agip.gob.ar').map((c: any) => `${c.key}=${c.value}`).join('; ');
  let posiciones: any[] = [];
  try {
    const deudaRes = await http.post(
      'https://lb.agip.gob.ar/Empadronados/json/GetPosicionesImpagas',
      deudaBody.toString(),
      {
        jar, withCredentials: true,
        headers: {
          'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
          Referer:            PAGE_URL,
          Origin:             'https://lb.agip.gob.ar',
          'X-Requested-With': 'XMLHttpRequest',
          Cookie:             cookies2,
        },
      }
    );

    const dd = deudaRes.data;
    if (dd && dd.statusCode === 0 && Array.isArray(dd.result)) {
      posiciones = dd.result.map((p: any) => ({
        anio:   p.anio   || null,
        cuota:  p.cuota  || null,
        monto:  parseFloat(p.saldoTotal || p.importe || 0) || null,
        estado: (p.estado || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      }));
    }
  } catch (_) { /* debt query failed — still return vehicle info */ }

  const pendientes = posiciones.filter(p => p.estado === 'pendiente');
  const total      = pendientes.reduce((s: number, p: any) => s + (p.monto || 0), 0);

  return {
    tieneDeuda: pendientes.length > 0,
    posiciones,
    total: total || null,
    vehiculo: {
      marca:  cabecera.tipoFabrica?.descripcion       || null,
      modelo: cabecera.tipoModeloFabrica?.descripcion || null,
      estado: cabecera.tipoEstado?.descripcion        || null,
    },
  };
}

// ─── VTV — RTO Catamarca ──────────────────────────────────────────────────────
async function fetchVTVCatamarca(dominio: string) {
  const BASE = 'https://www.rtocatamarca.com.ar/intranet';
  const res  = await http.post(
    `${BASE}/busca_patente/`,
    `patente=${encodeURIComponent(dominio)}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer: `${BASE}/buscador.html`,
      },
    }
  );

  const data = res.data;
  if (!Array.isArray(data) || data.length === 0) return [];

  const today = new Date();
  return data.map((item: any) => {
    let vigente = false;
    const fv = item.fecha_vencimiento || '';
    const parts = fv.split('/');
    if (parts.length === 3) {
      let y = parseInt(parts[2]); if (y < 100) y += 2000;
      vigente = new Date(y, parseInt(parts[1]) - 1, parseInt(parts[0])) > today;
    }
    return {
      fecha_verificacion: item.fecha_revision   || null,
      fecha_vencimiento:  item.fecha_vencimiento || null,
      estado:             item.resultado         || null,
      vigente,
      planta:             item.certificado       || null,
    };
  });
}

// ─── Infratrack REST API — Berisso, Ezeiza, Lanús ─────────────────────────────
async function fetchInfratrack(municipio: string, dominio: string) {
  const res = await http.get(
    `https://consulta-${municipio}.infratrack.com.ar/infracciones/a-pagar`,
    {
      params:  { tipo: 'DOMINIO', consulta: dominio, page: 1 },
      headers: { Accept: 'application/json', Referer: `https://consulta-${municipio}.infratrack.com.ar/` },
      validateStatus: () => true,
    }
  );

  const data = res.data || {};
  if (data.error) throw new Error(`Infratrack (${municipio}): ${data.message || 'Error del servidor.'}`);

  const list = data.infracciones || [];
  if (!Array.isArray(list)) return [];

  const nombre = municipio.charAt(0).toUpperCase() + municipio.slice(1);
  return list.map((i: any) => ({
    acta:        i.nroActa || i.numero_acta || i.id || null,
    fecha:       parseDate(i.fecha || i.fecha_infraccion || null),
    descripcion: i.descripcion || i.motivo || i.articulo || null,
    lugar:       i.lugar || i.calle || i.direccion || null,
    importe:     parseFloat((String(i.importe || i.monto || '0')).replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: nombre,
  }));
}

// ─── SIGEIN — Cañuelas, San Vicente, Roque Sáenz Peña, etc. ──────────────────
async function fetchSIGEINMunicipio(host: string, nombre: string, dominio: string) {
  const PAGE_URL = `https://${host}/home.aspx`;
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const $h       = cheerio.load(String(home.data));

  const viewState          = $h('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $h('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $h('input[name="__EVENTVALIDATION"]').val()    || '';

  const formData = new URLSearchParams({
    __EVENTTARGET:        '',
    __EVENTARGUMENT:      '',
    __VIEWSTATE:          String(viewState),
    __VIEWSTATEGENERATOR: String(viewStateGenerator),
    __EVENTVALIDATION:    String(eventValidation),
    tbPatente:            dominio,
    btnConsultaDominio:   'REALIZAR CONSULTA',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no posee infracciones|sin infracciones|no registra/i.test(bodyText)) return [];

  const infracciones: any[] = [];
  $('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: nombre,
    });
  });

  return infracciones;
}

// ─── Hurlingham ───────────────────────────────────────────────────────────────
async function fetchHurlingham(dominio: string) {
  const PAGE_URL = 'https://hurlingham.gobdigital.com.ar/web/antecedentes-patente';
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const $h       = cheerio.load(String(home.data));

  const viewState          = $h('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $h('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $h('input[name="__EVENTVALIDATION"]').val()    || '';

  const formData = new URLSearchParams({
    __EVENTTARGET:                 '',
    __EVENTARGUMENT:               '',
    __VIEWSTATE:                   String(viewState),
    __VIEWSTATEGENERATOR:          String(viewStateGenerator),
    __EVENTVALIDATION:             String(eventValidation),
    'ctl00$content$hfIdPersona':   '',
    'ctl00$content$txtPatente':    dominio,
    'ctl00$content$btnBuscar':     'Buscar',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no posee infracciones|sin infracciones|no registra|no se encontr/i.test(bodyText)) return [];

  const infracciones: any[] = [];
  $('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Hurlingham',
    });
  });

  return infracciones;
}

// ─── Lomas de Zamora ──────────────────────────────────────────────────────────
async function fetchLomasDeZamora(dominio: string) {
  const PAGE_URL = 'https://webextra.lomasdezamora.gov.ar/infracciones/ConsultaFaltasNuevoMP.aspx';
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const $h       = cheerio.load(String(home.data));

  const viewState          = $h('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $h('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $h('input[name="__EVENTVALIDATION"]').val()    || '';

  const formData = new URLSearchParams({
    __EVENTTARGET:        '',
    __EVENTARGUMENT:      '',
    __VIEWSTATE:          String(viewState),
    __VIEWSTATEGENERATOR: String(viewStateGenerator),
    __EVENTVALIDATION:    String(eventValidation),
    LD:                   '',
    txtDominio:           dominio,
    txtDocumento:         '',
    txtCuit:              '',
    cmdConfirmaTurno:     'Buscar',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map((c: any) => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar, withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
    validateStatus: () => true,
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no registra|no se encontr|sin infraccion|no tiene infracc/i.test(bodyText)) return [];

  const infracciones: any[] = [];
  $('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Lomas de Zamora',
    });
  });

  return infracciones;
}

// ─── Tres de Febrero ─────────────────────────────────────────────────────────
async function fetchTresDeFebbrero(dominio: string) {
  const PAGE_URL = 'https://mistramites.tresdefebrero.gob.ar/multas';
  const POST_URL = 'https://mistramites.tresdefebrero.gob.ar/multas/resultado';
  const SITE_KEY = '6Ld5D-wpAAAAAID0qXdhmQoC3Lwjz0y3d6O7t6ge';

  const captchaToken = await solveRecaptchaV2(SITE_KEY, PAGE_URL);

  const formData = new URLSearchParams({
    dominio,
    'g-recaptcha-response': captchaToken,
  });

  const res = await http.post(POST_URL, formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Origin:         'https://mistramites.tresdefebrero.gob.ar',
    },
    validateStatus: () => true,
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no registra|no se encontr|sin infraccion|no tiene/i.test(bodyText)) return [];

  const infracciones: any[] = [];
  $('table tbody tr, table tr').each((i: number, row: any) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_: number, td: any) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Tres de Febrero',
    });
  });

  return infracciones;
}

// ─── Avellaneda (SIAC) ────────────────────────────────────────────────────────
async function fetchAvellaneda(dominio: string) {
  const res = await http.post(
    'https://siac.mda.gob.ar/api/externo/consultar',
    { buscarPor: 'PATENTE', parametroBusqueda: dominio },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept:         'application/json',
        Origin:         'https://multas.mda.gob.ar',
        Referer:        'https://multas.mda.gob.ar/',
      },
      validateStatus: () => true,
    }
  );

  const data = res.data || {};
  if (data.error) throw new Error(`Avellaneda: ${data.msg || 'Error del servidor.'}`);
  if (/no se encontraron/i.test(data.msg || '')) return [];

  const list = data.multas || (data.data && data.data.multas) || [];
  if (!Array.isArray(list)) return [];

  return list.map((i: any) => ({
    acta:        i.nroActa || i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || i.fechaInfraccion || null),
    descripcion: i.descripcion || i.motivo || null,
    lugar:       i.lugar || i.calle || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Avellaneda',
  }));
}

// ─── reCAPTCHA v3 verification ────────────────────────────────────────────────
async function verifyCaptcha(token: string | null): Promise<boolean> {
  const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY') ?? '';
  if (!secretKey) return true;
  if (!token)     return true;
  try {
    const r = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({ secret: secretKey, response: token }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 5000 }
    );
    const d = r.data;
    if (d.success && d.score >= 0.5) return true;
    if ((d['error-codes'] || []).includes('timeout-or-duplicate')) return true;
    return false;
  } catch (_) {
    return true;
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  if (req.method !== 'GET') {
    return jsonResponse({ error: 'Método no permitido.' }, 405);
  }

  const url     = new URL(req.url);
  const dominio = url.searchParams.get('dominio') ?? '';
  const fuente  = url.searchParams.get('fuente')  ?? 'ansv';
  const rcToken = url.searchParams.get('rcToken');

  if (!dominio) return jsonResponse({ error: 'Falta el parámetro dominio.' }, 400);

  const clean = dominio.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{3}\d{3}$/.test(clean) && !/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(clean)) {
    return jsonResponse(
      { error: 'Dominio inválido. Usar formato antiguo (ABC123) o Mercosur (AB123CD).' },
      400
    );
  }

  const captchaOk = await verifyCaptcha(rcToken ?? null);
  if (!captchaOk) {
    return jsonResponse(
      { error: 'Verificación de seguridad fallida. Recargá la página e intentá de nuevo.' },
      403
    );
  }

  try {
    if (fuente === 'dnrpa') {
      const vehiculo = await fetchDNRPA(clean);
      return jsonResponse({ dominio: clean, fuente, vehiculo });
    }

    if (fuente === 'vtv') {
      const historial = await fetchVTV(clean);
      return jsonResponse({ dominio: clean, fuente, historial });
    }

    if (fuente === 'vtv-cordoba') {
      const historial = await fetchVTVCordoba(clean);
      return jsonResponse({ dominio: clean, fuente, historial });
    }

    if (fuente === 'vtv-santafe') {
      const historial = await fetchVTVSantaFe(clean);
      return jsonResponse({ dominio: clean, fuente, historial });
    }

    if (fuente === 'vtv-catamarca') {
      const historial = await fetchVTVCatamarca(clean);
      return jsonResponse({ dominio: clean, fuente, historial });
    }

    if (fuente === 'patentes-corrientes') {
      const acor = await fetchACORPatente(clean);
      return jsonResponse({ dominio: clean, fuente, acor });
    }

    if (fuente === 'arba') {
      const arba = await fetchARBA(clean);
      return jsonResponse({ dominio: clean, fuente, arba });
    }

    if (fuente === 'agip') {
      const agip = await fetchAGIP(clean);
      return jsonResponse({ dominio: clean, fuente, agip });
    }

    let infracciones: any[];
    switch (fuente) {
      case 'pba':             infracciones = await fetchPBA(clean);             break;
      case 'caba':            infracciones = await fetchCABA(clean);            break;
      case 'santafe':         infracciones = await fetchSantaFe(clean);         break;
      case 'posadas':         infracciones = await fetchPosadas(clean);         break;
      case 'corrientes':      infracciones = await fetchCorrientes(clean);      break;
      case 'entrerios':       infracciones = await fetchEntreRios(clean);       break;
      case 'misiones':        infracciones = await fetchMisiones(clean);        break;
      case 'chaco':           infracciones = await fetchChaco(clean);           break;
      case 'rosario':         infracciones = await fetchRosario(clean);         break;
      case 'neuquen':         infracciones = await fetchNeuquen(clean);         break;
      case 'santarosa':       infracciones = await fetchSantaRosa(clean);       break;
      case 'mendoza':         infracciones = await fetchMendoza(clean);         break;
      case 'mendozacaminera': infracciones = await fetchMendozaCaminera(clean); break;
      case 'salta':           infracciones = await fetchSalta(clean);           break;
      case 'cordoba':         infracciones = await fetchCordoba(clean);         break;
      case 'berisso':         infracciones = await fetchInfratrack('berisso', clean);                         break;
      case 'ezeiza':          infracciones = await fetchInfratrack('ezeiza', clean);                          break;
      case 'lanus':           infracciones = await fetchInfratrack('lanus', clean);                           break;
      case 'canuelas':        infracciones = await fetchSIGEINMunicipio('canuelas.sigein.net', 'Cañuelas', clean);          break;
      case 'sanvicente':      infracciones = await fetchSIGEINMunicipio('sv.sigein.net', 'San Vicente', clean);             break;
      case 'roquesaenzpena':  infracciones = await fetchSIGEINMunicipio('rsp.sigein.net', 'Roque Sáenz Peña', clean);      break;
      case 'villaangostura':  infracciones = await fetchSIGEINMunicipio('vla.sigein.net', 'Villa La Angostura', clean);    break;
      case 'riotercero':      infracciones = await fetchSIGEINMunicipio('riotercero.sigein.net', 'Río Tercero', clean);    break;
      case 'hurlingham':      infracciones = await fetchHurlingham(clean);      break;
      case 'lomasdezamora':   infracciones = await fetchLomasDeZamora(clean);   break;
      case 'tresdefebrero':   infracciones = await fetchTresDeFebbrero(clean);  break;
      case 'avellaneda':      infracciones = await fetchAvellaneda(clean);      break;
      case 'ansv':
      default:                infracciones = await fetchANSV(clean);            break;
    }
    return jsonResponse({ dominio: clean, fuente, infracciones });
  } catch (err: any) {
    if (err.message === 'MANUAL_REQUIRED') {
      const manualUrl = err.manualUrl || null;
      if (fuente === 'arba')        return jsonResponse({ dominio: clean, fuente, arba: { tieneDeuda: null, periodos: [], manualUrl } });
      if (fuente === 'vtv-santafe') return jsonResponse({ dominio: clean, fuente, historial: [], manualUrl });
      return jsonResponse({ dominio: clean, fuente, infracciones: [], manualUrl });
    }
    console.error(`[${fuente}] Error para ${clean}:`, err.message);
    return jsonResponse({ error: `Error al consultar ${fuente}: ${err.message}` }, 502);
  }
});
