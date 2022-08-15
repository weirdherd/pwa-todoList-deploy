const cacheName = 'todoapp-offline';
const preCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './favicon.ico',
];

self.addEventListener('install', (e) => {
  // self refere to the global context 'window', not the service worker itself.

  console.log('The Service Worker is installed!');

  // wait until the promise is fullfilled before this block/eventListener exits.
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(preCache)));
});

// intercept the browser's fetch activity
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => res || fetch(e.request)) /* cache first */
  ); // it also prevents the defaull action of the event
});
