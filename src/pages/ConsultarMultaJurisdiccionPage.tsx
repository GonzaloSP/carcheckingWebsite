import { useParams, Navigate } from 'react-router-dom';
import { JURISDICCIONES_MULTA } from '../data/multa-jurisdictions';
import ConsultarMultaPage from './ConsultarMultaPage';

export default function ConsultarMultaJurisdiccionPage() {
  const { slug } = useParams<{ slug: string }>();
  const fuente = JURISDICCIONES_MULTA.find(j => j.slug === slug);

  if (!fuente) return <Navigate to="/consultar-multa" replace />;

  return <ConsultarMultaPage defaultFuente={fuente.value} />;
}
