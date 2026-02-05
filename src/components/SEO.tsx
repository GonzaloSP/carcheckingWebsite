import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    category: string;
    tags: string[];
  };
}

export default function SEO({
  title,
  description,
  keywords = 'inspección vehicular, revisión de autos, compra segura de autos usados, mecánico a domicilio, escaneo computarizado, carChecking Argentina',
  ogImage = 'https://www.carchecking.com.ar/images/hero_car.jpg',
  ogType = 'website',
  canonicalUrl,
  article,
}: SEOProps) {
  const siteUrl = 'https://www.carchecking.com.ar';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="carChecking" />
      <meta property="og:locale" content="es_AR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article Specific (if applicable) */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.category} />
          {article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'carChecking',
          url: siteUrl,
          logo: `${siteUrl}/images/hero_car.jpg`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+54-11-5698-0573',
            contactType: 'customer service',
            availableLanguage: 'Spanish',
            areaServed: 'AR',
          },
          sameAs: [
            'https://web.whatsapp.com/send?phone=5491156980573',
          ],
        })}
      </script>

      {/* Structured Data - LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'carChecking',
          description: 'Servicio profesional de inspección de vehículos usados a domicilio. Más de 350 puntos revisados.',
          url: siteUrl,
          telephone: '+54-11-5698-0573',
          email: 'info@carchecking.com.ar',
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
          priceRange: '$$',
          areaServed: [
            {
              '@type': 'City',
              name: 'Capital Federal',
            },
            {
              '@type': 'State',
              name: 'Buenos Aires',
            },
            // Córdoba removed
          ],
        })}
      </script>
    </Helmet>
  );
}
