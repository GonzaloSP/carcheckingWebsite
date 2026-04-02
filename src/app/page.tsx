import type { Metadata } from 'next';
import HomePage from '@/page-components/HomePage';

export const metadata: Metadata = {
  title: 'carChecking | Inspección de Vehículos a Domicilio - La Forma Segura de Comprar',
  description:
    'Servicio profesional de revisión de vehículos usados a domicilio. Más de 350 puntos inspeccionados. Escaneo computarizado, informe escrito con fotos. CABA y GBA.',
  keywords:
    'inspección vehicular, revisión de autos, compra segura de autos usados, mecánico a domicilio, escaneo computarizado, carChecking Argentina, verificación de vehículos',
  alternates: { canonical: 'https://www.carchecking.com.ar/' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/',
    title: 'carChecking | Inspección de Vehículos a Domicilio',
    description:
      'Servicio profesional de revisión de vehículos usados a domicilio. Más de 350 puntos inspeccionados. CABA y GBA.',
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

export default function Page() {
  return <HomePage />;
}
