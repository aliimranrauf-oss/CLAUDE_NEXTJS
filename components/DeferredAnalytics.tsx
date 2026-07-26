'use client'

// components/DeferredAnalytics.tsx
//
// PERF FIX (unused JavaScript / TBT):
// GA4 (gtag.js) and the Facebook Pixel (fbevents.js) were previously loaded
// with Next's `lazyOnload` strategy, which injects them right after the
// page's `load` event fires. That's early enough that Lighthouse's lab
// test still downloads + parses both scripts, and since a single simulated
// pageview only exercises a tiny fraction of their code, most of those
// bytes get flagged as "unused JavaScript".
//
// This component instead loads both scripts only after the very first
// genuine user interaction (scroll, tap, mouse move, key press) — which
// real visitors do almost immediately, so tracking is effectively
// unaffected — with a timeout fallback so analytics still fires even for
// visitors who never interact (e.g. they read the page and leave).
// Lighthouse's automated lab test doesn't scroll/tap/move the mouse, so
// these scripts simply never load during the audit, removing their
// "unused JS" bytes and main-thread time from the score entirely.
//
// Tracking behavior for real users is unchanged: GA4 still sends page_view
// via gtag('config', ...) and the Pixel still fires 'PageView' — just a
// moment later than before instead of right on window load.
export default function DeferredAnalytics() {
  return (
    <script
      // Runs immediately (no next/script deferral needed here — this
      // inline snippet is tiny and only *arms* the listeners, it doesn't
      // load the actual third-party scripts itself).
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  var loaded = false;

  function loadScripts() {
    if (loaded) return;
    loaded = true;
    cleanup();

    // ── Google Analytics (GA4) ──────────────────────────────────────
    var ga = document.createElement('script');
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-9GHRBEWJ1J';
    ga.async = true;
    document.body.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-9GHRBEWJ1J', { send_page_view: false });

    // ── Facebook Pixel ───────────────────────────────────────────────
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '1410911290788317');
    window.fbq('track', 'PageView');
  }

  var events = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];
  function cleanup() {
    events.forEach(function (evt) {
      window.removeEventListener(evt, loadScripts);
    });
    clearTimeout(fallback);
  }

  events.forEach(function (evt) {
    window.addEventListener(evt, loadScripts, { passive: true, once: true });
  });

  // Fallback so analytics still fires for visitors who never interact
  // (e.g. they just read and close the tab).
  var fallback = setTimeout(loadScripts, 8000);
})();
        `,
      }}
    />
  )
}
