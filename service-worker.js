const CACHE_NAME = 'nour-el-hoda-v1';
const urlsToCache = [
  '/Nour-Hoda/index.html',
  '/Nour-Hoda/style.css',
  '/Nour-Hoda/adhkar.html',
  '/Nour-Hoda/companions.html',
  '/Nour-Hoda/hadith.html',
  '/Nour-Hoda/knowledge.html',
  '/Nour-Hoda/newmuslim.html',
  '/Nour-Hoda/prayer.html',
  '/Nour-Hoda/quran.html',
  '/Nour-Hoda/tasbih.html'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح الكاش');
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات من الكاش أو من الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// تحديث الكاش عند وجود نسخة جديدة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
