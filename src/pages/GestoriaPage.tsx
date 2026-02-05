import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, BadgeDollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import FooterSection from '../sections/FooterSection';
import { PRICING, gestoriaPriceText } from '../config/pricing';

function PricePill({ price }: { price: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#C8A161]/10 border border-[#C8A161]/20 px-4 py-2 text-sm text-[#F4F1EC]">
      <BadgeDollarSign className="w-4 h-4 text-[#C8A161]" />
      {price}
    </span>
  );
}

export default function GestoriaPage() {
  const gestoria = PRICING.services.gestoria;
  const informe = gestoria.options.informeDominio;
  const transferencia = gestoria.options.transferencia;

  return (
    <HelmetProvider>
      <SEO
        title="Servicio de gestoría del automotor | carChecking"
        description="Servicio de gestoría: informe de dominio y transferencia del automotor. Verificá la documentación y ahorrá tiempo en el trámite."
        canonicalUrl="/servicio-gestoria"
      />

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-28 pb-16">
          <div className="px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-4">
                  <Link to="/" className="hover:text-[#C8A161] transition-colors">
                    Inicio
                  </Link>
                  <span>/</span>
                  <span className="text-[#C8A161]">Servicio de gestoría</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[#F4F1EC] mb-4">
                  SERVICIO DE GESTORÍA
                </h1>
                <p className="text-lg text-[#B8B2AA] leading-relaxed">
                  A la hora de comprar un automóvil no sólo debe verificar que
                  mecánicamente esté en perfectas condiciones, sino también la
                  documentación del mismo.
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Informe de dominio */}
                <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#C8A161]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#F4F1EC]">
                          {informe.name}
                        </h2>
                      </div>
                      <p className="text-[#B8B2AA] leading-relaxed">
                        {informe.description}
                      </p>
                    </div>
                    <PricePill price={gestoriaPriceText('informeDominio')} />
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#2a2a2c]">
                    <p className="text-sm text-[#B8B2AA] mb-4">
                      {informe.includedLine}
                    </p>

                    <div className="text-sm text-[#B8B2AA] leading-relaxed">
                      <p className="text-[#F4F1EC] font-semibold mb-2">
                        Incluye información sobre:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Datos del titular</li>
                        <li>Embargos</li>
                        <li>Prendas</li>
                        <li>Denuncia de venta o robo</li>
                        <li>Marca y número de chasis</li>
                        <li>Radicación</li>
                        <li>Pedido de secuestro</li>
                        <li>Prohibición para circular</li>
                        <li>Trámites pendientes</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Link
                        to="/solicitar-turno"
                        className="btn-primary flex items-center gap-2 w-fit"
                      >
                        {informe.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Transferencia */}
                <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#C8A161]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#F4F1EC]">
                          {transferencia.name}
                        </h2>
                      </div>
                      <p className="text-[#B8B2AA] leading-relaxed">
                        {transferencia.description}
                      </p>
                    </div>
                    <PricePill price={gestoriaPriceText('transferencia')} />
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#2a2a2c]">
                    <p className="text-sm text-[#B8B2AA] mb-6">
                      {transferencia.includedLine}
                    </p>

                    <div className="mt-6">
                      <Link
                        to="/solicitar-turno"
                        className="btn-primary flex items-center gap-2 w-fit"
                      >
                        {transferencia.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-10 bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
                <p className="text-sm text-[#B8B2AA] leading-relaxed">
                  Nota: los costos de transferencia del Registro del Automotor
                  son aparte. Si necesitás estimarlos, podés usar la calculadora
                  de costos de transferencia.
                </p>
              </div>
            </div>
          </div>
        </main>

        <FooterSection />
      </div>
    </HelmetProvider>
  );
}
