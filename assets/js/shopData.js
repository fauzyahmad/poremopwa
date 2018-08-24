var shopDetail = document.querySelector('#shop-drawing_detail');
var titleProject = document.querySelector('#titleSub');
titleSub.textContent = localStorage.getItem('titleProject');
var bearerToken = localStorage.getItem('access_token');

var signOut = document.querySelector('#sign-out');
signOut.addEventListener('click', function (event) {
  // alert('Anda telah Berhasil Sign Out');
  // localStorage.clear();
  // window.location.href = 'index.html';
  signOutModal.showModal();
})

var signOutModal = document.querySelector('.sign-outModal');
var signOutBtn = document.querySelector('.sign-outYa');
if (! signOutModal.showModal) {
    dialogPolyfill.registerDialog(signOutModal);
}

signOutBtn.addEventListener('click', function () {
  localStorage.clear();
  window.location.href = 'index.html';
})

signOutModal.querySelector('.close_signOut').addEventListener('click', function() {
    signOutModal.close();
  });  

var editUser = document.querySelector('#edit-user');
editUser.addEventListener('click', function (event) {
  var urlIdAkun = localStorage.getItem('user_id');
  localStorage.setItem('edit_user', urlIdAkun);
})

function clearDatas() {
    while (shopDetail.hasChildNodes()) {
        shopDetail.removeChild(shopDetail.lastChild);
    }
}

function createOneDetailShop(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.shopDrawings) {
    shopDetail.innerHTML += 
    `<tr>
          <td id="nameShop_${data.shopDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.shopDrawings[i].drawing_name}</td>
          <td>
            <a style="padding:5px;" onclick="updateShop(${data.shopDrawings[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">update</i></a>
            <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.shopDrawings[i].path}"><i class="material-icons">file_download</i></a>
            <a style="padding:5px;" onclick="deleteShop(${data.shopDrawings[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="#"><i class="material-icons">delete_sweep</i></a>

          </td>
        </tr>`;

    }
        var idAsli = document.querySelectorAll('.unduh_pdf');
        for (var i = 0; i < idAsli.length; i++) {
          console.log(idAsli[i].href);
          var idHrefSplit = "api_poremo/public/storage/"+idAsli[i].href.toString().split("public/")[1];
          idAsli[i].href = idHrefSplit;
        }    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
}

function createOneDetailShopSupervisor(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.shopDrawings) {
    shopDetail.innerHTML += 
    `<tr>
          <td id="nameShop_${data.shopDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.shopDrawings[i].drawing_name}</td>
          <td>
            <a style="padding:5px;" onclick="updateShop(${data.shopDrawings[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">update</i></a>
            <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.shopDrawings[i].path}"><i class="material-icons">file_download</i></a>

          </td>
        </tr>`;

    }
        var idAsli = document.querySelectorAll('.unduh_pdf');
        for (var i = 0; i < idAsli.length; i++) {
          console.log(idAsli[i].href);
          var idHrefSplit = "api_poremo/public/storage/"+idAsli[i].href.toString().split("public/")[1];
          idAsli[i].href = idHrefSplit;
        }    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
}

function createOneDetailShopPartner(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.shopDrawings) {
    shopDetail.innerHTML += 
    `<tr>
          <td id="nameShop_${data.shopDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.shopDrawings[i].drawing_name}</td>
          <td>
            <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.shopDrawings[i].path}"><i class="material-icons">file_download</i></a>
          </td>
        </tr>`;

    }
        var idAsli = document.querySelectorAll('.unduh_pdf');
        for (var i = 0; i < idAsli.length; i++) {
          console.log(idAsli[i].href);
          var idHrefSplit = "api_poremo/public/storage/"+idAsli[i].href.toString().split("public/")[1];
          idAsli[i].href = idHrefSplit;
        }    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
}

function createOneCacheDetailShop(data) {
    // console.log('ini contoh', data.project.title);
    
    shopDetail.innerHTML += 
    `<tr>
          <td id="nameShop_${data.id}" class="mdl-data-table__cell--non-numeric">${data.drawing_name}</td>
          <td>
            <a style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">update</i></a>
            <a style="padding:5px;" onclick="deleteShop(${data.id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="#"><i class="material-icons">delete_sweep</i></a>
          </td>
        </tr>`;
    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
}

var idURL = localStorage.getItem('detail-shopD_id');
var url = 'api_poremo/public/api/v1/shop/project/';
var url1 = 'api_poremo/public/api/v1/shop/';
var idCache = parseInt(idURL);
var networkDataReceived = false;
var rolePartner = localStorage.getItem('user_role');

if (rolePartner === 'partner' || rolePartner === 'guest') {
  var createShop = document.querySelector('#create-shop');
  createShop.parentNode.removeChild(createShop);
}

if('indexedDB' in window) {
  
  dbPromise
  .then(function (db) {
    var tx = db.transaction('data-shop-drawing', 'readonly');
    var store = tx.objectStore('data-shop-drawing');
    var index = store.index('project_id');
    return index.getAll(idCache);
  }).then(function (data) {
    if (!networkDataReceived) {
      console.log('from cache', data);
      clearDatas();
      for (var i = 0; i < data.length; i++) {
        createOneCacheDetailShop(data[i]);
      }
    }
    // console.log(data);
    // createOneDetail(data);
  })
}

fetch(url+idURL, {
  headers: {
    'Authorization': 'Bearer'+bearerToken
  },

}).then(function (response) {
  return response.json();
})
.then(function (data) {
  networkDataReceived = true;
  console.log('Dari shop Drawing', data);
  clearAllData('data-shop-drawing');
  clearDatas();
  if(rolePartner === 'partner' || rolePartner === 'guest') {
    createOneDetailShopPartner(data);
  } else if(rolePartner === 'supervisor') {
    createOneDetailShopSupervisor(data);
  } else {
    createOneDetailShop(data);
  }
  return dbPromise
  .then(function (db) {
  var tx = db.transaction('data-shop-drawing', 'readwrite');
  var store = tx.objectStore('data-shop-drawing');
   return Promise.all(data.shopDrawings.map(function(itemShop) {
      console.log('Adding item: ', itemShop);
      store.put(itemShop);
      return tx.complete;
     })
    )
  });
}).catch(function (err) {
  console.log('Ada error', err)
});

var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('delete-shop_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/shop';
        var urlIdAkun = localStorage.getItem('user_id');
        var parseId = parseInt(urlIdAkun);
        fetch(urlDel+'/'+idDel+'/delete', {
            method: 'POST',
            headers: {
            	'Content-Type' : 'application/json',
            	'Accept' : 'application/json',
              'Authorization': 'Bearer'+bearerToken
            },
            body: JSON.stringify({
            	user_id: parseId
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            return dbPromise
            .then(function (db) {
                var tx = db.transaction('data-shop-drawing', 'readwrite');
                var store = tx.objectStore('data-shop-drawing');
                store.delete(idDelInt);
                return tx.complete;
            })
            .then(function () {
                console.log('Item deleted!');
            })
            .then(function () {
              window.location.href = 'shop-drawing.html';
              // console.log('data-dihapus');
            })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

function updateShop(id) {
  localStorage.setItem('detail-shop_update', id);
  var textName = document.querySelector('#nameShop_'+id).textContent;
  localStorage.setItem('nama-shop', textName);
  window.location.href = 'edit_shopDrawing.html';
}

function deleteShop(id) {
  localStorage.setItem('delete-shop_id', id);
  dialog.showModal();
}

function filterUpdate(id, path) {
    var idAsli = document.querySelector('#unduh_pdf_'+id);
    localStorage.setItem('pathAsli', path);
    console.log(idAsli.href);
    var idHref = idAsli.href;
    console.log(idHref);
    var idHrefSplit = "api_poremo/public/storage/"+idHref.toString().split("public/")[1];
    idAsli.href = idHrefSplit
    console.log(idAsli.href)        
    
} 

