import type { Metadata } from 'next';
import ConsultarMultaPage from '@/page-components/ConsultarMultaPage';

export const metadata: Metadata = {
  title: 'Consultar Multas por Patente | carChecking',
  description:
    'Consultá multas de tránsito por patente en toda Argentina: ANSV, CABA, Provincia de Buenos Aires, Córdoba, Santa Fe, Rosario y más.',
  alternates: { canonical: 'https://www.carchecking.com.ar/consultar-multa' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/consultar-multa',
    title: 'Consultar Multas por Patente | carChecking',
    description:
      'Consultá multas de tránsito por patente en toda Argentina.',
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

export default function Page() {
  return <ConsultarMultaPage />;
}
