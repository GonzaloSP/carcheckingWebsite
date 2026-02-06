import { HelmetProvider } from 'react-helmet-async';
import SEO from '../components/SEO';
import HomePage from './HomePage';

export default function RevisionLandingPage() {
  const localidad = 'CABA y GBA';

  return (
    <HelmetProvider>
      <SEO
        title={`Revisión precompra a domicilio en ${localidad} | carChecking`}
        description={`Inspección de autos usados a domicilio en ${localidad}. Más de 350 puntos revisados, escaneo computarizado e informe con fotos. Solicite turno.`}
        canonicalUrl="/revision-vehiculos/revision-automóvil"
      />
      <HomePage localidad={localidad} />
    </HelmetProvider>
  );
}
