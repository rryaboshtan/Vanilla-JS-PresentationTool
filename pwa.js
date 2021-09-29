const CACHE_VERSION = 1.0;
const BASE_CACHE_FILES = [
   '/index.html',
   'pwa/404.html',
   'pwa/offline.html',
   'assets/css/style.css',
   'assets/css/animations.css',
   '/manifest.json',
   '/img/logo.png',
   'assets/js/app.js',
];

const OFFLINE_CACHE_FILE = '/pwa/offline.html';
const NOT_FOUND_CACHE_FILE = '/pwa/404.html';

const CACHE_NAMES = {
   assets: 'assets-v' + CACHE_VERSION,
   content: 'content-v' + CACHE_VERSION,
   offline: 'offline-v' + CACHE_VERSION,
   notFound: '404-v' + CACHE_VERSION,
};

const TTL = 3600;

async function installServiceWorker() {
   try {
      await Promise.all([
         caches.open(CACHE_NAMES.assets).then(
            (cache) => {
               return cache.addAll(BASE_CACHE_FILES);
            },
            (err) => console.error(`Error with ${CACHE_NAMES.assets}`, err)
         ),

         caches.open(CACHE_NAMES.offline).then(
            (cache) => {
               return cache.add(OFFLINE_CACHE_FILE);
            },
            (err) => console.error(`Error with ${CACHE_NAMES.offline}`, err)
         ),

         caches.open(CACHE_NAMES.notFound).then(
            (cache) => {
               return cache.add(NOT_FOUND_CACHE_FILE);
            },
            (err) => console.error(`Error with ${CACHE_NAMES.notFound}`, err)
         ),
      ]);
   } catch (err) {
      return new Promise((resolve, reject) => {
         reject(err);
      });
   }
}

self.addEventListener('install', (event) => {
   //    console.log('[SW]: install');
   event.waitUntil(Promise.all([installServiceWorker(), self.skipWaiting()]));
});

self.addEventListener('activate', (event) => {
   console.log('[SW]: activate');
});

self.addEventListener('fetch', (event) => {
   const { request } = event;

   const url = new URL(request.url);

   if (url.origin === location.origin) {
      event.respondWith(cacheFirst(request));
   } else {
      event.respondWith(networkFirst(request));
   }
   // event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
   const cached = await caches.match(request);
   return cached ?? (await fetch(request));
}

async function networkFirst(request) {
   const cache = await caches.open(CACHE_NAMES.assets);
   try {
      const responce = await fetch(request);
      await cache.put(request, responce.clone());
      return responce;
   } catch (e) {
      const cached = await cache.match(request);
      return cached ?? (await caches.match('/offline.html'));
   }
}

