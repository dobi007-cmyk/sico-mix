const CACHE_NAME = 'sico-spectrum-v1.0';
const urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/data-colors.js',
    './js/i18n.js',
    './js/utils.js',
    './js/app.js',
    './manifest.json',
    './icons/icon-192.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (!event.request.url.startsWith('http')) return;
    event.respondWith(
        caches.match(event.request).then(res => res || fetch(event.request).then(res => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
            return res;
        })).catch(() => new Response('Офлайн режим', { headers: { 'Content-Type': 'text/plain' } }))
    );
});
