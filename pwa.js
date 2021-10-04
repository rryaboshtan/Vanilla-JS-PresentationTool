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
      //   await Promise.all([
      //  caches.open(CACHE_NAMES.assets).then(
      //     (cache) => {
      //        console.log('cach.open BASE_CACHE_FILES ', BASE_CACHE_FILES);
      //        return cache.addAll(BASE_CACHE_FILES);
      //     },
      //     (err) => console.error(`Error with ${CACHE_NAMES.assets}`, err)
      //  ),
      const cache = await caches.open(CACHE_NAMES.assets);
      // (cache) => {
      //    console.log('cach.open BASE_CACHE_FILES ', BASE_CACHE_FILES);
      await cache.addAll(BASE_CACHE_FILES);
      // },
      // (err) => console.error(`Error with ${CACHE_NAMES.assets}`, err)
      //  ),

      //  caches.open(CACHE_NAMES.offline).then(
      //      (cache1) => {
      //        console.log('cach222222222222222.open BASE_CACHE_FILES ', BASE_CACHE_FILES);

      //        return cache1.add(OFFLINE_CACHE_FILE);
      //     },
      //     (err) => console.error(`Error with ${CACHE_NAMES.offline}`, err)
      //  ),

      //  caches.open(CACHE_NAMES.notFound).then(
      //      (cache) => {
      //        console.log('cach33333333333333.open BASE_CACHE_FILES ', BASE_CACHE_FILES);

      //        return cache.add(NOT_FOUND_CACHE_FILE);
      //     },
      //     (err) => console.error(`Error with ${CACHE_NAMES.notFound}`, err)
      //  ),
      //   ]);
   } catch (err) {
      return new Promise((resolve, reject) => {
         reject(err);
      });
   }
}

self.addEventListener('install', async (event) => {
   //    console.log('[SW]: install');
   // event.waitUntil(installServiceWorker());
   const cachNames = await caches.keys();
   await Promise.all(cachNames.map((name) => caches.delete(name)));
   // installServiceWorker();

   const cache = await caches.open(CACHE_NAMES.assets);
    await cache.addAll(BASE_CACHE_FILES);
   console.error('BASE CACH FILES ', BASE_CACHE_FILES);
   // await cache.addAll([
   //    'index.html',
   //    'manifest.json',
   //    'assets/img/logo.png',
   //    'assets/pwa/404.html',
   //    'assets/pwa/offline.html',
   //    'assets/css/style.css',
   // ]);
   //  await cache.add('index.html');
   // event.skipWaiting();
   event.skipWaiting();

   // event.waitUntil(caches.open('add').then((cache) => cache.addAll(BASE_CACHE_FILES)));
});

//Delete old cache files
self.addEventListener('activate', async (event) => {
   console.log('[SW]: activate');
   // const cachNames = await caches.keys();
   // await Promise.all(
   //    cachNames
   //       .filter((name) => name !== ' ')
   //       .map((name) => caches.delete(name))
   // );
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
   // return cached ?? (await fetch(request)) ?? caches.match(OFFLINE_CACHE_FILE);
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