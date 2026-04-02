import type { Metadata } from 'next';
import VerificacionPolicialLocationPage from '@/page-components/VerificacionPolicialLocationPage';
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
    return { title: 'Verificación Policial | carChecking' };
  }
  const place = location.name;
  const canonicalUrl = `https://www.carchecking.com.ar/verificacion-policial-en/${slug}`;
  return {
    title: `Verificación policial en ${place} – Requisitos y costos | carChecking`,
    description: `Guía práctica para hacer la verificación policial en ${place}: cuándo conviene, qué papeles llevar, cuánto puede costar y consejos para comprar/vender sin sorpresas.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `Verificación policial en ${place} | carChecking`,
      description: `Guía práctica para la verificación policial en ${place}.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VerificacionPolicialLocationPage slug={slug} />;
}
