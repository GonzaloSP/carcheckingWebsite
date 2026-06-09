import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import RecaptchaProvider from './_providers/RecaptchaProvider';
import AnalyticsPageTracker from './_components/AnalyticsPageTracker';

export const metadata: Metadata = {
  title: {
    default: 'carChecking - Inspección de Vehículos',
    template: '%s',
  },
  description:
    'Inspección profesional de autos usados a domicilio. Más de 350 puntos revisados, informe con fotos y escaneo computarizado en Argentina.',
  metadataBase: new URL('https://www.carchecking.com.ar'),
  openGraph: {
    siteName: 'carChecking',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'theme-color': '#0B0B0D',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.carchecking.com.ar/#business',
              name: 'carChecking',
              description:
                'Servicio profesional de inspección de vehículos usados a domicilio. Más de 350 puntos revisados.',
              url: 'https://www.carchecking.com.ar',
              telephone: '+54-11-5698-0573',
              email: 'info@carchecking.com.ar',
              priceRange: '$$',
              image: 'https://www.carchecking.com.ar/images/hero_car.jpg',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'AR',
                addressRegion: 'Buenos Aires',
                addressLocality: 'Capital Federal',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -34.6037,
                longitude: -58.3816,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '19:00',
                },
              ],
              areaServed: [
                { '@type': 'City', name: 'Capital Federal' },
                { '@type': 'State', name: 'Buenos Aires' },
              ],
              sameAs: ['https://web.whatsapp.com/send?phone=5491156980573'],
            }),
          }}
        />
      </head>
      <body>
        <RecaptchaProvider>
          <Suspense fallback={null}>
            <AnalyticsPageTracker />
          </Suspense>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}
