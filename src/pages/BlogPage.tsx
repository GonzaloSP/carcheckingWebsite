import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import { articles, getAllCategories } from '../data/articles';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const categories = getAllCategories();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const articleCards = articlesRef.current?.querySelectorAll('.article-card');
      if (articleCards) {
        gsap.fromTo(
          articleCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: articlesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <HelmetProvider>
      <SEO
        title="Guías | carChecking - Consejos y Guías sobre Vehículos Usados"
        description="Artículos, consejos y guías sobre compra segura de vehículos usados. Aprenda a detectar fraudes, negociar precios y verificar el estado de un auto."
        canonicalUrl="/guias"
      />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        <main className="pt-24 pb-16">
          {/* Header */}
          <div ref={headerRef} className="px-6 lg:px-12 mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-4">
                <Link to="/" className="hover:text-[#C8A161] transition-colors">
                  Inicio
                </Link>
                <span>/</span>
                <span className="text-[#C8A161]">Guías</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F4F1EC] mb-4">
                GUÍAS
              </h1>
              <p className="text-lg text-[#B8B2AA] max-w-2xl">
                Consejos, guías y artículos para ayudarle a tomar la mejor decisión al comprar un vehículo usado.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="px-6 lg:px-12 mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#C8A161] text-[#0B0B0D] text-sm font-medium rounded">
                  Todos
                </span>
                {categories.map((category) => (
                  <span
                    key={category}
                    className="px-4 py-2 bg-[#141416] border border-[#2a2a2c] text-[#B8B2AA] text-sm rounded hover:border-[#C8A161] hover:text-[#F4F1EC] transition-colors cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Guías recomendadas (enlaces internos) */}
          <div className="px-6 lg:px-12 mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-[#F4F1EC] mb-2">
                  Guías recomendadas para comprar un usado
                </h2>
                <p className="text-sm text-[#B8B2AA] mb-6 max-w-2xl">
                  Si empezás desde cero, estas tres guías te ordenan todo: inspección pre compra, checklist y papeles en Argentina.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    to="/guias/inspeccion-pre-compra-auto-a-domicilio"
                    className="group bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg p-5 hover:border-[#C8A161]/60 transition-colors"
                  >
                    <h3 className="text-base font-semibold text-[#F4F1EC] group-hover:text-[#C8A161] transition-colors mb-2">
                      Inspección pre compra auto (a domicilio)
                    </h3>
                    <p className="text-sm text-[#B8B2AA]">
                      Qué incluye, cómo es el proceso, escaneo OBD y qué preguntar antes de contratar.
                    </p>
                  </Link>

                  <Link
                    to="/guias/que-revisar-antes-de-comprar-auto-usado-checklist"
                    className="group bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg p-5 hover:border-[#C8A161]/60 transition-colors"
                  >
                    <h3 className="text-base font-semibold text-[#F4F1EC] group-hover:text-[#C8A161] transition-colors mb-2">
                      Qué revisar antes de comprar un auto usado (checklist)
                    </h3>
                    <p className="text-sm text-[#B8B2AA]">
                      Una lista simple para mirar motor, carrocería, prueba de manejo y señales de alerta.
                    </p>
                  </Link>

                  <Link
                    to="/guias/papeles-auto-usado-argentina-informe-dominio-verificacion-policial"
                    className="group bg-[#0B0B0D] border border-[#2a2a2c] rounded-lg p-5 hover:border-[#C8A161]/60 transition-colors"
                  >
                    <h3 className="text-base font-semibold text-[#F4F1EC] group-hover:text-[#C8A161] transition-colors mb-2">
                      Papeles para comprar un auto usado en Argentina
                    </h3>
                    <p className="text-sm text-[#B8B2AA]">
                      Informe de dominio, verificación policial, prenda, multas, VTV y grabado de autopartes.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div ref={articlesRef} className="px-6 lg:px-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="article-card group bg-[#141416] border border-[#2a2a2c] rounded-lg overflow-hidden hover:border-[#C8A161]/50 transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/guias/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/60 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#C8A161] text-[#0B0B0D] text-xs font-semibold rounded">
                      {article.category}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#B8B2AA] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('es-AR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#F4F1EC] mb-3 group-hover:text-[#C8A161] transition-colors line-clamp-2">
                      <Link to={`/guias/${article.slug}`}>{article.title}</Link>
                    </h2>

                    <p className="text-sm text-[#B8B2AA] mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 text-xs text-[#5a5a5c]"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/guias/${article.slug}`}
                        className="flex items-center gap-1 text-sm text-[#C8A161] hover:text-[#D4B896] transition-colors"
                      >
                        Leer
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="px-6 lg:px-12 mt-20">
            <div className="max-w-6xl mx-auto bg-[#141416] border border-[#2a2a2c] rounded-lg p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#F4F1EC] mb-4">
                ¿Necesita verificar un vehículo?
              </h2>
              <p className="text-[#B8B2AA] mb-6 max-w-xl mx-auto">
                Más de 350 puntos de inspección. Informe escrito con fotos. Servicio a domicilio.
              </p>
              <Link
                to="/solicitar-turno"
                className="btn-primary inline-flex items-center gap-2"
              >
                Solicitar turno
                <ArrowRight className="w-4 h-4" />
              </Link>
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
