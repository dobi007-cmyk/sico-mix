// ============================================
// SICO MIX Service Worker (Production Ready)
// ============================================

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `sico-mix-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/data-colors.js',
  '/js/i18n.js',
  '/js/utils.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

/* =====================
   INSTALL
===================== */

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* =====================
   ACTIVATE
===================== */

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

/* =====================
   FETCH
===================== */

self.addEventListener('fetch', event => {
  const { request } = event;

  // Only GET requests
  if (request.method !== 'GET') return;

  // Ignore cross-origin
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseClone = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // Offline navigation fallback
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

/* =====================
   BACKGROUND SYNC
===================== */

self.addEventListener('sync', event => {
  if (event.tag === 'sync-recipes') {
    event.waitUntil(syncRecipes());
  }
});

async function syncRecipes() {
  // Placeholder for future online sync
  console.log('[SW] Background sync: recipes');
}

/* =====================
   PUSH NOTIFICATIONS
===================== */

self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : 'SICO MIX notification';

  const options = {
    body: data,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      timestamp: Date.now()
    },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'close', title: 'Close' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('SICO MIX', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clientsArr => {
        for (const client of clientsArr) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        return self.clients.openWindow('/');
      })
    );
  }
});
