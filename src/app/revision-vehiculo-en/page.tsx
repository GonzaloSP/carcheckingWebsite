import type { Metadata } from 'next';
import RevisionVehiculoPage from '@/page-components/RevisionVehiculoPage';

const canonicalUrl = 'https://www.carchecking.com.ar/revision-vehiculo-en';

export const metadata: Metadata = {
  title: 'Revisión de Vehículo en CABA y GBA: Mecánico a Domicilio | carChecking',
  description: 'Inspección precompra de autos usados en Capital Federal y Gran Buenos Aires. Mecánico a domicilio, escaneo computarizado y reporte con fotos. Coordiná un turno online.',
  keywords: 'revisión de vehículo, inspección vehicular precompra, mecánico a domicilio, revisar auto usado antes de comprar, escaneo OBD, carChecking',
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: 'website',
    url: canonicalUrl,
    title: 'Revisión de Vehículo en CABA y GBA: Mecánico a Domicilio | carChecking',
    description: 'Inspección precompra de autos usados en Capital Federal y Gran Buenos Aires. Mecánico a domicilio, escaneo computarizado y reporte con fotos.',
  },
};

export default function Page() {
  return <RevisionVehiculoPage />;
}
