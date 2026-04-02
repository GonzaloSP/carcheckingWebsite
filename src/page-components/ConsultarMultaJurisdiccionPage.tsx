'use client';
import { useRouter } from 'next/navigation';
import { JURISDICCIONES_MULTA } from '../data/multa-jurisdictions';
import ConsultarMultaPage from './ConsultarMultaPage';

export default function ConsultarMultaJurisdiccionPage({ slug }: { slug: string }) {
  const fuente = JURISDICCIONES_MULTA.find(j => j.slug === slug);

  if (!fuente) return null;

  return <ConsultarMultaPage jurisdiccionOverride={fuente} />;
}
