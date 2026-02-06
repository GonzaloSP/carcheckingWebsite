import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../components/SEO';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import WhyInspectSection from '../sections/WhyInspectSection';
import WhatWeCheckSection from '../sections/WhatWeCheckSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import CoverageSection from '../sections/CoverageSection';
import ServicesSection from '../sections/ServicesSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BookingSection from '../sections/BookingSection';
import FooterSection from '../sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function HomePage({ localidad }: { localidad?: string }) {
  // Global scroll snap for pinned sections
  useEffect(() => {
    let snapTrigger: ScrollTrigger | null = null;

    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Important: only kill the snap trigger on unmount.
      // Killing *all* ScrollTriggers here breaks other routes (e.g. /solicitar-turno)
      // because those pages also use ScrollTrigger for fade-in.
      snapTrigger = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      snapTrigger?.kill();
    };
  }, []);

  return (
    <HelmetProvider>
      <SEO
        title={
          localidad
            ? `Revisión precompra a domicilio en ${localidad} | carChecking`
            : 'carChecking | Inspección de Vehículos a Domicilio - La Forma Segura de Comprar'
        }
        description={
          localidad
            ? `Inspección de autos usados a domicilio en ${localidad}. Más de 350 puntos revisados. Escaneo computarizado e informe escrito con fotos.`
            : 'Servicio profesional de revisión de vehículos usados a domicilio. Más de 350 puntos inspeccionados. Escaneo computarizado, informe escrito con fotos. CABA y GBA.'
        }
        keywords="inspección vehicular, revisión de autos, compra segura de autos usados, mecánico a domicilio, escaneo computarizado, carChecking Argentina, verificación de vehículos"
        canonicalUrl={
          localidad
            ? `/revision-vehiculos/revision-automóvil/${encodeURIComponent(localidad)}`
            : '/'
        }
      />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />
        <main className="relative">
          {localidad && (
            <div className="pt-24 px-6 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="bg-[#141416] border border-[#2a2a2c] rounded-lg px-5 py-4">
                  <p className="text-sm text-[#B8B2AA]">
                    <span className="text-[#F4F1EC] font-semibold">
                      Revisión precompra a domicilio en {localidad}
                    </span>
                    <span className="hidden sm:inline"> — mecánico + escaneo + informe con fotos.</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          <HeroSection />
          <WhyInspectSection />
          <ServicesSection />
          <WhatWeCheckSection />
          <HowItWorksSection />
          <CoverageSection />
          <TestimonialsSection />
          <BookingSection />
          <FooterSection />
        </main>
      </div>
    </HelmetProvider>
  );
}

export default HomePage;
