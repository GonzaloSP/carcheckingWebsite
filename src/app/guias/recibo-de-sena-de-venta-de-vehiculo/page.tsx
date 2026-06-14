import type { Metadata } from 'next';
import ReciboDeSenaPage from '@/page-components/ReciboDeSenaPage';

export const metadata: Metadata = {
  title: 'Recibo de Seña de Venta de Vehículo | carChecking',
  description:
    'Modelo y guía para hacer el recibo de seña de compraventa de vehículo en Argentina. Descargá el formulario y conocé los pasos legales.',
  alternates: {
    canonical:
      'https://www.carchecking.com.ar/guias/recibo-de-sena-de-venta-de-vehiculo',
  },
};

export default function Page() {
  return <ReciboDeSenaPage />;
}
