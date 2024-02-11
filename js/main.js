// make sure service wrokers are supported
console.log("just for checking it it works or not");


if('serviceWorker' in navigator){
    console.log("service worker supported");
    navigator.serviceWorker.register("../sw_cached_pages.js")
    .then(reg => console.log('service worker: registered'))
    .catch(err => console.log(`service worker: error: ${err}`))
}