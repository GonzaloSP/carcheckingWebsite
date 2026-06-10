import type { Metadata } from 'next';
import VtvLocationPage from '@/page-components/VtvLocationPage';
import { locations, getLocationBySlug } from '@/data/locations';

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) {
    return { title: 'VTV | carChecking' };
  }
  const place = location.name;
  const canonicalUrl = `https://www.carchecking.com.ar/vtv-en/${slug}/`;
  return {
    title: `VTV en ${place} – Turno, requisitos y costos 2026 | carChecking`,
    description: `Guía 2026 para hacer la VTV en ${place}: cómo sacar turno, requisitos, qué te revisan, costos orientativos y consejos para aprobar sin sorpresas.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `VTV en ${place} 2026 | carChecking`,
      description: `Guía para hacer la VTV en ${place}: turno, requisitos y costos 2026.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VtvLocationPage slug={slug} />;
}
