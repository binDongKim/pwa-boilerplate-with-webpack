(function() {
	const CACHE_NAME = "pages-cache-v1";
	const filesToCache = [
		"./css/index.css",
		// "./icons/lunch.png",
		"./index.html"
	];

	self.addEventListener("install", event => {
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then(cache => cache.addAll(filesToCache))
		);
	});

	self.addEventListener("fetch", event => {
		event.respondWith(
			caches.match(event.request).then(response => {
				if (response) {
					return response;
				}
				return fetch(event.request).then(res => {
					if (response.status === 404) {
						return caches.match("./index.html");
					}
					return caches.opne(CACHE_NAME).then(cache => {
						cache.put(event.request.url, response.clone());
						return response;
					});
				});
			})
				.catch(error => caches.match("./index.html"))
		);
	});
})();
