import type { Metadata } from 'next';
import LocationLandingPage from '@/page-components/LocationLandingPage';
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
    return { title: 'Revisión de Vehículo | carChecking' };
  }
  const place = location.name;
  const canonicalUrl = `https://www.carchecking.com.ar/revision-vehiculo-en/${slug}`;
  return {
    title: `Revisión de vehículo en ${place} | carChecking`,
    description: `Servicio de revisión/inspección de autos usados en ${place}. Mecánico a domicilio, escaneo computarizado y reporte escrito con fotos. Coordiná un turno.`,
    keywords: `revisión de vehículo en ${place}, inspección vehicular ${place}, mecánico a domicilio ${place}, revisar auto usado ${place}, escaneo OBD ${place}, carChecking ${place}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `Revisión de vehículo en ${place} | carChecking`,
      description: `Servicio de revisión/inspección de autos usados en ${place}.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LocationLandingPage slug={slug} />;
}
