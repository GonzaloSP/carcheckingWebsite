'use client';
import Link from 'next/link';
import Navigation from '../sections/Navigation';
import LocationHeroSection from '../sections/LocationHeroSection';
import WhyInspectSection from '../sections/WhyInspectSection';
import ServicesSection from '../sections/ServicesSection';
import WhatWeCheckSection from '../sections/WhatWeCheckSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import CoverageSection from '../sections/CoverageSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BookingSection from '../sections/BookingSection';
import FooterSection from '../sections/FooterSection';

// Consolidated from ~227 near-duplicate per-locality pages (revision-vehiculo-en/{slug}) that
// shared this exact same body content and differed only in the city name — almost all of them
// got zero search impressions ever. One strong page beats 227 thin ones for a market this size.
const PLACE = 'CABA y Gran Buenos Aires';

export default function RevisionVehiculoPage() {
  return (
    <div className="relative bg-[#0B0B0D] min-h-screen">
      <div className="grain-overlay" />
      <Navigation />

      <div className="pt-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-4">
            <Link href="/" className="hover:text-[#C8A161] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-[#C8A161]">Revisión de vehículo</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] mb-3">
            Revisión de vehículo en {PLACE}
          </h1>
          <p className="text-[#B8B2AA] max-w-3xl">
            Inspección precompra y revisión de autos usados a domicilio en toda Capital Federal y el Gran Buenos Aires, con escaneo computarizado e informe con fotos.
          </p>
        </div>
      </div>

      <main className="relative">
        <LocationHeroSection place={PLACE} />
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
  );
}
