'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { initAnalytics, trackPageView, trackEvent } from '@/lib/analytics';

export default function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // One-time init
  useEffect(() => {
    initAnalytics();
  }, []);

  // Scroll to top on every navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Track SPA page views
  useEffect(() => {
    if (!pathname) return;
    const search = searchParams?.toString() ?? '';
    const path = pathname + (search ? `?${search}` : '');
    trackPageView(path);

    if (pathname === '/guias') {
      trackEvent('blog_view');
    } else if (pathname?.startsWith('/guias/')) {
      trackEvent('article_view', { page_path: path });
    } else if (pathname === '/solicitar-turno') {
      trackEvent('booking_view');
    }
  }, [pathname, searchParams]);

  return null;
}
