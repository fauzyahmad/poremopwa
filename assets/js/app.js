
var deferredPrompt;
// var bearerToken = localStorage.getItem('access_token');
if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('service-worker.js')
    .then(function (registration) {
        console.log('Service Worker telah ter-Register!');
    })
    .catch(function (err) {
        console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});


