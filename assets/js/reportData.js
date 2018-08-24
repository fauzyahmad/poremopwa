var form = document.querySelector('#create-report');
var userId = localStorage.getItem('user_id');
var userRole = localStorage.getItem('user_role');
var userIdSend = new FormData();
userIdSend.append('user_id', userId);
var bearerToken = localStorage.getItem('access_token');

if(userRole === 'guest') {
  var submitButtonReport = document.querySelector('#create-report');
  submitButtonReport.parentNode.removeChild(submitButtonReport);
}

var dialogCreate = document.querySelector('.dialog-create');
var okBtnCreate = document.querySelector('.ok-create');
if (! dialogCreate.showModal) {
    dialogPolyfill.registerDialog(dialogCreate);
}

okBtnCreate.addEventListener('click', function () {
    window.location.href = 'report.html';
})

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var projectId = localStorage.getItem('detail-report_id');
    var sendReport = new FormData();
    sendReport.append('user_id', userId);
    sendReport.append('project_id', projectId);
    
    var url = 'api_poremo/public/api/v1/report';
    fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendReport
    }).then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        console.log (data);
        dialogCreate.showModal();
    }).catch(function (err) {
        console.log('Ada error', err);
    });
});
var titleSubProject = document.querySelector('#titleSub');
titleSubProject.textContent = localStorage.getItem('titleProject');

var reportData = document.querySelector('#body-report');
var reportDataHtml = '';
var noData = document.querySelector('#no-data');

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
    while (reportData.hasChildNodes()) {
        reportData.removeChild(reportData.lastChild);
    }
}

function createListReport(data) {
  for (var i in data.reports) {
    if (data.reports[i].revision_right === 1) {
      reportData.innerHTML += `<tr>
                                <td class="mdl-data-table__cell--non-numeric">
                                <span>${data.reports[i].date}</span><br><br>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.reports[i].id}">
                                  <input onchange="grantRevision(${data.reports[i].id})" type="checkbox" checked id="grant_${data.reports[i].id}" class="mdl-checkbox__input">
                                  <span class="mdl-checkbox__label">Grant</span>
                                </label>
                                </td>
                                <td>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.reports[i].id})"><i class="material-icons">pageview</i></a>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportDelete(${data.reports[i].id})"><i class="material-icons">delete_sweep</i></a>
                                </td>
                              </tr>`;
    } else {
      reportData.innerHTML += `<tr>
                                <td class="mdl-data-table__cell--non-numeric">
                                <span>${data.reports[i].date}</span><br><br>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.reports[i].id}">
                                  <input onchange="grantRevision(${data.reports[i].id})" type="checkbox" id="grant_${data.reports[i].id}" class="mdl-checkbox__input">
                                  <span class="mdl-checkbox__label">Grant</span>
                                </label>
                                </td>
                                <td>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.reports[i].id})"><i class="material-icons">pageview</i></a>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportDelete(${data.reports[i].id})"><i class="material-icons">delete_sweep</i></a>
                                </td>
                              </tr>`;
    }
    
  }
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createListReportSupervisor(data) {
  for (var i in data.reports) {
    if (data.reports[i].revision_right === 1) {
      reportData.innerHTML += `<tr>
                                <td class="mdl-data-table__cell--non-numeric">
                                <span>${data.reports[i].date}</span><br><br>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.reports[i].id}">
                                  <input onchange="grantRevision(${data.reports[i].id})" type="checkbox" checked id="grant_${data.reports[i].id}" class="mdl-checkbox__input">
                                  <span class="mdl-checkbox__label">Grant</span>
                                </label>
                                </td>
                                <td>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.reports[i].id})">S<i class="material-icons">pageview</i>/a>
                                </td>
                              </tr>`;
    } else {
      reportData.innerHTML += `<tr>
                                <td class="mdl-data-table__cell--non-numeric">
                                <span>${data.reports[i].date}</span><br><br>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.reports[i].id}">
                                  <input onchange="grantRevision(${data.reports[i].id})" type="checkbox" id="grant_${data.reports[i].id}" class="mdl-checkbox__input">
                                  <span class="mdl-checkbox__label">Grant</span>
                                </label>
                                </td>
                                <td>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.reports[i].id})"><i class="material-icons">pageview</i></a>
                                </td>
                              </tr>`;
    }
    
  }
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createListReportPartner(data) {
  for (var i in data.reports) {
    reportData.innerHTML += `<tr>
                              <td class="mdl-data-table__cell--non-numeric">${data.reports[i].date}</td>
                              <td>
                                <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.reports[i].id})"><i class="material-icons">pageview</i></a>
                              </td>
                            </tr>`;
  }
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createListCacheReport(data) {
    if(data.revision_right === 1) {
     reportData.innerHTML += `<tr>
                               <td class="mdl-data-table__cell--non-numeric">
                               <span>${data.reports[i].date}</span><br><br>
                               <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.id}">
                                 <input onchange="grantRevision(${data.id})" type="checkbox" checked id="grant_${data.id}" class="mdl-checkbox__input">
                                 <span class="mdl-checkbox__label">Grant</span>
                               </label>
                               </td>
                               <td>
                                 <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.id})"><i class="material-icons"></i>pageview</a>
                                 <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportDelete(${data.id})"><i class="material-icons">delete_sweep</i></a>
                               </td>
                             </tr>`;
    } else {
      reportData.innerHTML += `<tr>
                                <td class="mdl-data-table__cell--non-numeric">
                                <span>${data.reports[i].date}</span><br><br>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.id}">
                                  <input onchange="grantRevision(${data.id})" type="checkbox" id="grant_${data.id}" class="mdl-checkbox__input">
                                  <span class="mdl-checkbox__label">Grant</span>
                                </label>
                                </td>
                                <td>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.id})"><i class="material-icons"></i>pageview</a>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportDelete(${data.id})"><i class="material-icons">delete_sweep</i></a>
                                </td>
                              </tr>`;
    }
   
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createListCacheReportSupervisor(data) {
    if(data.revision_right === 1) {
     reportData.innerHTML += `<tr>
                               <td class="mdl-data-table__cell--non-numeric">
                               <span>${data.reports[i].date}</span><br><br>
                               <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.id}">
                                 <input onchange="grantRevision(${data.id})" type="checkbox" checked id="grant_${data.id}" class="mdl-checkbox__input">
                                 <span class="mdl-checkbox__label">Grant</span>
                               </label>
                               </td>
                               <td>
                                 <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button onclick="detailReportUpdate(${data.id})"><i class="material-icons">pageview</i></a>
                                
                               </td>
                             </tr>`;
    } else {
      reportData.innerHTML += `<tr>
                                <td class="mdl-data-table__cell--non-numeric">
                                <span>${data.reports[i].date}</span><br><br>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="grant_${data.id}">
                                  <input onchange="grantRevision(${data.id})" type="checkbox" id="grant_${data.id}" class="mdl-checkbox__input">
                                  <span class="mdl-checkbox__label">Grant</span>
                                </label>
                                </td>
                                <td>
                                  <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.id})"><i class="material-icons">pageview</i></a>
                                  
                                </td>
                              </tr>`;
    }
   
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createListCacheReportPartner(data) {
  
    reportData.innerHTML += `<tr>
                              <td class="mdl-data-table__cell--non-numeric">${data.reports[i].date}</td>
                              <td>
                                <a style="font-size:28px;" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button" onclick="detailReportUpdate(${data.id})"><i class="material-icons">pageview</i></a>
                              </td>
                            </tr>`;
  
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createNoData() {
  noData.innerHTML = 
  `<div class="mdl-card__title">
      <h4 class="title-boq mdl-card__title-text"> Terjadi kesalahan/Tidak ada Data </h4>
    </div>`;
}
var projectIdCache = localStorage.getItem('detail-project_id');
var projectIdInt = parseInt(projectIdCache);
var networkDataReceived = false;
var roleUser = localStorage.getItem('user_role');

if('indexedDB' in window) {
  if (roleUser === 'partner' || roleUser === 'guest') {
    dbPromise.then(function(db) {
        var tx = db.transaction('data-reports', 'readonly');
        var store = tx.objectStore('data-reports');
        var index = store.index('project_id');
        return index.getAll(projectIdInt);
      })
      .then(function (data) {
        if(!networkDataReceived) {
          console.log('from cache', data);
          clearDatas();
          for (var i = 0; i < data.length; i++) {
            createListCacheReportPartner(data[i]);
          }
        }
      })
  } else if(roleUser === 'supervisor') {
    dbPromise.then(function(db) {
        var tx = db.transaction('data-reports', 'readonly');
        var store = tx.objectStore('data-reports');
        var index = store.index('project_id');
        return index.getAll(projectIdInt);
      })
      .then(function (data) {
        if(!networkDataReceived) {
          console.log('from cache', data);
          clearDatas();
          for (var i = 0; i < data.length; i++) {
            createListCacheReportSupervisor(data[i]);
          }
        }
      })
  } else {
    dbPromise.then(function(db) {
        var tx = db.transaction('data-reports', 'readonly');
        var store = tx.objectStore('data-reports');
        var index = store.index('project_id');
        return index.getAll(projectIdInt);
      })
      .then(function (data) {
        if(!networkDataReceived) {
          console.log('from cache', data);
          clearDatas();
          for (var i = 0; i < data.length; i++) {
            createListCacheReport(data[i]);
          }
        }
      })
  }
  
}

var idURL = localStorage.getItem('detail-project_id');
var url = 'api_poremo/public/api/v1/report';


if(roleUser === 'partner' || roleUser === 'guest') {
  fetch(url+'?project_id='+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
    networkDataReceived = true;
      console.log('Dari Project web', data);
      clearAllData('data-reports');
      clearDatas();
      createListReportPartner(data);
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-reports', 'readwrite');
          var store = tx.objectStore('data-reports');
           return Promise.all(data.reports.map(function(itemReport) {
              console.log('Adding item: ', itemReport);
              store.put(itemReport);
              return tx.complete;
             })
            )
          });
  }).catch(function (err) {
    console.log('ada error', err);
      createNoData();
  })
} else if (roleUser === 'supervisor') {
  fetch(url+'?project_id='+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
    networkDataReceived = true;
      console.log('Dari Project web', data);
      clearAllData('data-reports');
      clearDatas();
      createListReportSupervisor(data);
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-reports', 'readwrite');
          var store = tx.objectStore('data-reports');
           return Promise.all(data.reports.map(function(itemReport) {
              console.log('Adding item: ', itemReport);
              store.put(itemReport);
              return tx.complete;
             })
            )
          });
  }).catch(function (err) {
    console.log('ada error', err);
      createNoData();
  })

} else {
  fetch(url+'?project_id='+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
    networkDataReceived = true;
      console.log('Dari Project web', data);
      clearAllData('data-reports');
      clearDatas();
      createListReport(data);
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-reports', 'readwrite');
          var store = tx.objectStore('data-reports');
           return Promise.all(data.reports.map(function(itemReport) {
              console.log('Adding item: ', itemReport);
              store.put(itemReport);
              return tx.complete;
             })
            )
          });
  }).catch(function (err) {
    console.log('ada error', err);
      createNoData();
  })
}
  




var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('delete-reports_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/report';
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
                var tx = db.transaction('data-reports', 'readwrite');
                var store = tx.objectStore('data-reports');
                store.delete(idDelInt);
                return tx.complete;
            })
            .then(function () {
                console.log('Item deleted!');
            }).then(function(){
              window.location.href = 'report.html';
            })
            
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

function detailReportUpdate(id) {
	localStorage.setItem('detail-report_update', id);
	window.location.href = 'update_report.html';
}

function detailReportDelete(id) {
  localStorage.setItem('delete-reports_id', id);
  dialog.showModal();
}

var dialogGrant = document.querySelector('.dialog-Grant');
var okBtnGrant = document.querySelector('.ok-Grant');
if (! dialogGrant.showModal) {
    dialogPolyfill.registerDialog(dialogGrant);
}

okBtnGrant.addEventListener('click', function () {
    dialogGrant.close();
})

var dialogRevoke = document.querySelector('.dialog-Revoke');
var okBtnRevoke = document.querySelector('.ok-Revoke');
if (! dialogRevoke.showModal) {
    dialogPolyfill.registerDialog(dialogRevoke);
}

okBtnRevoke.addEventListener('click', function () {
    dialogRevoke.close();
})

function grantRevision(id) {
    var grantCheck = document.querySelector('#grant_'+id);
    var reportId = id;
    var url = 'api_poremo/public/api/v1/report';
    var urlGrant = '/revision/grant';
    var urlRevoke = '/revision/revoke';

    if (grantCheck.checked) {
      fetch(url+'/'+reportId+urlGrant, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: userIdSend
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        dialogGrant.showModal();
      }).catch(function (err) {
        console.log('Ada error', err);
      })
    } else {
      fetch(url+'/'+reportId+urlRevoke, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: userIdSend
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        dialogRevoke.showModal();
      }).catch(function (err) {
        console.log('Ada error', err);
      })
    }
  }	

var projectId = localStorage.getItem('detail-report_id');      
fetch('api_poremo/public/api/v1/report/project/'+projectId, {
	headers: {
		Authorization: 'Bearer'+bearerToken
	}
}).then(function (response) {
	return response.json();
}).then(function (data) {
	console.log('Rekening Koran', data);
})
      
// var dialog = document.querySelector('dialog');
// var progressPersen = document.querySelector('#persentase-progress');
//     var showDialogButton = document.querySelectorAll('.show-dialog');
    
//     var percentageShow = document.querySelector('.percentage-show');
//     var lihatPersen = percentageShow.text;
//     if (! dialog.showModal) {
//       dialogPolyfill.registerDialog(dialog);
//     }

//     function update(id){
//     	var percentProject = document.querySelector('#percentage');
// 		var persentase = $('#persentase_item_' + id).html();
// 		console.log(persentase);
// 		percentProject.value = persentase;
// 		dialog.showModal();
// 		progressPersen.classList.add('is-focused');
// 		progressPersen.classList.add('is-dirty');
// 	}

    