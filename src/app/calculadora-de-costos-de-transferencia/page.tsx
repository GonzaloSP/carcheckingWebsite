import type { Metadata } from 'next';
import CalculadoraTransferenciaPage from '@/page-components/CalculadoraTransferenciaPage';

export const metadata: Metadata = {
  title: 'Estimador y Calculadora de Costos de Transferencia 2026 | carChecking',
  description:
    'Estimador y simulador de costos de transferencia de auto en Argentina. Calculá los aranceles del DNRPA, el sellado provincial y los gastos del trámite. Gratis, actualizado 2026.',
  keywords:
    'estimador de costos de transferencia, calculadora de transferencia, simulador de transferencia, estimador de costos dnrpa, costo transferencia auto, aranceles dnrpa',
  alternates: {
    canonical:
      'https://www.carchecking.com.ar/calculadora-de-costos-de-transferencia',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/calculadora-de-costos-de-transferencia/',
    title: 'Estimador y Calculadora de Costos de Transferencia 2026 | carChecking',
    description: 'Estimador de costos de transferencia de auto: aranceles del DNRPA, sellado provincial y gastos del trámite. Gratis.',
  },
};

export default function Page() {
  return <CalculadoraTransferenciaPage />;
}
