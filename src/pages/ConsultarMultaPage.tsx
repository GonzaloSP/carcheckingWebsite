import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Loader2, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import FooterSection from '../sections/FooterSection';
import { trackEvent } from '../lib/analytics';
import { JURISDICCIONES_MULTA } from '../data/multa-jurisdictions';

const FUENTES = JURISDICCIONES_MULTA;

const MULTA_API_URL       = import.meta.env.VITE_MULTA_API_URL       ?? '/api/multas';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID ?? '';
const IS_APPWRITE         = MULTA_API_URL.includes('/executions');

/** Unified fetch wrapper — handles both standard GET and Appwrite POST execution format. */
async function callMultasApi(url: string, signal?: AbortSignal): Promise<Response> {
  if (IS_APPWRITE) {
    const qStart = url.indexOf('?');
    const queryString = qStart >= 0 ? url.slice(qStart) : '';
    const appRes = await fetch(MULTA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-appwrite-project': APPWRITE_PROJECT_ID },
      body: JSON.stringify({ async: false, path: `/${queryString}`, method: 'GET' }),
      signal,
    });
    const execution = await appRes.json();
    return new Response(execution.responseBody ?? '{}', {
      status: execution.responseStatusCode ?? 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return fetch(url, { signal });
}

interface Infraccion {
  acta:         string | null;
  fecha:        string | null;
  vencimiento?: string | null;
  descripcion:  string | null;
  lugar:        string | null;
  importe:      number | null;
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

export default function ConsultarMultaPage({ defaultFuente }: { defaultFuente?: string } = {}) {
  const jurisdiccion = defaultFuente ? FUENTES.find(f => f.value === defaultFuente) : undefined;
  const { executeRecaptcha } = useGoogleReCaptcha();

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
  const [expanded, setExpanded]           = useState<string | null>(null);
  const [searched, setSearched]           = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = dominio.replace(/\s/g, '').toUpperCase();
    if (clean.length < 6 || clean.length > 7) return;

    trackEvent('multa_search', { dominio: clean, format: clean.length === 6 ? 'antiguo' : 'mercosur' });

    setSearched(clean);
    setExpanded(null);
    setVehiculo({ status: 'loading' });

    // ANSV only accepts old-format plates (ABC123 = 6 chars); hide for Mercosur (AB123CD = 7 chars)
    const isOldFormat = /^[A-Z]{3}\d{3}$/.test(clean);
    const baseFuentes = jurisdiccion ? [jurisdiccion] : FUENTES;
    const fuentes = isOldFormat ? baseFuentes : baseFuentes.filter(f => f.value !== 'ansv');
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

    // DNRPA vehicle lookup (runs in parallel with multa queries)
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

    // VTV lookup (runs in parallel)
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


    // ITV Córdoba (runs in parallel)
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

    // RTO Santa Fe (runs in parallel)
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

    // RTO Catamarca (runs in parallel)
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

    // ACOR Corrientes patente debt (runs in parallel)
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=patentes-corrientes${rc}`, AbortSignal.timeout(60_000))
      .then(r => r.json())
      .then(data => {
        const a = data.acor;
        if (!a) { setAcorState({ status: 'error', error: data.error || 'Error ACOR' }); return; }
        if (a.tieneDeuda === null) { setAcorState({ status: 'empty', tieneDeuda: null, error: a.error }); return; }
        setAcorState({ status: a.tieneDeuda ? 'ok' : 'empty', tieneDeuda: a.tieneDeuda, monto: a.monto });
      })
      .catch(() => setAcorState({ status: 'error', error: 'No se pudo conectar con ACOR' }));

    // ARBA patente debt (runs in parallel)
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=arba${rc}`, AbortSignal.timeout(120_000))
      .then(r => r.json())
      .then(data => {
        const a = data.arba;
        if (!a) { setArbaState({ status: 'error', error: data.error || 'Error al consultar ARBA' }); return; }
        if (a.manualUrl) { setArbaState({ status: 'manual', manualUrl: a.manualUrl }); return; }
        if (a.tieneDeuda === null) { setArbaState({ status: 'empty', tieneDeuda: null, error: a.error }); return; }
        setArbaState({
          status:     a.tieneDeuda ? 'ok' : 'empty',
          tieneDeuda: a.tieneDeuda,
          periodos:   a.periodos || [],
          total:      a.total,
        });
      })
      .catch(() => setArbaState({ status: 'error', error: 'No se pudo conectar con ARBA' }));

    // AGIP patente debt (runs in parallel)
    callMultasApi(`${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=agip${rc}`, AbortSignal.timeout(120_000))
      .then(r => r.json())
      .then(data => {
        const a = data.agip;
        if (!a) { setAgipState({ status: 'error', error: data.error || 'Error al consultar AGIP' }); return; }
        if (a.tieneDeuda === null) { setAgipState({ status: 'empty', tieneDeuda: null, error: a.error }); return; }
        setAgipState({
          status:     a.tieneDeuda ? 'ok' : 'empty',
          tieneDeuda: a.tieneDeuda,
          posiciones: a.posiciones || [],
          total:      a.total,
          vehiculo:   a.vehiculo,
        });
      })
      .catch(() => setAgipState({ status: 'error', error: 'No se pudo conectar con AGIP' }));

    fuentes.forEach(async ({ value }) => {
      try {
        const res = await callMultasApi(
          `${MULTA_API_URL}?dominio=${encodeURIComponent(clean)}&fuente=${value}${rc}`,
          AbortSignal.timeout(70_000)
        );
        const data = await res.json();
        if (!res.ok || data.error) {
          setResults(prev => prev && ({
            ...prev,
            [value]: { status: 'error', infracciones: [], error: data.error || 'Error desconocido' },
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
    <HelmetProvider>
      <SEO
        title={jurisdiccion
          ? `Consultar Multas en ${jurisdiccion.label} | carChecking`
          : 'Consultar Multas por Patente en Argentina | carChecking'}
        description={jurisdiccion
          ? `Consultá multas e infracciones de tránsito en ${jurisdiccion.label} por número de patente. Verificación gratuita e instantánea en los registros oficiales.`
          : 'Consultá multas de tránsito por patente en Argentina. Verificá infracciones en ANSV, CABA, Buenos Aires, Córdoba, Santa Fe, Mendoza, Salta, Neuquén, Corrientes, Entre Ríos, Chaco, Misiones, Avellaneda, Lanús, Berisso, Ezeiza, Lomas de Zamora, Tres de Febrero, Hurlingham, Cañuelas y más.'}
        keywords={jurisdiccion
          ? `multas ${jurisdiccion.label}, consultar multas ${jurisdiccion.label}, infracciones ${jurisdiccion.label}, multas patente ${jurisdiccion.label}`
          : 'consultar multas patente argentina, multas de transito argentina, consultar infracciones vehiculo, multas por patente, ANSV multas, multas CABA, multas provincia buenos aires, multas Avellaneda, multas Lanus, multas GBA'}
        canonicalUrl={jurisdiccion ? `/consultar-multa/${jurisdiccion.slug}` : '/consultar-multa'}
      />

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-28 pb-20">
          <div className="px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-6">
                <Link to="/" className="hover:text-[#C8A161] transition-colors">Inicio</Link>
                <span>/</span>
                {jurisdiccion ? (
                  <>
                    <Link to="/consultar-multa" className="hover:text-[#C8A161] transition-colors">Consultar Multa</Link>
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
                  {jurisdiccion
                    ? `Ingresá la patente y consultamos los registros oficiales de infracciones de ${jurisdiccion.label}.`
                    : `Ingresá la patente y consultamos simultáneamente los registros oficiales de las ${FUENTES.length} principales jurisdicciones del país.`}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
                    {activeFuentes.map(({ value, label, sub }) => {
                      const r = results[value];
                      const isExpanded = expanded === value;

                      return (
                        <div
                          key={value}
                          className={`border rounded-xl overflow-hidden transition-colors ${
                            r.status === 'ok'    ? 'border-amber-700/60'
                          : r.status === 'manual' ? 'border-[#3a3a2c]'
                          : 'border-[#2a2a2c]'
                          }`}
                        >
                          {/* Card header — clickable only when has results */}
                          <div
                            className={`flex items-center gap-3 px-4 py-3 bg-[#141416] ${r.status === 'ok' ? 'cursor-pointer hover:bg-[#1a1a1c] transition-colors' : ''}`}
                            onClick={() => r.status === 'ok' && setExpanded(isExpanded ? null : value)}
                          >
                            {/* Status icon */}
                            <div className="flex-shrink-0 w-5 flex justify-center">
                              {r.status === 'loading' && (
                                <Loader2 className="w-4 h-4 text-[#555] animate-spin" />
                              )}
                              {r.status === 'ok' && (
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                              )}
                              {r.status === 'empty' && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              {r.status === 'error' && (
                                <XCircle className="w-4 h-4 text-[#555]" />
                              )}
                              {r.status === 'manual' && (
                                <ExternalLink className="w-4 h-4 text-[#C8A161]" />
                              )}
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${r.status === 'ok' ? 'text-[#F4F1EC]' : 'text-[#B8B2AA]'}`}>
                                {label}
                              </p>
                              <p className="text-xs text-[#555] truncate">{sub}</p>
                            </div>

                            {/* Right side */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                              {r.status === 'loading' && (
                                <span className="text-xs text-[#555]">consultando…</span>
                              )}
                              {r.status === 'ok' && (
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
                              {r.status === 'empty' && (
                                <span className="text-xs text-green-500">Sin multas</span>
                              )}
                              {r.status === 'manual' && (
                                <a href={r.manualUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C8A161] hover:underline whitespace-nowrap" onClick={e => e.stopPropagation()}>
                                  Verificar manualmente →
                                </a>
                              )}
                              {r.status === 'error' && (
                                <span className="text-xs text-[#555] max-w-[120px] truncate" title={r.error}>
                                  {r.error}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expanded infractions */}
                          {isExpanded && r.status === 'ok' && (
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
                                  {inf.importe !== null && (
                                    <div>
                                      <p className="text-xs text-[#B8B2AA] uppercase tracking-wider mb-0.5">Importe</p>
                                      <p className="text-sm font-bold text-[#C8A161]">
                                        ${inf.importe.toLocaleString('es-AR')}
                                      </p>
                                    </div>
                                  )}
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
    </HelmetProvider>
  );
}
