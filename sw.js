const C='op-money-v4-3';
const A=['./','./index.html','./manifest.json','./apple-touch-icon.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'||new URL(e.request.url).pathname.endsWith('/index.html')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
