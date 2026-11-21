import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INSPECTION_FAQ } from '../data/inspection-faq';

export default function RevisionFaqSection() {
  return (
    <section id="preguntas-frecuentes" className="relative bg-[#0B0B0D] py-24 z-50">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] leading-[0.95] mb-4">
              PREGUNTAS FRECUENTES SOBRE LA REVISIÓN DE AUTOS USADOS
            </h2>
            <p className="text-base lg:text-lg text-[#B8B2AA] leading-relaxed max-w-3xl">
              Precio, qué se revisa, cuánto tarda y cómo coordinar la inspección precompra a
              domicilio en CABA y GBA.
            </p>
          </div>

          <div className="divide-y divide-[#2a2a2c] border-y border-[#2a2a2c]">
            {INSPECTION_FAQ.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[#F4F1EC] hover:text-[#C8A161] transition-colors">
                  <h3 className="text-lg font-semibold">{q}</h3>
                  <span className="text-[#C8A161] text-2xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[#B8B2AA] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-sm text-[#B8B2AA]">
            ¿Preferís revisarlo vos primero? Usá nuestra{' '}
            <Link
              href="/guias/que-revisar-antes-de-comprar-auto-usado-checklist"
              className="text-[#C8A161] hover:underline"
            >
              checklist para comprar un auto usado
            </Link>{' '}
            o compará{' '}
            <Link
              href="/guias/donde-revisar-auto-antes-de-comprar-caba-gba"
              className="text-[#C8A161] hover:underline"
            >
              taller, mecánico a domicilio y perito
            </Link>
            .
          </p>

          <Link href="/solicitar-turno" className="btn-primary mt-8 inline-flex items-center gap-2 w-fit">
            Solicitar turno
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
