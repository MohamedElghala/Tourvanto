// =========================================================================
// Tourvanto - Unified Analytics & Advertising Tracking Manager
// Supported Platforms:
// 1. Google Analytics 4 (GA4)
// 2. Meta Pixel (Facebook & Instagram)
// 3. TikTok Pixel
// =========================================================================

window.TOURVANTO_ANALYTICS_CONFIG = {
  // Put your official IDs here once generated with your dedicated Tourvanto Gmail
  GA_MEASUREMENT_ID: "",     // e.g. "G-XXXXXXXXXX"
  META_PIXEL_ID: "",         // e.g. "123456789012345"
  TIKTOK_PIXEL_ID: "",       // e.g. "CXXXXXXXXXXXXXXX"
  debug: true                // Displays event logs in console for verification
};

const TourvantoAnalytics = {
  initialized: false,

  init() {
    const cfg = window.TOURVANTO_ANALYTICS_CONFIG;

    // 1. Google Analytics 4 (GA4)
    if (cfg.GA_MEASUREMENT_ID && cfg.GA_MEASUREMENT_ID.startsWith('G-')) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${cfg.GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', cfg.GA_MEASUREMENT_ID, { send_page_view: true });
      if (cfg.debug) console.log(`[Tourvanto Analytics] GA4 Loaded: ${cfg.GA_MEASUREMENT_ID}`);
    }

    // 2. Meta Pixel (Facebook & Instagram)
    if (cfg.META_PIXEL_ID && /^\d+$/.test(cfg.META_PIXEL_ID)) {
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', cfg.META_PIXEL_ID);
      window.fbq('track', 'PageView');
      if (cfg.debug) console.log(`[Tourvanto Analytics] Meta Pixel Loaded: ${cfg.META_PIXEL_ID}`);
    }

    // 3. TikTok Pixel
    if (cfg.TIKTOK_PIXEL_ID && cfg.TIKTOK_PIXEL_ID.length > 5) {
      !(function(w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = (w[t] = w[t] || []);
        ttq.methods = [
          'page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group',
          'enableCookie', 'disableCookie'
        ];
        ttq.setAndDefer = function(t, e) {
          t[e] = function() {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        };
        for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.instance = function(t) {
          var e = ttq._i[t] || [];
          for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
          return e;
        };
        ttq.load = function(e, n) {
          var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
          ttq._i = ttq._i || {};
          ttq._i[e] = [];
          ttq._i[e]._u = i;
          ttq._t = ttq._t || {};
          ttq._t[e] = +new Date();
          ttq._o = ttq._o || {};
          ttq._o[e] = n || {};
          var o = document.createElement('script');
          o.type = 'text/javascript';
          o.async = !0;
          o.src = i + '?sdkid=' + e + '&lib=' + t;
          var a = document.getElementsByTagName('script')[0];
          a.parentNode.insertBefore(o, a);
        };
        ttq.load(cfg.TIKTOK_PIXEL_ID);
        ttq.page();
      })(window, document, 'ttq');

      if (cfg.debug) console.log(`[Tourvanto Analytics] TikTok Pixel Loaded: ${cfg.TIKTOK_PIXEL_ID}`);
    }

    this.initialized = true;
    if (cfg.debug) {
      console.log('%c[Tourvanto Analytics]%c Ready & Armed for Audience Tracking', 'background:#0f766e;color:#fff;font-weight:bold;padding:2px 6px;border-radius:4px;', 'color:#0d9488;font-weight:bold;');
    }
  },

  // 1. View Content (When opening tour details modal)
  trackViewTour(tour) {
    if (!tour) return;
    const title = tour.titles?.en || tour.title || 'Excursion';
    const params = {
      content_name: title,
      content_category: tour.category || 'Excursion',
      content_ids: [tour.id],
      content_type: 'product',
      value: tour.priceEUR || 0,
      currency: 'EUR'
    };

    if (window.gtag) window.gtag('event', 'view_item', params);
    if (window.fbq) window.fbq('track', 'ViewContent', params);
    if (window.ttq) window.ttq.track('ViewContent', { content_id: tour.id, content_name: title, value: tour.priceEUR, currency: 'EUR' });

    if (window.TOURVANTO_ANALYTICS_CONFIG.debug) {
      console.log('[Tourvanto Analytics] ViewContent:', title, params);
    }
  },

  // 2. Initiate Checkout (When clicking "Book Now" / checkout modal)
  trackInitiateCheckout(tour, totalAmount, currency) {
    const title = tour?.titles?.en || tour?.title || 'Excursion';
    const params = {
      content_name: title,
      content_ids: tour ? [tour.id] : [],
      value: totalAmount || 0,
      currency: currency || 'EUR'
    };

    if (window.gtag) window.gtag('event', 'begin_checkout', params);
    if (window.fbq) window.fbq('track', 'InitiateCheckout', params);
    if (window.ttq) window.ttq.track('InitiateCheckout', params);

    if (window.TOURVANTO_ANALYTICS_CONFIG.debug) {
      console.log('[Tourvanto Analytics] InitiateCheckout:', params);
    }
  },

  // 3. Purchase / Conversion Lead (When order is submitted)
  trackPurchase(booking) {
    if (!booking) return;
    const params = {
      transaction_id: booking.id,
      value: parseFloat(String(booking.totalPrice).replace(/[^0-9.]/g, '') || 0),
      currency: 'EUR',
      content_name: booking.tourTitle,
      payment_method: booking.paymentMethod
    };

    if (window.gtag) window.gtag('event', 'purchase', params);
    if (window.fbq) {
      window.fbq('track', 'Purchase', params);
      window.fbq('track', 'Lead', params);
    }
    if (window.ttq) {
      window.ttq.track('PlaceAnOrder', params);
      window.ttq.track('CompleteRegistration', params);
    }

    if (window.TOURVANTO_ANALYTICS_CONFIG.debug) {
      console.log('[Tourvanto Analytics] Purchase / Lead Generated:', params);
    }
  },

  // 4. Review Submission
  trackReview(reviewerName, rating, tourName) {
    const params = {
      rating: rating,
      tour: tourName,
      author: reviewerName
    };
    if (window.gtag) window.gtag('event', 'post_review', params);
    if (window.fbq) window.fbq('trackCustom', 'ReviewSubmitted', params);
    if (window.TOURVANTO_ANALYTICS_CONFIG.debug) {
      console.log('[Tourvanto Analytics] Review Submitted:', reviewerName, rating, tourName);
    }
  },

  // 5. Social & WhatsApp Interaction
  trackSocialClick(channel) {
    if (window.gtag) window.gtag('event', 'contact', { method: channel });
    if (window.fbq) window.fbq('track', 'Contact', { channel: channel });
    if (window.ttq) window.ttq.track('Contact', { channel: channel });
    if (window.TOURVANTO_ANALYTICS_CONFIG.debug) {
      console.log('[Tourvanto Analytics] Contact Click:', channel);
    }
  }
};

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => {
  TourvantoAnalytics.init();
});
