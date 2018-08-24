
importScripts('assets/js/idb.js');
importScripts('assets/js/utility.js'); 

var CACHE_STATIC_NAME = 'static-v16.20'; //Harus sama yang ada di assets/js/script.js
var CACHE_DYNAMIC = 'dynamic-v16.20'; //Harus sama yang ada di assets/js/script.js
var CACHE_STATIC_FILES = [
    './',
    'index.html',
    'home.html', 
    'offline.html',
    'manifest.json',
    'assets/js/material.min.js',
    'assets/js/app.js',
    'assets/js/script.js',
    'assets/js/projectData.js',
    'assets/js/promise.js',
    'assets/js/fetch.js',
    'assets/js/idb.js',
    'assets/js/utility.js',
    // 'assets/js/boqData.js',
    'assets/css/main.css',
    'assets/images/telkom.png',
    'assets/images/telkomsel.png',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.red-purple.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
];


//fungsi untuk membatasi jumlah file di cache
function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
    .then(function (cache) {
        return cache.keys()
        .then(function (keys) {
            if (keys.length > maxItems) {
                cache.delete(keys[0])
                .then(trimCache(cacheName, maxItems));
            }
        });
    });
}

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Menginstall Service Worker ...', event);
    
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
        .then(function (cache) {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll(CACHE_STATIC_FILES);
        })
    );
    return self.skipWaiting();
});
  
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Mengaktifkan Service Worker ...', event);
    event.waitUntil(
        caches.keys()
        .then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim(); //this line needed coz the time to time maybe service worker not working properly
});

self.addEventListener('fetch', function(event) {
    // var url = '../api_poremo/public/api/v1/project' ;
    // if (event.request.url.indexOf(url) !== -1) {
    //     event.respondWith(
    //         fetch(event.request)
    //         .then(function (res) {
    //             console.log('data dari sw network', res);
    //         })
    //             .then(function (res) {
    //                 var clonedRes = res.clone(); //clone dari indexeddb
    //                 clearAllData('data-project') //data dicek dan didelete disesuaikan dgn data di server
    //                 .then(function () {
    //                     return clonedRes.json();
    //                 })
    //                 .then(function (data) {
    //                     writeData('data-project', data);
    //                 });  
    //                 return res;
    //             })
    //     );
    // }
        var request = event.request;
        var regex1 = /api_poremo\/public\/api\/v1\/project/;
        var regex2 = /api_poremo\/public\/api\/v1\/report/;
        var regex3 = /api_poremo\/public\/api\/v1\/boq/;
        var regex4 = /api_poremo\/public\/api\/v1\/shop/;
        var regex5 = /api_poremo\/public\/api\/v1\/asbuilt/;
        var regex6 = /api_poremo\/public\/api\/v1\/user/;
        var regex7 = /api_poremo\/public\/api\/v1\/user/;
        var regex8 = /api_poremo\/public\/api\/v1\/additional_work/;
        var regex9 = /api_poremo\/public\/api\/v1\/comment/;
        var regex10 = /api_poremo\/public\/api\/v1\/partner/;
        var regex11 = /maps.gstatic.com\/mapfiles/;
        var regex12 = /maps.googleapis.com\/maps\/vt/;
        var regex13 = /api_poremo\/public\/api\/v1\/summary/;
        var regex14 = /api_poremo\/public\/api\/v1\/PIC/;
        if (request.method !== 'GET') {
            event.respondWith(
                fetch(request)
                    .catch(function () {
                        return caches.match('offline.html');
                    })
            );
            return;
        }
        else if(event.request.url.match(regex1) || event.request.url.match(regex2) 
                || event.request.url.match(regex3) || event.request.url.match(regex4) 
                || event.request.url.match(regex5) || event.request.url.match(regex6) 
                || event.request.url.match(regex7) || event.request.url.match(regex8) 
                || event.request.url.match(regex9) || event.request.url.match(regex10) 
                || event.request.url.match(regex11) || event.request.url.match(regex12) 
                || event.request.url.match(regex13) || event.request.url.match(regex14)) {
            event.respondWith(
                fetch(event.request)
                .catch(function () {
                    return caches.match('offline.html');
                })
            );
        }
        // else if(event.request.url.indexOf('api_poremo/public/api/v1/project') > -1) {
        //     event.respondWith(
        //         fetch(event.request)
        //     //     .then(function (res) {
        //     //     console.log('data dari sw network', res);
        //     // })
        //         .then(function (res) {
        //             var clonedRes = res.clone(); //clone dari indexeddb
        //             clearAllData('data-project') //data dicek dan didelete disesuaikan dgn data di server
        //             .then(function () {
        //                 console.log('data dibuat', clonedRes);
        //                 return clonedRes.json();
        //             })
        //             .then(function (data) {
        //                 console.log('untuk write:', data);
        //                 return dbPromise
        //                 .then(function (db) {
        //                     var tx = db.transaction('data-project', 'readwrite');
        //                     var store = tx.objectStore('data-project');
        //                     return Promise.all(data.projects.map(function(item) {
        //                       console.log('Adding item: ', item);
        //                       return store.add(item);
        //                     })
        //                   )
        //                 });
        //             });  
        //             return res;
        //         })
        //     );
        // }
        else {
        event.respondWith(
            caches.match(event.request)
            .then(function (response) { //this is response from the cache storage
                if (response) {
                    return response; //mencari di cache utk ditampilkan
                } else {
                    return fetch(event.request) //jika tidak ada di cache, dilanjutkan dengan menfetch dari server
                    .then(function (res) {
                        return caches.open(CACHE_DYNAMIC) //ini mencache dynamic
                        .then(function (cache) {
                            trimCache(CACHE_DYNAMIC, 15); //fungsi trimCache() dipanggil sebelum ditaruh di cache utk membatasi jumlah file di cache
                            cache.put(event.request.url, res.clone());
                            return res; 
                        });
                    })
                    .catch(function (err) {
                        return caches.open(CACHE_STATIC_NAME)
                        .then(function (cache) {
                            if (event.request.headers.get('accept').includes('text/html')) {
                                return cache.match('offline.html'); //memberikan url yang akan ditampilkan jika offline dan saat menuju ke page yang belum tercache
                            }
                        });
                    });
                }
            })
        );
    }
        
    
    
    // event.waitUntil(
    //     caches.open(CACHE_STATIC_NAME).then(function (cache) {
    //         return fetch(event.request).then(function (response) {
    //           return cache.put(event.request, response.clone());
    //         });
    //       })
    // );
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//         .then(function (response) { //this is response from the cache storage
//             if (response) {
//                 return response; //mencari di cache utk ditampilkan
//             } else {
//                 return fetch(event.request) //jika tidak ada di cache, dilanjutkan dengan menfetch dari server
//                 .then(function (res) {
//                     return caches.open(CACHE_DYNAMIC) //ini mencache dynamic
//                     .then(function (cache) {
//                         cache.put(event.request.url, res.clone());
//                         return res; 
//                     });
//                 })
//                 .catch(function (err) {
//                     return caches.open(CACHE_STATIC_NAME)
//                     .then(function (cache) {
//                         return cache.match('offline.html'); //memberikan url yang akan ditampilkan jika offline dan saat menuju ke page yang belum tercache
//                     });
//                 });
//             }
//         })
//     );
//     // event.waitUntil(
//     //     caches.open(CACHE_STATIC_NAME).then(function (cache) {
//     //         return fetch(event.request).then(function (response) {
//     //           return cache.put(event.request, response.clone());
//     //         });
//     //       })
//     // );
// });