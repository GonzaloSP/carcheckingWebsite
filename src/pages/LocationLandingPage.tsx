import { HelmetProvider } from 'react-helmet-async';
import { Navigate, useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
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
import { getLocationBySlug } from '../data/locations';

export default function LocationLandingPage() {
  const { slug } = useParams();
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return <Navigate to="/" replace />;
  }

  const place = location.name;
  const title = `Revisión de vehículo en ${place} | carChecking`;
  const description = `Servicio de revisión/inspección de autos usados en ${place}. Mecánico a domicilio, escaneo computarizado y reporte escrito con fotos. Coordiná un turno.`;
  const canonicalUrl = `/revision-vehiculo-en/${location.slug}`;

  return (
    <HelmetProvider>
      <SEO
        title={title}
        description={description}
        keywords={`revisión de vehículo en ${place}, inspección vehicular ${place}, mecánico a domicilio ${place}, revisar auto usado ${place}, escaneo OBD ${place}, carChecking ${place}`}
        canonicalUrl={canonicalUrl}
      />

      <div className="relative bg-[#0B0B0D] min-h-screen">
        <div className="grain-overlay" />
        <Navigation />

        {/* Local SEO banner (adds the locality name on-page for relevance) */}
        <div className="pt-24 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-[#B8B2AA] mb-4">
              <Link to="/" className="hover:text-[#C8A161] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-[#C8A161]">{place}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F4F1EC] mb-3">
              Revisión de vehículo en {place}
            </h1>
            <p className="text-[#B8B2AA] max-w-3xl">
              Si estás por comprar un auto usado en {place}, una inspección precompra te ayuda a detectar
              problemas mecánicos, choques ocultos y fallas electrónicas antes de pagar.
            </p>
          </div>
        </div>

        {/* Same layout/sections as the Home page (do not change existing pages) */}
        <main className="relative">
          <LocationHeroSection place={place} />
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
