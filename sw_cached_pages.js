const cacheName = "v1";

const cacheAssets= [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
]

// call install event 
self.addEventListener('install',e =>{
    console.log("service wroker installed");

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache =>{
            console.log('service worker: cache files');
            cache.addAll(cacheAssets)
        })
        .then(()=>self.skipWaiting())
    );
})

self.addEventListener("activate", e => {
    console.log("service worker : activated");

    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== cacheName){
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    //u can use fjilter asl well here but what is filter

                    }
                })
            )
        })
    )
})

// call fetch event 
self.addEventListener("fetch", e =>{
    console.log('service worker: fetching');
    e.respondWith(
        fetch(e.request).catch(()=>{caches.match(e.request)})
    )
})