import type { Metadata } from 'next';
import GestoriaPage from '@/page-components/GestoriaPage';

export const metadata: Metadata = {
  title: 'Servicio de gestoría del automotor | carChecking',
  description:
    'Servicio de gestoría: informe de dominio y transferencia del automotor. Verificá la documentación y ahorrá tiempo en el trámite.',
  alternates: { canonical: 'https://www.carchecking.com.ar/servicio-gestoria' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/servicio-gestoria',
    title: 'Servicio de gestoría del automotor | carChecking',
    description:
      'Servicio de gestoría: informe de dominio y transferencia del automotor.',
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

export default function Page() {
  return <GestoriaPage />;
}
