import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, FileCheck, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '1',
    title: 'Reserve su turno',
    description: 'Online o por WhatsApp. Atención en 24–48 hs.',
    icon: Calendar,
  },
  {
    number: '2',
    title: 'Revisión a domicilio',
    description: 'Mecánico + escáner en el lugar que elija.',
    icon: MapPin,
  },
  {
    number: '3',
    title: 'Reciba el informe',
    description: 'Detalle por escrito con recomendaciones.',
    icon: FileCheck,
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diagonalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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

      // Step items
      const stepItems = stepsRef.current?.querySelectorAll('.step-item');
      if (stepItems) {
        scrollTl.fromTo(
          stepItems,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
          0.18
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
        [headlineRef.current, stepsRef.current, ctaRef.current],
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
    window.open('https://wa.me/541156980573', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#6B4B3A] z-40"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[55vw] h-full overflow-hidden"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/scanner_hands.jpg`}
          alt="Escaneo de vehículo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#6B4B3A]/80" />
      </div>

      {/* Diagonal Divider */}
      <div
        ref={diagonalRef}
        className="absolute top-0 h-[120%] w-[2px] bg-[#C8A161]/80"
        style={{
          left: '52vw',
          transformOrigin: 'top center',
          transform: 'rotate(28deg) translateY(-10%)',
        }}
      />

      {/* Right Text Panel */}
      <div className="absolute right-0 top-0 w-[48vw] h-full bg-[#6B4B3A] flex flex-col justify-center px-8 lg:px-12">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F1EC] leading-[0.95] mb-12"
        >
          CÓMO FUNCIONA
        </h2>

        {/* Steps */}
        <div ref={stepsRef} className="flex flex-col gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="step-item flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C8A161] flex items-center justify-center">
                <step.icon className="w-5 h-5 text-[#0B0B0D]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#F4F1EC] mb-1">
                  {step.number}. {step.title}
                </h3>
                <p className="text-[#E8E0D8] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={openWhatsApp}
          className="btn-primary flex items-center gap-3 w-fit bg-[#0B0B0D] text-[#C8A161] hover:bg-[#1a1a1c]"
        >
          <MessageCircle className="w-5 h-5" />
          Reservar turno
        </button>
      </div>
    </section>
  );
}
