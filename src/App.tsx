import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import BookingPage from './pages/BookingPage';
import AnalyticsRouter from './components/AnalyticsRouter';

function App() {
  return (
    <Router>
      <AnalyticsRouter />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/solicitar-turno" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
