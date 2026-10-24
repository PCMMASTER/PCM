/* SQPR Hunter — service worker
   Ao publicar uma versão nova do index.html, troque o número abaixo (v1 -> v2…)
   para o app avisar "Nova versão disponível". */
const VERSAO = "sqpr-v3";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/favicon-64.png"
];
const FONTES = /^https:\/\/(fonts\.(googleapis|gstatic)\.com|www\.gstatic\.com\/firebasejs)\//;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Página: tenta a internet primeiro (pega versões novas), sem internet usa a cópia salva.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(r => { const c = r.clone(); caches.open(VERSAO).then(ca => ca.put("./index.html", c)); return r; })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Fonte Archivo e biblioteca do login (Firebase): guarda depois do primeiro uso para funcionar offline.
  if (FONTES.test(req.url)) {
    e.respondWith(
      caches.open(VERSAO).then(ca => ca.match(req).then(hit => {
        const rede = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) ca.put(req, r.clone()); return r; }).catch(() => hit);
        return hit || rede;
      }))
    );
    return;
  }

  // Arquivos do próprio app: cache primeiro.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
