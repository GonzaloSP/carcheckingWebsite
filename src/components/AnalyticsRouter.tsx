import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackEvent, trackPageView } from '../lib/analytics';

export default function AnalyticsRouter() {
  const location = useLocation();

  // One-time init
  useEffect(() => {
    initAnalytics();
  }, []);

  // Scroll to top on every navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track SPA page views
  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);

    // Optional: high-level page type events
    if (location.pathname === '/guias') {
      trackEvent('blog_view');
    } else if (location.pathname.startsWith('/guias/')) {
      trackEvent('article_view', { page_path: path });
    } else if (location.pathname === '/solicitar-turno') {
      trackEvent('booking_view');
    }
  }, [location.pathname, location.search]);

  return null;
}
