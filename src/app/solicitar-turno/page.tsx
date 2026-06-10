import type { Metadata } from 'next';
import BookingPage from '@/page-components/BookingPage';

export const metadata: Metadata = {
  title: 'Solicitar Turno | carChecking - Inspección de Vehículos a Domicilio',
  description:
    'Reserve su turno para inspección de vehículos a domicilio. Más de 350 puntos revisados. CABA y GBA.',
  alternates: { canonical: 'https://www.carchecking.com.ar/solicitar-turno/' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/solicitar-turno',
    title: 'Solicitar Turno | carChecking',
    description: 'Reserve su turno para inspección de vehículos a domicilio.',
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

export default function Page() {
  return <BookingPage />;
}
