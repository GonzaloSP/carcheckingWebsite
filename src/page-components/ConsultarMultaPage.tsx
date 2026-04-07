'use client';
import { useState, useEffect, useRef } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Link from 'next/link';
import { Search, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Loader2, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Navigation from '../sections/Navigation';
import FooterSection from '../sections/FooterSection';
import { trackEvent } from '../lib/analytics';
import { JURISDICCIONES_MULTA, type JurisdiccionMulta } from '../data/multa-jurisdictions';
import { MULTA_CONTENT } from '../data/multa-content';

const FUENTES = JURISDICCIONES_MULTA.filter(j => !j.hideFromList);

// These jurisdictions are always queried for free (no payment required)
const FREE_MULTA_FUENTES = new Set(['santarosa', 'entrerios', 'mendozacaminera', 'villaangostura']);

type PaymentStatus = 'idle' | 'creating' | 'waiting' | 'paid' | 'error';

import { APPWRITE_BASE, APPWRITE_PROJECT_ID, MULTAS_FUNCTION_URL } from '@/config/appwrite';
const APPWRITE_PROJECT = APPWRITE_PROJECT_ID;
// Direct function domain — no execution API wrapper, no X-Appwrite-Project needed.
const MULTA_API_URL = MULTAS_FUNCTION_URL;

const MP_CREATE_URL = 'https://mp-create.functions.innsimulation.com';
const MP_VERIFY_URL = 'https://mp-verify.functions.innsimulation.com';

/** Call an MP payment function via its direct domain. */
async function callAppwriteFn(
  fnId: string,
  method: string,
  body?: Record<string, unknown>,
  query?: Record<string, string>,
): Promise<any> {
  const base = fnId === 'mp-create-preference' ? MP_CREATE_URL : MP_VERIFY_URL;
  const qs = query ? '?' + new URLSearchParams(query).toString() : '';
  const res = await fetch(`${base}/${qs}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
}

/** Call the multas function directly via its domain. */
async function multasExec(path: string, method: string, body: string | null, signal?: AbortSignal): Promise<Response> {
  const res = await fetch(`${MULTAS_FUNCTION_URL}${path}`, {
    method,
    headers: body != null ? { 'Content-Type': 'application/json' } : undefined,
    ...(body != null ? { body } : {}),
    signal,
  });
  if (!res.ok && res.status !== 200) {
    const text = await res.text().catch(() => '');
    return new Response(text || JSON.stringify({ error: 'Portal no disponible' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return res;
}

// Fuentes that use two-step sync flow: step 1 submits captcha task, client waits, step 2 retrieves result
// dnrpa uses recaptcha v2 which can take 30-60s — two-step avoids Appwrite's function timeout
const TWO_STEP_FUENTES = new Set(['ansv', 'caba', 'pba', 'cordoba', 'dnrpa']);
const TWO_STEP_WAIT_MS: Record<string, number> = { ansv: 35000, caba: 60000, pba: 40000, cordoba: 30000, dnrpa: 40000 };

/** Unified fetch wrapper — calls the multas function domain directly. */
async function callMultasApi(url: string, signal?: AbortSignal): Promise<Response> {
  const qStart = url.indexOf('?');
  const queryString = qStart >= 0 ? url.slice(qStart) : '';
  const params = new URLSearchParams(queryString.replace(/^\?/, ''));
  const fuente = params.get('fuente') ?? '';
  const dominio = params.get('dominio') ?? '';

  // ── Two-step flow for ANSV, CABA, PBA, Córdoba ────────────────────────────
  if (TWO_STEP_FUENTES.has(fuente)) {
    const step1 = await multasExec(`/?fuente=${fuente}&dominio=${dominio}&step=1`, 'GET', null, signal);
    if (!step1.ok) return step1;
    const s1 = await step1.json();
    if (s1.error) return new Response(JSON.stringify(s1), { status: 502, headers: { 'Content-Type': 'application/json' } });

    const { taskMeta, session } = s1;
    await new Promise(r => setTimeout(r, TWO_STEP_WAIT_MS[fuente] ?? 35000));

    return multasExec(
      `/?fuente=${fuente}&dominio=${dominio}&step=2`,
      'POST',
      JSON.stringify({ taskMeta, session }),
      signal,
    );
  }

  // Regular single-step — direct GET to function domain
  return multasExec(`/${queryString}`, 'GET', null, signal);
}

interface Infraccion {
  acta:         string | null;
  fecha:        string | null;
  vencimiento?: string | null;
  descripcion:  string | null;
  lugar:        string | null;
  importe:      number | null;
  url?:         string | null;
  estado:       string;
  jurisdiccion: string;
  tipo?:        string | null;
  normativa?:   string | null;
  municipio?:   string | null;
}

type Status = 'loading' | 'ok' | 'empty' | 'error' | 'manual';

interface JurisdiccionState {
  status:      Status;
  infracciones: Infraccion[];
  error?:      string;
  manualUrl?:  string;
}

interface VehiculoInfo {
  status:     'loading' | 'ok' | 'error';
  marca?:     string;
  modelo?:    string;
  anio?:      number;
  registro?:  string;
  localidad?: string;
  error?:     string;
}

interface VTVEntry {
  fecha_verificacion: string | null;
  fecha_vencimiento:  string | null;
  numero_oblea:       string | null;
  importe:            string | null;
  planta:             string | null;
  vigente:            boolean;
  defectos:           string[];
  marca:              string | null;
  modelo:             string | null;
  anio:               string | null;
}

interface VTVState {
  status:   'loading' | 'ok' | 'empty' | 'error';
  historial: VTVEntry[];
  error?:   string;
}


interface VTVSimpleEntry {
  fecha_verificacion: string | null;
  fecha_vencimiento:  string | null;
  vigente:            boolean;
  estado:             string | null;
  planta:             string | null;
}

interface VTVSimpleState {
  status:    'loading' | 'ok' | 'empty' | 'error' | 'manual';
  historial: VTVSimpleEntry[];
  error?:    string;
  manualUrl?: string;
}

interface ACORState {
  status:     'loading' | 'ok' | 'empty' | 'error';
  tieneDeuda?: boolean | null;
  monto?:     number | null;
  error?:     string;
}

interface ARBAState {
  status:     'loading' | 'ok' | 'empty' | 'error' | 'manual';
  tieneDeuda?: boolean | null;
  periodos?:  Array<{ periodo: string | null; concepto: string | null; importe: number | null }>;
  total?:     number;
  manualUrl?: string;
  error?:     string;
}

interface AGIPPosicion {
  anio:   string | null;
  cuota:  string | null;
  monto:  number | null;
  estado: string;
}

interface AGIPState {
  status:    'loading' | 'ok' | 'empty' | 'error';
  tieneDeuda?: boolean | null;
  posiciones?: AGIPPosicion[];
  total?:     number | null;
  vehiculo?:  { marca: string | null; modelo: string | null; estado: string | null };
  error?:    string;
}


export default function ConsultarMultaPage({
  defaultFuente,
  jurisdiccionOverride,
}: { defaultFuente?: string; jurisdiccionOverride?: JurisdiccionMulta } = {}) {
  const jurisdiccion = jurisdiccionOverride ?? (defaultFuente ? FUENTES.find(f => f.value === defaultFuente) : undefined);
  const content = jurisdiccion ? MULTA_CONTENT[jurisdiccion.slug] : undefined;
  const { executeRecaptcha } = useGoogleReCaptcha();
  // Controlled via NEXT_PUBLIC_MULTA_FREE env var.
  // 'true'  → hybrid mode: Córdoba + Salta free, rest gated behind payment
  // anything else (including unset) → fully free, no payment
  const freeMode = process.env.NEXT_PUBLIC_MULTA_FREE !== 'true';

  const [dominio, setDominio]             = useState('');
  const [results, setResults]             = useState<Record<string, JurisdiccionState> | null>(null);
  const [vehiculo, setVehiculo]           = useState<VehiculoInfo | null>(null);
  const [vtvState, setVtvState]           = useState<VTVState | null>(null);

  const [vtvCordobaState, setVtvCordobaState]   = useState<VTVSimpleState | null>(null);
  const [vtvSantaFeState, setVtvSantaFeState]   = useState<VTVSimpleState | null>(null);
  const [vtvCatamarcaState, setVtvCatamarcaState] = useState<VTVSimpleState | null>(null);
  const [acorState, setAcorState]             = useState<ACORState | null>(null);
  const [arbaState, setArbaState]             = useState<ARBAState | null>(null);
  const [agipState, setAgipState]             = useState<AGIPState | null>(null);
  const [activeTab, setActiveTab]         = useState<'multas' | 'vtv' | 'patentes'>('multas');
  const [activeFuentes, setActiveFuentes] = useState(jurisdiccion ? [jurisdiccion] : FUENTES);
  const [expanded, setExpanded]           = useState<Set<string>>(new Set());
  const [searched, setSearched]           = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingDominio, setPendingDominio]     = useState('');
  const [pendingFuentes, setPendingFuentes]     = useState<typeof FUENTES>([]);
  const [paymentStatus, setPaymentStatus]       = useState<PaymentStatus>('idle');
  const [mpInitPoint, setMpInitPoint]           = useState('');
  const [mpExternalRef, setMpExternalRef]       = useState('');
  const [paymentError, setPaymentError]         = useState('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Refs keep values current inside stale interval/async closures
  const pendingFuentesRef = useRef<typeof FUENTES>([]);
  const pendingDominioRef = useRef('');
  const paymentStatusRef  = useRef<PaymentStatus>('idle');
  const mpExternalRefRef  = useRef('');
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [verifyMessage, setVerifyMessage]       = useState('');

  // Stop polling when modal is closed
  useEffect(() => {
    if (!showPaymentModal) {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      if (paymentStatus !== 'paid') setPaymentStatus('idle');
    }
  }, [showPaymentModal]);

  // Keep refs in sync with state so visibility handler always has current values
  useEffect(() => { paymentStatusRef.current = paymentStatus; }, [paymentStatus]);
  useEffect(() => { mpExternalRefRef.current = mpExternalRef; }, [mpExternalRef]);

  // Close modal when payment is confirmed — modal is no longer needed once paid
  useEffect(() => {
    if (paymentStatus === 'paid') {
      setShowPaymentModal(false);
    }
  }, [paymentStatus]);

  // When user returns from the MP app, immediately re-check payment status
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      if (paymentStatusRef.current !== 'waiting') return;
      const ref = mpExternalRefRef.current;
      if (!ref) return;
      callAppwriteFn('mp-verify-preference', 'GET', undefined, { external_reference: ref })
        .then(pd => {
          if (pd.paid && paymentStatusRef.current === 'waiting') {
            if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
            setPaymentStatus('paid');
            setShowPaymentModal(false);
            unlockPaidFuentes();
          }
        })
        .catch(() => {});
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = dominio.replace(/\s/g, '').toUpperCase();
    if (clean.length < 6 || clean.length > 7) return;

    const isOldFormat = /^[A-Z]{3}\d{3}$/.test(clean);
    const baseFuentes = jurisdiccion ? [jurisdiccion] : FUENTES;
    const fuentes = isOldFormat ? baseFuentes : baseFuentes.filter(f => f.value !== 'ansv');

    if (freeMode) {
      executeQueries(clean, fuentes);
      return;
    }

    // Hybrid mode: run free fuentes immediately, gate the rest behind payment
    const freeFuentes = fuentes.filter(f => FREE_MULTA_FUENTES.has(f.value));
    const paidFuentes = fuentes.filter(f => !FREE_MULTA_FUENTES.has(f.value));

    trackEvent('multa_search', { dominio: clean, format: clean.length === 6 ? 'antiguo' : 'mercosur' });
    setSearched(clean);
    setExpanded(new Set());
    setVehiculo({ status: 'loading' });
    // Only show free fuentes in results initially
    setActiveFuentes(freeFuentes);

    const initial: Record<string, JurisdiccionState> = {};
    freeFuentes.forEach(f => { initial[f.value] = { status: 'loading', infracciones: [] }; });
    setResults(initial);
    setVtvState({ status: 'loading', historial: [] });
    setVtvCordobaState({ status: 'loading', historial: [] });
    setVtvSantaFeState({ status: 'loading', historial: [] });
    setVtvCatamarcaState({ status: 'loading', historial: [] });
    setArbaState({ status: 'loading' });
    setAgipState({ status: 'loading' });
    setAcorState({ status: 'loading' });
    setActiveTab('multas');

    let rcToken = '';
    try { rcToken = await executeRecaptcha?.('consultar_multa') ?? ''; } catch (_) {}
    const rc = rcToken ? `&rcToken=${encodeURIComponent(rcToken)}` : '';

    // Run free fuentes + aux immediately
    runAuxQueries(clean, rc);
    runFuenteQueries(clean, freeFuentes, rc);

    // Store paid fuentes for inline paywall — do NOT show modal automatically
    setPendingDominio(clean);
    pendingDominioRef.current = clean;
    setPendingFuentes(paidFuentes);
    pendingFuentesRef.current = paidFuentes;
    setMpInitPoint('');
    setMpExternalRef('');
    setPaymentError('');
    setPaymentStatus('idle');
  }

  async function handleStartPayment() {
    setPaymentError('');
    setPaymentStatus('creating');
    setShowPaymentModal(true);

    callAppwriteFn('mp-create-preference', 'POST', { dominio: pendingDominio })
      .then(data => {
        if (!data.init_point) throw new Error(data.error ?? 'Error al crear preferencia');
        setMpInitPoint(data.init_point);
        setMpExternalRef(data.external_reference);
        setPaymentStatus('waiting');

        pollRef.current = setInterval(async () => {
          try {
            const pd = await callAppwriteFn('mp-verify-preference', 'GET', undefined, { external_reference: data.external_reference });
            if (pd.paid) {
              if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
              setPaymentStatus('paid');
              setShowPaymentModal(false);
              unlockPaidFuentes();
            }
          } catch { /* keep polling */ }
        }, 3000);
      })
      .catch(err => {
        setPaymentError(err.message ?? 'No se pudo iniciar el pago');
        setPaymentStatus('error');
      });
  }

  async function unlockPaidFuentes() {
    // Use refs — always current regardless of when this is called
    const fuentes = pendingFuentesRef.current;
    const dom     = pendingDominioRef.current;
    if (!fuentes.length) return;
    let rcToken2 = '';
    try { rcToken2 = await executeRecaptcha?.('consultar_multa') ?? ''; } catch (_) {}
    const rc2 = rcToken2 ? `&rcToken=${encodeURIComponent(rcToken2)}` : '';
    setActiveFuentes(prev => [...prev, ...fuentes]);
    const additionalResults: Record<string, JurisdiccionState> = {};
    fuentes.forEach(f => { additionalResults[f.value] = { status: 'loading', infracciones: [] }; });
    setResults(prev => prev ? { ...prev, ...additionalResults } : additionalResults);
    runFuenteQueries(dom, fuentes, rc2);
  }

  async function handleManualVerify() {
    if (!mpExternalRef) return;
    setVerifyingPayment(true);
    setVerifyMessage('');
    try {
      const pd = await callAppwriteFn('mp-verify-preference', 'GET', undefined, { external_reference: mpExternalRef });
      if (pd.paid) {
        if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
        setPaymentStatus('paid');
        setShowPaymentModal(false);
        unlockPaidFuentes();
      } else {
        setVerifyMessage('Pago no detectado aún. Esperá unos segundos e intentá de nuevo.');
      }
    } catch {
      setVerifyMessage('Error al verificar. Intentá nuevamente.');
    } finally {
      setVerifyingPayment(false);
    }
  }

  function handleDownloadPDF() {
    const date = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

    const fmtCurrency = (n: number) => '$' + n.toLocaleString('es-AR');

    // Vehicle row
    const vehicleRow = vehiculo?.status === 'ok'
      ? `<p style="margin:0 0 4px;font-size:18px;font-weight:700;color:#111;">${vehiculo.marca ?? ''} ${vehiculo.modelo ?? ''}</p>
         ${vehiculo.anio ? `<p style="margin:0;font-size:13px;color:#555;">Año: ${vehiculo.anio}${vehiculo.registro ? ` · Registro: ${vehiculo.registro}${vehiculo.localidad ? `, ${vehiculo.localidad}` : ''}` : ''}</p>` : ''}`
      : '<p style="margin:0;font-size:13px;color:#999;">Vehículo no identificado</p>';

    // Multa rows
    let multaRows = '';
    if (results) {
      activeFuentes.forEach(({ value, label }) => {
        const r = results[value];
        if (!r || r.status === 'loading') return;
        const dot = r.status === 'ok' ? '#d97706' : r.status === 'empty' ? '#16a34a' : '#9ca3af';
        const statusText = r.status === 'ok' ? `${r.infracciones.length} infracción(es)` : r.status === 'empty' ? 'Sin multas' : r.status === 'error' ? (r.error ?? 'Error') : 'Manual';
        const total = r.infracciones.reduce((s, inf) => s + (inf.importe || 0), 0);
        multaRows += `<tr style="border-bottom:1px solid #f0f0f0;">
          <td style="padding:8px 12px;font-size:13px;">${label}</td>
          <td style="padding:8px 12px;font-size:13px;font-weight:600;color:${dot};">${statusText}</td>
          <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#b45309;text-align:right;">${total > 0 ? fmtCurrency(total) : '—'}</td>
        </tr>`;
        r.infracciones.forEach(inf => {
          multaRows += `<tr style="background:#fffbf0;border-bottom:1px solid #f5f5f5;">
            <td colspan="3" style="padding:5px 12px 5px 28px;font-size:11px;color:#6b6b6b;">
              ${[inf.descripcion, inf.fecha ? `Fecha: ${inf.fecha}` : '', inf.vencimiento ? `Vto: ${inf.vencimiento}` : '', `Estado: ${inf.estado}`, inf.importe ? fmtCurrency(inf.importe) : ''].filter(Boolean).join(' · ')}
            </td>
          </tr>`;
        });
      });
    }

    // VTV section
    let vtvHtml = '';
    const vtvSections: Array<{ label: string; sub: string; s: VTVState | VTVSimpleState | null }> = [
      { label: 'Buenos Aires Provincia (VTV PBA)', sub: 'Verificación Técnica Vehicular', s: vtvState },
      { label: 'Córdoba (ITV)', sub: 'Inspección Técnica Vehicular', s: vtvCordobaState },
      { label: 'Santa Fe (RTO)', sub: 'Revisión Técnica Obligatoria', s: vtvSantaFeState },
      { label: 'Catamarca (RTO)', sub: 'Revisión Técnica Obligatoria', s: vtvCatamarcaState },
    ];
    vtvSections.forEach(({ label, s }) => {
      if (!s || s.status === 'loading') return;
      const h = s.historial[0];
      vtvHtml += `<tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 12px;font-size:13px;">${label}</td>
        <td style="padding:8px 12px;font-size:13px;font-weight:600;color:${!h ? '#9ca3af' : h.vigente ? '#16a34a' : '#d97706'};">${!h ? 'Sin registros' : h.vigente ? 'VIGENTE' : 'VENCIDA'}</td>
        <td style="padding:8px 12px;font-size:12px;color:#555;text-align:right;">${h?.fecha_vencimiento ? `Vto: ${h.fecha_vencimiento}` : '—'}</td>
      </tr>`;
    });

    // Patentes section
    const arbaRow = !arbaState || arbaState.status === 'loading' ? '' : `<tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:8px 12px;font-size:13px;">ARBA — Provincia de Buenos Aires</td>
      <td style="padding:8px 12px;font-size:13px;font-weight:600;color:${arbaState.tieneDeuda ? '#d97706' : '#16a34a'};">${arbaState.tieneDeuda ? 'Registra deuda' : arbaState.status === 'error' ? 'Error' : arbaState.status === 'manual' ? 'Manual' : 'Sin deuda'}</td>
      <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#b45309;text-align:right;">${arbaState.total && arbaState.total > 0 ? fmtCurrency(arbaState.total) : '—'}</td>
    </tr>`;
    const agipRow = !agipState || agipState.status === 'loading' ? '' : `<tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:8px 12px;font-size:13px;">AGIP — Ciudad de Buenos Aires</td>
      <td style="padding:8px 12px;font-size:13px;font-weight:600;color:${agipState.tieneDeuda ? '#d97706' : '#16a34a'};">${agipState.tieneDeuda ? 'Registra deuda' : agipState.status === 'error' ? 'Error' : 'Sin deuda'}</td>
      <td style="padding:8px 12px;font-size:13px;font-weight:700;color:#b45309;text-align:right;">${agipState.total && agipState.total > 0 ? fmtCurrency(agipState.total) : '—'}</td>
    </tr>`;

    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>carChecking — Informe ${searched}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; color: #111; padding: 40px; max-width: 800px; margin: 0 auto; }
  @media print { body { padding: 20px; } }
</style></head><body>
  <!-- Header -->
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #C8A161;">
    <div>
      <div style="font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#111;">car<span style="color:#C8A161;">Checking</span></div>
      <div style="font-size:13px;color:#C8A161;font-weight:600;margin-top:2px;">www.carchecking.com.ar</div>
      <div style="font-size:11px;color:#999;margin-top:1px;">Informe de multas e infracciones</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:28px;font-weight:800;letter-spacing:4px;color:#111;background:#f5f0e8;border:2px solid #C8A161;border-radius:8px;padding:8px 18px;">${searched}</div>
      <div style="font-size:11px;color:#999;margin-top:4px;">${date}</div>
    </div>
  </div>

  <!-- Vehicle -->
  <div style="background:#f9f9f9;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
    ${vehicleRow}
  </div>

  <!-- Multas -->
  <div style="margin-bottom:24px;">
    <h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;margin-bottom:10px;">Multas de tránsito</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <thead><tr style="background:#f3f4f6;">
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:left;color:#374151;">Jurisdicción</th>
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:left;color:#374151;">Estado</th>
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:right;color:#374151;">Importe</th>
      </tr></thead>
      <tbody>${multaRows || '<tr><td colspan="3" style="padding:12px;text-align:center;color:#999;font-size:13px;">Sin datos de multas</td></tr>'}</tbody>
    </table>
    ${totalInfracciones > 0 ? `<div style="text-align:right;margin-top:8px;font-size:13px;color:#b45309;font-weight:700;">Total: ${fmtCurrency(totalImporte)}</div>` : ''}
  </div>

  <!-- VTV -->
  <div style="margin-bottom:24px;">
    <h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;margin-bottom:10px;">Verificación Técnica (VTV / ITV / RTO)</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <thead><tr style="background:#f3f4f6;">
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:left;color:#374151;">Organismo</th>
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:left;color:#374151;">Estado</th>
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:right;color:#374151;">Vencimiento</th>
      </tr></thead>
      <tbody>${vtvHtml || '<tr><td colspan="3" style="padding:12px;text-align:center;color:#999;font-size:13px;">Sin datos de VTV</td></tr>'}</tbody>
    </table>
  </div>

  <!-- Patentes -->
  <div style="margin-bottom:32px;">
    <h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;margin-bottom:10px;">Deuda de Patentes</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <thead><tr style="background:#f3f4f6;">
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:left;color:#374151;">Organismo</th>
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:left;color:#374151;">Estado</th>
        <th style="padding:9px 12px;font-size:12px;font-weight:700;text-align:right;color:#374151;">Importe</th>
      </tr></thead>
      <tbody>${arbaRow}${agipRow || '<tr><td colspan="3" style="padding:12px;text-align:center;color:#999;font-size:13px;">Sin datos de patentes</td></tr>'}</tbody>
    </table>
  </div>

  <!-- Footer -->
  <div style="border-top:1px solid #e5e7eb;padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:11px;color:#bbb;">Informe generado por carChecking · carchecking.com.ar</div>
    <div style="font-size:11px;color:#bbb;">Los datos son informativos. Verificar en los organismos oficiales.</div>
  </div>
</body></html>`;

    const win = window.open('', '_blank');
    if (!win) { alert('Permitir ventanas emergentes para descargar el PDF.'); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 600);
  }

  /** Fire API calls for a subset of fuentes, updating results in place (does not reset state). */
  async function runFuenteQueries(clean: string, fuentes: typeof FUENTES, rc: string) {
    fuentes.forEach(async ({ value }) => {
      try {
        const res = await callMultasApi(
          `${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=${value}${rc}`,
          AbortSignal.timeout(TWO_STEP_FUENTES.has(value) ? 90_000 : 70_000)
        );
        const data = await res.json();
        if (!res.ok || data.error) {
          setResults(prev => prev && ({
            ...prev,
            [value]: { status: 'error', infracciones: [], error: data.error || 'Portal no disponible' },
          }));
        } else if (data.manualUrl) {
          setResults(prev => prev && ({
            ...prev,
            [value]: { status: 'manual', infracciones: [], manualUrl: data.manualUrl },
          }));
        } else {
          setResults(prev => prev && ({
            ...prev,
            [value]: {
              status: data.infracciones.length > 0 ? 'ok' : 'empty',
              infracciones: data.infracciones,
            },
          }));
        }
      } catch (err: unknown) {
        const isTimeout = err instanceof Error && err.name === 'TimeoutError';
        setResults(prev => prev && ({
          ...prev,
          [value]: {
            status: 'error',
            infracciones: [],
            error: isTimeout ? 'Tiempo de espera agotado' : 'No se pudo conectar con el portal',
          },
        }));
      }
    });
  }

  /** Fire all auxiliary (VTV, vehicle, patentes) queries in parallel. */
  function runAuxQueries(clean: string, rc: string) {
    // DNRPA vehicle lookup
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=dnrpa${rc}`, AbortSignal.timeout(120_000))
      .then(r => r.json())
      .then(data => {
        if (data.vehiculo) {
          setVehiculo({ status: 'ok', ...data.vehiculo });
        } else {
          setVehiculo({ status: 'error', error: data.error || 'No encontrado' });
        }
      })
      .catch(() => setVehiculo({ status: 'error', error: 'No se pudo identificar el vehículo' }));

    // VTV lookup
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=vtv${rc}`, AbortSignal.timeout(120_000))
      .then(r => r.json())
      .then(data => {
        if (data.historial !== undefined) {
          setVtvState({ status: data.historial.length > 0 ? 'ok' : 'empty', historial: data.historial });
        } else {
          setVtvState({ status: 'error', historial: [], error: data.error || 'Error al consultar VTV' });
        }
      })
      .catch(() => setVtvState({ status: 'error', historial: [], error: 'No se pudo conectar con el portal VTV' }));

    // ITV Córdoba
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=vtv-cordoba${rc}`, AbortSignal.timeout(60_000))
      .then(r => r.json())
      .then(data => {
        if (data.historial !== undefined) {
          setVtvCordobaState({ status: data.historial.length > 0 ? 'ok' : 'empty', historial: data.historial });
        } else {
          setVtvCordobaState({ status: 'error', historial: [], error: data.error || 'Error al consultar ITV Córdoba' });
        }
      })
      .catch(() => setVtvCordobaState({ status: 'error', historial: [], error: 'No se pudo conectar con ITV Córdoba' }));

    // RTO Santa Fe
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=vtv-santafe${rc}`, AbortSignal.timeout(90_000))
      .then(r => r.json())
      .then(data => {
        if (data.manualUrl) {
          setVtvSantaFeState({ status: 'manual', historial: [], manualUrl: data.manualUrl });
        } else if (data.historial !== undefined) {
          setVtvSantaFeState({ status: data.historial.length > 0 ? 'ok' : 'empty', historial: data.historial });
        } else {
          setVtvSantaFeState({ status: 'error', historial: [], error: data.error || 'Error al consultar RTO Santa Fe' });
        }
      })
      .catch(() => setVtvSantaFeState({ status: 'error', historial: [], error: 'No se pudo conectar con RTO Santa Fe' }));

    // RTO Catamarca
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=vtv-catamarca${rc}`, AbortSignal.timeout(30_000))
      .then(r => r.json())
      .then(data => {
        if (data.historial !== undefined) {
          setVtvCatamarcaState({ status: data.historial.length > 0 ? 'ok' : 'empty', historial: data.historial });
        } else {
          setVtvCatamarcaState({ status: 'error', historial: [], error: data.error || 'Error al consultar RTO Catamarca' });
        }
      })
      .catch(() => setVtvCatamarcaState({ status: 'error', historial: [], error: 'No se pudo conectar con RTO Catamarca' }));

    // ACOR Corrientes
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=patentes-corrientes${rc}`, AbortSignal.timeout(60_000))
      .then(r => r.json())
      .then(data => {
        const a = data.acor;
        if (!a) { setAcorState({ status: 'error', error: data.error || 'Error ACOR' }); return; }
        if (a.tieneDeuda === null) { setAcorState({ status: 'empty', tieneDeuda: null, error: a.error }); return; }
        setAcorState({ status: a.tieneDeuda ? 'ok' : 'empty', tieneDeuda: a.tieneDeuda, monto: a.monto });
      })
      .catch(() => setAcorState({ status: 'error', error: 'No se pudo conectar con ACOR' }));

    // ARBA
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=arba${rc}`, AbortSignal.timeout(120_000))
      .then(r => r.json())
      .then(data => {
        const a = data.arba;
        if (!a) { setArbaState({ status: 'error', error: data.error || 'Error al consultar ARBA' }); return; }
        if (a.manualUrl) { setArbaState({ status: 'manual', manualUrl: a.manualUrl }); return; }
        if (a.tieneDeuda === null) { setArbaState({ status: 'empty', tieneDeuda: null, error: a.error }); return; }
        setArbaState({ status: a.tieneDeuda ? 'ok' : 'empty', tieneDeuda: a.tieneDeuda, periodos: a.periodos || [], total: a.total });
      })
      .catch(() => setArbaState({ status: 'error', error: 'No se pudo conectar con ARBA' }));

    // AGIP
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=agip${rc}`, AbortSignal.timeout(120_000))
      .then(r => r.json())
      .then(data => {
        const a = data.agip;
        if (!a) { setAgipState({ status: 'error', error: data.error || 'Error al consultar AGIP' }); return; }
        if (a.tieneDeuda === null) { setAgipState({ status: 'empty', tieneDeuda: null, error: a.error }); return; }
        setAgipState({ status: a.tieneDeuda ? 'ok' : 'empty', tieneDeuda: a.tieneDeuda, posiciones: a.posiciones || [], total: a.total, vehiculo: a.vehiculo });
      })
      .catch(() => setAgipState({ status: 'error', error: 'No se pudo conectar con AGIP' }));
  }

  async function executeQueries(clean: string, fuentes: typeof FUENTES) {
    setShowPaymentModal(false);

    trackEvent('multa_search', { dominio: clean, format: clean.length === 6 ? 'antiguo' : 'mercosur' });

    setSearched(clean);
    setExpanded(new Set());
    setVehiculo({ status: 'loading' });
    setActiveFuentes(fuentes);

    const initial: Record<string, JurisdiccionState> = {};
    fuentes.forEach(f => { initial[f.value] = { status: 'loading', infracciones: [] }; });
    setResults(initial);
    setVtvState({ status: 'loading', historial: [] });
    setVtvCordobaState({ status: 'loading', historial: [] });
    setVtvSantaFeState({ status: 'loading', historial: [] });
    setVtvCatamarcaState({ status: 'loading', historial: [] });
    setArbaState({ status: 'loading' });
    setAgipState({ status: 'loading' });
    setAcorState({ status: 'loading' });
    setActiveTab('multas');

    // Get reCAPTCHA v3 token (invisible — no user interaction)
    let rcToken = '';
    try { rcToken = await executeRecaptcha?.('consultar_multa') ?? ''; } catch (_) {}
    const rc = rcToken ? `&rcToken=${encodeURIComponent(rcToken)}` : '';

    runAuxQueries(clean, rc);
    runFuenteQueries(clean, fuentes, rc);
  }

  const totalInfracciones = results
    ? Object.values(results).reduce((n, r) => n + r.infracciones.length, 0)
    : 0;
  const totalImporte = results
    ? Object.values(results).reduce((sum, r) =>
        sum + r.infracciones.reduce((s, inf) => s + (inf.importe || 0), 0), 0)
    : 0;
  const loaded    = results ? Object.values(results).filter(r => r.status !== 'loading').length  : 0;
  const withFines = results ? Object.values(results).filter(r => r.status === 'ok').length : 0;

  return (
    <>
      {content?.faq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }) }} />
      )}

      {/* Payment modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#111113] border border-[#2a2a2c] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-[#555] hover:text-[#F4F1EC] transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-[#C8A161] flex-shrink-0" />
                <h2 className="text-xl md:text-2xl font-bold text-[#F4F1EC] leading-tight">
                  Consulta todos estos registros en 2 minutos
                </h2>
              </div>
              <p className="text-sm text-[#B8B2AA] mb-6">
                Patente <span className="font-bold text-[#F4F1EC] tracking-widest">{pendingDominio}</span> · {pendingFuentes.length} registros oficiales
              </p>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Locations list */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#B8B2AA] uppercase tracking-wider mb-3">Registros que consultamos</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {pendingFuentes.map(f => (
                      <div key={f.slug} className="flex items-center gap-2 text-xs text-[#B8B2AA]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C8A161] flex-shrink-0" />
                        <span className="truncate">{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR + payment */}
                <div className="flex flex-col items-center gap-4 md:border-l md:border-[#2a2a2c] md:pl-6 min-w-[200px]">
                  {paymentStatus === 'creating' && (
                    <div className="flex flex-col items-center gap-3 py-8">
                      <Loader2 className="w-8 h-8 text-[#C8A161] animate-spin" />
                      <p className="text-sm text-[#B8B2AA]">Generando QR de pago…</p>
                    </div>
                  )}

                  {paymentStatus === 'error' && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                      <XCircle className="w-8 h-8 text-red-500" />
                      <p className="text-sm text-[#B8B2AA]">{paymentError}</p>
                      <button
                        onClick={() => setShowPaymentModal(false)}
                        className="text-xs text-[#C8A161] hover:underline"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  )}

                  {paymentStatus === 'paid' && (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                      <p className="text-base font-semibold text-[#F4F1EC]">¡Pago confirmado!</p>
                      <div className="flex items-center gap-2 text-sm text-[#B8B2AA]">
                        <Loader2 className="w-4 h-4 animate-spin text-[#C8A161]" />
                        Cargando jurisdicciones…
                      </div>
                    </div>
                  )}

                  {paymentStatus === 'waiting' && mpInitPoint && (
                    <>
                      <div className="bg-white p-3 rounded-xl">
                        <QRCodeSVG value={mpInitPoint} size={160} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[#B8B2AA] mb-1">Escaneá con la app de MercadoPago</p>
                        <a
                          href={mpInitPoint}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#C8A161] hover:underline"
                        >
                          O hacé clic aquí →
                        </a>
                      </div>
                      <button
                        onClick={handleManualVerify}
                        disabled={verifyingPayment}
                        className="w-full text-sm font-semibold text-[#C8A161] border border-[#C8A161]/40 hover:bg-[#C8A161]/10 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {verifyingPayment
                          ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Verificando…</>
                          : 'Ya pagué →'
                        }
                      </button>
                      {verifyMessage && (
                        <p className="text-xs text-[#B8B2AA] text-center leading-snug">{verifyMessage}</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-6 pt-6 border-t border-[#2a2a2c]">
                {paymentStatus === 'waiting' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-[#B8B2AA]">
                    <Loader2 className="w-4 h-4 animate-spin text-[#C8A161]" />
                    Esperando confirmación de pago… los resultados se cargan automáticamente.
                  </div>
                )}
                {paymentStatus === 'creating' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-[#555]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Preparando pago…
                  </div>
                )}
                {paymentStatus === 'error' && (
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full text-center text-sm text-[#555] hover:text-[#B8B2AA] transition-colors"
                  >
                    Cerrar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-28 pb-20">
          <div className="px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-6">
                <Link href="/" className="hover:text-[#C8A161] transition-colors">Inicio</Link>
                <span>/</span>
                {jurisdiccion ? (
                  <>
                    <Link href="/consultar-multa" className="hover:text-[#C8A161] transition-colors">Consultar Multa</Link>
                    <span>/</span>
                    <span className="text-[#C8A161]">{jurisdiccion.label}</span>
                  </>
                ) : (
                  <span className="text-[#C8A161]">Consultar Multa</span>
                )}
              </div>

              {/* Header */}
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#F4F1EC] mb-4 leading-tight">
                  {jurisdiccion
                    ? `Consultar Multas en ${jurisdiccion.label}`
                    : 'Consultar Multas por Patente en Argentina'}
                </h1>
                <p className="text-lg text-[#B8B2AA] leading-relaxed max-w-2xl">
                  {content?.intro ?? (jurisdiccion
                    ? `Ingresá la patente y consultamos los registros oficiales de infracciones de ${jurisdiccion.label}.`
                    : `Ingresá la patente y consultamos simultáneamente los registros oficiales de las ${FUENTES.length} principales jurisdicciones del país.`)}
                </p>
              </div>

              {/* Search form */}
              <form onSubmit={handleSubmit} className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-6 md:p-8 mb-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="dominio" className="block text-xs font-semibold text-[#B8B2AA] uppercase tracking-wider mb-2">
                      Patente / Dominio
                    </label>
                    <input
                      id="dominio"
                      type="text"
                      value={dominio}
                      onChange={e => setDominio(e.target.value.toUpperCase())}
                      placeholder="ABC123 o AB123CD"
                      maxLength={7}
                      required
                      className="w-full bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg px-4 py-3 text-[#F4F1EC] placeholder-[#444] text-2xl font-bold tracking-widest text-center focus:outline-none focus:border-[#C8A161] transition-colors"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={
                        (dominio.replace(/\s/g, '').length < 6 || dominio.replace(/\s/g, '').length > 7) ||
                        (results !== null && loaded < activeFuentes.length)
                      }
                      className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-8 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      <Search className="w-4 h-4" />
                      Consultar
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#555] mt-3">
                  {jurisdiccion
                    ? `Formato antiguo (ABC123) o Mercosur (AB123CD) · Consulta en ${jurisdiccion.label}`
                    : `Formato antiguo (ABC123) o Mercosur (AB123CD) · Se consultan ${FUENTES.length} jurisdicciones en simultáneo`}
                </p>
              </form>

              {/* Results */}
              {results && (
                <>
                  {/* Vehicle info card */}
                  {vehiculo && (
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl px-5 py-4 mb-4 flex items-center gap-4">
                      {vehiculo.status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 text-[#555] animate-spin flex-shrink-0" />
                          <span className="text-sm text-[#555]">Identificando vehículo…</span>
                        </>
                      ) : vehiculo.status === 'ok' ? (
                        <>
                          <div className="flex-1 min-w-0">
                            <p className="text-lg font-bold text-[#F4F1EC] leading-tight truncate">
                              {vehiculo.marca} {vehiculo.modelo}
                            </p>
                            {vehiculo.anio && (
                              <p className="text-sm text-[#B8B2AA] mt-0.5">
                                <span className="text-[#555]">Año:</span> {vehiculo.anio}
                              </p>
                            )}
                            {vehiculo.registro && (
                              <p className="text-sm text-[#B8B2AA]">
                                <span className="text-[#555]">Registro:</span> {vehiculo.registro}{vehiculo.localidad ? `, ${vehiculo.localidad}` : ''}
                              </p>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded flex-shrink-0">
                            DNRPA
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-[#444] flex-shrink-0" />
                          <span className="text-sm text-[#555]">{vehiculo.error}</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Total de multas banner */}
                  <div className={`rounded-xl border mb-6 p-5 ${
                    totalInfracciones > 0 ? 'bg-amber-950/20 border-amber-700/40' : 'bg-[#141416] border-[#2a2a2c]'
                  }`}>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-2">Total de multas — {searched}</p>
                        <div className="flex items-baseline gap-3">
                          <span className={`text-5xl font-bold ${totalInfracciones > 0 ? 'text-amber-400' : 'text-[#555]'}`}>
                            {totalInfracciones}
                          </span>
                          {totalInfracciones > 0 && (
                            <span className="text-sm text-[#B8B2AA]">
                              en {withFines} jurisdicción{withFines !== 1 ? 'es' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {totalImporte > 0 && (
                          <div className="text-right">
                            <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-1">Importe total</p>
                            <p className="text-2xl font-bold text-[#C8A161]">${totalImporte.toLocaleString('es-AR')}</p>
                          </div>
                        )}
                        <p className="text-xs text-[#555]">
                          {loaded < activeFuentes.length
                            ? `Consultando… ${loaded}/${activeFuentes.length} jurisdicciones`
                            : loaded === activeFuentes.length && totalInfracciones === 0
                              ? 'Sin infracciones en ninguna jurisdicción'
                              : `${loaded}/${activeFuentes.length} jurisdicciones consultadas`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PDF download */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 text-sm font-semibold text-[#C8A161] border border-[#C8A161]/40 hover:bg-[#C8A161]/10 px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Descargar PDF
                    </button>
                  </div>

                  {/* Tab navigation */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {(['multas', 'vtv', 'patentes'] as const).map(tab => {
                      const labels = { multas: 'Multas', vtv: 'VTV', patentes: 'Patentes' };
                      const arbaDebt = arbaState?.tieneDeuda === true;
                      const agipDebt = agipState?.tieneDeuda === true;
                      const acorDebt = acorState?.tieneDeuda === true;
                      const allVtv = [vtvState, vtvCordobaState, vtvSantaFeState, vtvCatamarcaState];
                      const anyVtvOk = allVtv.some(s => s?.status === 'ok' && s.historial.length > 0);
                      const anyVtvVencida = allVtv.some(s => s?.status === 'ok' && s.historial[0] && !s.historial[0].vigente);
                      const badge =
                        tab === 'multas' && totalInfracciones > 0 ? String(totalInfracciones)
                        : tab === 'vtv' && anyVtvOk ? (anyVtvVencida ? '!' : '✓')
                        : tab === 'patentes' && (arbaDebt || agipDebt || acorDebt) ? '!'
                        : null;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            activeTab === tab
                              ? 'bg-[#C8A161] text-[#0B0B0D]'
                              : 'bg-[#141416] border border-[#2a2a2c] text-[#B8B2AA] hover:text-[#F4F1EC] hover:border-[#3a3a3c]'
                          }`}
                        >
                          {labels[tab]}
                          {badge && (
                            <span className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                              activeTab === tab ? 'bg-[#0B0B0D]/20 text-[#0B0B0D]' : 'bg-amber-900/30 text-amber-400'
                            }`}>{badge}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Multas tab */}
                  {activeTab === 'multas' && (
                  <div className="mb-16">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeFuentes.map(({ value, label, sub }) => {
                      const r = results[value];
                      const isExpanded = expanded.has(value);
                      // Free fuentes: hide errors — treat as empty (sin multas)
                      const displayStatus = (FREE_MULTA_FUENTES.has(value) && r.status === 'error') ? 'empty' : r.status;

                      return (
                        <div
                          key={value}
                          className={`border rounded-xl overflow-hidden transition-colors ${
                            displayStatus === 'ok'    ? 'border-amber-700/60'
                          : displayStatus === 'manual' ? 'border-[#3a3a2c]'
                          : 'border-[#2a2a2c]'
                          }`}
                        >
                          {/* Card header — clickable only when has results */}
                          <div
                            className={`flex items-center gap-3 px-4 py-3 bg-[#141416] ${displayStatus === 'ok' ? 'cursor-pointer hover:bg-[#1a1a1c] transition-colors' : ''}`}
                            onClick={() => displayStatus === 'ok' && setExpanded(prev => { const s = new Set(prev); isExpanded ? s.delete(value) : s.add(value); return s; })}
                          >
                            {/* Status icon */}
                            <div className="flex-shrink-0 w-5 flex justify-center">
                              {displayStatus === 'loading' && (
                                <Loader2 className="w-4 h-4 text-[#555] animate-spin" />
                              )}
                              {displayStatus === 'ok' && (
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                              )}
                              {displayStatus === 'empty' && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              {displayStatus === 'error' && (
                                <XCircle className="w-4 h-4 text-[#555]" />
                              )}
                              {displayStatus === 'manual' && (
                                <ExternalLink className="w-4 h-4 text-[#C8A161]" />
                              )}
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${displayStatus === 'ok' ? 'text-[#F4F1EC]' : 'text-[#B8B2AA]'}`}>
                                {label}
                              </p>
                              <p className="text-xs text-[#555] truncate">{sub}</p>
                            </div>

                            {/* Right side */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                              {displayStatus === 'loading' && (
                                <span className="text-xs text-[#555]">consultando…</span>
                              )}
                              {displayStatus === 'ok' && (
                                <>
                                  {(() => {
                                    const total = r.infracciones.reduce((s, inf) => s + (inf.importe || 0), 0);
                                    return total > 0 ? (
                                      <span className="text-xs font-semibold text-[#C8A161]">
                                        ${total.toLocaleString('es-AR')}
                                      </span>
                                    ) : null;
                                  })()}
                                  <span className="text-xs font-bold text-amber-400 bg-amber-900/20 px-2 py-0.5 rounded-full">
                                    {r.infracciones.length} acta{r.infracciones.length !== 1 ? 's' : ''}
                                  </span>
                                  {isExpanded
                                    ? <ChevronUp className="w-4 h-4 text-[#B8B2AA]" />
                                    : <ChevronDown className="w-4 h-4 text-[#B8B2AA]" />
                                  }
                                </>
                              )}
                              {displayStatus === 'empty' && (
                                <span className="text-xs text-green-500">Sin multas</span>
                              )}
                              {displayStatus === 'manual' && (
                                <a href={r.manualUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C8A161] hover:underline whitespace-nowrap" onClick={e => e.stopPropagation()}>
                                  Verificar manualmente →
                                </a>
                              )}
                              {displayStatus === 'error' && (
                                <span className="text-xs text-[#555] max-w-[120px] truncate" title={r.error}>
                                  {r.error}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expanded infractions */}
                          {isExpanded && displayStatus === 'ok' && (
                            <div className="bg-[#0f0f11] border-t border-[#2a2a2c] divide-y divide-[#1e1e20]">
                              {r.infracciones.map((inf, i) => (
                                <div key={i} className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
                                  {inf.descripcion && (
                                    <div className="col-span-2">
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Infracción</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.descripcion}</p>
                                    </div>
                                  )}
                                  {inf.normativa && (
                                    <div className="col-span-2">
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Normativa</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.normativa}</p>
                                    </div>
                                  )}
                                  {inf.fecha && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Fecha</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.fecha}</p>
                                    </div>
                                  )}
                                  {inf.vencimiento && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Vencimiento</p>
                                      <p className="text-sm text-amber-400">{inf.vencimiento}</p>
                                    </div>
                                  )}
                                  {inf.acta && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Acta</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.acta}</p>
                                    </div>
                                  )}
                                  {inf.tipo && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Tipo</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.tipo}</p>
                                    </div>
                                  )}
                                  {inf.municipio && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Municipio</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.municipio}</p>
                                    </div>
                                  )}
                                  {inf.lugar && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Lugar</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.lugar}</p>
                                    </div>
                                  )}
                                  {inf.importe !== null ? (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Importe</p>
                                      <p className="text-sm font-bold text-[#C8A161]">
                                        ${inf.importe.toLocaleString('es-AR')}
                                      </p>
                                    </div>
                                  ) : inf.url ? (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Importe</p>
                                      <a href={inf.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#C8A161] underline underline-offset-2">
                                        Ver importe →
                                      </a>
                                    </div>
                                  ) : null}
                                  <div>
                                    <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Estado</p>
                                    <p className={`text-sm font-semibold capitalize ${inf.estado === 'pagada' ? 'text-green-400' : 'text-amber-400'}`}>
                                      {inf.estado}
                                    </p>
                                  </div>
                                  {inf.jurisdiccion && inf.jurisdiccion !== 'Provincia de Buenos Aires' && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Juzgado</p>
                                      <p className="text-sm text-[#F4F1EC]">{inf.jurisdiccion}</p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Inline paywall section — only after free results finish loading ── */}
                  {!freeMode && pendingFuentes.length > 0 && paymentStatus !== 'paid' && loaded >= activeFuentes.length && (
                    <div className="relative mt-6 rounded-2xl overflow-hidden border border-[#C8A161]/30 bg-gradient-to-br from-[#141410] via-[#18170f] to-[#0f0f0d]">
                      {/* shimmer top border */}
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A161]/70 to-transparent" />

                      <div className="px-6 py-8 md:px-10">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#C8A161]/15 border border-[#C8A161]/30 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-[#C8A161]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#F4F1EC] mb-1">
                              Consultá las {pendingFuentes.length} jurisdicciones restantes
                            </h3>
                            <p className="text-sm text-[#B8B2AA] leading-relaxed max-w-lg">
                              Ya tenés los 4 resultados gratuitos de arriba. Para consultar el resto de Argentina —
                              ANSV nacional, Buenos Aires, CABA, Córdoba, Salta y más — pagá una vez y los resultados aparecen al instante.
                            </p>
                          </div>
                        </div>

                        {/* Locked locations grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                          {pendingFuentes.map(f => (
                            <div key={f.slug} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0c0c0a] border border-[#252520]">
                              <svg className="w-3 h-3 text-[#444] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                              <span className="text-xs text-[#505040] truncate">{f.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex">
                          <button
                            onClick={handleStartPayment}
                            disabled={paymentStatus === 'creating'}
                            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 px-8 py-3 text-base font-bold whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {paymentStatus === 'creating' ? (
                              <><Loader2 className="w-4 h-4 animate-spin" />Preparando pago…</>
                            ) : (
                              <>Consultar todas las jurisdicciones →</>
                            )}
                          </button>
                        </div>

                        {/* Trust signals */}
                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-5 pt-5 border-t border-[#252520]">
                          {[
                            'Fuentes oficiales del estado',
                            'Resultados en menos de 2 min',
                            'Pago seguro por MercadoPago',
                          ].map(t => (
                            <div key={t} className="flex items-center gap-1.5 text-xs text-[#555]">
                              <CheckCircle className="w-3 h-3 text-[#C8A161] flex-shrink-0" />
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                  )}

                  {/* VTV tab */}
                  {activeTab === 'vtv' && (
                    <div className="mb-16 space-y-4">

                      {/* ── Buenos Aires (PBA) VTV ─────────────────────────── */}
                      <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#F4F1EC]">Buenos Aires Provincia</p>
                            <p className="text-xs text-[#555]">Verificación Técnica Vehicular (VTV)</p>
                          </div>
                          <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">VTV PBA</span>
                        </div>
                        <div className="p-5">
                          {!vtvState || vtvState.status === 'loading' ? (
                            <div className="flex items-center gap-3"><Loader2 className="w-4 h-4 text-[#555] animate-spin" /><span className="text-sm text-[#B8B2AA]">Consultando VTV…</span></div>
                          ) : vtvState.status === 'error' ? (
                            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#555]" /><span className="text-sm text-[#555]">{vtvState.error}</span></div>
                          ) : vtvState.status === 'empty' ? (
                            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#444]" /><span className="text-sm text-[#555]">Sin registros de VTV en Buenos Aires Provincia</span></div>
                          ) : (() => {
                            const latest = vtvState.historial[0];
                            return (
                              <div>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                  <div>
                                    <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-1">Última verificación</p>
                                    <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${latest.vigente ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'}`}>
                                      {latest.vigente ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                      {latest.vigente ? 'VIGENTE' : 'VENCIDA'}
                                    </span>
                                  </div>
                                  {latest.numero_oblea && (
                                    <div className="text-right"><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">N° Oblea</p><p className="text-sm font-mono text-[#F4F1EC]">{latest.numero_oblea}</p></div>
                                  )}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                                  {(latest.marca || latest.modelo) && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Vehículo</p><p className="text-sm text-[#F4F1EC]">{latest.marca} {latest.modelo}{latest.anio ? ` (${latest.anio})` : ''}</p></div>}
                                  {latest.fecha_verificacion && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Fecha verificación</p><p className="text-sm text-[#F4F1EC]">{latest.fecha_verificacion}</p></div>}
                                  {latest.fecha_vencimiento && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Vencimiento</p><p className={`text-sm font-semibold ${latest.vigente ? 'text-green-400' : 'text-amber-400'}`}>{latest.fecha_vencimiento}</p></div>}
                                  {latest.planta && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Planta</p><p className="text-sm text-[#F4F1EC]">{latest.planta}</p></div>}
                                  {latest.importe && !isNaN(Number(latest.importe)) && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Importe</p><p className="text-sm font-bold text-[#C8A161]">${Number(latest.importe).toLocaleString('es-AR')}</p></div>}
                                </div>
                                {latest.defectos.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-[#2a2a2c]">
                                    <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-1.5">Defectos</p>
                                    <div className="flex flex-wrap gap-1.5">{latest.defectos.map((d, i) => <span key={i} className="text-xs text-amber-400 bg-amber-900/20 border border-amber-800/30 px-2 py-0.5 rounded">{d}</span>)}</div>
                                  </div>
                                )}
                                {vtvState.historial.length > 1 && (
                                  <div className="mt-4 border border-[#2a2a2c] rounded-lg overflow-hidden">
                                    <p className="text-xs font-semibold text-[#B8B2AA] uppercase tracking-wider px-3 py-2 border-b border-[#2a2a2c]">Historial — {vtvState.historial.length} verificaciones</p>
                                    <div className="divide-y divide-[#1e1e20]">
                                      {vtvState.historial.slice(1).map((e, i) => (
                                        <div key={i} className="px-3 py-2 flex items-center gap-3">
                                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${e.vigente ? 'bg-green-500' : 'bg-[#444]'}`} />
                                          <p className="text-sm text-[#F4F1EC] flex-1">{e.fecha_verificacion || '—'}</p>
                                          <p className={`text-xs font-semibold flex-shrink-0 ${e.vigente ? 'text-green-400' : 'text-[#555]'}`}>vto. {e.fecha_vencimiento || '—'}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* ── Córdoba ITV ──────────────────────────────────── */}
                      {(() => {
                        const s = vtvCordobaState;
                        const latest = s?.historial[0];
                        return (
                          <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                              <div><p className="text-sm font-semibold text-[#F4F1EC]">Córdoba (Capital)</p><p className="text-xs text-[#555]">Inspección Técnica Vehicular (ITV)</p></div>
                              <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">ITV CBA</span>
                            </div>
                            <div className="p-5">
                              {!s || s.status === 'loading' ? (
                                <div className="flex items-center gap-3"><Loader2 className="w-4 h-4 text-[#555] animate-spin" /><span className="text-sm text-[#B8B2AA]">Consultando ITV Córdoba…</span></div>
                              ) : s.status === 'error' ? (
                                <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#555]" /><span className="text-sm text-[#555]">{s.error}</span></div>
                              ) : s.status === 'empty' || !latest ? (
                                <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#444]" /><span className="text-sm text-[#555]">Sin registros de ITV en Córdoba Capital</span></div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${latest.vigente ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'}`}>
                                      {latest.vigente ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                      {latest.estado || (latest.vigente ? 'VIGENTE' : 'VENCIDA')}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    {latest.fecha_verificacion && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Fecha</p><p className="text-sm text-[#F4F1EC]">{latest.fecha_verificacion}</p></div>}
                                    {latest.fecha_vencimiento && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Vencimiento</p><p className={`text-sm font-semibold ${latest.vigente ? 'text-green-400' : 'text-amber-400'}`}>{latest.fecha_vencimiento}</p></div>}
                                  </div>
                                  {s.historial.length > 1 && (
                                    <div className="mt-3 border border-[#2a2a2c] rounded-lg overflow-hidden">
                                      <div className="divide-y divide-[#1e1e20]">
                                        {s.historial.slice(1).map((e, i) => (
                                          <div key={i} className="px-3 py-2 flex items-center gap-3">
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${e.vigente ? 'bg-green-500' : 'bg-[#444]'}`} />
                                            <p className="text-sm text-[#F4F1EC] flex-1">{e.fecha_verificacion || '—'}</p>
                                            <p className={`text-xs font-semibold flex-shrink-0 ${e.vigente ? 'text-green-400' : 'text-[#555]'}`}>vto. {e.fecha_vencimiento || '—'}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}

                      {/* ── Santa Fe RTO ─────────────────────────────────── */}
                      {(() => {
                        const s = vtvSantaFeState;
                        const latest = s?.historial[0];
                        return (
                          <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                              <div><p className="text-sm font-semibold text-[#F4F1EC]">Santa Fe</p><p className="text-xs text-[#555]">Revisión Técnica Obligatoria (RTO)</p></div>
                              <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">RTO SF</span>
                            </div>
                            <div className="p-5">
                              {!s || s.status === 'loading' ? (
                                <div className="flex items-center gap-3"><Loader2 className="w-4 h-4 text-[#555] animate-spin" /><span className="text-sm text-[#B8B2AA]">Consultando RTO Santa Fe…</span></div>
                              ) : s.status === 'manual' ? (
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm text-[#B8B2AA]">Requiere verificación manual</span>
                                  <a href={s.manualUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C8A161] hover:underline whitespace-nowrap inline-flex items-center gap-1">Ver en RTO <ExternalLink className="w-3 h-3" /></a>
                                </div>
                              ) : s.status === 'error' ? (
                                <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#555]" /><span className="text-sm text-[#555]">{s.error}</span></div>
                              ) : s.status === 'empty' || !latest ? (
                                <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#444]" /><span className="text-sm text-[#555]">Sin registros de RTO en Santa Fe</span></div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${latest.vigente ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'}`}>
                                      {latest.vigente ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                      {latest.estado || (latest.vigente ? 'VIGENTE' : 'VENCIDA')}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    {latest.fecha_verificacion && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Fecha</p><p className="text-sm text-[#F4F1EC]">{latest.fecha_verificacion}</p></div>}
                                    {latest.fecha_vencimiento && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Vencimiento</p><p className={`text-sm font-semibold ${latest.vigente ? 'text-green-400' : 'text-amber-400'}`}>{latest.fecha_vencimiento}</p></div>}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}

                      {/* ── Catamarca RTO ────────────────────────────────── */}
                      {(() => {
                        const s = vtvCatamarcaState;
                        const latest = s?.historial[0];
                        return (
                          <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                              <div><p className="text-sm font-semibold text-[#F4F1EC]">Catamarca</p><p className="text-xs text-[#555]">Revisión Técnica Obligatoria (RTO)</p></div>
                              <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">RTO CAT</span>
                            </div>
                            <div className="p-5">
                              {!s || s.status === 'loading' ? (
                                <div className="flex items-center gap-3"><Loader2 className="w-4 h-4 text-[#555] animate-spin" /><span className="text-sm text-[#B8B2AA]">Consultando RTO Catamarca…</span></div>
                              ) : s.status === 'error' ? (
                                <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#555]" /><span className="text-sm text-[#555]">{s.error}</span></div>
                              ) : s.status === 'empty' || !latest ? (
                                <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#444]" /><span className="text-sm text-[#555]">Sin registros de RTO en Catamarca</span></div>
                              ) : (
                                <div>
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${latest.vigente ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'}`}>
                                      {latest.vigente ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                      {latest.estado || (latest.vigente ? 'VIGENTE' : 'VENCIDA')}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    {latest.fecha_verificacion && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Fecha</p><p className="text-sm text-[#F4F1EC]">{latest.fecha_verificacion}</p></div>}
                                    {latest.fecha_vencimiento && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Vencimiento</p><p className={`text-sm font-semibold ${latest.vigente ? 'text-green-400' : 'text-amber-400'}`}>{latest.fecha_vencimiento}</p></div>}
                                    {latest.planta && <div><p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Certificado</p><p className="text-sm text-[#F4F1EC]">{latest.planta}</p></div>}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  )}

                  {/* Patentes tab */}
                  {activeTab === 'patentes' && (
                    <div className="mb-16 space-y-4">

                      {/* ARBA — Buenos Aires Provincia */}
                      <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#F4F1EC]">ARBA — Provincia de Buenos Aires</p>
                            <p className="text-xs text-[#555]">Deuda de patentes automotor</p>
                          </div>
                          <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">ARBA</span>
                        </div>
                        <div className="p-5">
                          {!arbaState || arbaState.status === 'loading' ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-4 h-4 text-[#555] animate-spin" />
                              <span className="text-sm text-[#B8B2AA]">Consultando ARBA…</span>
                            </div>
                          ) : arbaState.status === 'manual' ? (
                            <div className="text-center py-2">
                              <p className="text-sm text-[#B8B2AA] mb-3">La consulta requiere verificación manual en ARBA.</p>
                              <a href={arbaState.manualUrl} target="_blank" rel="noopener noreferrer"
                                className="btn-primary text-sm px-5 py-2 inline-flex items-center gap-2">
                                Consultar en ARBA <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          ) : arbaState.status === 'error' ? (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-[#555] flex-shrink-0" />
                              <span className="text-sm text-[#555]">{arbaState.error || 'Error al consultar ARBA'}</span>
                            </div>
                          ) : arbaState.tieneDeuda === null ? (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-[#444] flex-shrink-0" />
                              <span className="text-sm text-[#555]">{arbaState.error || 'Patente no registrada en la Provincia de Buenos Aires'}</span>
                            </div>
                          ) : arbaState.tieneDeuda ? (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-semibold text-amber-400">Registra deuda de patentes</span>
                                {arbaState.total != null && arbaState.total > 0 && (
                                  <span className="ml-auto text-sm font-bold text-[#C8A161]">
                                    ${arbaState.total.toLocaleString('es-AR')}
                                  </span>
                                )}
                              </div>
                              {arbaState.periodos && arbaState.periodos.length > 0 && (
                                <div className="divide-y divide-[#1e1e20] border border-[#2a2a2c] rounded-lg overflow-hidden">
                                  {arbaState.periodos.map((p, i) => (
                                    <div key={i} className="px-3 py-2 flex items-center justify-between gap-4 bg-[#0f0f11]">
                                      <div>
                                        <p className="text-sm text-[#F4F1EC]">{p.periodo}</p>
                                        {p.concepto && <p className="text-xs text-[#555]">{p.concepto}</p>}
                                      </div>
                                      {p.importe != null && (
                                        <p className="text-sm font-semibold text-[#C8A161] flex-shrink-0">
                                          ${p.importe.toLocaleString('es-AR')}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-400 font-semibold">Sin deuda de patentes en ARBA</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AGIP — CABA */}
                      <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#F4F1EC]">AGIP — Ciudad de Buenos Aires</p>
                            <p className="text-xs text-[#555]">Deuda de patentes automotor</p>
                          </div>
                          <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">AGIP</span>
                        </div>
                        <div className="p-5">
                          {!agipState || agipState.status === 'loading' ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-4 h-4 text-[#555] animate-spin" />
                              <span className="text-sm text-[#B8B2AA]">Consultando AGIP…</span>
                            </div>
                          ) : agipState.status === 'error' ? (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-[#555] flex-shrink-0" />
                              <span className="text-sm text-[#555]">{agipState.error || 'Error al consultar AGIP'}</span>
                            </div>
                          ) : agipState.tieneDeuda === null ? (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-[#444] flex-shrink-0" />
                              <span className="text-sm text-[#555]">{agipState.error || 'Patente no registrada en CABA (AGIP)'}</span>
                            </div>
                          ) : agipState.tieneDeuda ? (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-semibold text-amber-400">Registra deuda de patentes</span>
                                {agipState.total != null && agipState.total > 0 && (
                                  <span className="ml-auto text-sm font-bold text-[#C8A161]">
                                    ${agipState.total.toLocaleString('es-AR')}
                                  </span>
                                )}
                              </div>
                              {agipState.vehiculo && (agipState.vehiculo.marca || agipState.vehiculo.modelo) && (
                                <p className="text-xs text-[#555] mb-3">
                                  {[agipState.vehiculo.marca, agipState.vehiculo.modelo].filter(Boolean).join(' ')}
                                  {agipState.vehiculo.estado ? ` · ${agipState.vehiculo.estado}` : ''}
                                </p>
                              )}
                              {agipState.posiciones && agipState.posiciones.filter(p => p.estado === 'pendiente').length > 0 && (
                                <div className="divide-y divide-[#1e1e20] border border-[#2a2a2c] rounded-lg overflow-hidden">
                                  {agipState.posiciones.filter(p => p.estado === 'pendiente').map((p, i) => (
                                    <div key={i} className="px-3 py-2 flex items-center justify-between gap-4 bg-[#0f0f11]">
                                      <p className="text-sm text-[#F4F1EC]">
                                        {p.anio}{p.cuota ? ` — Cuota ${p.cuota}` : ''}
                                      </p>
                                      {p.monto != null && (
                                        <p className="text-sm font-semibold text-[#C8A161] flex-shrink-0">
                                          ${p.monto.toLocaleString('es-AR')}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-400 font-semibold">Sin deuda de patentes en AGIP</span>
                              </div>
                              {agipState.vehiculo && (agipState.vehiculo.marca || agipState.vehiculo.modelo) && (
                                <p className="text-xs text-[#555] mt-1 ml-6">
                                  {[agipState.vehiculo.marca, agipState.vehiculo.modelo].filter(Boolean).join(' ')}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Corrientes ACOR */}
                      <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#2a2a2c] flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#F4F1EC]">ACOR — Corrientes</p>
                            <p className="text-xs text-[#555]">Deuda de patentes automotor</p>
                          </div>
                          <span className="text-xs text-[#555] bg-[#0f0f11] border border-[#2a2a2c] px-2 py-1 rounded">ACOR</span>
                        </div>
                        <div className="p-5">
                          {!acorState || acorState.status === 'loading' ? (
                            <div className="flex items-center gap-3"><Loader2 className="w-4 h-4 text-[#555] animate-spin" /><span className="text-sm text-[#B8B2AA]">Consultando ACOR…</span></div>
                          ) : acorState.status === 'error' ? (
                            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#555]" /><span className="text-sm text-[#555]">{acorState.error}</span></div>
                          ) : acorState.tieneDeuda === null ? (
                            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-[#444]" /><span className="text-sm text-[#555]">{acorState.error || 'Patente no registrada en Corrientes'}</span></div>
                          ) : acorState.tieneDeuda ? (
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                              <span className="text-sm font-semibold text-amber-400">Registra deuda de patentes</span>
                              {acorState.monto != null && acorState.monto > 0 && (
                                <span className="ml-auto text-sm font-bold text-[#C8A161]">${acorState.monto.toLocaleString('es-AR')}</span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-400 font-semibold">Sin deuda de patentes en Corrientes</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ── SEO Content ──────────────────────────────────────────── */}
              <section className="space-y-6">

                {content ? (
                  <>
                    {/* Jurisdiction-specific sections */}
                    {content.sections.map(({ title, body }) => (
                      <div key={title} className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">{title}</h2>
                        <p className="text-[#B8B2AA] leading-relaxed">{body}</p>
                      </div>
                    ))}

                    {/* FAQ */}
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                      <h2 className="text-2xl font-bold text-[#F4F1EC] mb-6">
                        Preguntas frecuentes sobre multas en {jurisdiccion!.label}
                      </h2>
                      <div className="space-y-5">
                        {content.faq.map(({ q, a }) => (
                          <div key={q}>
                            <h3 className="text-base font-semibold text-[#C8A161] mb-1">{q}</h3>
                            <p className="text-sm text-[#B8B2AA] leading-relaxed">{a}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related guides */}
                    {content.relatedGuides && content.relatedGuides.length > 0 && (
                      <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-[#F4F1EC] mb-6">Guías relacionadas</h2>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {content.relatedGuides.map(({ title, url, description }) => (
                            <Link
                              key={url}
                              href={url}
                              className="block p-4 bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg hover:border-[#C8A161]/50 transition-colors group"
                            >
                              <p className="text-sm font-semibold text-[#C8A161] group-hover:text-[#d4b070] mb-1 leading-snug">{title}</p>
                              <p className="text-xs text-[#B8B2AA] leading-relaxed">{description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                      <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">
                        ¿Qué son las multas de tránsito en Argentina?
                      </h2>
                      <p className="text-[#B8B2AA] leading-relaxed mb-4">
                        Las multas de tránsito son sanciones económicas que se aplican a los conductores
                        o titulares de vehículos por incumplir las normas de tránsito vigentes. En Argentina,
                        el sistema está regulado por la <strong className="text-[#F4F1EC]">Ley Nacional de Tránsito N° 24.449</strong>,
                        pero cada provincia y municipio tiene sus propios organismos y registros de infracciones.
                      </p>
                      <p className="text-[#B8B2AA] leading-relaxed">
                        Una infracción queda registrada a nombre del titular del vehículo, incluso si la
                        comete otra persona al volante. Por eso es fundamental verificar el estado de multas
                        antes de comprar un auto usado: las deudas pueden transferirse junto con el dominio
                        y generar complicaciones legales al nuevo titular.
                      </p>
                    </div>

                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                      <h2 className="text-2xl font-bold text-[#F4F1EC] mb-6">
                        Jurisdicciones consultadas
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">ANSV / SINAI — Nacional</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            El <strong className="text-[#F4F1EC]">Sistema Nacional de Infracciones (SINAI)</strong> centraliza las
                            infracciones labradas por Gendarmería, Prefectura y Policía Federal en rutas y autopistas
                            federales. Solo admite formato antiguo (ABC123).
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Provincia de Buenos Aires</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            El portal <strong className="text-[#F4F1EC]">infraccionesba.gba.gob.ar</strong> cubre infracciones de la
                            Policía Bonaerense y los organismos de tránsito de los 135 municipios provinciales.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Ciudad Autónoma de Buenos Aires</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            Las infracciones en CABA son labradas por la Policía de la Ciudad e inspectores de
                            tránsito del GCBA. Incluye fotomultas, estacionamiento, semáforo en rojo y uso de celular.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Córdoba — Policía Caminera</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            API pública de Rentas Córdoba con infracciones de la Policía Caminera en rutas y caminos
                            provinciales. Acepta ambos formatos de patente.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Santa Fe y Rosario</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            El <strong className="text-[#F4F1EC]">Juzgado Virtual de Santa Fe</strong> registra infracciones
                            provinciales, mientras que la Municipalidad de Rosario tiene su propio sistema con
                            fotomultas y multas de la Guardia Urbana Municipal.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Mendoza Ciudad y Caminera</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            Dos registros independientes: el portal APEX de la Ciudad para juzgados municipales,
                            y la Policía Caminera provincial para infracciones en rutas y autopistas mendocinas.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Salta, Neuquén y Santa Rosa</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            La DGR Salta, la Municipalidad de Neuquén y el sistema de fotomultas de Santa Rosa
                            (La Pampa) cuentan con APIs REST públicas sin CAPTCHA para consulta por dominio.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#C8A161] mb-1">Corrientes, Entre Ríos, Misiones, Chaco y Posadas</h3>
                          <p className="text-sm text-[#B8B2AA] leading-relaxed">
                            El NEA cuenta con sistemas provinciales y municipales propios: SIGEIN en Corrientes,
                            Monitoreo Vial en Entre Ríos y Misiones, Policía Caminera del Chaco y autogestión
                            municipal en Posadas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">
                    ¿Por qué verificar multas antes de comprar un auto usado?
                  </h2>
                  <p className="text-[#B8B2AA] leading-relaxed mb-4">
                    Al comprar un vehículo usado, las multas impagas pueden quedar asociadas al dominio
                    y transferirse al nuevo titular. En algunas jurisdicciones, un vehículo con infracciones
                    pendientes puede tener restricciones para circular o para realizar la transferencia.
                  </p>
                  <p className="text-[#B8B2AA] leading-relaxed">
                    En <strong className="text-[#F4F1EC]">carChecking</strong> también ofrecemos inspección vehicular a domicilio
                    con más de 350 puntos revisados, escaneo computarizado y verificación de documentación.
                    Todo lo que necesitás para comprar con total seguridad.
                  </p>
                </div>

                <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">
                    Tipos de infracciones más comunes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { t: 'Exceso de velocidad', d: 'La infracción más frecuente. Límites: 40 km/h en zona escolar, 60 km/h urbano, 110 km/h en rutas y 130 km/h en autopistas. Las fotomultas la detectan automáticamente.' },
                      { t: 'Semáforo en rojo', d: 'Cámaras de control en intersecciones detectan vehículos infractores. Penada con multas elevadas y posible suspensión de licencia en casos reincidentes.' },
                      { t: 'Estacionamiento prohibido', d: 'Muy común en zonas urbanas: sobre sendas peatonales, en doble fila o en lugares reservados para discapacitados. Queda registrada a nombre del titular.' },
                      { t: 'Uso de celular al conducir', d: 'Infracción grave en todo el país. La Ley 27.449 establece multas progresivas e incluso retención del vehículo por reincidencia.' },
                      { t: 'Documentación vencida', d: 'Circular con seguro o VTV vencidos genera multas que se acumulan con el tiempo. Verificalas antes de comprar un usado.' },
                      { t: 'Alcohol al volante', d: 'Tolerancia cero para transporte público y motos; 0,5 g/l para el resto. Implica multas severas, retención del vehículo y suspensión de licencia.' },
                    ].map(({ t, d }) => (
                      <div key={t}>
                        <h3 className="text-sm font-semibold text-[#C8A161] mb-1">{t}</h3>
                        <p className="text-sm text-[#B8B2AA] leading-relaxed">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </section>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
}
