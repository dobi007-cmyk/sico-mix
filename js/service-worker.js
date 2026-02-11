// Service Worker для PWA – SICO Spectrum
const CACHE_NAME = 'sico-spectrum-v3.0';
const urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/data-colors.js',
    './js/i18n.js',
    './js/utils.js',
    './js/app.js',
    './js/service-worker.js',
    './manifest.json',
    './icons/icon-72x72.png',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    './icons/favicon.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Кеш відкрито (SICO Spectrum)');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Видаляємо старий кеш:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (!event.request.url.startsWith('http')) return;
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request).then(res => {
                if (!res || res.status !== 200 || res.type !== 'basic') return res;
                const resClone = res.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
                return res;
            }))
            .catch(() => new Response('Офлайн режим. Перевірте з\'єднання.', {
                headers: { 'Content-Type': 'text/plain' }
            }))
    );
});

self.addEventListener('message', event => {
    if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') event.waitUntil(Promise.resolve());
});

self.addEventListener('push', event => {
    const options = {
        body: event.data?.text() || 'Нове повідомлення від SICO Spectrum',
        icon: './icons/icon-192.png',
        badge: './icons/icon-72.png',
        vibrate: [100, 50, 100],
        data: { dateOfArrival: Date.now() },
        actions: [
            { action: 'explore', title: 'Переглянути', icon: './icons/icon-72.png' },
            { action: 'close', title: 'Закрити', icon: './icons/icon-72.png' }
        ]
    };
    event.waitUntil(self.registration.showNotification('SICO Spectrum', options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('./'));
});
