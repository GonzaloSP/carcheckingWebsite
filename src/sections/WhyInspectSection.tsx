import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyInspectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0% - 30%)
      // Image slides in from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0, scale: 1.1 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Diagonal line
      scrollTl.fromTo(
        diagonalRef.current,
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Headline words
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Body + CTA + stats
      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current, statsRef.current],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current, ctaRef.current, statsRef.current],
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '10vw', scale: 1.06, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        diagonalRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/541156980573', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="servicio"
      className="section-pinned bg-[#0B0B0D] z-20"
    >
      {/* Left Text Panel */}
      <div className="absolute left-0 top-0 w-[45vw] h-full bg-[#0B0B0D] flex flex-col justify-center px-8 lg:px-16">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F1EC] leading-[0.95] mb-8"
        >
          REVISE EL VEHÍCULO ANTES DE COMPRARLO
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-base lg:text-lg text-[#B8B2AA] max-w-md mb-8 leading-relaxed"
        >
          5 de cada 10 usados tienen problemas ocultos. Detecte cuentakilómetros
          adulterados, choques encubiertos y fallas mecánicas antes de pagar.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={openWhatsApp}
          className="flex items-center gap-2 text-[#C8A161] hover:text-[#D4B896] transition-colors group w-fit mb-12"
        >
          <span className="text-sm tracking-wide uppercase font-semibold">
            Conozca el servicio
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#C8A161]" />
            <span className="text-sm text-[#B8B2AA]">
              +350 puntos revisados
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#C8A161]" />
            <span className="text-sm text-[#B8B2AA]">Informe escrito</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#C8A161]" />
            <span className="text-sm text-[#B8B2AA]">Fotos documentadas</span>
          </div>
        </div>
      </div>

      {/* Diagonal Divider */}
      <div
        ref={diagonalRef}
        className="absolute top-0 h-[120%] w-[2px] bg-[#C8A161]/70"
        style={{
          left: '44vw',
          transformOrigin: 'top center',
          transform: 'rotate(28deg) translateY(-10%)',
        }}
      />

      {/* Right Image Panel */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 w-[58vw] h-full overflow-hidden"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/engine_bay.jpg`}
          alt="Motor de vehículo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0B0B0D]/60" />
      </div>
    </section>
  );
}
