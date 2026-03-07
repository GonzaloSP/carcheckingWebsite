import { HelmetProvider } from 'react-helmet-async';
import { Navigate, useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import CoverageSection from '../sections/CoverageSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BookingSection from '../sections/BookingSection';
import FooterSection from '../sections/FooterSection';
import { getLocationBySlug } from '../data/locations';

export default function VerificacionPolicialLocationPage() {
  const { slug } = useParams();
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return <Navigate to="/" replace />;
  }

  const place = location.name;
  const title = `Verificación policial en ${place} | carChecking`;
  const description = `Guía práctica para hacer la verificación policial en ${place}: cuándo conviene, qué papeles llevar, cuánto puede costar y consejos para comprar/vender sin sorpresas.`;
  const canonicalUrl = `/verificacion-policial-en/${location.slug}`;

  return (
    <HelmetProvider>
      <SEO
        title={title}
        description={description}
        keywords={`verificación policial en ${place}, verificacion policial ${place}, verificación policial automotor ${place}, chasis motor ${place}, compra venta auto usado ${place}`}
        canonicalUrl={canonicalUrl}
      />

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <div className="pt-24 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-4">
              <Link to="/" className="hover:text-[#C8A161] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-[#C8A161]">Verificación policial en {place}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] mb-3">
              Verificación policial en {place}
            </h1>
            <p className="text-[#B8B2AA] max-w-3xl">
              Si vas a comprar o vender un auto usado, la <strong>verificación policial</strong> es una de las formas más
              comunes de reducir riesgo: sirve para controlar que los números de <strong>motor</strong> y <strong>chasis</strong> coincidan
              y no haya señales de adulteración.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">
                  ¿Cuándo conviene hacerla?
                </h2>
                <ul className="text-[#B8B2AA] space-y-2 list-disc pl-5">
                  <li>Antes de señar o antes de transferir, si hay dudas sobre el origen del vehículo.</li>
                  <li>Cuando el registro o la jurisdicción la exige para completar trámites.</li>
                  <li>Si el auto viene de otra provincia o hay inconsistencias en papeles/impresiones.</li>
                </ul>
              </div>

              <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Qué llevar (checklist)</h2>
                <ul className="text-[#B8B2AA] space-y-2 list-disc pl-5">
                  <li>DNI del solicitante.</li>
                  <li>Documentación del vehículo (según el caso: cédula/título o lo que te pidan en la planta).</li>
                  <li>Comprobante/turno si corresponde.</li>
                </ul>
                <p className="text-[#B8B2AA] mt-3">
                  Importante: los requisitos pueden variar. Si me decís el caso (particular, agencia, con prenda) lo
                  ajusto.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-[#111114] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Preguntas frecuentes</h2>

              <h3 className="text-[#F4F1EC] font-semibold mt-4">¿La verificación policial es obligatoria?</h3>
              <p className="text-[#B8B2AA]">
                Depende del tipo de trámite y la jurisdicción. Aunque no sea estrictamente obligatoria, suele ser
                recomendable si querés minimizar riesgos.
              </p>

              <h3 className="text-[#F4F1EC] font-semibold mt-4">¿Cuánto cuesta?</h3>
              <p className="text-[#B8B2AA]">
                Los costos cambian con el tiempo y pueden variar por planta/jurisdicción. Tomalo como un gasto separado
                del arancel de transferencia y de los sellos.
              </p>

              <h3 className="text-[#F4F1EC] font-semibold mt-4">¿Esto reemplaza la revisión mecánica?</h3>
              <p className="text-[#B8B2AA]">
                No. La verificación policial mira identidad del vehículo (motor/chasis). Una revisión precompra mira el
                estado mecánico/eléctrico, diagnóstico OBD y señales de choques/reparaciones.
              </p>

              <p className="text-[#B8B2AA] mt-4">
                Para una guía más general sobre papeles al comprar, mirá:
                {' '}
                <Link
                  to="/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial"
                  className="text-[#C8A161] hover:underline"
                >
                  informe de dominio, verificación policial y checklist
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 text-[#B8B2AA]">
              <p>
                Si querés, también podemos ayudarte con una <strong>revisión precompra a domicilio en {place}</strong> para que
                no compres a ciegas.
              </p>
            </div>
          </div>
        </div>

        <main className="relative">
          <CoverageSection />
          <TestimonialsSection />
          <BookingSection />
          <FooterSection />
        </main>
      </div>
    </HelmetProvider>
  );
}
