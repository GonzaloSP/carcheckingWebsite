import { useRef, useLayoutEffect } from 'react';
// useLayoutEffect is also used for analytics event after article resolves

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import { getArticleBySlug, getRecentArticles } from '../data/articles';
import { Calendar, User, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../config/whatsapp';
import { trackEvent } from '../lib/analytics';
import TransferCostCalculator from '../components/TransferCostCalculator';

gsap.registerPlugin(ScrollTrigger);

export default function ArticlePage() {
  const params = useParams();
  const slugParam = (params as any).slug as string | undefined;
  const splat = (params as any)['*'] as string | undefined;
  const rawSlug = slugParam ?? splat;
  const article = rawSlug ? getArticleBySlug(rawSlug) : undefined;
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const recentArticles = getRecentArticles(3).filter((a) => a.slug !== rawSlug);

  // Track article view with slug/title (in addition to the route-level event)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!article) return;
    trackEvent('article_view', { slug: article.slug, title: article.title });
  }, [article]);

  useLayoutEffect(() => {
    if (!article) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        sidebarRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [article]);

  if (!article) {
    return <Navigate to="/guias" replace />;
  }

  const openWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'article_page', slug: rawSlug });
    window.open(whatsappUrl(), '_blank');
  };

  // Convert markdown-like content to HTML
  const renderContent = (content: string) => {
    // Custom component markers supported in article content.
    // Use a full line like: [[transfer_cost_calculator]]
    const lines = content.split('\n');
    let inList = false;
    let listItems: string[] = [];
    const elements: React.ReactElement[] = [];
    let key = 0;

    const formatInline = (raw: string) =>
      raw
        // Links first, so we don't accidentally match `[` `]` inside HTML we inject later.
        .replace(
          /\[(.*?)\]\((.*?)\)/g,
          '<a href="$2" class="text-[#C8A161] hover:underline">$1</a>'
        )
        // Bold second. Use inline style (not Tailwind arbitrary class) to avoid `[]` sequences.
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F4F1EC">$1</strong>');

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="space-y-2 mb-6">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#B8B2AA]">
                <span className="w-1.5 h-1.5 bg-[#C8A161] rounded-full mt-2 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Component injection markers
      if (trimmed === '[[transfer_cost_calculator]]') {
        flushList();
        elements.push(
          <div key={`calc-${key++}`} className="my-8">
            <TransferCostCalculator />
          </div>
        );
        return;
      }

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${key++}`} className="text-2xl font-bold text-[#F4F1EC] mt-10 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${key++}`} className="text-xl font-semibold text-[#F4F1EC] mt-8 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(trimmed.replace('- ', ''));
      } else if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ') || trimmed.startsWith('5. ')) {
        inList = true;
        listItems.push(trimmed.replace(/^\d\. /, ''));
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        flushList();
        elements.push(
          <p key={`p-bold-${key++}`} className="text-[#F4F1EC] font-semibold mb-4">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      } else if (trimmed === '---') {
        flushList();
        elements.push(<hr key={`hr-${key++}`} className="border-[#2a2a2c] my-8" />);
      } else if (trimmed) {
        flushList();
        elements.push(
          <p
            key={`p-${key++}`}
            className="text-[#B8B2AA] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: formatInline(trimmed),
            }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <HelmetProvider>
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        keywords={article.tags.join(', ')}
        canonicalUrl={`/guias/${article.slug}`}
        ogImage={new URL(article.image, 'https://carchecking.com.ar/').toString()}
        ogType="article"
        article={{
          publishedTime: article.date,
          author: article.author,
          category: article.category,
          tags: article.tags,
        }}
      />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-24 pb-16">
          {/* Hero Image */}
          <div className="relative h-[40vh] lg:h-[50vh] mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-transparent" />
          </div>

          <div className="px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div ref={contentRef} className="lg:col-span-2">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-6">
                    <Link to="/" className="hover:text-[#C8A161] transition-colors">
                      Inicio
                    </Link>
                    <span>/</span>
                    <Link to="/guias" className="hover:text-[#C8A161] transition-colors">
                      Guías
                    </Link>
                    <span>/</span>
                    <span className="text-[#C8A161]">{article.category}</span>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-[#C8A161] text-[#0B0B0D] text-xs font-semibold rounded mb-4">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] mb-6">
                    {article.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#B8B2AA] mb-8 pb-8 border-b border-[#2a2a2c]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="prose prose-invert max-w-none">
                    {renderContent(article.content)}
                  </div>

                  {/* Tags */}
                  <div className="mt-10 pt-8 border-t border-[#2a2a2c]">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-[#C8A161]" />
                      <span className="text-sm text-[#B8B2AA]">Etiquetas:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#141416] border border-[#2a2a2c] text-[#B8B2AA] text-sm rounded hover:border-[#C8A161] transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Back to Blog */}
                  <div className="mt-10">
                    <Link
                      to="/guias"
                      className="inline-flex items-center gap-2 text-[#C8A161] hover:text-[#D4B896] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver al blog
                    </Link>
                  </div>
                </div>

                {/* Sidebar */}
                <div ref={sidebarRef} className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* CTA Box */}
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
                      <h3 className="text-lg font-bold text-[#F4F1EC] mb-3">
                        ¿Necesita verificar un vehículo?
                      </h3>
                      <p className="text-sm text-[#B8B2AA] mb-4">
                        Más de 350 puntos de inspección. Informe escrito con fotos.
                      </p>
                      <button
                        onClick={openWhatsApp}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Solicitar turno
                      </button>
                    </div>

                    {/* Recent Articles */}
                    {recentArticles.length > 0 && (
                      <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
                        <h3 className="text-lg font-bold text-[#F4F1EC] mb-4">
                          Artículos recientes
                        </h3>
                        <div className="space-y-4">
                          {recentArticles.map((recent) => (
                            <Link
                              key={recent.id}
                              to={`/guias/${recent.slug}`}
                              className="block group"
                            >
                              <h4 className="text-sm text-[#F4F1EC] group-hover:text-[#C8A161] transition-colors line-clamp-2 mb-1">
                                {recent.title}
                              </h4>
                              <span className="text-xs text-[#5a5a5c]">
                                {new Date(recent.date).toLocaleDateString('es-AR', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact */}
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
                      <h3 className="text-lg font-bold text-[#F4F1EC] mb-3">
                        Contacto
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-[#B8B2AA]">
                          <span className="text-[#F4F1EC]">WhatsApp:</span>{' '}
                          <button
                            onClick={openWhatsApp}
                            className="text-[#C8A161] hover:underline"
                          >
                            11-5698-0573
                          </button>
                        </p>
                        <p className="text-[#B8B2AA]">
                          <span className="text-[#F4F1EC]">Horario:</span> Lun-Sáb 9-19hs
                        </p>
                        <p className="text-[#B8B2AA]">
                          <span className="text-[#F4F1EC]">Cobertura:</span> CABA, GBA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#2a2a2c] py-8 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#5a5a5c]">
              © carChecking 2011–2026. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Inicio
              </Link>
              <Link to="/guias" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Blog
              </Link>
              <Link to="/solicitar-turno" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Solicitar turno
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
