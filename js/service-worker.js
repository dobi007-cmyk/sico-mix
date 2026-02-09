// Service Worker для PWA функціоналу

const CACHE_NAME = 'sico-mix-v2.2';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/data-colors.js',
    '/js/i18n.js',
    '/js/utils.js',
    '/js/app.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Інсталяція Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Кеш відкрито');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Активація Service Worker
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

// Обробка запитів
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Повертаємо кешовану версію, якщо вона є
                if (response) {
                    return response;
                }
                
                // Інакше завантажуємо з мережі
                return fetch(event.request)
                    .then(response => {
                        // Перевіряємо, чи отримали валідну відповідь
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Клонуємо відповідь
                        const responseToCache = response.clone();
                        
                        // Додаємо в кеш
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.error('Помилка завантаження:', error);
                        // Можна повернути резервну сторінку або повідомлення
                        return new Response('Офлайн режим. Перевірте з\'єднання з інтернетом.', {
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});

// Обробка повідомлень
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Синхронізація в фоновому режимі
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// Фонова синхронізація даних
function syncData() {
    // Тут можна реалізувати синхронізацію з сервером
    console.log('Фонова синхронізація даних');
    return Promise.resolve();
}

// Push-повідомлення
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Нове повідомлення від SICO MIX',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {
                action: 'explore',
                title: 'Переглянути',
                icon: '/icons/icon-72.png'
            },
            {
                action: 'close',
                title: 'Закрити',
                icon: '/icons/icon-72.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('SICO MIX', options)
    );
});

// Клік по push-повідомленню
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        console.log('Повідомлення закрито');
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
