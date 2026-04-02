import type { Metadata } from 'next';
import ConsultarMultaJurisdiccionPage from '@/page-components/ConsultarMultaJurisdiccionPage';
import { JURISDICCIONES_MULTA } from '@/data/multa-jurisdictions';

export async function generateStaticParams() {
  return JURISDICCIONES_MULTA.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fuente = JURISDICCIONES_MULTA.find((j) => j.slug === slug);
  if (!fuente) {
    return { title: 'Consultar Multas | carChecking' };
  }
  const canonicalUrl = `https://www.carchecking.com.ar/consultar-multa/${slug}`;
  return {
    title: `Consultar Multas ${fuente.label} por Patente | carChecking`,
    description: `Consultá multas de tránsito en ${fuente.label} (${fuente.sub}) por patente. Consulta online, sin colas.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `Consultar Multas ${fuente.label} | carChecking`,
      description: `Consultá multas de tránsito en ${fuente.label} por patente.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ConsultarMultaJurisdiccionPage slug={slug} />;
}
