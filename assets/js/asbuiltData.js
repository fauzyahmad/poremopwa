var asbuiltDetail = document.querySelector('#asbuilt-drawing_detail');
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
    while (asbuiltDetail.hasChildNodes()) {
        asbuiltDetail.removeChild(asbuiltDetail.lastChild);
    }
}

function createOneDetailShop(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.asBuiltDrawings) {
      if (data.asBuiltDrawings[i].path === null) {
        asbuiltDetail.innerHTML += 
        `<tr>
              <td id="nameAsbuilt_${data.asBuiltDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.asBuiltDrawings[i].drawing_name}</td>
              <td>
                <a style="padding:5px;" onclick="updateAsBuilts(${data.asBuiltDrawings[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="#"><i class="material-icons">update</i></a>
              </td>
            </tr>`;
      } else {
        asbuiltDetail.innerHTML += 
        `<tr>
              <td id="nameAsbuilt_${data.asBuiltDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.asBuiltDrawings[i].drawing_name}</td>
              <td>
                <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.asBuiltDrawings[i].path}"><i class="material-icons">file_download</i></a>
                <a style="padding:5px;" onclick="updateAsBuilts(${data.asBuiltDrawings[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="#"><i class="material-icons">update</i></a>
              </td>
            </tr>`;
      }
    
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

function createOneDetailShopGuest(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.asBuiltDrawings) {
      if (data.asBuiltDrawings[i].path === null) {
        asbuiltDetail.innerHTML += 
        `<tr>
              <td id="nameAsbuilt_${data.asBuiltDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.asBuiltDrawings[i].drawing_name}</td>
              <td>
                Tidak ada file
              </td>
            </tr>`;
      } else {
        asbuiltDetail.innerHTML += 
        `<tr>
              <td id="nameAsbuilt_${data.asBuiltDrawings[i].id}" class="mdl-data-table__cell--non-numeric">${data.asBuiltDrawings[i].drawing_name}</td>
              <td>
                <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.asBuiltDrawings[i].path}"><i class="material-icons">file_download</i></a>
                
              </td>
            </tr>`;
      }
    
    }

    var idAsli = document.querySelectorAll('.unduh_pdf');
    for (var i = 0; i < idAsli.length; i++) {
      console.log(idAsli[i].href);
      var idHrefSplit = "api_poremo/public/storage/"+idAsli[i].href.toString().split("public/")[1];
      idAsli[i].href = idHrefSplit;
    }    

}

function createOneCacheDetailAsbuilt(data) {
    // console.log('ini contoh', data.project.title);
    if (data.path === null) {
      asbuiltDetail.innerHTML += 
    `<tr>
          <td id="nameAsbuilt_${data.id}" class="mdl-data-table__cell--non-numeric">${data.drawing_name}</td>
          <td>
            <a style="padding:5px;" onclick="updateAsBuilts(${data.id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="#"><i class="material-icons">update</i></a>
          </td>
        </tr>`;
    } else {
      asbuiltDetail.innerHTML += 
      `<tr>
            <td id="nameAsbuilt_${data.id}" class="mdl-data-table__cell--non-numeric">${data.drawing_name}</td>
            <td>
              <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.path}"><i class="material-icons">file_download</i></a>
              <a style="padding:5px;" onclick="updateAsBuilts(${data.id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="#"><i class="material-icons">update</i></a>
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

var idURL = localStorage.getItem('detail-asD_id');
var url = 'api_poremo/public/api/v1/asbuilt/project/';
var url1 = 'api_poremo/public/api/v1/asbuilt/';
var idCache = parseInt(idURL);
var networkDataReceived = false;


if('indexedDB' in window) {
  
  dbPromise
  .then(function (db) {
    var tx = db.transaction('data-asbuilt-drawing', 'readonly');
    var store = tx.objectStore('data-asbuilt-drawing');
    var index = store.index('project_id');
    return index.getAll(idCache);
  }).then(function (data) {
    if (!networkDataReceived) {
      console.log('from cache', data);
      clearDatas();
      for (var i = 0; i < data.length; i++) {
        if(localStorage.getItem('user_role') === 'guest') {
          createOneDetailShopGuest(data[i]);
        } else{
          createOneCacheDetailShop(data[i]);
        }
        
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
  console.log('Dari asbuilt Drawing', data);
  clearAllData('data-asbuilt-drawing');
  clearDatas();
  if(localStorage.getItem('user_role') === 'guest') {
    createOneDetailShopGuest(data);
  } else {
    createOneDetailShop(data);
  }
  return dbPromise
  .then(function (db) {
  var tx = db.transaction('data-asbuilt-drawing', 'readwrite');
  var store = tx.objectStore('data-asbuilt-drawing');
   return Promise.all(data.asBuiltDrawings.map(function(itemAsbuilt) {
      console.log('Adding item: ', itemAsbuilt);
      store.put(itemAsbuilt);
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
        var idDel = localStorage.getItem('delete-asbuilt_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/asbuilt';
        fetch(url1+idDel+'/delete', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            return dbPromise
            .then(function (db) {
                var tx = db.transaction('data-asbuilt-drawing', 'readwrite');
                var store = tx.objectStore('data-asbuilt-drawing');
                store.delete(idDelInt);
                return tx.complete;
            })
            .then(function () {
                console.log('Item deleted!');
            })
            .then(function () {
              window.location.href = 'asbuilt.html';
              // console.log('data-dihapus');
            })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

// function updateShop(id) {
//   localStorage.setItem('detail-shop_update', id);
//   window.location.href = 'update_shop.html';
// }

function updateAsBuilts(id) {
  localStorage.setItem('detail-asbuilt_update', id);
  var textName = document.querySelector('#nameAsbuilt_'+id).textContent;
  localStorage.setItem('nama-shop', textName);
  window.location.href = 'update_asbuilt.html';
} 