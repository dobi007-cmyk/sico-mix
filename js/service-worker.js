// Service Worker для PWA функціоналу SICO MIX

const CACHE_NAME = 'sico-mix-v2.2';
const CACHE_VERSION = '2.2.0';
const urlsToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/data-colors.js',
    './js/i18n.js',
    './js/utils.js',
    './js/app.js',
    './manifest.json',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    './icons/favicon.ico',
    './icons/apple-touch-icon.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Стратегія кешування: Network First для динамічних даних, Cache First для статичних
const CACHE_STRATEGIES = {
    STATIC: ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot'],
    API: ['/api/', 'json', 'xml']
};

// Інсталяція Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Встановлення версії:', CACHE_VERSION);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Кеш відкрито:', CACHE_NAME);
                return cache.addAll(urlsToCache)
                    .then(() => {
                        console.log('[Service Worker] Всі ресурси закешовані');
                        return self.skipWaiting();
                    })
                    .catch(error => {
                        console.error('[Service Worker] Помилка кешування ресурсів:', error);
                        // Продовжуємо навіть якщо деякі ресурси не закешувались
                        return self.skipWaiting();
                    });
            })
    );
});

// Активація Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Активація');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Видаляємо старі версії кешу
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Видаляємо старий кеш:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Очищаємо старий IndexedDB або інші сховища, якщо потрібно
            console.log('[Service Worker] Очищення старих даних завершено');
            
            // Повідомляємо всіх клієнтів про активацію
            return self.clients.claim();
        })
        .then(() => {
            console.log('[Service Worker] Активація завершена');
            // Оновлюємо всі відкриті вкладки
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SW_ACTIVATED',
                        version: CACHE_VERSION
                    });
                });
            });
        })
    );
});

// Обробка запитів з розумною стратегією кешування
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Пропускаємо запити для Chrome extensions та інших спеціальних схем
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Пропускаємо POST запити та запити з іншими методами, окрім GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Стратегія для API запитів (Network First)
    if (isApiRequest(request)) {
        event.respondWith(networkFirstStrategy(request));
        return;
    }
    
    // Стратегія для статичних ресурсів (Cache First)
    if (isStaticRequest(request)) {
        event.respondWith(cacheFirstStrategy(request));
        return;
    }
    
    // За замовчуванням: Network First
    event.respondWith(networkFirstStrategy(request));
});

// Перевірка, чи це API запит
function isApiRequest(request) {
    return CACHE_STRATEGIES.API.some(pattern => 
        request.url.includes(pattern)
    );
}

// Перевірка, чи це статичний запит
function isStaticRequest(request) {
    const extension = request.url.split('.').pop().toLowerCase();
    return CACHE_STRATEGIES.STATIC.includes(extension);
}

// Стратегія Cache First (для статичних ресурсів)
function cacheFirstStrategy(request) {
    return caches.match(request)
        .then(cachedResponse => {
            if (cachedResponse) {
                console.log('[Service Worker] Повертаємо з кешу:', request.url);
                return cachedResponse;
            }
            
            // Якщо немає в кеші, завантажуємо з мережі
            return fetch(request)
                .then(networkResponse => {
                    // Клонуємо відповідь для кешу
                    const responseToCache = networkResponse.clone();
                    
                    // Додаємо в кеш для майбутніх запитів
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(request, responseToCache);
                            console.log('[Service Worker] Додано в кеш:', request.url);
                        });
                    
                    return networkResponse;
                })
                .catch(error => {
                    console.error('[Service Worker] Помилка завантаження:', request.url, error);
                    
                    // Повертаємо резервну відповідь для HTML сторінок
                    if (request.headers.get('Accept')?.includes('text/html')) {
                        return caches.match('./index.html');
                    }
                    
                    // Для інших типів повертаємо повідомлення про помилку
                    return new Response('Офлайн режим. Ресурс недоступний.', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
        });
}

// Стратегія Network First (для динамічних даних)
function networkFirstStrategy(request) {
    return fetch(request)
        .then(networkResponse => {
            // Клонуємо відповідь для кешу
            const responseToCache = networkResponse.clone();
            
            // Оновлюємо кеш
            caches.open(CACHE_NAME)
                .then(cache => {
                    cache.put(request, responseToCache);
                    console.log('[Service Worker] Оновлено в кеші:', request.url);
                });
            
            return networkResponse;
        })
        .catch(error => {
            console.log('[Service Worker] Мережа недоступна, шукаємо в кеші:', request.url);
            
            // Якщо мережа недоступна, пробуємо кеш
            return caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        console.log('[Service Worker] Повертаємо з кешу (офлайн):', request.url);
                        return cachedResponse;
                    }
                    
                    // Для HTML сторінок повертаємо головну сторінку
                    if (request.headers.get('Accept')?.includes('text/html')) {
                        return caches.match('./index.html');
                    }
                    
                    // Для API запитів повертаємо порожні дані
                    if (isApiRequest(request)) {
                        return new Response(JSON.stringify({ 
                            error: 'Офлайн режим',
                            message: 'Дані тимчасово недоступні'
                        }), {
                            headers: { 
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache'
                            }
                        });
                    }
                    
                    // За замовчуванням повертаємо помилку
                    return new Response('Офлайн режим. Будь ласка, перевірте з\'єднання з інтернетом.', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
        });
}

// Обробка повідомлень з основного потоку
self.addEventListener('message', event => {
    const { data } = event;
    
    switch (data.type) {
        case 'SKIP_WAITING':
            console.log('[Service Worker] Отримано команду SKIP_WAITING');
            self.skipWaiting();
            break;
            
        case 'CLEAR_CACHE':
            console.log('[Service Worker] Очищення кешу');
            caches.delete(CACHE_NAME)
                .then(success => {
                    event.ports[0].postMessage({
                        type: 'CACHE_CLEARED',
                        success: success
                    });
                });
            break;
            
        case 'GET_CACHE_INFO':
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.keys();
                })
                .then(keys => {
                    event.ports[0].postMessage({
                        type: 'CACHE_INFO',
                        count: keys.length,
                        version: CACHE_VERSION
                    });
                });
            break;
            
        case 'PRECACHE_URLS':
            const urls = data.urls || [];
            console.log('[Service Worker] Попереднє кешування URL-адрес:', urls);
            
            caches.open(CACHE_NAME)
                .then(cache => {
                    return Promise.all(
                        urls.map(url => 
                            fetch(url)
                                .then(response => cache.put(url, response))
                                .catch(error => console.error('Помилка кешування:', url, error))
                        )
                    );
                })
                .then(() => {
                    event.ports[0].postMessage({
                        type: 'PRECACHE_COMPLETE',
                        success: true
                    });
                });
            break;
            
        default:
            console.log('[Service Worker] Невідомий тип повідомлення:', data.type);
    }
});

// Фонова синхронізація
self.addEventListener('sync', event => {
    console.log('[Service Worker] Sync подія:', event.tag);
    
    if (event.tag === 'sync-recipes') {
        event.waitUntil(syncRecipes());
    } else if (event.tag === 'sync-settings') {
        event.waitUntil(syncSettings());
    }
});

// Синхронізація рецептів
function syncRecipes() {
    console.log('[Service Worker] Синхронізація рецептів');
    
    // Тут буде логіка синхронізації з сервером
    return Promise.resolve()
        .then(() => {
            // Повідомляємо про успішну синхронізацію
            self.registration.showNotification('SICO MIX', {
                body: 'Рецепти синхронізовано',
                icon: './icons/icon-72x72.png',
                badge: './icons/icon-72x72.png',
                tag: 'sync-notification'
            });
        })
        .catch(error => {
            console.error('[Service Worker] Помилка синхронізації:', error);
        });
}

// Синхронізація налаштувань
function syncSettings() {
    console.log('[Service Worker] Синхронізація налаштувань');
    // Логіка синхронізації налаштувань
    return Promise.resolve();
}

// Пуш-повідомлення
self.addEventListener('push', event => {
    console.log('[Service Worker] Push повідомлення отримано');
    
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        console.error('[Service Worker] Помилка парсингу push даних:', error);
    }
    
    const options = {
        body: data.body || 'Нове повідомлення від SICO MIX',
        icon: data.icon || './icons/icon-192x192.png',
        badge: './icons/icon-72x72.png',
        image: data.image,
        vibrate: [100, 50, 100],
        data: {
            url: data.url || './',
            timestamp: Date.now(),
            ...data.data
        },
        actions: [
            {
                action: 'view',
                title: 'Переглянути',
                icon: './icons/icon-72x72.png'
            },
            {
                action: 'dismiss',
                title: 'Відхилити',
                icon: './icons/icon-72x72.png'
            }
        ],
        tag: data.tag || 'sico-mix-notification',
        requireInteraction: data.requireInteraction || false,
        silent: data.silent || false
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'SICO MIX', options)
    );
});

// Клік по пуш-повідомленню
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Клік по повідомленню:', event.notification.tag);
    
    event.notification.close();
    
    const { notification } = event;
    const urlToOpen = notification.data?.url || './';
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then(clientList => {
            // Шукаємо вже відкрите вікно
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // Якщо вікно не знайдено, відкриваємо нове
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Закриття повідомлення
self.addEventListener('notificationclose', event => {
    console.log('[Service Worker] Повідомлення закрито:', event.notification.tag);
});

// Обробка помилок Service Worker
self.addEventListener('error', event => {
    console.error('[Service Worker] Помилка:', event.error);
});

// Періодична синхронізація (Background Sync)
self.addEventListener('periodicsync', event => {
    console.log('[Service Worker] Періодична синхронізація:', event.tag);
    
    if (event.tag === 'update-content') {
        event.waitUntil(updateContent());
    }
});

function updateContent() {
    console.log('[Service Worker] Оновлення контенту в фоновому режимі');
    
    // Можна додати логіку для оновлення даних
    return fetch('./?update=background')
        .then(response => {
            if (response.ok) {
                console.log('[Service Worker] Контент оновлено');
            }
        })
        .catch(error => {
            console.error('[Service Worker] Помилка оновлення:', error);
        });
}

// Експорт для тестування
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CACHE_NAME,
        CACHE_VERSION,
        urlsToCache,
        CACHE_STRATEGIES,
        isApiRequest,
        isStaticRequest,
        cacheFirstStrategy,
        networkFirstStrategy
    };
}
