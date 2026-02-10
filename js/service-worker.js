// Service Worker для офлайн-роботи
const CACHE_NAME = 'sicomix-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/data-colors.js',
    '/js/app.js',
    '/js/utils.js',
    '/js/i18n.js',
    '/manifest.json'
];

// Встановлення Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Відкрито кеш');
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
                        console.log('Видалення старого кешу:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
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
                
                // Інакше робимо мережевий запит
                return fetch(event.request)
                    .then(response => {
                        // Перевірка чи отримали ми дійсну відповідь
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Клонуємо відповідь
                        const responseToCache = response.clone();
                        
                        // Додаємо до кешу
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Якщо мережа недоступна, показуємо офлайн-сторінку
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Фонове оновлення
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// Синхронізація даних
function syncData() {
    // Тут буде логіка синхронізації даних з сервером
    return Promise.resolve();
}

// Отримання повідомлень
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Оновлення каталогу фарб',
        icon: '/icon-192.png',
        badge: '/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('SICOMIX', options)
    );
});

// Клік по повідомленню
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                for (const client of clientList) {
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});
