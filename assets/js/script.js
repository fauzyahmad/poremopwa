var addToHomeScreen = document.querySelector('#add-home');
var unregisterSWss = document.querySelector('#unregister');
var CACHE_STATIC_NAME = 'static-v16.20'; //Harus sama yang ada di service-worker.js
var CACHE_DYNAMIC = 'dynamic-v16.20'; //Harus sama yang ada di service-worker.js
// window.localStorage.getItem('access_token');
addToHomeScreen.addEventListener('click', addIconBanner);
function addIconBanner() {
    if(deferredPrompt) { 
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);

            if(choiceResult.outcome === 'dismissed') {
                console.log('User batal menginstall');
            } else {
                console.log('User menginstall web ke Homescreen');
            }
        });
 
        deferredPrompt = null;
    }
}

function clearPage() {
    var refreshToast = document.querySelector('#snackbar-refresh');
    var handler = function() {
    window.location.reload();
};
    var data = {
        message: 'Cache has been Cleared, Repload to Update',
        actionHandler: handler,
        actionText: 'Reload',
        timeout: 50000
      };
      refreshToast.MaterialSnackbar.showSnackbar(data);
}

unregisterSWss.addEventListener('click', function () {
    
        caches.delete(CACHE_STATIC_NAME).then(function (event) {
            console.log('Berhasil mendelete', event);
        }).catch(function (err) {
            console.log(err);
        });
        caches.delete(CACHE_DYNAMIC).then(function (event) {
            console.log('Berhasil mendelete', event);
        }).catch(function (err) {
            console.log(err);
        });

        if('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations()
            .then(function (registrations) {
                for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                }
            });
        }
        // window.localStorage.clear();
        clearPage();
    
    // window.localStorage.clear();
});

function refreshPage() {
    var refreshToast = document.querySelector('#snackbar-refresh');
    var handler = function() {
    window.location.reload();
};
    var data = {
        message: 'New Update Available',
        actionHandler: handler,
        actionText: 'Reload',
        timeout: 50000
      };
      refreshToast.MaterialSnackbar.showSnackbar(data);
}

var refreshing;
navigator.serviceWorker.addEventListener('controllerchange',
  function() {
    if (refreshing) return;
    refreshing = true;
    refreshPage();
  }
);


// saveButton.addEventListener('click', saveData);
// function saveData(event) {
//     console.log('click');
//     if('caches' in window) {
//         caches.open('save-data_cache')
//         .then(function (cache) {
//             cache.addAll([]);
//         });
//     }
// }