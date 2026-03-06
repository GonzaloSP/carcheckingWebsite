/**
 * Vercel Serverless Function — Argentina Multas Proxy
 *
 * GET /api/multas?dominio=ABC123&fuente=ansv|pba|caba|santafe|...
 *
 * Response: { dominio, fuente, infracciones: [...] }
 *
 * Env vars required:
 *   TWOCAPTCHA_API_KEY  — 2captcha.com key (ansv, pba, caba; also rosario if no CAPSOLVER_API_KEY)
 *   CAPSOLVER_API_KEY   — capsolver.com key (optional; enables auto Rosario — better v3 scores)
 */

import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import * as cheerio from 'cheerio';
import Captcha from '2captcha';

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

// ─── Lazy captcha solver (2captcha) ───────────────────────────────────────────
function getSolver() {
  const key = process.env.TWOCAPTCHA_API_KEY;
  if (!key) throw new Error('TWOCAPTCHA_API_KEY no está configurada en las variables de entorno de Vercel.');
  return new Captcha.Solver(key);
}

// ─── Date helper: converts Unix timestamps (ms or s) to dd/mm/yyyy ────────────
function parseDate(val) {
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

// ─── Capsolver v3 solver (better scores than 2captcha for some sites) ─────────
// Uses CAPSOLVER_API_KEY env var. Falls back to 2captcha if not set.
async function solveRecaptchaV3(siteKey, pageUrl, action, minScore = 0.3) {
  const capsolverKey = process.env.CAPSOLVER_API_KEY;

  if (capsolverKey) {
    // Use Capsolver HTTP API (no npm package needed)
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
    // May already be ready in createTask response
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

  // Fallback: use 2captcha
  const solver = getSolver();
  const result = await solver.recaptcha(siteKey, pageUrl, { version: 'v3', action, score: minScore });
  return result.data;
}

// ─── Capsolver v2 solver (faster than 2captcha for reCAPTCHA v2) ──────────────
async function solveRecaptchaV2(siteKey, pageUrl, isInvisible = false) {
  const capsolverKey = process.env.CAPSOLVER_API_KEY;

  if (capsolverKey) {
    const createRes = await axios.post(
      'https://api.capsolver.com/createTask',
      {
        clientKey: capsolverKey,
        task: { type: 'ReCaptchaV2TaskProxyLess', websiteURL: pageUrl, websiteKey: siteKey, isInvisible },
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
    );
    if (createRes.data.errorId !== 0) throw new Error(`Capsolver v2 error: ${createRes.data.errorDescription}`);

    // May already be ready in createTask response
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

  // Fallback: 2captcha
  const solver = getSolver();
  const result = await solver.recaptcha(siteKey, pageUrl);
  return result.data;
}

// ─── ANSV / SINAI (Nacional) ──────────────────────────────────────────────────
async function fetchANSV(dominio) {
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
  if (!siteKeyMatch) throw new Error('No se encontró el site key de reCAPTCHA en ANSV/SINAI.');
  const siteKey = siteKeyMatch[1];

  const solver = getSolver();
  const captchaResult = await solver.recaptcha(siteKey, PAGE_URL);
  const captchaToken  = captchaResult.data;

  const formData = new URLSearchParams({
    'ctl00$ScriptManager':
      'ctl00$ContentPlaceHolder1$updtFormulario|ctl00$ContentPlaceHolder1$btnBuscar',
    __EVENTTARGET:   '',
    __EVENTARGUMENT: '',
    __ASYNCPOST:     'true',
    __VIEWSTATE:                                  viewState,
    __VIEWSTATEGENERATOR:                         viewStateGenerator,
    __EVENTVALIDATION:                            eventValidation,
    'ctl00$ContentPlaceHolder1$hiddenSeleccion':  'dominio',
    'ctl00$ContentPlaceHolder1$hiddenBusqueda':   'dominio',
    'ctl00$ContentPlaceHolder1$hiddenFirstLoad':  'false',
    'ctl00$ContentPlaceHolder1$version':          '2.3',
    'ctl00$ContentPlaceHolder1$txDominio':        dominio,
    'ctl00$ContentPlaceHolder1$btnBuscar':        'Consultar infracciones',
    'g-recaptcha-response':                       captchaToken,
  });

  const cookies = jar.getCookiesSync(BASE).map(c => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar,
    withCredentials: true,
    headers: {
      'Content-Type':     'application/x-www-form-urlencoded',
      Referer:            PAGE_URL,
      Cookie:             cookies,
      'X-MicrosoftAjax':  'Delta=true',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  const $r = cheerio.load(String(res.data));
  const infracciones = [];

  $r('table.table-infracciones tbody tr, table tbody tr').each((_, row) => {
    const cols = $r(row).find('td').map((_, td) => $r(td).text().trim()).get();
    if (cols.length < 3) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.]/g, '')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: cols[6] || 'Nacional',
    });
  });

  return infracciones;
}

// ─── Provincia de Buenos Aires ────────────────────────────────────────────────
async function fetchPBA(dominio) {
  const BASE     = 'https://infraccionesba.gba.gob.ar';
  const PAGE_URL = `${BASE}/consulta-infraccion`;
  const SITE_KEY = '6LeGXnkUAAAAAGHv-jMgqrOMx4eqHCh3_fEeP9wR';

  const jar  = new CookieJar();
  const home = await http.get(PAGE_URL, { jar, withCredentials: true });
  const html = String(home.data);

  const csrfMatch = html.match(/id="root"[^>]*token="([^"]+)"/);
  if (!csrfMatch) throw new Error('No se encontró el CSRF token en el portal PBA.');
  const csrfToken = csrfMatch[1];

  const solver = getSolver();
  const captchaResult = await solver.recaptcha(SITE_KEY, PAGE_URL);
  const captchaToken  = captchaResult.data;

  const cookies = jar.getCookiesSync(BASE).map(c => `${c.key}=${c.value}`).join('; ');
  const res = await http.get(`${BASE}/rest/consultar-infraccion`, {
    params: { dominio, reCaptcha: captchaToken, cantPorPagina: 10, paginaActual: 1 },
    headers: {
      Cookie:         cookies,
      Referer:        PAGE_URL,
      Accept:         'application/json',
      'X-CSRF-TOKEN': csrfToken,
    },
  });

  const data = res.data;
  if (data.error) throw new Error('El portal PBA devolvió un error (posiblemente captcha inválido).');
  const list = data.infracciones || [];

  return list.map(i => {
    // Description comes from the nested infracciones array
    const infDesc = (i.infracciones || [])
      .map(inf => [inf.articulo ? `Art. ${inf.articulo}` : null, inf.descripcion].filter(Boolean).join(' — '))
      .join('; ');

    // Estado: use the public status label; treat "CON DEUDA" / anything non-pago as pendiente
    const estadoRaw = (i.estadoCausaPublico?.descripcion || i.estado || 'pendiente').toLowerCase();
    const estado = estadoRaw.includes('pag') ? 'pagada' : 'pendiente';

    return {
      acta:        i.nroActa   || i.nroCausa    || null,
      fecha:       parseDate(i.fechaEmision || i.fechaInfraccion  || null),
      vencimiento: parseDate(i.fechaVencimiento || null),
      descripcion: infDesc || i.descripcionFalta || i.descripcion || null,
      lugar:       i.autoridadAplicacion || i.lugar || null,
      importe:     parseFloat(i.importeTotal || i.importe || i.importeDeuda || 0) || null,
      estado,
      jurisdiccion: i.autoridadAplicacion || i.juzgado || 'Provincia de Buenos Aires',
      tipo:        i.tipoFalta || i.gravedad || null,
      normativa:   (i.infracciones || [])[0]?.articulo ? `Art. ${(i.infracciones || [])[0].articulo}` : null,
      municipio:   i.municipio || i.partido || null,
    };
  });
}

// ─── CABA ─────────────────────────────────────────────────────────────────────
// Results are in input[name="actas[]"][data-json] checkboxes.
// data-json: {numeroActa, fechaActa, tipoActa, montoActa, estadoReducidoActa, infracciones[{desc, lugar}]}
async function fetchCABA(dominio) {
  const PAGE_URL = 'https://buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones/?actas=transito';
  const ENDPOINT = 'https://buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones/index.php';
  const SITE_KEY = '6LfcRGAlAAAAAJI0S2ABpxX_Wj56oioSE6y393OG';
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

  const jar  = new CookieJar();
  const home = await http.get(PAGE_URL, {
    jar,
    withCredentials: true,
    headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Accept-Language': 'es-AR,es;q=0.9' },
  });
  const cookies = (home.headers['set-cookie'] || []).map(c => c.split(';')[0]).join('; ');

  const captchaToken = await solveRecaptchaV2(SITE_KEY, PAGE_URL);

  const formData = new URLSearchParams({
    tipo_consulta:          'Dominio',
    filtro_acta:            'transito',
    dominio,
    'g-recaptcha-response': captchaToken,
  });

  const res = await http.post(ENDPOINT, formData.toString(), {
    headers: {
      'Content-Type':    'application/x-www-form-urlencoded',
      'User-Agent':      UA,
      Referer:           PAGE_URL,
      Origin:            'https://buenosaires.gob.ar',
      Accept:            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'es-AR,es;q=0.9',
      Cookie:            cookies,
    },
  });

  if (!res.data || String(res.data).trim() === '') {
    throw new Error('CABA devolvió una respuesta vacía.');
  }

  const $ = cheerio.load(res.data);

  // No infracciones
  if ($('.libreDeuda-view').length > 0 || $('input[name="actas[]"]').length === 0) {
    return [];
  }

  const infracciones = [];
  $('input[name="actas[]"]').each((_, el) => {
    const raw = $(el).attr('data-json');
    if (!raw) return;
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    const primera = (data.infracciones || [])[0] || {};
    infracciones.push({
      acta:         data.numeroActa  || null,
      fecha:        data.fechaActa   || null,
      descripcion:  primera.desc     || data.tipoActa || null,
      lugar:        primera.lugar    || null,
      importe:      parseFloat(String(data.montoActa || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:       (data.estadoReducidoActa || 'pendiente').toLowerCase(),
      jurisdiccion: 'CABA',
    });
  });

  return infracciones;
}

// ─── Santa Fe ─────────────────────────────────────────────────────────────────
async function fetchSantaFe(dominio) {
  const url    = 'https://www.santafe.gov.ar/juzgadovirtual/consultaInfraccion.do';
  const params = new URLSearchParams({ method: 'BusquedaVehiculo', dominio });
  const res    = await http.get(`${url}?${params}`);
  const $      = cheerio.load(res.data);
  const infracciones = [];

  $('table.grilla tbody tr, table.listado tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.]/g, '')) || null,
      estado:      'pendiente',
      jurisdiccion: 'Santa Fe',
    });
  });

  return infracciones;
}

// ─── Municipio de Posadas (Misiones) ──────────────────────────────────────────
async function fetchPosadas(dominio) {
  const URL      = 'https://sistema.posadas.gov.ar/mp_sistemas/autogestion/verificarmultadominio';
  const formData = new URLSearchParams({ tf_dominio: dominio });
  const res      = await http.post(URL, formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        'https://sistema.posadas.gov.ar/mp_sistemas/autogestion/multasdominio',
    },
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no registra/i.test(bodyText)) return [];

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.]/g, '')) || null,
      estado:      bodyText.toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Municipio de Posadas',
    });
  });

  return infracciones;
}

// ─── Corrientes (SIGEIN) ──────────────────────────────────────────────────────
async function fetchCorrientes(dominio) {
  const PAGE_URL = 'https://corrientes.sigein.net/';
  const jar      = new CookieJar();
  const home     = await http.get(PAGE_URL, { jar, withCredentials: true });
  const $h       = cheerio.load(String(home.data));

  const viewState          = $h('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $h('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $h('input[name="__EVENTVALIDATION"]').val()    || '';

  const formData = new URLSearchParams({
    __EVENTTARGET:        '',
    __EVENTARGUMENT:      '',
    __VIEWSTATE:          viewState,
    __VIEWSTATEGENERATOR: viewStateGenerator,
    __EVENTVALIDATION:    eventValidation,
    tbPatente:            dominio,
    btnConsultaDominio:   'REALIZAR CONSULTA',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map(c => `${c.key}=${c.value}`).join('; ');
  const res = await http.post(PAGE_URL, formData.toString(), {
    jar,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        PAGE_URL,
      Cookie:         cookies,
    },
  });

  const $        = cheerio.load(String(res.data));
  const bodyText = $('body').text();
  if (/no posee infracciones|sin infracciones|no registra/i.test(bodyText)) return [];

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:     parseFloat((cols[4] || '').replace(/[^0-9.]/g, '')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Corrientes',
    });
  });

  return infracciones;
}

// ─── Entre Ríos ───────────────────────────────────────────────────────────────
async function fetchEntreRios(dominio) {
  const BASE    = 'https://api.monitoreovialentrerios.ar';
  const BEARER  = '3cWREV3JLU3E3ZEpwMlE9PSIsInZhbHVlIjoiS2';
  const headers = { Authorization: BEARER, Accept: 'application/json' };

  const valid = await http.post(`${BASE}/api/v1/dominio`, { dominio }, { headers });
  if (valid.data && valid.data.error) throw new Error('Entre Ríos: dominio no encontrado.');

  const params = new URLSearchParams({ consulta: 'dominio', id: dominio, pagina: '1', page: '1' });
  const res = await http.post(`${BASE}/api/entre_rios/infracciones_v1`, params.toString(), {
    headers: { ...headers, 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const list = res.data.infracciones || res.data.data || res.data.items || res.data || [];
  if (!Array.isArray(list)) return [];

  return list.map(i => ({
    acta:        i.nroActa || i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || i.fechaInfraccion || null),
    descripcion: i.descripcion || i.motivo || i.articulo || null,
    lugar:       i.lugar || i.direccion || null,
    importe:     parseFloat(i.importe || i.monto || i.deuda || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: i.jurisdiccion || 'Entre Ríos',
  }));
}

// ─── Misiones Provincia ───────────────────────────────────────────────────────
async function fetchMisiones(dominio) {
  const BASE    = 'https://api.monitoreovialmisiones.info/api';
  const BEARER  = '5a49/AaqwnY-BFHJu-fNoYhW2q39is8=EOOgeP-soK2!M-73MADLwLQUPBdKHrZ!rynfOGF/ji5ykmbBoreT-yO!/nA7vymR/PdJTaGh4VVCc412q?eH1EAYA45VduBNbGYib8bC1qmJvEG?/d8ryiNUggzUEki86GQuM5=095r3etYmie4Yp59j4pVm2?5YULIuF5P!YUqPb0pe8LNLz7JkEBN9TMpG9kQ7HRZbrrycP9QjEzgbAM!v2drsy6vXRtBIhj?llXmqFHeXvWCYUxB4p6-JH!j-143tUq?wMZIr6k7WUzA0JjuTt/JBl0OunudtlKeidKkcGx!spUlCRWitnQDfPEaFti/xLavb97XWXmtwaOF2vnv69DncJfu1EOjrEX-?ZTBL?zi6v/4H7-EqsZ?TIpgj40ZiZ-ria9LIhDnbdbxP?xzngzgxmOsaHBd9Jru=Uc1evzaKz8Q2!C60Q-uuvv0JXFvd?VJ=eCFZDHm24H';
  const headers = { Authorization: `Bearer ${BEARER}`, Accept: 'application/json' };

  const valid = await http.post(`${BASE}/dominio`, { dominio }, { headers });
  if (valid.data && valid.data.error) throw new Error('Misiones: dominio no encontrado.');

  const params = new URLSearchParams({ consulta: 'dominio', id: dominio, pagina: '1', page: '1' });
  const res = await http.post(`${BASE}/infracciones`, params.toString(), {
    headers: { ...headers, 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const data = res.data;
  const list =
    (data && data.datos && data.datos.infracciones) ||
    data.infracciones || data.data || data.items || [];
  if (!Array.isArray(list)) return [];

  return list.map(i => ({
    acta:        i.nroActa || i.acta || i.numero || null,
    fecha:       parseDate(i.fecha || i.fechaInfraccion || null),
    descripcion: i.descripcion || i.motivo || i.articulo || null,
    lugar:       i.lugar || i.direccion || null,
    importe:     parseFloat(i.importe || i.monto || i.deuda || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: i.jurisdiccion || 'Misiones',
  }));
}

// ─── Chaco (Policía Caminera) ─────────────────────────────────────────────────
async function fetchChaco(dominio) {
  const res  = await http.get('https://policiacaminera.chaco.gov.ar/api/v1/traffic_fines/', {
    params:  { dominio },
    headers: { Accept: 'application/json' },
  });

  const { fotomultas = [], caminera = [] } = res.data || {};
  const infracciones = [];

  fotomultas.forEach(i => infracciones.push({
    acta:        i.nroActa || i.id || null,
    fecha:       parseDate(i.fechaInfraccion || i.fechaGeneracion || null),
    descripcion: i.descripcionLey || i.articulo || i.tipo || null,
    lugar:       i.lugar || i.juzgado || null,
    importe:     parseFloat(i.importe || i.importe_1vto || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Chaco (Fotomulta)',
  }));

  caminera.forEach(i => infracciones.push({
    acta:        i.nroActa || null,
    fecha:       parseDate(i.fecha_1vto || null),
    descripcion: i.tipo || null,
    lugar:       null,
    importe:     parseFloat(i.importe_1vto || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Chaco (Caminera)',
  }));

  return infracciones;
}

// ─── Rosario ──────────────────────────────────────────────────────────────────
// Rosario uses reCAPTCHA v3 and requires a high score. 2captcha tokens are
// consistently rejected. Capsolver (CAPSOLVER_API_KEY) gets better scores.
// Without capsolver, we return a manualUrl signal instead of failing.
async function fetchRosario(dominio) {
  const BASE     = 'https://www.rosario.gob.ar';
  const FORM_URL = `${BASE}/gdm/patente.do`;
  const SITE_KEY = '6LcUUMUUAAAAAHd5V8Y7RYJ4L91xP9uhD8uAspSL';

  if (!process.env.CAPSOLVER_API_KEY) {
    const err = new Error('MANUAL_REQUIRED');
    err.manualUrl = `${FORM_URL}?accion=ir`;
    throw err;
  }

  const jar  = new CookieJar();
  const home = await http.get(`${FORM_URL}?accion=ir`, { jar, withCredentials: true });

  let jsessionid = null;
  for (const c of [].concat(home.headers['set-cookie'] || [])) {
    const m = c.match(/JSESSIONID=([^;]+)/i);
    if (m) { jsessionid = m[1]; break; }
  }
  if (!jsessionid) throw new Error('No se pudo obtener la sesión del portal de Rosario.');

  const captchaToken = await solveRecaptchaV3(SITE_KEY, `${FORM_URL}?accion=ir`, 'homepagePatente', 0.7);

  const formData = new URLSearchParams({
    accion:                 'consultar',
    patente:                dominio,
    'g-recaptcha-response': captchaToken,
  });

  const res = await http.post(
    `${FORM_URL};jsessionid=${jsessionid}`,
    formData.toString(),
    {
      jar,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer:        `${FORM_URL}?accion=ir`,
        Cookie:         `JSESSIONID=${jsessionid}`,
      },
    }
  );

  const $ = cheerio.load(String(res.data));
  if ($('.govuk-error-summary').length) {
    throw new Error(`Rosario: ${$('.govuk-error-summary').text().trim()}`);
  }

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:
        parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:      (cols[5] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Rosario',
    });
  });

  const bodyText = $('body').text();
  if (/no registra|sin infracciones|no pose/i.test(bodyText) && infracciones.length === 0) return [];

  return infracciones;
}

// ─── Neuquén Capital ──────────────────────────────────────────────────────────
async function fetchNeuquen(dominio) {
  const BASE = 'https://webservice.muninqn.gov.ar/foto-multa/api';
  const res  = await http.post(
    `${BASE}/infraccion_patente_p`,
    { datos_sobre: 'dominio', valor: dominio },
    {
      headers:        { 'Content-Type': 'application/json', Accept: 'application/json' },
      validateStatus: () => true,
    }
  );

  const { data, error } = res.data || {};
  if (res.status === 503) throw new Error('El portal de Neuquén está en mantenimiento.');
  if (res.status === 404 || error === 'No se encontraron infracciones') return [];
  if (res.status === 422) throw new Error('Formato de dominio incorrecto para Neuquén.');
  if (!data || !Array.isArray(data)) {
    throw new Error(
      typeof error === 'string' ? error : `Portal Neuquén no disponible (HTTP ${res.status}).`
    );
  }

  return data.map(i => ({
    acta:        i.nro_acta || i.acta || i.id || null,
    fecha:       parseDate(i.fecha || i.fecha_infraccion || null),
    descripcion: i.descripcion || i.motivo || i.tipo || null,
    lugar:       i.lugar || i.direccion || null,
    importe:     parseFloat(i.importe || i.monto || 0) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: 'Neuquén Capital',
  }));
}

// ─── Santa Rosa (La Pampa) ────────────────────────────────────────────────────
async function fetchSantaRosa(dominio) {
  const BASE = 'https://fotomultas.santarosa.gob.ar/';
  const jar  = new CookieJar();
  const home = await http.get(BASE, { jar, withCredentials: true });
  const $h   = cheerio.load(home.data);
  const csrf = $h('input[name="csrf_token"]').val();
  if (!csrf) throw new Error('No se encontró el CSRF token en el portal de Santa Rosa.');

  const form    = new URLSearchParams({ csrf_token: csrf, busqueda_tipo: 'Dominio', dominio });
  const cookies = jar
    .getCookiesSync('https://fotomultas.santarosa.gob.ar')
    .map(c => `${c.key}=${c.value}`)
    .join('; ');

  const res = await http.post(BASE, form.toString(), {
    jar,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer:        BASE,
      Cookie:         cookies,
    },
  });

  const $ = cheerio.load(String(res.data));
  if ($('body').text().includes('No se encontraron infracciones')) return [];

  const errText = $('article.red li, .red li').first().text().trim();
  if (errText) throw new Error(`Santa Rosa: ${errText}`);

  const infracciones = [];
  $('table tbody tr').each((_, row) => {
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
    if (cols.length < 2) return;
    infracciones.push({
      acta:        cols[0] || null,
      fecha:       cols[1] || null,
      descripcion: cols[2] || null,
      lugar:       cols[3] || null,
      importe:
        parseFloat((cols[4] || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
      estado:
        (cols[5] || cols[3] || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: 'Santa Rosa (La Pampa)',
    });
  });

  return infracciones;
}

// ─── Ciudad de Mendoza ────────────────────────────────────────────────────────
async function fetchMendoza(dominio) {
  const BASE = 'https://apex.ciudaddemendoza.gov.ar/apex/produccion/';
  const jar  = new CookieJar();
  const home = await http.get(`${BASE}f?p=204:4000`, { jar, withCredentials: true });
  const $h   = cheerio.load(home.data);
  const session = $h('[name="p_instance"]').val();
  if (!session) throw new Error('No se pudo iniciar sesión en el portal de Mendoza.');

  const isMerc = /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(dominio);
  let itemNames, itemValues;
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
  const getVal  = n => $s(`[name="${n}"],[id="${n}"]`).first().val() || '';
  const cookieStr = jar
    .getCookiesSync('https://apex.ciudaddemendoza.gov.ar')
    .map(c => `${c.key}=${c.value}`)
    .join('; ');

  const plateFields = isMerc
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
    p_instance:           getVal('p_instance'),
    p_page_submission_id: getVal('p_page_submission_id'),
    p_request:            'SUBMIT_MZA',
    p_reload_on_submit:   'A',
    pSalt:                getVal('pSalt'),
    pPageItemsProtected:  getVal('pPageItemsProtected'),
    pPageItemsRowVersion: '',
    P4000_GO_TO:          '',
    P4000_GO_BACK:        '',
    P4000_MZA_DOC_TIPO:   'DNI',
    P4000_MZA_DOC:        '',
    ...plateFields,
  });

  const res = await http.post(`${BASE}wwv_flow.accept`, form.toString(), {
    jar,
    withCredentials: true,
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
      } catch (_) {}
    }
    throw new Error(msg);
  }

  const infracciones = [];
  $('#report_3278544220698293_catch table tbody tr, .t-Report-report tbody tr').each(
    (_, row) => {
      const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
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
async function fetchMendozaCaminera(dominio) {
  const crypto   = require('crypto');
  const BASE_URL =
    'https://sistemas.seguridad.mendoza.gov.ar/webvialcaminera/servlet/com.pagosdeuda.wpdeudaonline';

  function gxEncrypt(plaintext, hexKey) {
    const key    = Buffer.from(hexKey, 'hex');
    const bytes  = Buffer.from(plaintext, 'ascii');
    const padded = Buffer.alloc(Math.ceil(bytes.length / 16) * 16, 0);
    bytes.copy(padded);
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    cipher.setAutoPadding(false);
    return Buffer.concat([cipher.update(padded), cipher.final()]).toString('hex');
  }

  function extractGXState(html) {
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
    .map(c => `${c.key}=${c.value}`)
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
      m => typeof m.text === 'string' && /no existe ninguna deuda|no se encontr/i.test(m.text)
    )
  )
    return [];

  const infracciones = [];
  for (const ctx of result.gxValues || []) {
    if (ctx.CmpContext !== 'W0077') continue;
    const titular = ctx.AV9Titular || '';
    const sdtList = ctx.W0077Sdtdetalledeuda || ctx['W0077vSDTDETALLEDEUDA'] || [];

    if (sdtList.length > 0) {
      sdtList.forEach(item =>
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
      let objetos = [];
      try { objetos = JSON.parse(ctx.AV14objetos || '[]'); } catch (_) {}
      objetos.forEach(item =>
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
    let objetos = [];
    try { objetos = JSON.parse(result.gxHiddens.W0077vOBJETOS || '[]'); } catch (_) {}
    objetos.forEach(item =>
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
async function fetchSalta(dominio) {
  const res = await http.post(
    'https://rentas.dgrmsalta.gov.ar/api/automotores/multas',
    { dominio, recaptcha: '' },
    {
      headers:        { 'Content-Type': 'application/json', Accept: 'application/json' },
      validateStatus: s => s === 200 || s === 404 || s === 400,
    }
  );

  if (res.status === 404 || /no pos[eé]{1,2} multas/i.test(res.data?.message || '')) return [];
  if (res.status === 400) throw new Error(`Salta: ${res.data?.message || 'Dominio inválido.'}`);

  const list = res.data?.multas || [];
  if (!Array.isArray(list)) return [];

  return list.map(i => ({
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
async function fetchCordoba(dominio) {
  const url = `https://app.rentascordoba.gob.ar/WSRestDeudaAnt/public/all/caminera/dominio/${dominio}`;
  const res = await http.get(url, {
    headers:        { Accept: 'application/json' },
    validateStatus: () => true,   // don't throw on 4xx/5xx — we inspect the body
  });

  const body = res.data;

  // If the response is a string (HTML), Córdoba redirected to the maintenance page.
  if (!body || typeof body !== 'object') {
    const finalUrl = res.request?.res?.responseUrl || res.request?.responseURL || '';
    const bodyStr  = typeof body === 'string' ? body : '';
    if (finalUrl.includes('mantenimiento') || bodyStr.includes('mantenimiento')) {
      throw new Error('El portal de Córdoba está en mantenimiento. Intentá más tarde.');
    }
    throw new Error('El portal de Córdoba no está disponible en este momento.');
  }

  if (body.status?.success !== 'TRUE') {
    // Pull human-readable message from the messages array (field name changed)
    const msgs = body.status?.messages || [];
    const firstMsg = (msgs[0]?.description || body.status?.message || '').trim();
    // "no se encontró" / "no registra" → valid empty result
    if (/no se encontr|sin datos|no registra/i.test(firstMsg)) return [];
    // Error de sistema (502/500 upstream) → surface a clean message
    const friendly = firstMsg
      ? firstMsg.replace(/\s*-\s*Mensaje:.*$/, '').trim()   // strip raw HTTP detail
      : 'El portal de Córdoba no está disponible en este momento.';
    throw new Error(friendly);
  }
  if (!body.data) return [];

  const infracciones = [];
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

// ─── DNRPA — Identificación de vehículo (Justicia.gov.ar) ────────────────────
async function fetchDNRPA(dominio) {
  const BASE     = 'https://www2.jus.gov.ar/dnrpa-site';
  const PAGE_URL = `${BASE}/`;
  const SITE_KEY = '6Ld5ZjUUAAAAAJ7zlNNbYOQ9REJyT9LeFH13N-We';

  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  const solver = getSolver();
  const result = await solver.recaptcha(SITE_KEY, PAGE_URL);
  const token  = result.data;

  const cookies = jar.getCookiesSync(BASE).map(c => `${c.key}=${c.value}`).join('; ');
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
async function solveTurnstile(pageUrl, siteKey) {
  const create = await axios.post('https://api.2captcha.com/createTask', {
    clientKey: process.env.TWOCAPTCHA_API_KEY,
    task: { type: 'TurnstileTaskProxyless', websiteURL: pageUrl, websiteKey: siteKey },
  });
  if (create.data.errorId !== 0) throw new Error('Turnstile: ' + create.data.errorDescription);
  const taskId = create.data.taskId;
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const poll = await axios.post('https://api.2captcha.com/getTaskResult', {
      clientKey: process.env.TWOCAPTCHA_API_KEY, taskId,
    });
    if (poll.data.errorId !== 0) throw new Error(poll.data.errorDescription);
    if (poll.data.status === 'ready') return poll.data.solution.token;
  }
  throw new Error('Turnstile timeout.');
}

// ─── VTV — Verificación Técnica Vehicular (PBA) ───────────────────────────────
async function fetchVTV(dominio) {
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
  return data.payload.map(entry => {
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
      defectos: (v.defectos || []).map(d => d.detalle_defecto || d.codigo_defecto).filter(Boolean),
      marca:    veh.marca            || null,
      modelo:   veh.modelo           || null,
      anio:     veh.anio_fabricacion || null,
    };
  });
}

// ─── ITV Córdoba Capital (itvcordoba.com.ar) ─────────────────────────────────
// Uses a simple arithmetic math captcha — no external captcha service needed.
async function fetchVTVCordoba(dominio) {
  const PAGE_URL = 'https://itvcordoba.com.ar/Historico.aspx';
  const jar = new CookieJar();

  // 1. Load page → get ViewState + math captcha
  const home = await http.get(PAGE_URL, { jar, withCredentials: true });
  const html = String(home.data);
  const $    = cheerio.load(html);

  const viewState          = $('input[name="__VIEWSTATE"]').val()          || '';
  const viewStateGenerator = $('input[name="__VIEWSTATEGENERATOR"]').val() || '';
  const eventValidation    = $('input[name="__EVENTVALIDATION"]').val()    || '';

  // 2. Parse and solve math captcha (e.g. "7 - 3")
  const num1 = parseInt($('#MainContent_lblNum1').text().trim()) || 0;
  const num2 = parseInt($('#MainContent_lblNum2').text().trim()) || 0;
  const op   = $('#MainContent_lblOperador').text().trim();
  const answer = op.includes('+') ? num1 + num2
               : op.includes('×') || op.includes('*') ? num1 * num2
               : num1 - num2;  // subtraction is the only observed operator

  // 3. POST
  const cookies = jar.getCookiesSync('https://itvcordoba.com.ar').map(c => `${c.key}=${c.value}`).join('; ');
  const form = new URLSearchParams({
    '__EVENTTARGET':                         '',
    '__EVENTARGUMENT':                       '',
    '__VIEWSTATE':                           viewState,
    '__VIEWSTATEGENERATOR':                  viewStateGenerator,
    '__EVENTVALIDATION':                     eventValidation,
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

  // 4. Parse response
  const $r = cheerio.load(String(res.data));

  // Not found
  if ($r('#MainContent_PageMessage').length) return [];

  // Result table: columns = Fecha | Vencimiento | Estado
  const today = new Date();
  const historial = [];
  $r('#MainContent_GridResultados tr').each((i, row) => {
    if (i === 0) return; // skip header
    const cols = $r(row).find('td').map((_, td) => $r(td).text().trim()).get();
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

// ─── RTO Santa Fe (rtosf.3dlink.com.ar) ──────────────────────────────────────
// Uses a BMP image captcha — needs capsolver/2captcha; falls back to manual link.
async function fetchVTVSantaFe(dominio) {
  const BASE     = 'https://rtosf.3dlink.com.ar';
  const PAGE_URL = `${BASE}/ver_estado.asp`;

  // 1. GET main page → session cookie
  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  // 2. GET captcha image (BMP, 130×25px)
  const captchaRes = await http.get(`${BASE}/captcha.asp`, {
    jar, withCredentials: true, responseType: 'arraybuffer',
    headers: { Referer: PAGE_URL },
  });
  const base64Image = Buffer.from(captchaRes.data).toString('base64');

  // 3. Solve captcha (capsolver ImageToText first, then 2captcha)
  let captchaCode;
  const capsolverKey = process.env.CAPSOLVER_API_KEY;
  if (capsolverKey) {
    try {
      const cr = await axios.post('https://api.capsolver.com/createTask',
        { clientKey: capsolverKey, task: { type: 'ImageToTextTask', body: base64Image } },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });
      if (cr.data.errorId === 0) {
        // Capsolver may resolve immediately in createTask response
        captchaCode = cr.data.solution?.text;
        if (!captchaCode) {
          for (let i = 0; i < 12; i++) {
            await new Promise(r => setTimeout(r, 3000));
            const pr = await axios.post('https://api.capsolver.com/getTaskResult',
              { clientKey: capsolverKey, taskId: cr.data.taskId },
              { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });
            if (pr.data.errorId !== 0) break;
            if (pr.data.status === 'ready') { captchaCode = pr.data.solution?.text; break; }
          }
        }
      }
    } catch (_) {}
  }
  if (!captchaCode) {
    try { const r = await getSolver().normal(base64Image); captchaCode = r.data; } catch (_) {}
  }
  if (!captchaCode) {
    const err = new Error('MANUAL_REQUIRED');
    err.manualUrl = PAGE_URL;
    throw err;
  }

  // 4. POST to ver_estado2.asp — must send Content-Length (HTTP/1.1)
  const cookies = jar.getCookiesSync(BASE).map(c => `${c.key}=${c.value}`).join('; ');
  const bodyStr = `dominio=${encodeURIComponent(dominio)}&captchacode=${encodeURIComponent(captchaCode)}&Submit=Verificar`;

  const res = await axios.post(`${BASE}/ver_estado2.asp`, bodyStr, {
    maxRedirects: 5,
    headers: {
      'Content-Type':   'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(bodyStr),
      Cookie:           cookies,
      Referer:          PAGE_URL,
    },
    validateStatus: () => true,
  });

  // Wrong captcha → redirect to ver_estado.asp?code=0123x
  const finalUrl = res.request?.res?.responseUrl || res.request?.responseURL || '';
  if (/[?&]code=0123/.test(finalUrl)) {
    const err = new Error('MANUAL_REQUIRED');
    err.manualUrl = PAGE_URL;
    throw err;
  }

  const html = String(res.data);
  if (/sin datos|no se encontr|no registra|no hay|inexistente|no existe inform/i.test(html)) return [];

  // Parse result table
  const $   = cheerio.load(html);
  const today = new Date();
  const historial = [];
  const dateRe = /\d{1,2}\/\d{1,2}\/\d{2,4}/;

  $('table tr').each((_, row) => {
    const cols = $(row).find('td').map((__, td) => $(td).text().trim()).get();
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
// Simple POST — only a CSS honeypot, no real captcha.
async function fetchACORPatente(dominio) {
  const BASE     = 'https://acor.gob.ar';
  const PAGE_URL = `${BASE}/libre_deuda_rod.asp`;
  const POST_URL = `${BASE}/consulta_deuda.asp`;

  // 1. GET page to pick up session cookie
  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  // 2. POST debt query (leave honeypot field empty)
  const cookies = jar.getCookiesSync(BASE).map(c => `${c.key}=${c.value}`).join('; ');
  const body = new URLSearchParams({
    cod_imp: '02',           // 02 = Automotor
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

  // Result is inside a Bootstrap alert nested in .alert-secondary
  const inner = $('.col-md-12.alert.alert-secondary h5');
  const cls   = (inner.attr('class') || '').toLowerCase();
  const text  = inner.text().trim();

  // Also search more broadly
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
async function fetchARBA(dominio) {
  const BASE     = 'https://app.arba.gov.ar/AvisoDeudas';
  const PAGE_URL = `${BASE}/?imp=1`;
  const UA       = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
  const capsolverKey = process.env.CAPSOLVER_API_KEY;

  // Helper: solve an image captcha (base64) — Capsolver first, then 2captcha
  async function solveCaptchaImage(base64Image) {
    if (capsolverKey) {
      try {
        const createRes = await axios.post('https://api.capsolver.com/createTask', {
          clientKey: capsolverKey,
          task: { type: 'ImageToTextTask', body: base64Image },
        }, { headers: { 'Content-Type': 'application/json' }, timeout: 10000 });

        if (createRes.data.errorId === 0) {
          let text = createRes.data.solution?.text;
          if (!text) {
            const taskId = createRes.data.taskId;
            for (let i = 0; i < 8; i++) {
              await new Promise(r => setTimeout(r, 2000));
              const pollRes = await axios.post('https://api.capsolver.com/getTaskResult',
                { clientKey: capsolverKey, taskId },
                { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
              );
              if (pollRes.data.errorId !== 0) break;
              if (pollRes.data.status === 'ready') { text = pollRes.data.solution?.text; break; }
            }
          }
          if (text) return text;
        }
      } catch (_) { /* fall through */ }
    }
    // 2captcha fallback
    try {
      const result = await getSolver().normal(base64Image);
      return result.data;
    } catch (_) { return null; }
  }

  // 0. Establish session cookie once
  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true, headers: { 'User-Agent': UA } });

  // Retry loop: get fresh token+image+solve on each attempt (in case captcha answer is wrong)
  const MAX_ATTEMPTS = 2;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // 1. Get captcha token
    const tokenRes = await http.get(`${BASE}/captcha/token`, {
      jar, withCredentials: true,
      headers: { Referer: PAGE_URL, Accept: 'text/plain, */*', 'User-Agent': UA },
    });
    const captchaToken = String(tokenRes.data).trim();
    if (!captchaToken) throw new Error('No se pudo obtener el token de captcha de ARBA.');

    // 2. Get captcha image
    const imgRes = await http.get(`${BASE}/captcha/imagen?token=${captchaToken}`, {
      jar, withCredentials: true, responseType: 'arraybuffer',
      headers: { Referer: PAGE_URL, 'User-Agent': UA },
    });
    const base64Image = Buffer.from(imgRes.data).toString('base64');

    // 3. Solve captcha
    const captchaRespuesta = await solveCaptchaImage(base64Image);
    if (!captchaRespuesta) {
      const err = new Error('MANUAL_REQUIRED');
      err.manualUrl = PAGE_URL;
      throw err;
    }

    // 4. POST to ARBA
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

    // Redirected to a PDF → has debt
    const finalUrl    = res.request?.res?.responseUrl || res.request?.responseURL || '';
    const contentType = String(res.headers?.['content-type'] || '');
    if (contentType.includes('pdf') || finalUrl.includes('.pdf')) {
      return { tieneDeuda: true, periodos: [], pdfUrl: finalUrl };
    }

    const html = String(res.data);

    // Captcha wrong → retry with fresh token+image (or give up on last attempt)
    if (/captcha.*(incorrecto|inv[áa]lido|error)|c[oó]digo.*incorrecto/i.test(html)) {
      if (attempt < MAX_ATTEMPTS - 1) continue;
      const err = new Error('MANUAL_REQUIRED');
      err.manualUrl = PAGE_URL;
      throw err;
    }

    const $ = cheerio.load(html);
    const alertDangerText  = ($('.alert-danger p').text()  || $('.alert-danger').text()).trim();
    const alertSuccessText = ($('.alert-success p').text() || $('.alert-success').text()).trim();
    const alertWarningText = ($('.alert-warning p').text() || $('.alert-warning').text()).trim();

    // Not found
    if (/inexistente|no se encontr|no existe|no.*v[aá]lid/i.test(alertDangerText) ||
        /inexistente|no se encontr|no existe/i.test(html)) {
      return { tieneDeuda: null, periodos: [], error: 'Patente no encontrada en ARBA' };
    }

    // Sin deuda
    if (/sin deuda|no registra deuda|no posee deuda|no tiene deuda|libre de deuda/i.test(alertSuccessText) ||
        /sin deuda|no registra deuda|no posee deuda|no tiene deuda|libre de deuda/i.test(html)) {
      return { tieneDeuda: false, periodos: [] };
    }

    // Parse debt table
    const fixEncoding = s => s ? s.replace(/A[\u00b1\u00f1\ufffd]o/g, 'Año') : s;
    const periodos = [];
    $('table tr').each((i, row) => {
      if (i === 0) return;
      const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
      if (cols.length >= 2 && cols[0]) {
        const importeStr = (cols[cols.length - 1] || '').replace(/[^0-9.,]/g, '').replace(',', '.');
        const importeVal = parseFloat(importeStr) || null;
        const importe = (importeVal && !(Number.isInteger(importeVal) && importeVal >= 1900 && importeVal <= 2100))
          ? importeVal : null;
        periodos.push({ periodo: fixEncoding(cols[0]) || null, concepto: fixEncoding(cols[1]) || null, importe });
      }
    });
    if (periodos.length > 0) {
      return { tieneDeuda: true, periodos, total: periodos.reduce((s, p) => s + (p.importe || 0), 0) };
    }

    // Warning alert without table = has debt but no detail
    if (alertWarningText || /importe.*\$|cuota|vencimiento|deuda.*\$/i.test(html)) {
      return { tieneDeuda: true, periodos: [] };
    }

    return { tieneDeuda: false, periodos: [] };
  }
}

// ─── AGIP — Deuda de Patentes (CABA) ──────────────────────────────────────────
async function fetchAGIP(dominio) {
  const SITE_KEY = '6Lex5EkUAAAAAIGTKhHNPHpn7G6l4CHdTuhyidrP';
  const PAGE_URL = 'https://lb.agip.gob.ar/ConsultaPat/';

  // 1. Load main page to get session cookie
  const jar = new CookieJar();
  await http.get(PAGE_URL, { jar, withCredentials: true });

  // 2. Solve reCAPTCHA v2 — Capsolver first (fast), 2captcha fallback
  const captchaToken = await solveRecaptchaV2(SITE_KEY, PAGE_URL);

  // 3. POST GetDatos (plate lookup with captcha)
  const cookies = jar.getCookiesSync('https://lb.agip.gob.ar').map(c => `${c.key}=${c.value}`).join('; ');
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
      jar,
      withCredentials: true,
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

  // Vehicle not registered in CABA
  if (!data || data.statusCode !== 0) {
    const status = data?.status || '';
    // Common "not found" patterns → clean message
    const notFound = /no existe|no se encontr|sql: 10|no es av|inscripto/i.test(status);
    return { tieneDeuda: null, error: notFound ? 'Patente no registrada en AGIP (CABA)' : (status || 'Vehículo no registrado en AGIP (CABA)') };
  }

  const cabecera = data.result?.cabecera;
  if (!cabecera) return { tieneDeuda: null, error: 'Vehículo no encontrado en AGIP' };

  const dv = cabecera.dv != null ? String(cabecera.dv) : '';

  // 4. Query unpaid positions (last 6 years)
  const currentYear = new Date().getFullYear();
  const deudaBody   = new URLSearchParams({
    codImpuesto: '8',
    anioInicio:  String(currentYear - 6),
    dominioI:    dominio,
    dv,
  });

  const cookies2 = jar.getCookiesSync('https://lb.agip.gob.ar').map(c => `${c.key}=${c.value}`).join('; ');
  let posiciones = [];
  try {
    const deudaRes = await http.post(
      'https://lb.agip.gob.ar/Empadronados/json/GetPosicionesImpagas',
      deudaBody.toString(),
      {
        jar,
        withCredentials: true,
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
      posiciones = dd.result.map(p => ({
        anio:   p.anio   || null,
        cuota:  p.cuota  || null,
        monto:  parseFloat(p.saldoTotal || p.importe || 0) || null,
        estado: (p.estado || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      }));
    }
  } catch (_) {
    // Debt query failed — we still return vehicle info
  }

  const pendientes = posiciones.filter(p => p.estado === 'pendiente');
  const total      = pendientes.reduce((s, p) => s + (p.monto || 0), 0);

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
// Public JSON endpoint — no captcha. Only covers Catamarca-registered vehicles.
async function fetchVTVCatamarca(dominio) {
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
  return data.map(item => {
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

// ─── Boldt Juzgado Virtual — Venado Tuerto, Almirante Brown, Escobar ──────────
// Shared JWT + reCAPTCHA v2 REST platform.
// Credentials are injected per-municipality in the frontend page HTML.
async function fetchBoldt(frontendUrl, apiBaseUrl, nombre, dominio) {
  // 1. Fetch page to extract credentials from inline <script>
  const pageRes = await axios.get(frontendUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 12000,
    validateStatus: () => true,
  });
  const html = String(pageRes.data);
  const userMatch = html.match(/var\s+user\s*=\s*"([^"]+)"/);
  const passMatch = html.match(/var\s+password\s*=\s*"([^"]+)"/);
  if (!userMatch || !passMatch) throw new Error(`Boldt (${nombre}): no se pudieron obtener credenciales.`);

  // 2. Authenticate — JWT is returned in the Authorization response header
  const authRes = await axios.post(
    `${apiBaseUrl}auth/getToken`,
    { username: userMatch[1], password: passMatch[1] },
    { headers: { 'Content-Type': 'application/json' }, timeout: 12000, validateStatus: () => true }
  );
  const jwt = authRes.headers['authorization'];
  if (!jwt) throw new Error(`Boldt (${nombre}): no se obtuvo token JWT.`);

  // 3. Get reCAPTCHA v2 site key from parameters
  const paramsRes = await axios.get(`${apiBaseUrl}api/consulta/parametros`, {
    headers: { Authorization: `Bearer ${jwt}` },
    timeout: 10000,
  });
  const siteKeyParam = (paramsRes.data || []).find(p => p.parametro === 'GOOGLE_CAPTCHA_CLAVE_PUBLICA');
  if (!siteKeyParam) throw new Error(`Boldt (${nombre}): no se encontró la clave reCAPTCHA.`);

  // 4. Solve reCAPTCHA v3 (Boldt uses grecaptcha.execute with action — not v2)
  const captchaToken = await solveRecaptchaV3(siteKeyParam.valor, frontendUrl, 'api/consultaInfraccion/vehiculo', 0.3);

  // 5. Query vehicle infractions — captcha token goes in Captcha header (not body)
  const vehiculoRes = await axios.post(
    `${apiBaseUrl}api/consultaInfraccion/vehiculo`,
    { dominio },
    {
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json', Captcha: captchaToken },
      timeout: 30000,
      validateStatus: () => true,
    }
  );

  if (vehiculoRes.status === 400) {
    const errMsg = vehiculoRes.data?.errores?.error?.[0]?.descripcionError || 'Error desconocido';
    throw new Error(`Boldt (${nombre}): ${errMsg}`);
  }

  const list = vehiculoRes.data?.listInfracciones || [];
  return list
    .filter(i => i.idTipoActa == null || i.idTipoActa !== 2)
    .map(i => ({
      acta:        String(i.numeroCausa || ''),
      fecha:       i.fechaObligacion || null,
      descripcion: i.articulo || i.descripcionFalta || null,
      lugar:       i.lugar || null,
      importe:     parseFloat(String(i.importeSaldo || i.importeNotificacion || '0').replace(',', '.')) || null,
      estado:      (i.estadoPago || '').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
      jurisdiccion: nombre,
    }));
}

async function fetchVenadoTuerto(dominio) {
  return fetchBoldt(
    'https://venadotuerto-infracciones.boldt.com.ar/secretariavirtual/',
    'https://venadotuerto-infracciones.boldt.com.ar/ws-juzgado-virtual-rest/',
    'Venado Tuerto', dominio
  );
}

async function fetchAlmirante_Brown(dominio) {
  return fetchBoldt(
    'https://almirantebrown-infracciones.boldt.com.ar/secretariavirtual/',
    'https://almirantebrown-infracciones.boldt.com.ar/ws-juzgado-virtual-rest/',
    'Almirante Brown', dominio
  );
}

async function fetchEscobar(dominio) {
  return fetchBoldt(
    'https://infracciones.escobar.gob.ar/secretariavirtual/',
    'https://infracciones.escobar.gob.ar/ws-juzgado-virtual-rest/',
    'Escobar', dominio
  );
}

// ─── Infratrack REST API — Berisso, Ezeiza, Lanús ─────────────────────────────
// Shared REST platform used by multiple Buenos Aires municipalities.
// No captcha on the server side (reCAPTCHA v2 is frontend-only).
async function fetchInfratrack(municipio, dominio) {
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
  return list.map(i => ({
    acta:        i.nroActa || i.numero_acta || i.id || null,
    fecha:       parseDate(i.fecha || i.fecha_infraccion || null),
    descripcion: i.descripcion || i.motivo || i.articulo || null,
    lugar:       i.lugar || i.calle || i.direccion || null,
    importe:     parseFloat((String(i.importe || i.monto || '0')).replace(/[^0-9.,]/g, '').replace(',', '.')) || null,
    estado:      (i.estado || 'pendiente').toLowerCase().includes('pag') ? 'pagada' : 'pendiente',
    jurisdiccion: nombre,
  }));
}

// ─── SIGEIN — Cañuelas / San Vicente ─────────────────────────────────────────
// Shared ASP.NET WebForms platform.  Same form fields as Corrientes SIGEIN.
async function fetchSIGEINMunicipio(host, nombre, dominio) {
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
    __VIEWSTATE:          viewState,
    __VIEWSTATEGENERATOR: viewStateGenerator,
    __EVENTVALIDATION:    eventValidation,
    tbPatente:            dominio,
    btnConsultaDominio:   'REALIZAR CONSULTA',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map(c => `${c.key}=${c.value}`).join('; ');
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

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
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

// ─── Hurlingham (GDI gobdigital) ─────────────────────────────────────────────
async function fetchHurlingham(dominio) {
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
    __VIEWSTATE:                   viewState,
    __VIEWSTATEGENERATOR:          viewStateGenerator,
    __EVENTVALIDATION:             eventValidation,
    'ctl00$content$hfIdPersona':   '',
    'ctl00$content$txtPatente':    dominio,
    'ctl00$content$btnBuscar':     'Buscar',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map(c => `${c.key}=${c.value}`).join('; ');
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

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
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
async function fetchLomasDeZamora(dominio) {
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
    __VIEWSTATE:          viewState,
    __VIEWSTATEGENERATOR: viewStateGenerator,
    __EVENTVALIDATION:    eventValidation,
    LD:                   '',
    txtDominio:           dominio,
    txtDocumento:         '',
    txtCuit:              '',
    cmdConfirmaTurno:     'Buscar',
  });

  const cookies = jar.getCookiesSync(PAGE_URL).map(c => `${c.key}=${c.value}`).join('; ');
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

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
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
async function fetchTresDeFebbrero(dominio) {
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

  const infracciones = [];
  $('table tbody tr, table tr').each((i, row) => {
    if (i === 0) return;
    const cols = $(row).find('td').map((_, td) => $(td).text().trim()).get();
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
// No captcha on the backend — Turnstile is frontend-only on multas.mda.gob.ar.
async function fetchAvellaneda(dominio) {
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

  return list.map(i => ({
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
async function verifyCaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true; // not configured → skip (local dev)
  if (!token)     return true; // token missing → allow (frontend may not have loaded reCAPTCHA yet)
  try {
    const r = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({ secret: secretKey, response: token }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 5000 }
    );
    const d = r.data;
    // Accept genuine first-use tokens (score ≥ 0.5) OR tokens already consumed by a
    // parallel call from the same form submit (timeout-or-duplicate means the first call
    // already proved the user is legit).
    if (d.success && d.score >= 0.5) return true;
    if ((d['error-codes'] || []).includes('timeout-or-duplicate')) return true;
    return false;
  } catch (_) {
    return true; // don't block users if Google's API is unreachable
  }
}

// ─── Vercel Handler ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido.' });

  const { dominio, fuente = 'ansv', rcToken } = req.query;

  if (!dominio) return res.status(400).json({ error: 'Falta el parámetro dominio.' });

  const clean = dominio.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{3}\d{3}$/.test(clean) && !/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(clean)) {
    return res
      .status(400)
      .json({ error: 'Dominio inválido. Usar formato antiguo (ABC123) o Mercosur (AB123CD).' });
  }

  const captchaOk = await verifyCaptcha(rcToken);
  if (!captchaOk) return res.status(403).json({ error: 'Verificación de seguridad fallida. Recargá la página e intentá de nuevo.' });

  try {
    // ── DNRPA vehicle lookup ─────────────────────────────────────────────────
    if (fuente === 'dnrpa') {
      const vehiculo = await fetchDNRPA(clean);
      return res.status(200).json({ dominio: clean, fuente, vehiculo });
    }

    // ── VTV ──────────────────────────────────────────────────────────────────
    if (fuente === 'vtv') {
      const historial = await fetchVTV(clean);
      return res.status(200).json({ dominio: clean, fuente, historial });
    }

    // ── ITV Córdoba ──────────────────────────────────────────────────────────
    if (fuente === 'vtv-cordoba') {
      const historial = await fetchVTVCordoba(clean);
      return res.status(200).json({ dominio: clean, fuente, historial });
    }

    // ── RTO Santa Fe ─────────────────────────────────────────────────────────
    if (fuente === 'vtv-santafe') {
      const historial = await fetchVTVSantaFe(clean);
      return res.status(200).json({ dominio: clean, fuente, historial });
    }

    // ── RTO Catamarca ─────────────────────────────────────────────────────────
    if (fuente === 'vtv-catamarca') {
      const historial = await fetchVTVCatamarca(clean);
      return res.status(200).json({ dominio: clean, fuente, historial });
    }

    // ── ACOR Corrientes patente ───────────────────────────────────────────────
    if (fuente === 'patentes-corrientes') {
      const acor = await fetchACORPatente(clean);
      return res.status(200).json({ dominio: clean, fuente, acor });
    }

    // ── ARBA — deuda de patentes PBA ─────────────────────────────────────────
    if (fuente === 'arba') {
      const arba = await fetchARBA(clean);
      return res.status(200).json({ dominio: clean, fuente, arba });
    }

    // ── AGIP — deuda de patentes CABA ────────────────────────────────────────
    if (fuente === 'agip') {
      const agip = await fetchAGIP(clean);
      return res.status(200).json({ dominio: clean, fuente, agip });
    }

    let infracciones;
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
      case 'cordoba':         infracciones = await fetchCordoba(clean);                              break;
      case 'berisso':         infracciones = await fetchInfratrack('berisso', clean);             break;
      case 'ezeiza':          infracciones = await fetchInfratrack('ezeiza', clean);              break;
      case 'lanus':           infracciones = await fetchInfratrack('lanus', clean);               break;
      case 'canuelas':        infracciones = await fetchSIGEINMunicipio('canuelas.sigein.net', 'Cañuelas', clean);             break;
      case 'sanvicente':      infracciones = await fetchSIGEINMunicipio('sv.sigein.net', 'San Vicente', clean);              break;
      case 'roquesaenzpena':  infracciones = await fetchSIGEINMunicipio('rsp.sigein.net', 'Roque Sáenz Peña', clean);       break;
      case 'villaangostura':  infracciones = await fetchSIGEINMunicipio('vla.sigein.net', 'Villa La Angostura', clean);     break;
      case 'riotercero':      infracciones = await fetchSIGEINMunicipio('riotercero.sigein.net', 'Río Tercero', clean);     break;
      case 'hurlingham':      infracciones = await fetchHurlingham(clean);                        break;
      case 'lomasdezamora':   infracciones = await fetchLomasDeZamora(clean);                     break;
      case 'tresdefebrero':   infracciones = await fetchTresDeFebbrero(clean);                    break;
      case 'avellaneda':      infracciones = await fetchAvellaneda(clean);                        break;
      case 'venadotuerto':    infracciones = await fetchVenadoTuerto(clean);                    break;
      case 'almirantebrown':  infracciones = await fetchAlmirante_Brown(clean);                 break;
      case 'escobar':         infracciones = await fetchEscobar(clean);                         break;
      case 'ansv':
      default:                infracciones = await fetchANSV(clean);                              break;
    }
    return res.status(200).json({ dominio: clean, fuente, infracciones });
  } catch (err) {
    // MANUAL_REQUIRED: portal needs captcha that can't be automated — send a 200 with manualUrl
    if (err.message === 'MANUAL_REQUIRED') {
      const manualUrl = err.manualUrl || null;

      if (fuente === 'arba')       return res.status(200).json({ dominio: clean, fuente, arba: { tieneDeuda: null, periodos: [], manualUrl } });
      if (fuente === 'vtv-santafe') return res.status(200).json({ dominio: clean, fuente, historial: [], manualUrl });
      return res.status(200).json({ dominio: clean, fuente, infracciones: [], manualUrl });
    }
    console.error(`[${fuente}] Error para ${clean}:`, err.message);
    return res.status(502).json({ error: `Error al consultar ${fuente}: ${err.message}` });
  }
};
