// ========== SERVICE WORKER ДЛЯ PWA ==========
const CACHE_NAME = 'sico-mix-v2.2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/utils.js',
    '/js/data-colors.js',
    '/js/i18n.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/manifest.json'
];

// Встановлення Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Кешування ресурсів...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Активація Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Видалення старого кешу:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Перехоплення запитів
self.addEventListener('fetch', (event) => {
    // Пропускаємо запити до API та зовнішні ресурси
    if (!event.request.url.startsWith(self.location.origin) ||
        event.request.url.includes('/api/')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Повертаємо кешовану версію, якщо вона є
                if (response) {
                    return response;
                }
                
                // Інакше завантажуємо з мережі
                return fetch(event.request)
                    .then((response) => {
                        // Не кешуємо невдалі запити
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Клонуємо відповідь для кешування
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Запасний варіант для сторінок
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Обробка повідомлень
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Фонове оновлення кешу
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-cache') {
        event.waitUntil(updateCache());
    }
});

// Функція оновлення кешу
async function updateCache() {
    const cache = await caches.open(CACHE_NAME);
    const responses = await Promise.all(
        ASSETS_TO_CACHE.map(url => fetch(url).catch(() => null))
    );
    
    responses.forEach((response, index) => {
        if (response && response.ok) {
            cache.put(ASSETS_TO_CACHE[index], response);
        }
    });
}
