import type { Metadata } from 'next';
import CalculadoraTransferenciaPage from '@/page-components/CalculadoraTransferenciaPage';

export const metadata: Metadata = {
  title: 'Calculadora de Costos de Transferencia Automotor 2026 | carChecking',
  description:
    'Calculá el costo exacto de transferir tu auto en Argentina. Incluye honorarios registrales, sellado provincial y gastos del DNRPA. Actualizado 2026.',
  alternates: {
    canonical:
      'https://www.carchecking.com.ar/calculadora-de-costos-de-transferencia',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.carchecking.com.ar/calculadora-de-costos-de-transferencia',
    title: 'Calculadora de Costos de Transferencia Automotor 2026 | carChecking',
    description: 'Calculá el costo exacto de transferir tu auto en Argentina.',
  },
};

export default function Page() {
  return <CalculadoraTransferenciaPage />;
}
