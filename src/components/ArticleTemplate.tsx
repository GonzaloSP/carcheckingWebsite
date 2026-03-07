import { useRef, useLayoutEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, MessageCircle } from 'lucide-react';

import SEO from './SEO';
import Navigation from '../sections/Navigation';
import { whatsappUrl } from '../config/whatsapp';
import { trackEvent, type AnalyticsEventName } from '../lib/analytics';
import TransferCostCalculator from './TransferCostCalculator';

gsap.registerPlugin(ScrollTrigger);

export type ArticleTemplateBreadcrumb = {
  label: string;
  to?: string;
};

export type ArticleTemplateProps = {
  // SEO
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage?: string;

  // Header
  title: string;
  category: string;
  date: string; // YYYY-MM-DD
  author: string;
  image: string;
  tags: string[];

  // Content
  content: string; // markdown-like string (same format as src/data/articles.ts)

  // Navigation aids
  breadcrumbs?: ArticleTemplateBreadcrumb[];
  analyticsEvent?: { name: AnalyticsEventName; props?: Record<string, any> };
};

export default function ArticleTemplate({
  metaTitle,
  metaDescription,
  canonicalUrl,
  ogImage,
  title,
  category,
  date,
  author,
  image,
  tags,
  content,
  breadcrumbs,
  analyticsEvent,
}: ArticleTemplateProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Track views
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!analyticsEvent) return;
    trackEvent(analyticsEvent.name, analyticsEvent.props ?? {});
  }, []);

  useLayoutEffect(() => {
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
  }, []);

  const openWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'article_template', canonicalUrl });
    window.open(whatsappUrl(), '_blank');
  };

  // Convert markdown-like content to HTML (same behavior as ArticlePage)
  const renderContent = (rawContent: string) => {
    const lines = rawContent.split('\n');
    let inList = false;
    let listItems: string[] = [];
    const elements: React.ReactElement[] = [];
    let key = 0;

    const formatInline = (raw: string) =>
      raw
        .replace(
          /\[(.*?)\]\((.*?)\)/g,
          '<a href="$2" class="text-[#C8A161] hover:underline">$1</a>'
        )
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

      if (trimmed === '[[transfer_cost_calculator]]') {
        flushList();
        elements.push(
          <div key={`calc-${key++}`} className="my-8">
            <TransferCostCalculator />
          </div>
        );
        return;
      }

      if (trimmed.startsWith('[[youtube:') && trimmed.endsWith(']]')) {
        flushList();
        const inside = trimmed.slice('[[youtube:'.length, -2).trim();
        let videoId = inside;
        try {
          if (inside.startsWith('http')) {
            const u = new URL(inside);
            videoId = u.searchParams.get('v') || inside;
          }
        } catch {
          // ignore
        }
        videoId = (videoId || '').replace(/[^a-zA-Z0-9_-]/g, '');
        if (videoId) {
          elements.push(
            <div key={`yt-${key++}`} className="my-10">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">Video</h2>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#2a2a2c]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
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
      } else if (/^\d\.\s/.test(trimmed)) {
        inList = true;
        listItems.push(trimmed.replace(/^\d\.\s/, ''));
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
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  const crumbs: ArticleTemplateBreadcrumb[] =
    breadcrumbs ?? [
      { label: 'Inicio', to: '/' },
      { label: category },
    ];

  return (
    <HelmetProvider>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={tags.join(', ')}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
      />

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-24 pb-16">
          {/* Hero Image */}
          <div className="relative h-[40vh] lg:h-[50vh] mb-8">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-transparent" />
          </div>

          <div className="px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div ref={contentRef} className="lg:col-span-2">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-6">
                    {crumbs.map((c, i) => (
                      <span key={i} className="flex items-center gap-2">
                        {i > 0 && <span>/</span>}
                        {c.to ? (
                          <Link to={c.to} className="hover:text-[#C8A161] transition-colors">
                            {c.label}
                          </Link>
                        ) : (
                          <span className="text-[#C8A161]">{c.label}</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-[#C8A161] text-[#0B0B0D] text-xs font-semibold rounded mb-4">
                    {category}
                  </span>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] mb-6">
                    {title}
                  </h1>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#B8B2AA] mb-8 pb-8 border-b border-[#2a2a2c]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(date).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {author}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="prose prose-invert max-w-none">{renderContent(content)}</div>

                  {/* Tags */}
                  <div className="mt-10 pt-8 border-t border-[#2a2a2c]">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-[#C8A161]" />
                      <span className="text-sm text-[#B8B2AA]">Etiquetas:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#141416] border border-[#2a2a2c] text-[#B8B2AA] text-sm rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div ref={sidebarRef} className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* CTA Box */}
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
                      <h3 className="text-lg font-bold text-[#F4F1EC] mb-3">¿Necesita verificar un vehículo?</h3>
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

                    {/* Contact */}
                    <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6">
                      <h3 className="text-lg font-bold text-[#F4F1EC] mb-3">Contacto</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-[#B8B2AA]">
                          <span className="text-[#F4F1EC]">WhatsApp:</span>{' '}
                          <button onClick={openWhatsApp} className="text-[#C8A161] hover:underline">
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
            <p className="text-sm text-[#5a5a5c]">© carChecking 2011–2026. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Inicio
              </Link>
              <Link to="/guias" className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors">
                Blog
              </Link>
              <Link
                to="/solicitar-turno"
                className="text-sm text-[#B8B2AA] hover:text-[#C8A161] transition-colors"
              >
                Solicitar turno
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
