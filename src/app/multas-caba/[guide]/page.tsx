import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MultasCABAGuidePage from '@/page-components/MultasCABAGuidePage';
import { MULTAS_CABA_GUIDES } from '@/data/multas-caba-guides';

export async function generateStaticParams() {
  return Object.keys(MULTAS_CABA_GUIDES).map((guide) => ({ guide }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  const content = MULTAS_CABA_GUIDES[guide];
  if (!content) {
    return { title: 'Multas CABA | carChecking' };
  }
  const canonicalUrl = `https://www.carchecking.com.ar/multas-caba/${content.slug}`;
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
  if (!MULTAS_CABA_GUIDES[guide]) notFound();
  return <MultasCABAGuidePage guide={guide} />;
}
