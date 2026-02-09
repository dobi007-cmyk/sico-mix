/* ================================
   SICO MIX — PRO Service Worker
   Versioned caching + runtime strategies
================================ */

const CACHE_VERSION = 'v2.0.0';
const STATIC_CACHE = `sicomix-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `sicomix-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `sicomix-images-${CACHE_VERSION}`;

// Файли ядра додатку
const APP_SHELL = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/utils.js',
    '/js/i18n.js',
    '/js/data-colors(1).js',
    '/manifest.json'
];

// ================= INSTALL =================
self.addEventListener('install', event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(APP_SHELL))
    );
});

// ================= ACTIVATE =================
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (
                        key !== STATIC_CACHE &&
                        key !== RUNTIME_CACHE &&
                        key !== IMAGE_CACHE
                    ) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );

    self.clients.claim();
});

// ================= FETCH =================
self.addEventListener('fetch', event => {
    const request = event.request;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // ----- IMAGE STRATEGY -----
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }

    // ----- CSS / JS / Fonts -----
    if (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'font'
    ) {
        event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
        return;
    }

    // ----- HTML -----
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    // ----- DEFAULT -----
    event.respondWith(networkFallbackCache(request));
});

// ================= STRATEGIES =================

async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) return cached;

    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const networkFetch = fetch(request).then(response => {
        cache.put(request, response.clone());
        return response;
    });

    return cached || networkFetch;
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
        return response;
    } catch {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        return cached || caches.match('/index.html');
    }
}

async function networkFallbackCache(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
        return response;
    } catch {
        return caches.match(request);
    }
}

// ================= MESSAGE =================
// Дозволяє вручну оновлювати SW
self.addEventListener('message', event => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});