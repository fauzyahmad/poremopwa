var picDetail = document.querySelector('#pic_detail');
var titleProject = document.querySelector('#titleSub');
titleSub.textContent = localStorage.getItem('titleProject');
var rolePartner = localStorage.getItem('user_role');
var createPIC = document.querySelector('#create-pic');
var bearerToken = localStorage.getItem('access_token');

if (rolePartner === 'supervisor') {
  createPIC.style.display = 'none';
}

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
        picDetail.removeChild(picDetail.lastChild);
    }
}

// <tr>
//   <td class="mdl-data-table__cell--non-numeric"> 
//     Antonio Banderas (081343332123) </td>
//   <td>
//     <a href="https://wa.me/+62812134567" style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">phone</i></a>
//     <a style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">border_color</i></a>
//     <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">delete_sweep</i></a>

//   </td>
// </tr>

function createOneDetailPIC(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.PICs) {
    picDetail.innerHTML += 
    `<tr>
      <td class="mdl-data-table__cell--non-numeric"> 
        ${data.PICs[i].name} (${data.PICs[i].phone_number}) </td>
      <td>
        <a href="https://wa.me/${data.PICs[i].phone_number}" style="padding:5px;" class="nomor-wa mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">phone</i></a>
        <a onclick="editPIC(${data.PICs[i].id})" style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">border_color</i></a>
        <a onclick="deletePIC(${data.PICs[i].id})" style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">delete_sweep</i></a>

      </td>
    </tr>`;

    }
        // var idWA = document.querySelectorAll('.nomor-wa');
        // for (var i = 0; i < idWA.length; i++) {
        //   console.log(idWA[i].href);
        //   var idHrefSplitWA = data.picData.phone_number.toString().slice(1);
        //   idWA[i].href = idHrefSplitWA;
        // }    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
}

function createOneDetailPICSupervisor(data) {
    // console.log('ini contoh', data.project.title);
    for (var i in data.PICs) {
    picDetail.innerHTML += 
    `<tr>
      <td class="mdl-data-table__cell--non-numeric"> 
        ${data.PICs[i].name} (${data.PICs[i].phone_number}) </td>
      <td>
        <a class="nomor-wa" href="https://wa.me/${data.PICs[i].phone_number}" style="padding:5px;" class="nomor-wa mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">phone</i></a>

      </td>
    </tr>`;

    }
         
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
}

// function createOneDetailShopPartner(data) {
//     // console.log('ini contoh', data.project.title);
//     for (var i in data.picData) {
//     shopDetail.innerHTML += 
//     `<tr>
//       <td class="mdl-data-table__cell--non-numeric"> 
//         Antonio Banderas (081343332123) </td>
//       <td>
//         <a class="nomor-wa" href="" style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">phone</i></a>
//         <a style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">border_color</i></a>
//         <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">delete_sweep</i></a>

//       </td>
//     </tr>`;

//     }
        
//     dialog.querySelector('.close').addEventListener('click', function() {
//         dialog.close();
//       });
// }

// function createOneCacheDetailShop(data) {
//     // console.log('ini contoh', data.project.title);
    
//     shopDetail.innerHTML += 
//     `<tr>
//       <td class="mdl-data-table__cell--non-numeric"> 
//         Antonio Banderas (081343332123) </td>
//       <td>
//         <a class="nomor-wa" href="" style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">phone</i></a>
//         <a style="padding:5px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">border_color</i></a>
//         <a style="padding:5px;" class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">delete_sweep</i></a>

//       </td>
//     </tr>`;
    
//     dialog.querySelector('.close').addEventListener('click', function() {
//         dialog.close();
//       });
// }

var idURL = localStorage.getItem('detail-project_id');
var url = 'api_poremo/public/api/v1/PIC';
var url1 = 'api_poremo/public/api/v1/shop/';
var idCache = parseInt(idURL);
var networkDataReceived = false;
var rolePartner = localStorage.getItem('user_role');

// if (rolePartner === 'partner' || rolePartner === 'guest') {
//   var createShop = document.querySelector('#create-shop');
//   createShop.parentNode.removeChild(createShop);
// }

// if('indexedDB' in window) {
  
//   dbPromise
//   .then(function (db) {
//     var tx = db.transaction('data-shop-drawing', 'readonly');
//     var store = tx.objectStore('data-shop-drawing');
//     var index = store.index('project_id');
//     return index.getAll(idCache);
//   }).then(function (data) {
//     if (!networkDataReceived) {
//       console.log('from cache', data);
//       clearDatas();
//       for (var i = 0; i < data.length; i++) {
//         createOneCacheDetailShop(data[i]);
//       }
//     }
//     // console.log(data);
//     // createOneDetail(data);
//   })
// }

fetch(url+'?project_id='+idURL, { //perlu ditambahkan idURL
  headers: {
    'Authorization': 'Bearer'+bearerToken
  }

}).then(function (response) {
  return response.json();
})
.then(function (data) {
  // networkDataReceived = true;
  // console.log('Dari shop Drawing', data);
  // clearAllData('data-shop-drawing');
  // clearDatas();

  if(rolePartner === 'admin' || rolePartner === 'partner') {
    createOneDetailPIC(data);
  } else {
    createOneDetailPICSupervisor(data);
  }
  // if(rolePartner === 'partner' || rolePartner === 'guest') {
  //   createOneDetailShopPartner(data);
  // } else if(rolePartner === 'supervisor') {
  //   createOneDetailShopSupervisor(data);
  // } else {
  //   createOneDetailShop(data);
  // }
  // return dbPromise
  // .then(function (db) {
  // var tx = db.transaction('data-shop-drawing', 'readwrite');
  // var store = tx.objectStore('data-shop-drawing');
  //  return Promise.all(data.shopDrawings.map(function(itemShop) {
  //     console.log('Adding item: ', itemShop);
  //     store.put(itemShop);
  //     return tx.complete;
  //    })
  //   )
  // });
  console.log('dicoba', data);
  // createOneDetailShop(data);
}).catch(function (err) {
  console.log('Ada error', err)
});

var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('delete-pic_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/PIC';
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
            window.location.href = 'pic.html';
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-shop-drawing', 'readwrite');
            //     var store = tx.objectStore('data-shop-drawing');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // })
            // .then(function () {
            //   window.location.href = 'shop-drawing.html';
            //   // console.log('data-dihapus');
            // })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

function editPIC(id) {
  localStorage.setItem('detail-pic_edit', id);
  window.location.href = 'edit_pic.html';
}

function deletePIC(id) {
  localStorage.setItem('delete-pic_id', id);
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

