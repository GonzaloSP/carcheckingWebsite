import type { Metadata } from 'next';
import MultasPBAGuidePage from '@/page-components/MultasPBAGuidePage';
import { MULTAS_PBA_GUIDES } from '@/data/multas-pba-guides';

export async function generateStaticParams() {
  return Object.keys(MULTAS_PBA_GUIDES).map((guide) => ({ guide }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  const content = MULTAS_PBA_GUIDES[guide];
  if (!content) {
    return { title: 'Multas Provincia de Buenos Aires | carChecking' };
  }
  const canonicalUrl = `https://www.carchecking.com.ar/multas-pba/${content.slug}/`;
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: content.seoKeywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: content.seoTitle,
      description: content.seoDescription,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  return <MultasPBAGuidePage guide={guide} />;
}
