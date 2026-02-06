// service-worker.js
// Простий Service Worker для кешування

const CACHE_NAME = 'sico-mix-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data-colors.js',
    '/i18n.js',
    '/utils.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Встановлення Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Активація Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Перехоплення запитів
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Повертаємо кешовану версію, якщо вона є
                if (response) {
                    return response;
                }
                
                // Інакше робимо запит до мережі
                return fetch(event.request).then(response => {
                    // Перевіряємо, чи дійсна відповідь
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Клонуємо відповідь
                    const responseToCache = response.clone();
                    
                    // Кешуємо новий ресурс
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});