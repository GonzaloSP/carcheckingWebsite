'use client';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { isDesktop } from '../lib/isDesktop';

gsap.registerPlugin(ScrollTrigger);

// WhatsApp SVG Logo Component
const WhatsAppLogo = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function LocationHeroSection({ place }: { place: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const localLineRef = useRef<HTMLParagraphElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(imageRef.current, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2 });

      tl.fromTo(diagonalRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.8');

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 }, '-=0.4');
      }

      // Locality line
      tl.fromTo(localLineRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.25');

      // Subheadline
      tl.fromTo(subheadRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.25');

      // CTAs
      tl.fromTo(ctaRef.current?.children || [], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.3');

      // Trust line
      tl.fromTo(trustRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation (desktop only)
  useLayoutEffect(() => {
    if (!isDesktop()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(
              [imageRef.current, diagonalRef.current, headlineRef.current, localLineRef.current, subheadRef.current, ctaRef.current, trustRef.current],
              { opacity: 1, x: 0, scale: 1 }
            );
          },
        },
      });

      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(localLineRef.current, { x: 0, opacity: 1 }, { x: '9vw', opacity: 0, ease: 'power2.in' }, 0.71);
      scrollTl.fromTo(subheadRef.current, { x: 0, opacity: 1 }, { x: '8vw', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(ctaRef.current, { x: 0, opacity: 1 }, { x: '6vw', opacity: 0, ease: 'power2.in' }, 0.74);
      scrollTl.fromTo(trustRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      scrollTl.fromTo(imageRef.current, { x: 0, scale: 1, opacity: 1 }, { x: '-18vw', scale: 1.08, opacity: 0.3, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(diagonalRef.current, { x: 0, opacity: 1 }, { x: '-6vw', opacity: 0.2, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineWords = 'LA FORMA SEGURA DE COMPRAR SU VEHÍCULO'.split(' ');

  return (
    <section ref={sectionRef} id="hero" className="section-pinned bg-[#0B0B0D] z-10">
      {/* Left Image Panel */}
      <div ref={imageRef} className="relative md:absolute md:left-0 md:top-0 w-full md:w-[62vw] h-[44svh] md:h-full overflow-hidden">
        <img
          src={`${''}images/hero_mecanico_03.jpg`}
          alt={`Mecánico inspeccionando un vehículo en ${place}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0D]/80" />
      </div>

      {/* Diagonal Divider */}
      <div
        ref={diagonalRef}
        className="hidden md:block absolute top-0 h-[120%] w-[2px] bg-[#C8A161]/70"
        style={{ left: '58vw', transformOrigin: 'top center', transform: 'rotate(28deg) translateY(-10%)' }}
      />

      {/* Right Text Panel */}
      <div className="relative md:absolute md:right-0 md:top-0 w-full md:w-[42vw] min-h-[56svh] md:h-full bg-[#0B0B0D] flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 md:py-0">
        {/* Headline */}
        <h1 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4F1EC] leading-[0.95] mb-5">
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Inserted under the headline (requested) */}
        <p ref={localLineRef} className="text-sm md:text-base text-[#C8A161] font-semibold tracking-wide uppercase mb-6">
          Revisión de vehículo en {place}
        </p>

        {/* Subheadline */}
        <p ref={subheadRef} className="text-base lg:text-lg text-[#B8B2AA] max-w-md mb-4 leading-relaxed">
          Si estás por comprar un auto usado en {place}, una inspección precompra te ayuda a detectar problemas mecánicos, choques ocultos y fallas electrónicas antes de pagar.
        </p>
        <p className="text-base lg:text-lg text-[#B8B2AA] max-w-md mb-10 leading-relaxed">
          Revisamos autos usados a domicilio con un mecánico especializado y escaneo computarizado. Recibís un informe claro con fotos para comprar con tranquilidad.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/solicitar-turno"
            className="group inline-flex items-center justify-center gap-2 bg-[#C8A161] text-[#0B0B0D] px-6 py-4 rounded-lg font-semibold hover:bg-[#C8A161]/90 transition-all"
          >
            Solicitar turno
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={() => scrollToSection('cobertura')}
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#2a2a2c] text-[#F4F1EC] px-6 py-4 rounded-lg font-semibold hover:border-[#C8A161]/60 hover:text-[#C8A161] transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Ver cobertura
          </button>

          <a
            href="https://wa.me/5491166453654"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#141416] border border-[#2a2a2c] text-[#F4F1EC] px-6 py-4 rounded-lg font-semibold hover:border-[#25D366]/60 hover:text-[#25D366] transition-colors"
          >
            <WhatsAppLogo className="w-5 h-5" />
            WhatsApp
          </a>
        </div>

        {/* Trust line */}
        <div ref={trustRef} className="text-xs text-[#7c766f]">
          Inspección + escaneo + informe. CABA y GBA.
        </div>
      </div>
    </section>
  );
}
