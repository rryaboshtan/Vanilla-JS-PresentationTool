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
   console.log('[SW]: install');
});

self.addEventListener('activate', (event) => {
   console.log('[SW]: activate');
});
