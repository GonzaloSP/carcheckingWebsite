import { HelmetProvider } from 'react-helmet-async';
import { Navigate, useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import CoverageSection from '../sections/CoverageSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BookingSection from '../sections/BookingSection';
import FooterSection from '../sections/FooterSection';
import { getLocationBySlug } from '../data/locations';

export default function VtvLocationPage() {
  const { slug } = useParams();
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return <Navigate to="/" replace />;
  }

  const place = location.name;
  const title = `VTV en ${place} – Turno, requisitos y costos 2026 | carChecking`;
  const description = `Guía 2026 para hacer la VTV en ${place}: cómo sacar turno, requisitos, qué te revisan, costos orientativos y consejos para aprobar sin sorpresas.`;
  const canonicalUrl = `/vtv-en/${location.slug}`;

  return (
    <HelmetProvider>
      <SEO
        title={title}
        description={description}
        keywords={`vtv ${place}, vtv en ${place}, turno vtv ${place}, requisitos vtv ${place}, costo vtv ${place}, verificación técnica vehicular ${place}`}
        canonicalUrl={canonicalUrl}
      />

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <div className="pt-24 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-4">
              <Link to="/" className="hover:text-[#C8A161] transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-[#C8A161]">VTV en {place}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] mb-3">
              VTV en {place}: turno, requisitos y costos 2026
            </h1>
            <p className="text-[#B8B2AA] max-w-3xl">
              Si estás buscando <strong>VTV en {place}</strong>, acá tenés una guía rápida (2026) para sacar <strong>turno</strong>,
              entender <strong>requisitos</strong> y llegar a la planta con el auto listo.
              La VTV (Verificación Técnica Vehicular) puede variar según jurisdicción, pero el objetivo es el mismo:
              seguridad y control de emisiones.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Cómo sacar turno</h2>
                <ul className="text-[#B8B2AA] space-y-2 list-disc pl-5">
                  <li>Buscá el portal oficial de VTV/ITV de tu jurisdicción y elegí planta/fecha.</li>
                  <li>Tené a mano patente/dominio y datos del titular.</li>
                  <li>Guardá el comprobante del turno (digital o impreso) si te lo solicitan.</li>
                </ul>
                <p className="text-[#B8B2AA] mt-3">
                  Si me decís si el vehículo está radicado en CABA o Provincia (u otra provincia), te paso el camino más
                  directo.
                </p>
              </div>

              <div className="bg-[#111114] border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Requisitos típicos</h2>
                <ul className="text-[#B8B2AA] space-y-2 list-disc pl-5">
                  <li>Cédula verde/azul (según corresponda) y documentación del vehículo.</li>
                  <li>Comprobante de seguro vigente.</li>
                  <li>Patente legible y datos coincidentes.</li>
                </ul>
                <p className="text-[#B8B2AA] mt-3">
                  Puede haber requisitos extra por tipo de vehículo (GNC, comercial, etc.).
                </p>
              </div>
            </div>

            <div className="mt-8 bg-[#111114] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Qué te revisan en la VTV</h2>
              <div className="text-[#B8B2AA] space-y-2">
                <p>En general, la inspección suele incluir (según jurisdicción):</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Luces, señalización y estado de parabrisas/limpiaparabrisas.</li>
                  <li>Frenos, amortiguación y tren delantero.</li>
                  <li>Dirección, neumáticos, suspensión y pérdidas.</li>
                  <li>Emisiones/ruidos.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-[#111114] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Costos 2026 (orientativos)</h2>
              <p className="text-[#B8B2AA]">
                El <strong>costo de la VTV</strong> cambia con el tiempo y depende de la jurisdicción y el tipo de vehículo.
                Por eso, lo mejor es verificar el valor actualizado en el portal oficial al momento de sacar turno.
              </p>
              <p className="text-[#B8B2AA] mt-3">
                Consejo: si estás por comprar un usado, complementá la VTV con una revisión precompra.
              </p>
            </div>

            <div className="mt-8 bg-[#111114] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#F4F1EC] mb-3">Preguntas frecuentes</h2>

              <h3 className="text-[#F4F1EC] font-semibold mt-4">¿VTV y VTV “CABA” es lo mismo?</h3>
              <p className="text-[#B8B2AA]">
                El concepto es el mismo (verificación técnica), pero <strong>la gestión y el turno dependen de la
                jurisdicción</strong>. Por eso conviene buscar la guía y el portal correctos para donde está radicado el
                vehículo.
              </p>

              <h3 className="text-[#F4F1EC] font-semibold mt-4">¿Qué conviene revisar antes de ir?</h3>
              <p className="text-[#B8B2AA]">
                Luces, frenos, neumáticos, limpiaparabrisas, pérdidas y cualquier testigo en tablero.
              </p>

              <p className="text-[#B8B2AA] mt-4">
                Si tu caso es CABA, mirá la guía específica:
                {' '}
                <Link
                  to="/guias/vtv-caba-turno-requisitos-costos-2026"
                  className="text-[#C8A161] hover:underline"
                >
                  VTV CABA – Turno, Requisitos y Costos 2026
                </Link>
                .
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
