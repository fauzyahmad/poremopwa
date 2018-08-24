var titleSubProject = document.querySelector('#titleSub');
titleSubProject.textContent = localStorage.getItem('titleProject');
console.log(titleSubProject);
var userId = localStorage.getItem('user_id');
var userIdSend = new FormData();
userIdSend.append('user_id', userId);
var bearerToken = localStorage.getItem('access_token');

var form = document.querySelector('#upload-boq');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var projectId = localStorage.getItem('detail-boQ_id');
    var fileInput = document.querySelector('#filed');
    var sendData = new FormData();
    sendData.append('boq', fileInput.files[0]);
    sendData.append('user_id', userId);
    sendData.append('project_id', projectId);
    
    var url = 'api_poremo/public/api/v1/upload/boq';
    fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendData
    }).then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (data) { 
        console.log (data);
        alert('Data CSV Berhasil ditambahkan');
        window.location.href = 'boq.html';
    }).catch(function (err) {
        alert('Data CSV tidak berhasil ditambahkan, ada kesalahan format di file BOQ anda');
    });
});

var rolePartner = localStorage.getItem('user_role');
console.log(rolePartner);
if (rolePartner === 'partner' || rolePartner === 'guest') {
  var formBoq = document.querySelector('#upload-boq');
  formBoq.parentNode.removeChild(formBoq);
}

if (rolePartner === 'guest') {
  var createBoqWorkItem = document.querySelector('#create-boq_WorkItem');
  createBoqWorkItem.parentNode.removeChild(createBoqWorkItem);
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

if(rolePartner !== 'admin') {
  var deleteBtnBoq = document.querySelector('#deleteBtn');
  deleteBtnBoq.parentNode.removeChild(deleteBtnBoq);

}

if (rolePartner === 'admin') {
  var createWorkBoq = document.querySelector('#create-boq_WorkItem');
  createWorkBoq.style.display = 'block';
}

var boqData = document.querySelector('#only-one');
var boqDataHtml = '';

function clearDatas() {
    while (boqData.hasChildNodes()) {
        boqData.removeChild(boqData.lastChild);
    }
}
function createOneListBoq(data) {
    for (var i in data.boq.boq_works) {
        boqDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">
            <span class="no-sub__project" style="margin-right:10px;">${data.boq.boq_works[i].reference_number}-${data.boq.boq_works[i].id} </span>
             ${data.boq.boq_works[i].name}</h4>
        </header>
        <input style="display:none;" class="boq-id" type="text" value="${data.boq.boq_works[i].boq_id}">
        <div data-content>
          <div class="action mdl-card__actions mdl-card--border">
          	<div style="text-align: right;">
	          	<a style="margin-right: 10px;" onclick="editBoqWork(${data.boq.boq_works[i].id})" class="show-dialog mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
	              <i class="material-icons">border_color</i>
	            </a>
	            <a style="float:right;" onclick="deleteBoqWork(${data.boq.boq_works[i].id})" class="show-dialog mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
	              <i class="material-icons">delete_sweep</i>
	            </a>
            </div>
          </div>`;
        for (var j in data.boq.boq_works[i].boq_items) {
        boqDataHtml += 
        `
        
            <div data-accordion>
              <header data-control class="mdl-card__title mdl-color--accent mdl-color-text--primary-contrast">
                  <h4 class="title-list-sub__project mdl-card__title-text">${data.boq.boq_works[i].boq_items[j].name}</h4>
              </header>
              <div data-content>
                <div class="keterangan mdl-card__supporting-text">
                  <table class="desc-full mdl-data-table mdl-js-data-table">
                    <tbody>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Spesifikasi</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq.boq_works[i].boq_items[j].specifications}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Volume</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq.boq_works[i].boq_items[j].volume} ${data.boq.boq_works[i].boq_items[j].unit}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Bobot</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq.boq_works[i].boq_items[j].weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="action mdl-card__actions mdl-card--border">
                    <div style="text-align: right;">
                    	<a style="margin-right:10px;" onclick="updateBoq(${data.boq.boq_works[i].boq_items[j].id})" class="show-dialog mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
                                <i class="material-icons">border_color</i>
                       </a>
                      <a style="float:right;" onclick="deleteBoqItem(${data.boq.boq_works[i].boq_items[j].id})" class="show-dialog mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
                                <i class="material-icons">delete_sweep</i>
                      </a>
                    </div>
                </div>
              </div>
            </div>`;
        }
        boqDataHtml += `<div class="action mdl-card__actions mdl-card--border">
            <a style="margin:auto;display:table;" onclick="createBoqItem(${data.boq.boq_works[i].id})" class="show-dialog mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              <i class="material-icons">add_circle</i>Tambah
            </a>
          </div></div></section>`;
    }
    boqData.innerHTML = boqDataHtml;

    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });

    // var deleteBoq = document.querySelector('#deleteBtn');

    // deleteBoq.addEventListener('click', function (event) {
    //   dialog.showModal();
    // })

    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });

    dialogDelSub.querySelector('.close_sub').addEventListener('click', function() {
        dialogDelSub.close();
      });

    dialogDelSubSeq.querySelector('.close-SubSeq').addEventListener('click', function() {
        dialogDelSubSeq.close();
      });     
     
    
    //  dialog.querySelector('.close').addEventListener('click', function() {
    //   dialog.close();
    // });
}

function createOneListBoqPartner(data) {
    for (var i in data.boq.boq_works) {
        boqDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">
            <span class="no-sub__project" style="margin-right:10px;">${data.boq.boq_works[i].reference_number}-${data.boq.boq_works[i].id}  </span>
             ${data.boq.boq_works[i].name}</h4>
        </header>
        <input style="display:none;" class="boq-id" type="text" value="${data.boq.boq_works[i].boq_id}">
        <div data-content>`;
        for (var j in data.boq.boq_works[i].boq_items) {
        boqDataHtml += 
        `
        
            <div data-accordion>
              <header data-control class="mdl-card__title mdl-color--accent mdl-color-text--primary-contrast">
                  <h4 class="title-list-sub__project mdl-card__title-text">${data.boq.boq_works[i].boq_items[j].name}</h4>
              </header>
              <div data-content>
                <div class="keterangan mdl-card__supporting-text">
                  <table class="desc-full mdl-data-table mdl-js-data-table">
                    <tbody>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Spesifikasi</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq.boq_works[i].boq_items[j].specifications}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Volume</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq.boq_works[i].boq_items[j].volume} ${data.boq.boq_works[i].boq_items[j].unit}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Bobot</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq.boq_works[i].boq_items[j].weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>`;
        }
        boqDataHtml += '</div></section>';
    }
    boqData.innerHTML = boqDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });

     
     
    //  dialog.querySelector('.close').addEventListener('click', function() {
    //   dialog.close();
    // });
}

function createOneCacheListBoq(data) {
        boqDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">
            <span class="no-sub__project" style="margin-right:10px;">${data.reference_number}-${data.id} </span>
             ${data.name}</h4>
        </header>
        <input style="display:none;" type="text" value="${data.boq_id}">
        <div data-content>`;
        for (var j in data.boq_items) {
        boqDataHtml += 
        `
        
            <div data-accordion>
              <header data-control class="mdl-card__title mdl-color--accent mdl-color-text--primary-contrast">
                  <h4 class="title-list-sub__project mdl-card__title-text">${data.boq_items[j].name}</h4>
              </header>
              <div data-content>
                <div class="keterangan mdl-card__supporting-text">
                  <table class="desc-full mdl-data-table mdl-js-data-table">
                    <tbody>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Spesifikasi</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq_items[j].specifications}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Volume</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq_items[j].volume} ${data.boq_items[j].unit}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Bobot</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq_items[j].weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="action mdl-card__actions mdl-card--border">
                        <a onclick="updateBoq(${data.boq_items[j].id})" class="show-dialog mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
                          <i class="material-icons">update</i>
                        </a>
                </div>
              </div>
            </div>`;
        }
        boqDataHtml += '</div></section>';

    boqData.innerHTML = boqDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });

    var deleteBoq = document.querySelector('#deleteBtn');

    deleteBoq.addEventListener('click', function (event) {
      dialog.showModal();
    })
     
     dialog.querySelector('.close').addEventListener('click', function() {
         dialog.close();
       });   
    //  dialog.querySelector('.close').addEventListener('click', function() {
    //   dialog.close();
    // });
}

function createOneCacheListBoqPartner(data) {
        boqDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">
            <span class="no-sub__project" style="margin-right:10px;">${data.reference_number}-${data.id}  </span>
             ${data.name}</h4>
        </header>
        <input style="display:none;" type="text" value="${data.boq_id}">
        <div data-content>`;
        for (var j in data.boq_items) {
        boqDataHtml += 
        `
        
            <div data-accordion>
              <header data-control class="mdl-card__title mdl-color--accent mdl-color-text--primary-contrast">
                  <h4 class="title-list-sub__project mdl-card__title-text">${data.boq_items[j].name}</h4>
              </header>
              <div data-content>
                <div class="keterangan mdl-card__supporting-text">
                  <table class="desc-full mdl-data-table mdl-js-data-table">
                    <tbody>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Spesifikasi</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq_items[j].specifications}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Volume</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq_items[j].volume} ${data.boq_items[j].unit}</td>
                      </tr>
                      <tr>
                        <td class="mdl-data-table__cell--non-numeric">Bobot</td>
                        <td>:</td>
                        <td class="mdl-data-table__cell--non-numeric">${data.boq_items[j].weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
               
              </div>
            </div>`;
        }
        boqDataHtml += '</div></section>';

    boqData.innerHTML = boqDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });
     
       
    //  dialog.querySelector('.close').addEventListener('click', function() {
    //   dialog.close();
    // });
}

function createNoData() {
  boqData.innerHTML = 
  `<div class="mdl-card__title">
      <h4 class="title-boq mdl-card__title-text"> Terjadi kesalahan/Tidak ada Data </h4>
    </div>`;
}

var additionalDetail = document.querySelector('#additional_detail');

function createAdditionalPartner(data) {
    
    for (var i in data.additionalWorks) {
    if(data.additionalWorks[i].agreed === 1) {
      additionalDetail.innerHTML += 
      `<tr>
            <td class="mdl-data-table__cell--non-numeric"><span id="addText_${data.additionalWorks[i].id}">${data.additionalWorks[i].name}</span></td>
            <td>
              <a onclick="updateAdd(${data.additionalWorks[i].id})" class="alt-btn mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">update</i></a>
              <a class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.additionalWorks[i].path}"><i class="material-icons">file_download</i></a>
            </td>
          </tr>`;
    } else {
      additionalDetail.innerHTML += 
      `<tr>
            <td class="mdl-data-table__cell--non-numeric"><span id="addText_${data.additionalWorks[i].id}">${data.additionalWorks[i].name}</span> (Belum Disetujui)</td>
            <td>
              <a onclick="updateAdd(${data.additionalWorks[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">update</i></a>
              <a class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.additionalWorks[i].path}"><i class="material-icons">file_download</i></a>
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
        dialogUpdateAdd.querySelector('.close_add').addEventListener('click', function() {
            dialogUpdateAdd.close();
          });      
}

function createAdditional(data) {
    
    for (var i in data.additionalWorks) {
    if(data.additionalWorks[i].agreed === 1) {
      additionalDetail.innerHTML += 
      `<tr>
            <td class="mdl-data-table__cell--non-numeric"><span id="addText_${data.additionalWorks[i].id}">${data.additionalWorks[i].name}</span>
            
            </td>
            <td>
              <a onclick="updateAdd(${data.additionalWorks[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">update</i></a>
              <a class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.additionalWorks[i].path}"><i class="material-icons">file_download</i></a>
            </td>
          </tr>`;
    } else {
      additionalDetail.innerHTML += 
      `<tr>
            <td class="mdl-data-table__cell--non-numeric"><span <span id="addText_${data.additionalWorks[i].id}">${data.additionalWorks[i].name}</span>
            <br><br>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.additionalWorks[i].id}">
              <input onchange="agreedAdd(${data.additionalWorks[i].id})" type="checkbox" id="grant_${data.additionalWorks[i].id}" class="mdl-checkbox__input">
              <span class="mdl-checkbox__label">Grant</span>
            </label>

            <td>
              
              <a class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.additionalWorks[i].path}"><i class="material-icons">file_download</i></a>
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
        dialogUpdateAdd.querySelector('.close_add').addEventListener('click', function() {
            dialogUpdateAdd.close();
          });  

        dialogAccept.querySelector('.close_add').addEventListener('click', function() {
            dialogAccept.close();
          }); 


}

function createAdditionalGuest(data) {
    
    for (var i in data.additionalWorks) {
    if(data.additionalWorks[i].agreed === 1) {
      additionalDetail.innerHTML += 
      `<tr>
            <td class="mdl-data-table__cell--non-numeric"><span id="addText_${data.additionalWorks[i].id}">${data.additionalWorks[i].name}</span>
            
            </td>
            <td>
              
              <a class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.additionalWorks[i].path}"><i class="material-icons">file_download</i></a>
            </td>
          </tr>`;
    } else {
      additionalDetail.innerHTML += 
      `<tr>
            <td class="mdl-data-table__cell--non-numeric"><span <span id="addText_${data.additionalWorks[i].id}">${data.additionalWorks[i].name}</span>
            <br><br>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.additionalWorks[i].id}">
              <span class="mdl-checkbox__label">Grant</span>
            </label>

            <td>
              
              <a class="unduh_pdf mdl-button mdl-button--icon mdl-button--colored mdl-js-button" href="${data.additionalWorks[i].path}"><i class="material-icons">file_download</i></a>
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

var idURL = localStorage.getItem('detail-boQ_id');
var boqIdStore = localStorage.getItem('data-boq-id');
var boqId = parseInt(boqIdStore);
var url = 'api_poremo/public/api/v1/boq';
var urlAdd = 'api_poremo/public/api/v1/additional_work/project'
var upload_csvn = document.querySelector('.filesUpload');


var networkDataReceived = false;



fetch(urlAdd+'/'+idURL, {
  headers: {
    'Authorization': 'Bearer'+bearerToken
  },

}).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log('data additional_work', data);
  if(rolePartner === 'partner') {
    createAdditionalPartner(data);
  } else if(rolePartner === 'guest') {
    createAdditionalGuest(data);
  } else {
    createAdditional(data);
  }
})

function agreedAdd(id) {
  var agreedCheck = document.querySelector('#grant_'+id);
  var additionalId = localStorage.setItem('additionalId', id)

  if(agreedCheck.checked) {
    dialogAccept.showModal();
    agreedCheck.checked = false;
  }
}

var dialogAccept = document.querySelector('.accept-add');
var acceptBtn = document.querySelector('.accept-addYa');
if (! dialogAccept.showModal) {
    dialogPolyfill.registerDialog(dialogAccept);
}

acceptBtn.addEventListener('click', function () {
  var additionalId = localStorage.getItem('additionalId');
  var urlAddWork = 'api_poremo/public/api/v1/additional_work';
  var userId = localStorage.getItem('user_id');
  var userIdSend = new FormData();
  userIdSend.append('user_id', userId);

  fetch(urlAddWork+'/'+additionalId+'/accept', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },
    body: userIdSend
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Tambahan Pekerjaan Disetujui', data);
    window.location.href = 'boq.html';
  }).catch(function (err) {
    console.log('ada error', err);
  })
})
var additional_section = document.querySelector('#create_additional');
var tbodyAdditional = document.querySelector('#additional_detail');
var upload_csv = document.querySelector('.custom-file-upload');

if (rolePartner === 'partner') {
  fetch(url+'/'+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
      networkDataReceived = true;
      console.log('Dari Project', data);
      clearAllData('data-boq_works');
      clearDatas();
      additional_section.style.display = 'block';
      tbodyAdditional.style.display = 'contents';
      upload_csv.style.display = 'none';
      createOneListBoqPartner(data);
      var boqIdVal = document.querySelector('.boq-id').value;
      localStorage.setItem('data-boq-id', boqIdVal);
      
      document.getElementById("upload_boq").disabled = true;
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-boq_works', 'readwrite');
          var store = tx.objectStore('data-boq_works');
           return Promise.all(data.boq.boq_works.map(function(itemBoq) {
              console.log('Adding item: ', itemBoq);
              store.put(itemBoq);
              return tx.complete;
             })
            )
          });
  })
} else if(rolePartner === 'admin' || rolePartner === 'supervisor') {
  fetch(url+'/'+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
      networkDataReceived = true;
      console.log('Dari Project', data);
      clearAllData('data-boq_works');
      clearDatas();
      tbodyAdditional.style.display = 'contents';
      upload_csv.style.display = 'none'; 
      createOneListBoq(data);
      // var additional_section = document.querySelector('#create_additional');
      // var tbodyAdditional = document.querySelector('#additional_detail');
      var boqIdVal = document.querySelector('.boq-id').value;
      localStorage.setItem('data-boq-id', boqIdVal);
           
      document.getElementById("upload_boq").disabled = true;
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-boq_works', 'readwrite');
          var store = tx.objectStore('data-boq_works');
           return Promise.all(data.boq.boq_works.map(function(itemBoq) {
              console.log('Adding item: ', itemBoq);
              store.put(itemBoq);
              return tx.complete;
             })
            )
          });
  })
  // .catch(function (err) {
  //   var deleteBtnBoq = document.querySelector('#deleteBtn');
  //   deleteBtnBoq.parentNode.removeChild(deleteBtnBoq);
  //   var createBoqWorkItem = document.querySelector('#create-boq_WorkItem');
  //   createBoqWorkItem.parentNode.removeChild(createBoqWorkItem);
  // })
} else {
  fetch(url+'/'+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
      networkDataReceived = true;
      console.log('Dari Project', data);
      clearAllData('data-boq_works');
      clearDatas();
      tbodyAdditional.style.display = 'contents';
      upload_csv.style.display = 'none'; 
      createOneListBoqPartner(data);
      // var additional_section = document.querySelector('#create_additional');
      // var tbodyAdditional = document.querySelector('#additional_detail');
      var boqIdVal = document.querySelector('.boq-id').value;
      localStorage.setItem('data-boq-id', boqIdVal);
           
      document.getElementById("upload_boq").disabled = true;
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-boq_works', 'readwrite');
          var store = tx.objectStore('data-boq_works');
           return Promise.all(data.boq.boq_works.map(function(itemBoq) {
              console.log('Adding item: ', itemBoq);
              store.put(itemBoq);
              return tx.complete;
             })
            )
          });
  }).catch(function (err) {
    var deleteBtnBoq = document.querySelector('#deleteBtn');
    deleteBtnBoq.parentNode.removeChild(deleteBtnBoq);
    var createBoqWorkItem = document.querySelector('#create-boq_WorkItem');
    createBoqWorkItem.parentNode.removeChild(createBoqWorkItem);
  })
}

// .catch(function (err) {
//     if('indexedDB' in window) {
//       dbPromise.then(function(db) {
//           var tx = db.transaction('data-boq_works', 'readonly');
//           var store = tx.objectStore('data-boq_works');
//           var index = store.index('boq_id');
//           return index.getAll(boqId);
//         }).then(function (data) {
//             console.log(data);
//             for (var i = 0; i < data.length; i++) {
//               createOneCacheListBoq(data[i]);
//             }
//         })
//     }
// });

function editBoqWork(id) {
  localStorage.setItem('boq_workID', id);
  window.location.href = 'edit-BoqWork.html';
} //edit boq Work
function createBoqItem(id) {
  localStorage.setItem('boq_workID', id);
  window.location.href = 'create-BoqItem.html';
} //create sub sequence

function updateBoq(id) {
  localStorage.setItem('boq_item_id', id);
  window.location.href = 'edit_boq.html'; //edit boqitem sub sequence
}

function updateAdd(id) {
  localStorage.setItem('additional_id', id);
  var addText = document.querySelector('#addText_'+id).textContent;
  var addTitle = document.querySelector('#title');
  addTitle.value = addText;
  dialogUpdateAdd.showModal();

}



var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('data-boq-id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/boq';
        fetch(url+'/'+idDel+'/delete', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: userIdSend
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            return dbPromise
            .then(function (db) {
                var tx = db.transaction('data-boq_works', 'readwrite');
                var store = tx.objectStore('data-boq_works');
                var index = store.index('boq_id');
                return index.openCursor(idDelInt);
            })
            .then(function deleteList(cursor) {
                if (cursor) {
                	console.log(cursor);
                	cursor.delete();
                	return cursor.continue().then(deleteList);
                }
            })
            .then(function () {
              console.log('Data terhapus');
              window.location.href = 'boq.html';
            }).catch(function (err) {
            	console.log('ada error di delete cache', err);
            })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    });

var dialogUpdateAdd = document.querySelector('.update-additional');
var replyBtnId = document.querySelector('.update');
if (! dialogUpdateAdd.showModal) {
    dialogPolyfill.registerDialog(dialogUpdateAdd);
}

var dialogUpdate = document.querySelector('.dialog-Update');
var replyBtnUpdate = document.querySelector('.ok-Update');
if (! dialogUpdate.showModal) {
    dialogPolyfill.registerDialog(dialogUpdate);
}

replyBtnUpdate.addEventListener('click', function () {
  window.location.href = 'boq.html';
})

replyBtnId.addEventListener('click', function () {
        // var parentId = localStorage.getItem('reply-comment-reports_id'); //parent_id
        var addTitle = document.querySelector('#title');
        var urlAddId = localStorage.getItem('additional_id');
        var fileInput = document.querySelector('#fileds');
        var sendAddUpdate = new FormData();
        sendAddUpdate.append('name', addTitle.value);
        sendAddUpdate.append('user_id', userId);
        sendAddUpdate.append('rab', fileInput.files[0]);
        // var idEditInt = parseInt(idEdit);
        var urlAddUp = 'api_poremo/public/api/v1/additional_work';
        fetch(urlAddUp+'/'+urlAddId+'/update', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendAddUpdate
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Berhasil Di update', data);
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-reports', 'readwrite');
            //     var store = tx.objectStore('data-reports');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // }).then(function(){
              dialogUpdate.showModal();
            // }) 
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

var dialogFile = document.querySelector('.dialog-File');
var okBtnFile = document.querySelector('.ok-File');
if (! dialogFile.showModal) {
    dialogPolyfill.registerDialog(dialogFile);
}

okBtnFile.addEventListener('click', function () {
    dialogFile.close();
})

function uploadFile() {
  dialogFile.showModal();
}

function deleteBoqWork(id) {
  localStorage.setItem('delete_boq_work', id);
  dialogDelSub.showModal();
}

function deleteBoqItem(id) {
  localStorage.setItem('delete_boq_item', id);
  dialogDelSubSeq.showModal();
}


var dialogDelSub = document.querySelector('.dialog-DeleteSub');
var deleteBtnSub = document.querySelector('.delete-Sub');
if (! dialogDelSub.showModal) {
    dialogPolyfill.registerDialog(dialogDelSub);
}

deleteBtnSub.addEventListener('click', function () {
  var idDelWork = localStorage.getItem('delete_boq_work');
  fetch('api_poremo/public/api/v1/boq/work'+'/'+idDelWork+'/delete', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('data');
    window.location.href = 'boq.html';
  }).catch(function (err) {
    console.log(err)
  })
})

var dialogDelSubSeq = document.querySelector('.dialog-DeleteSubSeq');
var deleteBtnSubSeq = document.querySelector('.delete-SubSeq');
if (! dialogDelSubSeq.showModal) {
    dialogPolyfill.registerDialog(dialogDelSubSeq);
}

deleteBtnSubSeq.addEventListener('click', function () {
  var idDelItem = localStorage.getItem('delete_boq_item');
  fetch('api_poremo/public/api/v1/boq/item'+'/'+idDelItem+'/delete', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('data');
    window.location.href = 'boq.html';
  }).catch(function (err) {
    console.log(err)
  })
})

