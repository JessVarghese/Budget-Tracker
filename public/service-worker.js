const CACHE_NAME = 'budget-tracker';
const DATA_CACHE_NAME = 'budget-tracker-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/idb.js',
  '/public/css/style.css',
  '/public/js/index.js',
  '/public/icons/icon-72x72.png',
  '/public/icons/icons/icon-96x96.png',
  '/public/icons/icons/icon-128x128.png',
  '/public/icons/icons/icon-144x144.png',
  '/public/icons/icons/icon-152x152.png',
  '/public/icons/icons/icon-192x192.png',
  '/public/icons/icons/icon-384x384.png',
  '/public/icons/icons/icon-512x512.png',
];


  // Install the service worker
  self.addEventListener('install', function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('your files were pre-cached successfully!');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});


// Activate the service worker and remove old data from the cache
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});
self.clients.claim();

