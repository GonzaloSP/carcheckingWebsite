'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navigation from '../sections/Navigation';
import FooterSection from '../sections/FooterSection';
import { MULTAS_CABA_GUIDES, CABA_GUIDE_RELATED_LINKS } from '../data/multas-caba-guides';

const SLUG_TO_LABEL: Record<string, string> = {
  'como-consultar': 'Cómo consultar',
  'como-pagar': 'Cómo pagar',
  'plan-de-pagos': 'Plan de pagos',
};

export default function MultasCABAGuidePage({ guide }: { guide: string }) {
  const content = guide ? MULTAS_CABA_GUIDES[guide] : undefined;

  if (!content) return null;

  const related = CABA_GUIDE_RELATED_LINKS[guide!] ?? [];
  const canonicalUrl = `/multas-caba/${content.slug}/`;
  const siteUrl = 'https://www.carchecking.com.ar';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Multas CABA', item: `${siteUrl}/consultar-multa/multas-caba/` },
      { '@type': 'ListItem', position: 3, name: SLUG_TO_LABEL[content.slug] ?? content.h1, item: `${siteUrl}${canonicalUrl}` },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.h1,
    description: content.intro,
    step: content.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="relative pt-24 pb-20 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#B8B2AA] mb-6 flex-wrap">
              <Link href="/" className="hover:text-[#C8A161] transition-colors">Inicio</Link>
              <ChevronRight className="w-3 h-3 text-[#555]" />
              <Link href="/consultar-multa/multas-caba" className="hover:text-[#C8A161] transition-colors">Multas CABA</Link>
              <ChevronRight className="w-3 h-3 text-[#555]" />
              <span className="text-[#C8A161]">{SLUG_TO_LABEL[content.slug] ?? content.h1}</span>
            </nav>

            {/* H1 + intro */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#F4F1EC] mb-4 leading-tight">
              {content.h1}
            </h1>
            <p className="text-[#B8B2AA] leading-relaxed mb-10 text-base md:text-lg">
              {content.intro}
            </p>

            {/* Steps */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#F4F1EC] mb-6">Pasos</h2>
              <ol className="space-y-5">
                {content.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8A161]/15 border border-[#C8A161]/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#C8A161]">{i + 1}</span>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-base font-semibold text-[#F4F1EC] mb-1">{step.title}</h3>
                      <p className="text-sm text-[#B8B2AA] leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* CTA */}
            <div className="bg-[#141416] border border-[#C8A161]/25 rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#F4F1EC] mb-0.5">Consultá multas en CABA ahora</p>
                <p className="text-xs text-[#B8B2AA]">Acceso directo al portal oficial del GCBA. Gratis.</p>
              </div>
              <Link
                href="/consultar-multa/multas-caba"
                className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap"
              >
                Consultar patente <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Extra sections */}
            {content.extraSections && content.extraSections.length > 0 && (
              <section className="space-y-6 mb-10">
                {content.extraSections.map(({ title, body }) => (
                  <div key={title} className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-[#F4F1EC] mb-3">{title}</h2>
                    <p className="text-sm text-[#B8B2AA] leading-relaxed">{body}</p>
                  </div>
                ))}
              </section>
            )}

            {/* FAQ */}
            <section className="bg-[#141416] border border-[#2a2a2c] rounded-xl p-6 mb-10">
              <h2 className="text-xl font-bold text-[#F4F1EC] mb-6">Preguntas frecuentes</h2>
              <div className="space-y-5">
                {content.faq.map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-sm font-semibold text-[#C8A161] mb-1">{q}</h3>
                    <p className="text-sm text-[#B8B2AA] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related guides */}
            {related.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-[#F4F1EC] mb-4">Guías relacionadas</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {related.map(({ title, url, description }) => (
                    <Link
                      key={url}
                      href={url}
                      className="block p-4 bg-[#141416] border border-[#2a2a2c] rounded-xl hover:border-[#C8A161]/50 transition-colors group"
                    >
                      <p className="text-sm font-semibold text-[#C8A161] group-hover:text-[#d4b070] mb-1 leading-snug">{title}</p>
                      <p className="text-xs text-[#B8B2AA] leading-relaxed">{description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </main>

        <FooterSection />
      </div>
    </>
  );
}
