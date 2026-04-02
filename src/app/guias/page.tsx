import type { Metadata } from 'next';
import BlogPage from '@/page-components/BlogPage';

export const metadata: Metadata = {
  title: 'Guías | carChecking - Consejos y Guías sobre Vehículos Usados',
  description:
    'Artículos, consejos y guías sobre compra segura de vehículos usados. Aprenda a detectar fraudes, negociar precios y verificar el estado de un auto.',
  alternates: { canonical: 'https://www.carchecking.com.ar/guias' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/guias',
    title: 'Guías | carChecking - Consejos y Guías sobre Vehículos Usados',
    description:
      'Artículos, consejos y guías sobre compra segura de vehículos usados.',
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

export default function Page() {
  return <BlogPage />;
}
