/**
 * GAṆAKA v0.4.0 — Service Worker (PWA offline application shell)
 *
 * Caches the static application shell (HTML/CSS/JS) so Calculator, Units,
 * Calculus, Statistics, Linear Algebra and local CSV analysis keep working
 * offline (AC-P0-058). Live Weather/Currency requests go to
 * api.open-meteo.com / geocoding-api.open-meteo.com / api.frankfurter.dev
 * and are NEVER cached or faked here — if the network is unavailable, the
 * fetch simply fails and the app layer (src/app.js) reports "unavailable"
 * (AC-P0-059). This worker never intercepts or fabricates responses.
 */
const CACHE_NAME = 'ganaka-shell-v0.4.0';

const SHELL_ASSETS = [
  './',
  './index.html',
  './src/styles.css',
  './src/app.js',
  './src/data.js',
  './src/viz.js',
  './src/core/errors.js',
  './src/core/constants.js',
  './src/core/parser.js',
  './src/core/numerical.js',
  './src/core/linear-algebra.js',
  './src/core/statistics.js',
  './src/core/probability.js',
  './src/core/units.js',
  './src/core/engineering.js',
  './src/services/history.js',
  './src/services/settings.js',
  './src/services/weather.js',
  './src/services/currency.js',
  './public/manifest.webmanifest',
  './public/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => { /* best-effort */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

const LIVE_API_HOSTS = ['api.open-meteo.com', 'geocoding-api.open-meteo.com', 'api.frankfurter.dev'];

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept/cache live external API calls — always hit the network
  // so failure is genuine, never a stale or fabricated cached response.
  if (LIVE_API_HOSTS.includes(url.hostname)) {
    return; // let the browser handle it directly
  }

  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      }).catch(() => cached);
    })
  );
});
