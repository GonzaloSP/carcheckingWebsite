import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Wrench, Cpu, Car, FileText } from 'lucide-react';
import { whatsappUrl } from '../config/whatsapp';
import { trackEvent } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Wrench,
    title: 'Revisión mecánica completa',
  },
  {
    icon: Cpu,
    title: 'Escaneo computarizado',
  },
  {
    icon: Car,
    title: 'Carrocería, chasis y pintura',
  },
  {
    icon: FileText,
    title: 'Informe escrito con fotos',
  },
];

export default function WhatWeCheckSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Image slides in from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0, scale: 1.08 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Diagonal line
      scrollTl.fromTo(
        diagonalRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // Feature items
      const featureItems = featuresRef.current?.querySelectorAll('.feature-item');
      if (featureItems) {
        scrollTl.fromTo(
          featureItems,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.16
        );
      }

      // Underline rules
      const underlines = featuresRef.current?.querySelectorAll('.underline-rule');
      if (underlines) {
        scrollTl.fromTo(
          underlines,
          { scaleX: 0 },
          { scaleX: 1, stagger: 0.02, ease: 'none' },
          0.2
        );
      }

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.28
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [headlineRef.current, featuresRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-10vw', scale: 1.05, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        diagonalRef.current,
        { x: 0, opacity: 1 },
        { x: '-6vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'what_we_check' });
    window.open(whatsappUrl(), '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0D] z-30"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[55vw] h-full overflow-hidden"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/mechanic_portrait.jpg`}
          alt="Mecánico profesional"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0B0D]/70" />
      </div>

      {/* Diagonal Divider */}
      <div
        ref={diagonalRef}
        className="absolute top-0 h-[120%] w-[2px] bg-[#C8A161]/70"
        style={{
          left: '52vw',
          transformOrigin: 'top center',
          transform: 'rotate(28deg) translateY(-10%)',
        }}
      />

      {/* Right Text Panel */}
      <div className="absolute right-0 top-0 w-[48vw] h-full bg-[#0B0B0D] flex flex-col justify-center px-8 lg:px-12">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F1EC] leading-[0.95] mb-10"
        >
          REVISAMOS MÁS DE 350 PUNTOS DEL VEHÍCULO
        </h2>

        {/* Features List */}
        <div ref={featuresRef} className="flex flex-col gap-6 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="flex items-center gap-4 mb-2">
                <feature.icon className="w-6 h-6 text-[#C8A161]" />
                <span className="text-lg text-[#F4F1EC]">{feature.title}</span>
              </div>
              <div className="underline-rule h-[2px] bg-[#C8A161]/50 w-full origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={openWhatsApp}
          className="flex items-center gap-2 text-[#C8A161] hover:text-[#D4B896] transition-colors group w-fit"
        >
          <span className="text-sm tracking-wide uppercase font-semibold">
            Ver detalle de la revisión
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
