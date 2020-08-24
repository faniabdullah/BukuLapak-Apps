const CACHE_NAME = "premierleague-v1";
var urlsToCache = [
  "/",
  "/nav-mobile.html",
  "/top-nav.html",
  "/match.html",
  "/team.html",
  "/apps.js",
  "/index.html",
  "/manifest.json",
  "/pages/home.html",
  "/pages/teams.html",
  "/pages/favorite.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/data/api.js",
  "/js/view/nav.js",
  "/js/script.js",
  "/js/data/idb.js",
  "/js/data/db.js",
  "/js/sw.js",
  "/js/view/favorite.js",
  "/js/view/view.js",
  "/images/default-player.png",
  "/images/default-teams.png",
  "/images/logo.png",
  "/images/logo72x72.png",
  "/images/logo96x96.png",
  "/images/logo128x128.png",
  "/images/logo144x144.png",
  "/images/logo152x152.png",
  "/images/logo192x192.png",
  "/images/logo256x256.png",
  "/images/logo384x384.png",
  "/images/logo512x512.png",
  "/images/logo-dark-mode.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
  "https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hK1QN.woff2",
  "https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hJVQNcOM.woff2",

];
 
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", (event) => {
  let base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url)> -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>{
        return fetch(event.request).then((response) =>{
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  }else{
    event.respondWith(
      caches.match(event.request,{ignoreSearch:true}).then((response)=>{
        return response || fetch (event.request);
      })
    )
  }
 
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', (event) => {
 let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
 let options = {
    body: body,
    icon: 'images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});