/* Border Companion – offline support. Bump VERSION whenever index.html changes. */
const VERSION = "bc-2026-11-08e";
const SHELL = ["./", "./index.html", "./data.js", "./manifest.json", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  // Data file: always try the network first so law updates reach users, fall back to cache offline.
  if (sameOrigin && url.pathname.endsWith("/data.js")) {
    e.respondWith(fetch(req, {cache: "no-store"}).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put("./data.js", cp)); return r; })
      .catch(() => caches.match("./data.js")));
    return;
  }
  // Pages: network first (fresh content), fall back to cache offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", cp)); return r; })
      .catch(() => caches.match("./index.html").then(r => r || caches.match("./"))));
    return;
  }
  // Everything else (icons, fonts): cache first, then network and store.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r && (r.ok || r.type === "opaque")) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return r;
  })));
});
