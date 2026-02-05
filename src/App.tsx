import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import BookingPage from './pages/BookingPage';
import GestoriaPage from './pages/GestoriaPage';
import AnalyticsRouter from './components/AnalyticsRouter';

function App() {
  return (
    <Router>
      <AnalyticsRouter />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guias" element={<BlogPage />} />
        <Route path="/guias/:slug" element={<ArticlePage />} />
        <Route path="/servicio-gestoria" element={<GestoriaPage />} />
        <Route path="/solicitar-turno" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
