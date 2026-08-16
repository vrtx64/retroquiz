const CACHE_NAME = 'retro-quiz-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './icon.png'
  // Добавьте сюда пути к вашим CSS или JS файлам, если они есть, например: './style.css'
];

// Установка сервис-воркера и кэширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация и удаление старого кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Перехват запросов и выдача файлов из кэша, если нет сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
