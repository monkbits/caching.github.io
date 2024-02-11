const cacheName = "v2";



// call install event 
self.addEventListener('install',e =>{
    console.log("service wroker installed");
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
        fetch(e.request).then(res =>{
            //make copy/clone of response
            const resClone = res.clone();
            //open cache
            caches
                .open(cachedName)
                .then(cache =>{
                    cache.put(e.request, resClone);
                });
                return res; 
        }).catch(()=>{caches.match(e.request).then(res =>res)})
    )
})