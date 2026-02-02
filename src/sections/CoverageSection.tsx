import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';
import { whatsappUrl } from '../config/whatsapp';
import { trackEvent } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const coverageAreas = [
  { name: 'Capital Federal', x: 45, y: 55 },
  { name: 'Gran Buenos Aires', x: 45, y: 45 },
  { name: 'Córdoba Capital', x: 35, y: 65 },
];

export default function CoverageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body animation
      gsap.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Map panel animation
      gsap.fromTo(
        mapRef.current,
        { x: '10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Markers animation
      const markers = markersRef.current?.querySelectorAll('.map-marker');
      if (markers) {
        gsap.fromTo(
          markers,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'coverage' });
    window.open(whatsappUrl(), '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="cobertura"
      className="relative bg-[#0B0B0D] min-h-screen py-24 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left Text Content */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <h2
              ref={headlineRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] leading-[0.95] mb-6"
            >
              ZONA DE COBERTURA
            </h2>
            <p
              ref={bodyRef}
              className="text-base lg:text-lg text-[#B8B2AA] leading-relaxed mb-8"
            >
              Operamos en Capital Federal, Gran Buenos Aires y Córdoba Capital.
              Si su zona está en el mapa, podemos estar ahí.
            </p>
            <button
              ref={ctaRef}
              onClick={openWhatsApp}
              className="flex items-center gap-2 text-[#C8A161] hover:text-[#D4B896] transition-colors group w-fit"
            >
              <span className="text-sm tracking-wide uppercase font-semibold">
                Consultar por otra zona
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Map Panel */}
          <div
            ref={mapRef}
            className="lg:w-3/5 w-full relative"
            style={{
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
            }}
          >
            <div className="relative aspect-[4/3] bg-[#141416] rounded-lg overflow-hidden border border-[#2a2a2c]">
              {/* Stylized Map Background */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Argentina outline stylized */}
                <path
                  d="M45 10 L50 10 L52 15 L55 20 L58 25 L60 30 L62 35 L63 40 L64 45 L65 50 L66 55 L67 60 L68 65 L69 70 L70 75 L71 80 L72 85 L70 88 L68 90 L65 88 L62 85 L60 80 L58 75 L56 70 L54 65 L52 60 L50 55 L48 50 L46 45 L44 40 L42 35 L40 30 L38 25 L40 20 L42 15 L45 10 Z"
                  fill="none"
                  stroke="#2a2a2c"
                  strokeWidth="0.5"
                />
                {/* Province lines */}
                <path
                  d="M45 30 L65 30 M50 40 L68 40 M52 50 L69 50 M55 60 L70 60 M58 70 L71 70"
                  stroke="#1f1f21"
                  strokeWidth="0.3"
                />
                {/* Grid lines */}
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="#1a1a1c"
                      strokeWidth="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>

              {/* Map Markers */}
              <div ref={markersRef} className="absolute inset-0">
                {coverageAreas.map((area, index) => (
                  <div
                    key={index}
                    className="map-marker absolute"
                    style={{
                      left: `${area.x}%`,
                      top: `${area.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="relative">
                      {/* Pulse ring */}
                      <div className="absolute inset-0 w-8 h-8 -m-1 rounded-full bg-[#C8A161]/30 animate-ping" />
                      {/* Marker */}
                      <div className="relative w-6 h-6 rounded-full bg-[#C8A161] flex items-center justify-center shadow-lg shadow-[#C8A161]/30">
                        <MapPin className="w-3 h-3 text-[#0B0B0D]" />
                      </div>
                      {/* Label */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs text-[#F4F1EC] bg-[#0B0B0D]/80 px-2 py-1 rounded">
                          {area.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
