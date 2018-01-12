self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('mwsrrs1').then(function (cache) {
            return cache.addAll(
                [
                    '/img',
                    '/css/styles.css',
                    '/js/dbhelper.js',
                    '/js/main.js',
                    '/data/restaurants.json',
                ]
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('mwsrrs1').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});