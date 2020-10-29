const CACHE_NAME = "bukulapak-v3";
let urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/cart.html",
  "/pages/learnmore.html",
  "/pages/manuscript.html",
  "/css/materialize.min.css",
  "/css/icon.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/storage-cart.js",
  "/js/script.js",
  "/images/book1.jpeg",
  "/images/book2.jpeg",
  "/images/book3.jpeg",
  "/images/book4.jpeg",
  "/images/logo.png",
  "/images/logo72x72.png",
  "/images/logo96x96.png",
  "/images/logo128x128.png",
  "/images/logo144x144.png",
  "/images/logo192x192.png",
  "/images/logo256x256.png",
  "/images/logo384x384.png",
  "/images/logo512x512.png",
  "/images/profile.jpg",
  "/images/profile2.jpg",
  "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
  "manifest.json",
  "/images/logo-kota-tasikmalaya.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });


  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });