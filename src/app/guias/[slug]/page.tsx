import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticlePage from '@/page-components/ArticlePage';
import { getArticleBySlug, articles } from '@/data/articles';

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Artículo no encontrado | carChecking' };
  }
  const canonicalUrl = `https://www.carchecking.com.ar/guias/${article.slug}`;
  const ogImage = new URL(article.image, 'https://www.carchecking.com.ar/').toString();
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.tags.join(', '),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: article.metaTitle,
      description: article.metaDescription,
      images: [{ url: ogImage }],
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getArticleBySlug(slug)) notFound();
  return <ArticlePage slug={slug} />;
}
