
self.addEventListener("install",(event)=>{

    console.log("service worker installed!!!!!");
    // self.skipWaiting()
    event.waitUntil( 
        caches.open("simpleApp-1").then(cache=>{     // open func create cache
           return cache.addAll(["index.html","styles/index.css","js/main.js","other.html","styles/other.css","js/other.js","below/another.html","styles/another.css","js/another.js"])
        }).catch(err=>console.log("cache error",err))
     )
})


self.addEventListener("activate",()=>{
    console.log("service worker activate!!!!!");
})

self.addEventListener("fetch",(event)=>{   //fetch event fire when every request happen
    console.log("Network request :",event.request.url);
    event.respondWith(
        caches.match(event.request).then((file)=>{    //match find in cache if it exist or not
            if(file){
                console.log("Found in cache",event.request.url);
                return file
            }
            console.log("Network request :",event.request.url);
           return fetch(event.request.url)

        }).catch(err=>console.log(err))
    )

})