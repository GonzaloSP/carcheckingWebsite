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

function HomePage() {
  // Global scroll snap for pinned sections
  useEffect(() => {
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

      ScrollTrigger.create({
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
    };
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <HelmetProvider>
      <SEO
        title="carChecking | Inspección de Vehículos a Domicilio - La Forma Segura de Comprar"
        description="Servicio profesional de revisión de vehículos usados a domicilio. Más de 350 puntos inspeccionados. Escaneo computarizado, informe escrito con fotos. CABA y GBA."
        keywords="inspección vehicular, revisión de autos, compra segura de autos usados, mecánico a domicilio, escaneo computarizado, carChecking Argentina, verificación de vehículos"
        canonicalUrl="/"
      />
      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />
        <main className="relative">
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
