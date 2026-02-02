import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// WhatsApp SVG Logo Component
const WhatsAppLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image fade in
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Diagonal line
      tl.fromTo(
        diagonalRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.8'
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          '-=0.4'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        '-=0.3'
      );

      // Trust line
      tl.fromTo(
        trustRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
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
            // Reset all elements when scrolling back to top
            gsap.set([imageRef.current, diagonalRef.current, headlineRef.current, subheadRef.current, ctaRef.current, trustRef.current], {
              opacity: 1,
              x: 0,
              scale: 1,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      // Headline exits
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subhead exits
      scrollTl.fromTo(
        subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '8vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exits
      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Trust line exits
      scrollTl.fromTo(
        trustRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Image exits
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-18vw', scale: 1.08, opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      // Diagonal exits
      scrollTl.fromTo(
        diagonalRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineWords = 'LA FORMA SEGURA DE COMPRAR SU VEHÍCULO'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#0B0B0D] z-10"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[62vw] h-full overflow-hidden"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/hero_car.jpg`}
          alt="Vehículo en Buenos Aires"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0D]/80" />
      </div>

      {/* Diagonal Divider */}
      <div
        ref={diagonalRef}
        className="absolute top-0 h-[120%] w-[2px] bg-[#C8A161]/70"
        style={{
          left: '58vw',
          transformOrigin: 'top center',
          transform: 'rotate(28deg) translateY(-10%)',
        }}
      />

      {/* Right Text Panel */}
      <div className="absolute right-0 top-0 w-[42vw] h-full bg-[#0B0B0D] flex flex-col justify-center px-8 lg:px-12">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4F1EC] leading-[0.95] mb-8"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="text-base lg:text-lg text-[#B8B2AA] max-w-md mb-10 leading-relaxed"
        >
          Revisión mecánica a domicilio + escaneo computarizado. Más de 350
          puntos inspeccionados.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col gap-4">
          <Link
            to="/solicitar-turno"
            className="btn-primary flex items-center gap-3 w-fit"
          >
            <WhatsAppLogo className="w-5 h-5" />
            Solicitar turno
          </Link>
          <button
            onClick={() => scrollToSection('cobertura')}
            className="flex items-center gap-2 text-[#C8A161] hover:text-[#D4B896] transition-colors group"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm tracking-wide">Ver cobertura</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Trust Line */}
      <div
        ref={trustRef}
        className="absolute bottom-8 right-8 lg:right-12 text-right"
      >
        <p className="text-xs text-[#B8B2AA] tracking-wider uppercase">
          Capital Federal · Gran Buenos Aires · Córdoba Capital
        </p>
      </div>
    </section>
  );
}
