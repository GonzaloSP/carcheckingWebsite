import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowRight, BadgeDollarSign } from 'lucide-react';
import { PRICING, servicePriceText, gestoriaPriceText } from '../config/pricing';

function PricePill({ price }: { price: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#C8A161]/10 border border-[#C8A161]/20 px-4 py-2 text-sm text-[#F4F1EC]">
      <BadgeDollarSign className="w-4 h-4 text-[#C8A161]" />
      {price}
    </span>
  );
}

export default function ServicesSection() {
  const inspection = PRICING.services.inspection;
  const gestoria = PRICING.services.gestoria;
  const informe = gestoria.options.informeDominio;
  const transferencia = gestoria.options.transferencia;

  return (
    <section id="servicios" className="relative bg-[#0B0B0D] py-24 z-50">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] leading-[0.95] mb-4">
              SERVICIOS
            </h2>
            <p className="text-base lg:text-lg text-[#B8B2AA] leading-relaxed max-w-3xl">
              Dos formas de ayudarte a comprar y transferir con tranquilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Servicio 1: Inspección */}
            <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#C8A161]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#F4F1EC]">
                      {inspection.name}
                    </h3>
                  </div>
                  <p className="text-[#B8B2AA] leading-relaxed">
                    {inspection.description}
                  </p>
                </div>
                <PricePill price={servicePriceText()} />
              </div>

              <div className="mt-6 pt-6 border-t border-[#2a2a2c]">
                <div className="flex items-center gap-3 text-sm text-[#B8B2AA]">
                  <FileText className="w-4 h-4" />
                  <span>{inspection.includedLine}</span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link to="/solicitar-turno" className="btn-primary flex items-center gap-2 w-fit">
                    {inspection.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Servicio 2: Gestoría */}
            <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#C8A161]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#C8A161]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#F4F1EC]">
                      {gestoria.name}
                    </h3>
                  </div>
                  <p className="text-[#B8B2AA] leading-relaxed">
                    {gestoria.description}
                  </p>
                </div>
                <PricePill price={'Desde ' + gestoriaPriceText('informeDominio')} />
              </div>

              <div className="mt-6 pt-6 border-t border-[#2a2a2c]">
                <div className="grid grid-cols-1 gap-4 text-sm text-[#B8B2AA]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      <div>
                        <div className="text-[#F4F1EC] font-semibold">
                          {informe.name}
                        </div>
                        <div>{informe.includedLine}</div>
                      </div>
                    </div>
                    <div className="text-[#F4F1EC] whitespace-nowrap">
                      {gestoriaPriceText('informeDominio')}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      <div>
                        <div className="text-[#F4F1EC] font-semibold">
                          {transferencia.name}
                        </div>
                        <div>{transferencia.includedLine}</div>
                      </div>
                    </div>
                    <div className="text-[#F4F1EC] whitespace-nowrap">
                      {gestoriaPriceText('transferencia')}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link to="/servicio-gestoria" className="btn-primary flex items-center gap-2 w-fit">
                    Ver detalles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/solicitar-turno" className="text-sm text-[#B8B2AA] hover:text-[#F4F1EC] transition-colors w-fit self-center">
                    Solicitar por WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
