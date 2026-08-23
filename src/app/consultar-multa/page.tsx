import type { Metadata } from 'next';
import ConsultarMultaPage from '@/page-components/ConsultarMultaPage';

// Description leads with what only this page can claim — one plate, every registry at
// once — instead of a jurisdiction list that reads like any of the 29 child pages.
// This page is the site's target for the generic, place-less "multas por patente" and
// "multas nacionales por patente" intent.
const HUB_DESCRIPTION =
  'Consultá multas por patente en una sola búsqueda: accedemos en simultáneo a los registros oficiales de todo el país, del sistema nacional (ANSV / SINAI) a los provinciales y municipales. Sin crear cuenta, resultado en menos de un minuto.';

export const metadata: Metadata = {
  // Left exactly as-is: this is a verbatim match for the target query and is the one
  // element of the hub that was never the problem. Only the description changed.
  title: 'Consultar Multas por Patente | carChecking',
  description: HUB_DESCRIPTION,
  alternates: { canonical: 'https://www.carchecking.com.ar/consultar-multa' },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/consultar-multa',
    title: 'Consultar Multas por Patente | carChecking',
    description: HUB_DESCRIPTION,
    images: [{ url: 'https://www.carchecking.com.ar/images/hero_car.jpg' }],
  },
};

export default function Page() {
  return <ConsultarMultaPage />;
}
