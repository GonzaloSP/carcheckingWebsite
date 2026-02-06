import { HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HomePage from './HomePage';
import SEO from '../components/SEO';

export default function RevisionLocalidadPage() {
  const { localidad } = useParams<{ localidad: string }>();
  const loc = decodeURIComponent(localidad ?? '').trim();

  const safeLoc = loc || 'CABA y GBA';

  return (
    <HelmetProvider>
      <SEO
        title={`Revisión precompra a domicilio en ${safeLoc} | carChecking`}
        description={`Inspección de autos usados a domicilio en ${safeLoc}. Más de 350 puntos revisados, escaneo computarizado e informe con fotos. Solicite turno.`}
        canonicalUrl={`/revision-vehiculos/revision-automóvil/${encodeURIComponent(loc)}`}
      />
      <HomePage localidad={safeLoc} />
    </HelmetProvider>
  );
}
