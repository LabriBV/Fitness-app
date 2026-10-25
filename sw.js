// PadelFit service worker.
// Strategie: index.html network-first (updates direct zichtbaar, offline fallback op cache),
// alle andere bestanden cache-first.
// Verhoog CACHE_VERSION bij elke release.
const CACHE_VERSION = 'padelfit-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isPageRequest(request, url) {
  return request.mode === 'navigate'
    || url.pathname.endsWith('/')
    || url.pathname.endsWith('/index.html');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (isPageRequest(event.request, url)) {
    // Network-first voor de app-pagina zelf
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
        }
        return res;
      }).catch(() => caches.match(event.request).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first voor iconen, manifest, enz.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
