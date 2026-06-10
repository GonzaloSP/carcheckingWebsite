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
  const canonicalUrl = `https://www.carchecking.com.ar/consultar-multa/${slug}/`;
  const title = fuente.metaTitle ?? `Consultar Multas ${fuente.label} por Patente | carChecking`;
  const description = fuente.metaDescription ?? `Consultá multas e infracciones en ${fuente.label} por patente o dominio, gratis y en segundos. Verificación online directa, sin registro ni filas.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
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
