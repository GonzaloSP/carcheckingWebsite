import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import BookingPage from './pages/BookingPage';
import GestoriaPage from './pages/GestoriaPage';
import ReciboDeSenaPage from './pages/ReciboDeSenaPage';
import LocationLandingPage from './pages/LocationLandingPage';
import VerificacionPolicialLocationPage from './pages/VerificacionPolicialLocationPage';
import VtvLocationPage from './pages/VtvLocationPage';
import ConsultarMultaPage from './pages/ConsultarMultaPage';
import ConsultarMultaJurisdiccionPage from './pages/ConsultarMultaJurisdiccionPage';
import MultasCABAGuidePage from './pages/MultasCABAGuidePage';
import CalculadoraTransferenciaPage from './pages/CalculadoraTransferenciaPage';
import AnalyticsRouter from './components/AnalyticsRouter';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '';

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <Router>
      <AnalyticsRouter />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guias" element={<BlogPage />} />
        <Route path="/guias/*" element={<ArticlePage />} />
        <Route path="/servicio-gestoria" element={<GestoriaPage />} />
        <Route path="/solicitar-turno" element={<BookingPage />} />
        <Route path="/consultar-multa" element={<ConsultarMultaPage />} />
        <Route path="/consultar-multa/:slug" element={<ConsultarMultaJurisdiccionPage />} />
        <Route path="/multas-caba/:guide" element={<MultasCABAGuidePage />} />
        <Route path="/calculadora-de-costos-de-transferencia" element={<CalculadoraTransferenciaPage />} />

        <Route path="/revision-vehiculo-en/:slug" element={<LocationLandingPage />} />
        <Route path="/verificacion-policial-en/:slug" element={<VerificacionPolicialLocationPage />} />
        <Route path="/vtv-en/:slug" element={<VtvLocationPage />} />

        <Route
          path="/guias/recibo-de-sena-de-venta-de-vehiculo"
          element={<ReciboDeSenaPage />}
        />
      </Routes>
    </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;
