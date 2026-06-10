'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Navigation from '../sections/Navigation';
import FooterSection from '../sections/FooterSection';
import TransferCostCalculator from '../components/TransferCostCalculator';

const SITE_URL = 'https://www.carchecking.com.ar';
const CANONICAL = '/calculadora-de-costos-de-transferencia';

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simulador de Transferencia Automotor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}${CANONICAL}`,
  description: 'Calculá el costo exacto de transferir tu auto en Argentina. Incluye honorarios registrales, sellado provincial y gastos del DNRPA. Actualizado 2026.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'ARS',
  },
  provider: {
    '@type': 'Organization',
    name: 'carChecking',
    url: SITE_URL,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Simulador de Transferencia', item: `${SITE_URL}${CANONICAL}` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué incluye el estimador de costos de transferencia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El estimador calcula el arancel de transferencia (2% del valor del vehículo), el sellado provincial (3% del precio de compraventa) y los aranceles registrales fijos del DNRPA: cédula, título, informe de deuda y formulario 08. No incluye honorarios de gestoría ni costos de verificación policial.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El costo de transferencia varía por provincia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El sellado provincial varía según la jurisdicción donde se realiza la operación: Buenos Aires aplica el 3%, CABA tiene su propio esquema, y otras provincias tienen tasas distintas. Los aranceles del DNRPA son nacionales y se aplican de forma uniforme en todo el país.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo se calcula el costo de transferencia de un auto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cálculo suma tres componentes: (1) arancel de transferencia del DNRPA = 2% del valor del vehículo según valuación oficial, (2) sellado provincial = 3% del precio declarado en el formulario 08, y (3) aranceles fijos del registro seccional (cédula, título, informe de deuda, formulario). El total estimado para un vehículo de $5.000.000 es aproximadamente $250.948.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Quién paga los costos de transferencia, el comprador o el vendedor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Por ley los gastos de transferencia corresponden al comprador, salvo acuerdo en contrario entre las partes. En la práctica, es habitual que comprador y vendedor negocien cómo distribuirlos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tarda la transferencia de un auto en Argentina?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una vez presentada la documentación completa en el registro seccional, la transferencia tarda entre 5 y 15 días hábiles. El comprador puede circular con el formulario 08 sellado hasta recibir la cédula definitiva.',
      },
    },
  ],
};

export default function CalculadoraTransferenciaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="relative pt-24 pb-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#B8B2AA] mb-6">
              <Link href="/" className="hover:text-[#C8A161] transition-colors">Inicio</Link>
              <ChevronRight className="w-3 h-3 text-[#555]" />
              <span className="text-[#C8A161]">Simulador de Transferencia</span>
            </nav>

            {/* H1 + intro */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F1EC] mb-3 leading-tight">
              Estimador de costos de transferencia de auto
            </h1>
            <p className="text-[#B8B2AA] leading-relaxed mb-8 text-base md:text-lg">
              Usá este estimador y simulador de costos para saber cuánto vas a pagar al transferir un auto en Argentina. Ingresá el precio del vehículo y la calculadora estima en segundos los aranceles registrales del DNRPA, el sellado provincial y los gastos fijos del trámite.
            </p>

            {/* Calculator */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#F4F1EC] mb-4">Estimador de costos de transferencia</h2>
              <TransferCostCalculator />
            </div>

            {/* Worked example */}
            <div className="bg-[#141416] border border-[#C8A161]/20 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-[#F4F1EC] mb-1">Ejemplo: transferencia de auto $5.000.000</h2>
              <p className="text-xs text-[#B8B2AA] mb-4">Costos estimados para un vehículo valuado en $5.000.000 (Buenos Aires, 2026)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2a2c]">
                      <th className="text-left text-[#C8A161] pb-3 pr-4 font-semibold">Concepto</th>
                      <th className="text-right text-[#C8A161] pb-3 font-semibold">Importe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e20]">
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Arancel de transferencia (2%)</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$100.000,00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Sellado provincial (3%)</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$150.000,00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Arancel anexo 1</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$250,00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Cédula / otro trámite</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$260,00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Título / transferencia</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$165,00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Informe de deuda</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$105,00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-[#F4F1EC]">Formulario</td>
                      <td className="py-2.5 text-right text-[#B8B2AA]">$168,00</td>
                    </tr>
                    <tr className="border-t-2 border-[#C8A161]/30">
                      <td className="pt-3 pr-4 font-bold text-[#F4F1EC]">Total estimado</td>
                      <td className="pt-3 text-right font-bold text-[#C8A161]">$250.948,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#B8B2AA] mt-3">* No incluye honorarios de gestoría ni verificación policial.</p>
            </div>

            {/* What's included */}
            <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-[#F4F1EC] mb-4">Qué incluye el estimador de costos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2a2c]">
                      <th className="text-left text-[#C8A161] pb-3 pr-4 font-semibold">Concepto</th>
                      <th className="text-left text-[#C8A161] pb-3 font-semibold">Base de cálculo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e20]">
                    <tr>
                      <td className="py-3 pr-4 text-[#F4F1EC]">Arancel de transferencia</td>
                      <td className="py-3 text-[#B8B2AA]">2% del valor del vehículo</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#F4F1EC]">Sellado provincial</td>
                      <td className="py-3 text-[#B8B2AA]">3% del precio de compraventa</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#F4F1EC]">Honorarios registrales fijos</td>
                      <td className="py-3 text-[#B8B2AA]">Cédula, título, informe de deuda, formulario</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#B8B2AA] mt-4 leading-relaxed">
                <strong className="text-[#F4F1EC]">Importante:</strong> el resultado es una estimación. El costo final puede variar según el registro seccional, la valuación DNRPA (puede diferir del precio declarado) y si existen trámites adicionales como verificación policial o deudas previas.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-[#F4F1EC] mb-5">Preguntas frecuentes</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-[#C8A161] mb-1">¿Qué incluye el estimador de costos?</h3>
                  <p className="text-sm text-[#B8B2AA] leading-relaxed">El estimador calcula el arancel de transferencia (2% del valor), el sellado provincial (3%) y los aranceles registrales fijos del DNRPA: cédula, título, informe de deuda y formulario 08. No incluye honorarios de gestoría ni costos de verificación policial.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C8A161] mb-1">¿El costo de transferencia varía por provincia?</h3>
                  <p className="text-sm text-[#B8B2AA] leading-relaxed">Sí. El sellado provincial varía según la jurisdicción: Buenos Aires aplica el 3%, CABA tiene su propio esquema y otras provincias tienen tasas distintas. Los aranceles del DNRPA son nacionales y se aplican de forma uniforme en todo el país.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C8A161] mb-1">¿Cómo se calcula el costo de transferencia?</h3>
                  <p className="text-sm text-[#B8B2AA] leading-relaxed">Se suman tres componentes: (1) arancel DNRPA = 2% del valor del vehículo, (2) sellado provincial = 3% del precio declarado en el formulario 08, y (3) aranceles fijos del registro seccional. El ejemplo de un auto de $5.000.000 da un total estimado de $250.948.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C8A161] mb-1">¿Quién paga los costos de transferencia?</h3>
                  <p className="text-sm text-[#B8B2AA] leading-relaxed">Por ley corresponden al comprador, salvo acuerdo en contrario. En la práctica, es habitual que comprador y vendedor negocien cómo distribuirlos al momento de la operación.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C8A161] mb-1">¿El DNRPA usa el precio declarado o su propio valor?</h3>
                  <p className="text-sm text-[#B8B2AA] leading-relaxed">El DNRPA tiene su propia tabla de valuación. Si el precio declarado en el formulario 08 es menor que la valuación oficial, los aranceles se calculan sobre el valor DNRPA, no sobre el precio acordado.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#C8A161] mb-1">¿Cuánto tarda la transferencia de un auto?</h3>
                  <p className="text-sm text-[#B8B2AA] leading-relaxed">Una vez presentada la documentación completa en el registro seccional, entre 5 y 15 días hábiles. El comprador puede circular con el formulario 08 sellado hasta recibir la cédula definitiva.</p>
                </div>
              </div>
            </div>

            {/* Related links */}
            <div className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#F4F1EC] mb-4">Guías relacionadas</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/guias/que-documentos-necesito-para-transferir-un-auto" className="block p-4 bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg hover:border-[#C8A161]/50 transition-colors group">
                  <p className="text-sm font-semibold text-[#C8A161] group-hover:text-[#d4b070] mb-1">Documentación para transferir un auto</p>
                  <p className="text-xs text-[#B8B2AA]">Qué papeles necesitás para la transferencia y qué verificar antes de firmar.</p>
                </Link>
                <Link href="/guias/como-calcular-precio-auto-usado-argentina" className="block p-4 bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg hover:border-[#C8A161]/50 transition-colors group">
                  <p className="text-sm font-semibold text-[#C8A161] group-hover:text-[#d4b070] mb-1">Cómo calcular el precio de un auto usado</p>
                  <p className="text-xs text-[#B8B2AA]">Guía para estimar el valor de mercado antes de comprar o vender.</p>
                </Link>
              </div>
            </div>

          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
}
