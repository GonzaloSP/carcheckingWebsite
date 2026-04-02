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
