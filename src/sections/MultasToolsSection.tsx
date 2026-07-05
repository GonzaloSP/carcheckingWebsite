import Link from 'next/link';
import { SearchCheck, Calculator, ArrowRight } from 'lucide-react';

const JURISDICTIONS = [
  { label: 'Multas CABA', sub: 'Portal oficial del GCBA', href: '/consultar-multa/multas-caba' },
  { label: 'Multas Provincia de Buenos Aires', sub: 'InfraccionesBA · 135 municipios', href: '/consultar-multa/multas-provincia-buenos-aires' },
  { label: 'Multas Rosario', sub: 'Fotomultas y GUM', href: '/consultar-multa/multas-rosario' },
  { label: 'Multas Santa Fe', sub: 'Registro provincial', href: '/consultar-multa/multas-santa-fe' },
  { label: 'Multas Entre Ríos', sub: 'Registro provincial', href: '/consultar-multa/multas-entre-rios' },
  { label: 'Multas La Plata', sub: 'Municipalidad de La Plata', href: '/consultar-multa/multas-la-plata' },
];

export default function MultasToolsSection() {
  return (
    <section id="consultar-multas" className="relative bg-[#0B0B0D] py-24 z-50">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] leading-[0.95] mb-4">
              CONSULTÁ MULTAS POR PATENTE
            </h2>
            <p className="text-base lg:text-lg text-[#B8B2AA] leading-relaxed max-w-3xl">
              Verificá multas e infracciones de tránsito en los registros oficiales de cada
              jurisdicción, gratis y sin registro. Ideal antes de comprar un usado o transferir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {JURISDICTIONS.map(({ label, sub, href }) => (
              <Link
                key={href}
                href={href}
                className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6 hover:border-[#C8A161]/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#C8A161]/10 flex items-center justify-center flex-shrink-0">
                    <SearchCheck className="w-4 h-4 text-[#C8A161]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F1EC] group-hover:text-[#C8A161] transition-colors leading-snug">
                    {label}
                  </h3>
                </div>
                <p className="text-sm text-[#B8B2AA]">{sub}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/consultar-multa" className="btn-primary flex items-center gap-2 w-fit">
              Ver todas las jurisdicciones
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculadora-de-costos-de-transferencia"
              className="flex items-center gap-2 text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculadora de costos de transferencia
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
