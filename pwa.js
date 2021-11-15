const CACHE_VERSION = 1.0;
const BASE_CACHE_FILES = [
   'index.html',
   'assets/pwa/404.html',
   'assets/pwa/offline.html',
   'assets/css/styles.css',
   'assets/css/animations.css',
   'manifest.json',
   'assets/img/logo.png',
   'assets/img/devnexus.png',
   'assets/img/MyPhoto.jpg',
   'assets/img/vanillin.png',
   'assets/js/app.js',
   'assets/js/animator.js',
   'assets/js/controls.js',
   'assets/js/dataBinding.js',
   'assets/js/jsonLoader.js',
   'assets/js/router.js',
   'assets/js/slide.js',
   'assets/js/slideContainer.js',
   'assets/js/slideLoader.js',
   'assets/slides/001-title.html',
   'assets/slides/002-stuff.html',
   'assets/slides/003-morestuff.html',
   'assets/slides/data-binding.html',
   // 'assets/appicons/favicon-16x16.png',
   // 'assets/appicons/favicon-32x32.png',
   // 'assets/appicons/favicon-96x96.png',
   // 'assets/appicons/favicon-196x196.png',
   // 'assets/appicons/favicon-128.png',
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
      const cache = await caches.open(CACHE_NAMES.assets);

      await cache.addAll(BASE_CACHE_FILES);
   } catch (err) {
      return new Promise((resolve, reject) => {
         reject(err);
      });
   }
}

self.addEventListener('install', async event => {
   const cachNames = await caches.keys();
   await Promise.all(cachNames.map(name => caches.delete(name)));

   const cache = await caches.open(CACHE_NAMES.assets);
   await cache.addAll(BASE_CACHE_FILES);
   console.error('BASE CACH FILES ', BASE_CACHE_FILES);

   event.skipWaiting();
});

self.addEventListener('activate', async event => {
   console.log('[SW]: activate');
});

self.addEventListener('fetch', event => {
   const { request } = event;

   const url = new URL(request.url);

   if (url.origin === location.origin) {
      event.respondWith(cacheFirst(request));
   } else {
      event.respondWith(networkFirst(request));
   }
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
      return cached ?? (await caches.match(OFFLINE_CACHE_FILE));
   }
}
