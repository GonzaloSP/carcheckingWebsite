import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import BookingPage from './pages/BookingPage';
import GestoriaPage from './pages/GestoriaPage';
import ReciboDeSenaPage from './pages/ReciboDeSenaPage';
import RevisionLandingPage from './pages/RevisionLandingPage';
import RevisionLocalidadPage from './pages/RevisionLocalidadPage';
import AnalyticsRouter from './components/AnalyticsRouter';

function App() {
  return (
    <Router>
      <AnalyticsRouter />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guias" element={<BlogPage />} />
        <Route path="/guias/*" element={<ArticlePage />} />
        <Route path="/servicio-gestoria" element={<GestoriaPage />} />
        <Route path="/solicitar-turno" element={<BookingPage />} />

        <Route path="/revision-vehiculos" element={<RevisionLandingPage />} />
        <Route path="/revision-vehiculos/:localidad" element={<RevisionLocalidadPage />} />

        {/* Legacy paths */}
        <Route
          path="/revision-vehiculos/revision-automóvil"
          element={<RevisionLandingPage />}
        />
        <Route
          path="/revision-vehiculos/revision-automovil"
          element={<RevisionLandingPage />}
        />
        <Route
          path="/revision-vehiculos/revision-automóvil/:localidad"
          element={<RevisionLocalidadPage />}
        />
        <Route
          path="/revision-vehiculos/revision-automovil/:localidad"
          element={<RevisionLocalidadPage />}
        />

        <Route
          path="/consejos/documentacion-vehiculo/recibo-de-sena-de-venta-de-vehiculo"
          element={<ReciboDeSenaPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
