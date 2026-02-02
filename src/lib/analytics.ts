/*
  Lightweight GA4 + Meta Pixel integration for a Vite + React Router SPA.

  - Loads scripts only if IDs are configured
  - Tracks SPA page views on route change
  - Provides helpers to track key events (WhatsApp click, lead form submit, etc.)
*/

import { ANALYTICS } from '../config/analytics';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

const isDev = import.meta.env.DEV;

function isEnabled() {
  return !isDev || ANALYTICS.enabledInDev;
}

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (!isEnabled()) return;

  // --- GA4 ---
  if (ANALYTICS.ga4MeasurementId) {
    // Load gtag.js
    injectScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        ANALYTICS.ga4MeasurementId
      )}`,
      'ga4-gtag'
    );

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer!.push(arguments);
    };

    window.gtag('js', new Date());

    // For SPAs, we disable automatic page_view and send it manually.
    window.gtag('config', ANALYTICS.ga4MeasurementId, {
      send_page_view: false,
    });
  }

  // --- Meta Pixel ---
  if (ANALYTICS.metaPixelId) {
    if (!window.fbq) {
      // Standard Meta Pixel bootstrap
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }

    window.fbq?.('init', ANALYTICS.metaPixelId);
  }
}

export function trackPageView(path: string) {
  if (!isEnabled()) return;

  // GA4 page_view
  if (ANALYTICS.ga4MeasurementId && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }

  // Meta Pixel PageView
  if (ANALYTICS.metaPixelId && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export type AnalyticsEventName =
  | 'whatsapp_click'
  | 'lead_submit'
  | 'article_view'
  | 'booking_view'
  | 'blog_view';

export function trackEvent(name: AnalyticsEventName, params: Record<string, any> = {}) {
  if (!isEnabled()) return;

  // --- GA4 custom event ---
  if (ANALYTICS.ga4MeasurementId && window.gtag) {
    window.gtag('event', name, params);
  }

  // --- Meta Pixel ---
  if (ANALYTICS.metaPixelId && window.fbq) {
    // Map a few key events to standard Meta events for better optimization.
    if (name === 'lead_submit') {
      window.fbq('track', 'Lead', params);
    } else if (name === 'whatsapp_click') {
      window.fbq('trackCustom', 'WhatsAppClick', params);
    } else if (name === 'article_view') {
      window.fbq('track', 'ViewContent', params);
    } else {
      window.fbq('trackCustom', name, params);
    }
  }
}
