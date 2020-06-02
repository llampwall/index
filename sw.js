// service worker
const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/js/components/main.js',
  '/css/main.css',
  '/css/fontello-all-you-need/font/allyouneed.woff2?43612398',
  '/img/sun_small.JPG',
  '/img/user_anon.png',
  'https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=Sintony:wght@400;700&display=swap'
];


// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });
// activate event
self.addEventListener('activate', evt => {
evt.waitUntil(
    caches.keys().then(keys => {
    return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
    );
    })
);
});
// fetch event
self.addEventListener('fetch', evt => {
evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
    return cacheRes || fetch(evt.request);
    })
);
});