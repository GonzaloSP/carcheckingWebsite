export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { locations } from '@/data/locations';
import { JURISDICCIONES_MULTA } from '@/data/multa-jurisdictions';
import { MULTAS_CABA_GUIDES } from '@/data/multas-caba-guides';
import { MULTAS_PBA_GUIDES } from '@/data/multas-pba-guides';

const BASE = 'https://www.carchecking.com.ar';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/guias`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/solicitar-turno`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/servicio-gestoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/consultar-multa`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/calculadora-de-costos-de-transferencia`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/revision-vehiculo-en`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    {
      url: `${BASE}/guias/recibo-de-sena-de-venta-de-vehiculo`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const multaPages: MetadataRoute.Sitemap = JURISDICCIONES_MULTA.map((j) => ({
    url: `${BASE}/consultar-multa/${j.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const cabaGuidePages: MetadataRoute.Sitemap = Object.values(MULTAS_CABA_GUIDES).map((g) => ({
    url: `${BASE}/multas-caba/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const pbaGuidePages: MetadataRoute.Sitemap = Object.values(MULTAS_PBA_GUIDES).map((g) => ({
    url: `${BASE}/multas-pba/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.flatMap((l) => [
    {
      url: `${BASE}/verificacion-policial-en/${l.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE}/vtv-en/${l.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]);

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/guias/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...multaPages,
    ...cabaGuidePages,
    ...pbaGuidePages,
    ...locationPages,
    ...articlePages,
  ];
}
