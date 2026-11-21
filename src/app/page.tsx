import type { Metadata } from 'next';
import HomePage from '@/page-components/HomePage';
import { INSPECTION_FAQ } from '@/data/inspection-faq';
import { PRICING, servicePriceText } from '@/config/pricing';

// The homepage is the single target page for "revisión de autos usados" / "inspección
// precompra" searches (the old /revision-vehiculo-en hub now 301s here).
const TITLE = 'Revisión de Autos Usados a Domicilio en CABA y GBA | carChecking';
const DESCRIPTION = `Inspección precompra de autos usados a domicilio en CABA y GBA: mecánico + escaneo computarizado, más de 350 puntos e informe escrito con fotos. ${servicePriceText()}. Turno en 24–48 hs.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'revisión de autos usados, revisión de vehículo usado, inspección precompra, revisión pre compra, mecánico para revisar autos usados, chequeo de autos usados, mecánico a domicilio, escaneo computarizado, carChecking',
  alternates: { canonical: 'https://www.carchecking.com.ar' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar',
    title: 'Revisión de Autos Usados a Domicilio | carChecking',
    description:
      'Inspección precompra a domicilio en CABA y GBA: mecánico + escaneo computarizado, más de 350 puntos e informe con fotos.',
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.carchecking.com.ar/#revision-precompra',
    name: 'Revisión de autos usados a domicilio (inspección precompra)',
    serviceType: 'Inspección precompra de vehículos usados',
    description: PRICING.services.inspection.description,
    provider: { '@id': 'https://www.carchecking.com.ar/#business' },
    areaServed: [
      { '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' },
      { '@type': 'AdministrativeArea', name: 'Gran Buenos Aires' },
    ],
    offers: {
      '@type': 'Offer',
      price: PRICING.services.inspection.amount,
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
      url: 'https://www.carchecking.com.ar/solicitar-turno',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: INSPECTION_FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
