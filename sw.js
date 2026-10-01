// PandaCourses — service worker (hors-ligne + mises à jour)
const CACHE = 'pandacourses-v16';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './fonts/outfit-latin.woff2'];

self.addEventListener('install', (e) => {
  // cache: 'reload' contourne le cache HTTP du navigateur pour ne jamais recopier une ancienne version
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function putInCache(req, res) {
  if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Seuls les fichiers de l'appli passent par ici : les échanges avec Firebase vont toujours au réseau
  if (url.origin !== self.location.origin) return;

  // La page elle-même : réseau d'abord (toujours la dernière version), cache seulement hors-ligne
  if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(new Request(url.href, { cache: 'no-store', credentials: 'same-origin' }))
        .then((res) => putInCache('./index.html', res))
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Le reste (police, icônes, SDK) : réponse immédiate depuis le cache, rafraîchie en arrière-plan
  e.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req).then((res) => putInCache(req, res)).catch(() => cached);
      return cached || fresh;
    })
  );
});
