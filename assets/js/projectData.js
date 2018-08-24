var projectData = document.querySelector('#only-one');
var bearerToken = localStorage.getItem('access_token');

function clearDatas() {
    while (projectData.hasChildNodes()) {
        projectData.removeChild(projectData.lastChild);
    }
}

function createListProject(data) {
    for(var j in data.projects) {
        var reference_number = data.projects[j].reference_number;
        var title = data.projects[j].title;
        var id = data.projects[j].id;
    
    var accordWrapper = document.createElement('section');
    accordWrapper.setAttribute('data-accordion', '');
    var headerProject = document.createElement('header');
    headerProject.setAttribute('data-control', '');
    headerProject.className = 'mdl-card__title mdl-color--primary mdl-color-text--primary-contrast';
    accordWrapper.appendChild(headerProject);
    var numProject = document.createElement('h4');
    numProject.className = 'title-sub__project mdl-card__title-text';
    numProject.textContent = reference_number;
    headerProject.appendChild(numProject);
    var titleProject = document.createElement('span');
    titleProject.className = 'no-sub__project';
    titleProject.textContent = title;
    numProject.appendChild(titleProject);
    var dataContent = document.createElement('div');
    dataContent.setAttribute('data-content', '');
    accordWrapper.appendChild(dataContent);
    var actionContent = document.createElement('div');
    actionContent.className = 'action mdl-card__actions mdl-card--border';
    dataContent.appendChild(actionContent);
    var btnDetail = document.createElement('a');
    btnDetail.href = 'detail_project.html';
    btnDetail.setAttribute('onclick', 'detailItem('+id+')');
    btnDetail.setAttribute('type', 'button');
    btnDetail.className = 'btn-aksi mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary';
    btnDetail.textContent = 'Lihat Detail';
    actionContent.appendChild(btnDetail);
    var sideBtn = document.createElement('div');
    sideBtn.className = 'btn-right';
    actionContent.appendChild(sideBtn);
    var btnEdit = document.createElement('a');
    btnEdit.href = 'edit_project.html';
    btnEdit.setAttribute('onclick', 'editItem('+id+')');
    btnEdit.setAttribute('type', 'button');
    btnEdit.className = 'btn-aksi mdl-button mdl-js-ripple-effect mdl-js-button';
    btnEdit.textContent = 'Edit';
    sideBtn.appendChild(btnEdit);
    var btnDelete = document.createElement('a');
    btnDelete.setAttribute('onclick', 'deleteItem('+id+')');
    btnDelete.setAttribute('type', 'button');
    btnDelete.className = 'btn-hapus mdl-button mdl-button--icon mdl-button--colored mdl-js-button';
    var iconDelete = document.createElement('i');
    iconDelete.className = 'material-icons';
    iconDelete.textContent = 'delete';
    btnDelete.appendChild(iconDelete);
    sideBtn.appendChild(btnDelete);
    componentHandler.upgradeElement(accordWrapper);
    projectData.appendChild(accordWrapper);

    }
    $(document).ready(function() {
        $('.only-one [data-accordion]').accordion();
    });

    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

function createListProjectCache(data) {
    
        var reference_number = data.reference_number;
        var title = data.title;
        var id = data.id;
    
    var accordWrapper = document.createElement('section');
    accordWrapper.setAttribute('data-accordion', '');
    var headerProject = document.createElement('header');
    headerProject.setAttribute('data-control', '');
    headerProject.className = 'mdl-card__title mdl-color--primary mdl-color-text--primary-contrast';
    accordWrapper.appendChild(headerProject);
    var numProject = document.createElement('h4');
    numProject.className = 'title-sub__project mdl-card__title-text';
    numProject.textContent = data.reference_number;
    headerProject.appendChild(numProject);
    var titleProject = document.createElement('span');
    titleProject.className = 'no-sub__project';
    titleProject.textContent = data.title;
    numProject.appendChild(titleProject);
    var dataContent = document.createElement('div');
    dataContent.setAttribute('data-content', '');
    accordWrapper.appendChild(dataContent);
    var actionContent = document.createElement('div');
    actionContent.className = 'action mdl-card__actions mdl-card--border';
    dataContent.appendChild(actionContent);
    var btnDetail = document.createElement('a');
    btnDetail.href = 'detail_project.html';
    btnDetail.setAttribute('onclick', 'detailItem('+data.id+')');
    btnDetail.setAttribute('type', 'button');
    btnDetail.className = 'btn-aksi mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary';
    btnDetail.textContent = 'Lihat Detail';
    actionContent.appendChild(btnDetail);
    var sideBtn = document.createElement('div');
    sideBtn.className = 'btn-right';
    actionContent.appendChild(sideBtn);
    var btnEdit = document.createElement('a');
    btnEdit.href = 'edit_project.html';
    btnEdit.setAttribute('onclick', 'editItem('+data.id+')');
    btnEdit.setAttribute('type', 'button');
    btnEdit.className = 'btn-aksi mdl-button mdl-js-ripple-effect mdl-js-button';
    btnEdit.textContent = 'Edit';
    sideBtn.appendChild(btnEdit);
    var btnDelete = document.createElement('a');
    btnDelete.setAttribute('onclick', 'deleteItem('+data.id+')');
    btnDelete.setAttribute('type', 'button');
    btnDelete.className = 'btn-hapus mdl-button mdl-button--icon mdl-button--colored mdl-js-button';
    var iconDelete = document.createElement('i');
    iconDelete.className = 'material-icons';
    iconDelete.textContent = 'delete';
    btnDelete.appendChild(iconDelete);
    sideBtn.appendChild(btnDelete);
    componentHandler.upgradeElement(accordWrapper);
    projectData.appendChild(accordWrapper);

    $(document).ready(function() {
        $('.only-one [data-accordion]').accordion();
    });

    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });


}
//https://jsfiddle.net/c36uwwmr/16/
// window.addEventListener('load', function () {
//     document.querySelector('.mdl-card__actions').addEventListener("click",changeDesc,true);
// });

// function changeDesc() {
//     for (var currentItem = event.target;
//     currentItem != event.currentTarget && currentItem != null;
//     currentItem = currentItem.parentElement) 
//     {
//      // console.log(currentItem); 
//         if (currentItem.classList.contains("galeri-data")) { 
//             var currentProject = currentItem.getElementsByClassName("title-project")[0].textContent;
//             currentProjects = parseInt(currentProject);
//             console.log(currentProjects);
//             dbPromise
//             .then(function (db) {
//                 var tx = db.transaction('data-project', 'readonly');
//                 var store = tx.objectStore('data-project');
//                 return store.get(currentProjects);
//             }).then(function (val) {
//                 console.log(val);                
//             });
//             break;
//         }
//     }
// }


//Update Data hasil gate dari web jika ada Internet atau cache jika offline
// function updateUI(data) {
//     clearCards();
//     for (var i = 0; i < data.length; i++) {
//         createCard(data[i]);
//     }
// }
//Get Data
var url = 'api_poremo/public/api/v1/project';
var networkDataReceived = false;
// var range = IDBKeyRange.lowerBound('fiscal_year');
//get data dari IndexedDB
if ('indexedDB' in window) {
   readAllData('data-project')
   // dbPromise.then(function(db) {
   //    var tx = db.transaction('data-project', 'readonly');
   //    var store = tx.objectStore('data-project');
   //    var index = store.index('fiscal_year');
   //    return index.getAll('2019')
   //  })
   .then(function (data) {
       if (!networkDataReceived) {
           console.log('From cache', data);
           console.log(data.id)
           clearDatas();
           for (var i = 0; i < data.length; i++) {
            createListProjectCache(data[i]);
          }
       }
   });
}

//Get Data dari Internet/Server
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer'+bearerToken
    }
})
  .then(function(res) {
    return res.json();
    }) 
    .then(function (data) {
        networkDataReceived = true;
        clearAllData('data-project'); 
        console.log('untuk write:', data);
        clearDatas();
        createListProject(data); 
        return dbPromise
        .then(function (db) {
        var tx = db.transaction('data-project', 'readwrite');
        var store = tx.objectStore('data-project');
         return Promise.all(data.projects.map(function(item) {
            console.log('Adding item: ', item);
            store.put(item);
            return tx.complete;
           })
          )
        });
    });  
    // return res;
  
var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

function detailItem(id) {
    localStorage.setItem('detail-project_id', id);
}
function editItem(id) {
    localStorage.setItem('edit-project_id', id);
}
function deleteItem(id) {
    localStorage.setItem('delete-project_id', id);
    dialog.showModal();
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('delete-project_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/project';
        fetch(url+'/'+idDel+'/delete', {
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
                var tx = db.transaction('data-project', 'readwrite');
                var store = tx.objectStore('data-project');
                store.delete(idDelInt);
                return tx.complete;
            })
            .then(function () {
                console.log('Item deleted!');
            })
            .then(function() {
                window.location.href = 'galeri.html';
            })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

// //Test Kirim/Post Data
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//         message: 'some message'
//     })
// })
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     console.log('from post', data);
// });

