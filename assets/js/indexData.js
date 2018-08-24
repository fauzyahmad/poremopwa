
var projectData = document.querySelector('#body-user');

var userId = localStorage.getItem('user_id');
var roleAdmin = localStorage.getItem ('user_role');
var registerBtn = document.querySelector('#users');
var summaryBtn = document.querySelector('#summary');
var partnersBtn = document.querySelector('#partners');
var bearerToken = localStorage.getItem('access_token');

if(!userId) {
  window.location.href = 'index.html'; 
}

if(roleAdmin === 'guest') {
  window.location.href = 'summary.html';
}

if(roleAdmin === 'admin') {
  registerBtn.removeAttribute('style');
  registerBtn.addEventListener('click', function (event) {
    window.location.href = 'users.html'
  })
  summaryBtn.removeAttribute('style');
  summaryBtn.addEventListener('click', function (event) {
    window.location.href = 'summary.html'
  })
  partnersBtn.removeAttribute('style');
  partnersBtn.addEventListener('click', function (event) {
    window.location.href = 'partners.html'
  })
}
var userName = document.querySelector('#user-nav__style');
userName.innerHTML = 'Welcome, ' + localStorage.getItem('user_name');

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

var telkomProject = document.querySelector('#telkomProject');
var telkomselProject = document.querySelector('#telkomselProject');
var nonTelkom = document.querySelector('#nonTelkom');

telkomProject.addEventListener('click', function (event) {
  localStorage.setItem('institution_codeProject', '1'); 
})

telkomselProject.addEventListener('click', function (event) {
  localStorage.setItem('institution_codeProject', '3'); 
})

nonTelkom.addEventListener('click', function (event) {
  localStorage.setItem('institution_codeProject', '4'); 
})
// var networkDataReceived = false;
// showAll.addEventListener('click', function (event) {
  
// })

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     var titleProject = document.querySelector('#title').value;

//     if(titleProject === '') {
//         alert('Masukkan nama Project Terlebih dahulu');
//         return
//     }
//     var retreiveData = new FormData(); 
//     retreiveData.append('keyword', titleProject)
//     clearDatas();

//     fetch('api_poremo/public/api/v1/project/search', {
//         method: 'POST',
//         body: retreiveData
//     }).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//       if(rolePartner === 'partner') {
//         createListProjectPartner(data);
//       }else {
//         createListProject(data);
//       }
//         console.log('data telah selesai', data);

//     }).catch(function (err) {
//         console.log(err);
//     })
// });

var url = 'api_poremo/public/api/v1/project'; //ini url supervisor dan admin
// var url2 = 'api_poremo/public/api/v1/project'
var rolePartner = localStorage.getItem('user_role');
var partnerId = localStorage.getItem('partner_id');

console.log(rolePartner);
if(rolePartner === 'partner') {

  var tab1 = document.querySelector('#tab-1');
  var fixedTab1 = document.querySelector('#fixed-tab-1');
  tab1.parentNode.removeChild(tab1);
  fixedTab1.parentNode.removeChild(fixedTab1);
  var tab2 = document.querySelector('#tab-2');
  var fixedTab2 = document.querySelector('#fixed-tab-2');
  tab2.href = '#fixed-tab-1';
  tab2.classList.add('is-active');
  fixedTab2.id = 'fixed-tab-1';
  fixedTab2.classList.add('is-active');


  fetch(url+'/partner'+'/'+partnerId, {
    method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer' + bearerToken
        }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // networkDataReceived = true;
    clearAllData('data-project');
    console.log('untuk write partner:', data);
    clearDatas();
    createListProjectPartner(data);
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
  }).catch(function (err) {
    if ('indexedDB' in window) {
       readAllData('data-project')
       .then(function (data) {
             console.log('From cache Partner', data);
             // console.log(data.id)
             // clearDatas();
             for (var i = 0; i < data.length; i++) {
              createListProjectCachePartner(data[i]);
            }         
               
       });
    }
  })
} else {
  if(rolePartner === 'supervisor'){
    // var tab1 = document.querySelector('#tab-1');
    // var fixedTab1 = document.querySelector('#fixed-tab-1');
    // tab1.parentNode.removeChild(tab1);
    // fixedTab1.parentNode.removeChild(fixedTab1);
    // var tab2 = document.querySelector('#tab-2');
    // var fixedTab2 = document.querySelector('#fixed-tab-2');
    // tab2.href = '#fixed-tab-1';
    // tab2.classList.add('is-active');
    // fixedTab2.id = 'fixed-tab-1';
    // fixedTab2.classList.add('is-active');

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer' + bearerToken
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
            createListProjectSupervisor(data);
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
        }).catch(function (err) {
          if ('indexedDB' in window) {
             readAllData('data-project')
             .then(function (data) {
                   console.log('From cache', data);
                   for (var i = 0; i < data.length; i++) {
                    createListProjectCacheSupervisor(data[i]);
                  }         
                     
             });
          }
        })
  }
  else {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer' + bearerToken
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
        }).catch(function (err) {
          if ('indexedDB' in window) {
             readAllData('data-project')
             .then(function (data) {
                   console.log('From cache', data);
                   for (var i = 0; i < data.length; i++) {
                    createListProjectCache(data[i]);
                  }         
                     
             });
          }
        })
  }
  
} 



    function clearDatas() {
        while (projectData.hasChildNodes()) {
            projectData.removeChild(projectData.lastChild);
        }
    }

   function createListProject(data) {
       for(var j in data.projects) {
           projectData.innerHTML +=
           `<tr>
            <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric"><a class="detail-project" href="javascript:detailItem(${data.projects[j].id});">(${data.projects[j].reference_number}) - ${data.projects[j].title}</a></td>
            
            <td>${data.projects[j].fiscal_year}</td>
           </tr>`;

       }
       $(document).ready(function() {
           $('#example').DataTable( {
               responsive: {
                       details: false
                   },
                "language": {
                        "search": "_INPUT_",
                        "searchPlaceholder": "Search...",
                        "lengthMenu": "Display _MENU_ Project/Page",
                        "zeroRecords": "Tidak ada project",
                    },
                   "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

           } );
       } );

       dialogAccept.querySelector('.close_accept').addEventListener('click', function() {
           dialogAccept.close();
         }); 

       
   }

   function createListProjectSupervisor(data) {
       for(var j in data.projects) {
           projectData.innerHTML +=
           `<tr>
            <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric"><a class="detail-project" href="javascript:detailItem(${data.projects[j].id});">(${data.projects[j].reference_number}) - ${data.projects[j].title}</a></td>
            
            <td>${data.projects[j].fiscal_year}</td>
           </tr>`;

       }
       $(document).ready(function() {
           $('#example').DataTable( {
               responsive: {
                       details: false
                   },
              "language": {
                        "search": "_INPUT_",
                        "searchPlaceholder": "Search...",
                        "lengthMenu": "Display _MENU_ Project/Page",
                        "zeroRecords": "Tidak ada project",
                    },
                   "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

           } );
       } );
       dialogAccept.querySelector('.close_accept').addEventListener('click', function() {
           dialogAccept.close();
         }); 

       
   }


   function createListProjectPartner(data) {
       for(var j in data.projects) {
        if(data.projects[j].partner_id === null) {
          projectData.innerHTML +=
          `<tr>
           <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric">(${data.projects[j].reference_number}) - ${data.projects[j].title}
           <br><br>
           <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="accept_${data.projects[j].id}">
             <input onchange="acceptProject(${data.projects[j].id})" type="checkbox" id="accept_${data.projects[j].id}" class="mdl-checkbox__input">
             <span style="font-size:12px;" class="mdl-checkbox__label">Accept</span>
           </label>
           <input style="display:none;" id="duration_${data.projects[j].id}" type="text" value="${data.projects[j].duration}">
           </td>
           <td>${data.projects[j].fiscal_year}</td>
          </tr>`;
        } else {
           projectData.innerHTML +=
          `<tr>
           <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric"><a class="detail-project" 
           href="javascript:detailItem(${data.projects[j].id});">(${data.projects[j].reference_number}) - ${data.projects[j].title}</a></td>
           
           <td>${data.projects[j].fiscal_year}</td>
          </tr>`;
        }
            

       }
       $(document).ready(function() {
           $('#example').DataTable( {
               responsive: {
                       details: false
                   },
              "language": {
                        "search": "_INPUT_",
                        "searchPlaceholder": "Search...",
                        "lengthMenu": "Display _MENU_ Project/Page",
                        "zeroRecords": "Tidak ada project",
                    },
                   "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

           } );
       } );
       dialogAccept.querySelector('.close_accept').addEventListener('click', function() {
           dialogAccept.close();
         }); 
   }

   function createListProjectCache(data) {
       
        projectData.innerHTML +=
       `<tr>
        <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric"><a class="detail-project" href="javascript:detailItem(${data.id});">(${data.reference_number}) - ${data.title}</a></td>
        
        <td>${data.fiscal_year}</td>
       </tr>`;
           
      $(document).ready(function() {
          $('#example').DataTable( {
              responsive: {
                      details: false
                  },
              "language": {
                        "search": "_INPUT_",
                        "searchPlaceholder": "Search...",
                        "lengthMenu": "Display _MENU_ Project/Page",
                        "zeroRecords": "Tidak ada project",
                    },
                  "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

          } );
      } );
      
       


   }

   function createListProjectCacheSupervisor(data) {
       
        projectData.innerHTML +=
       `<tr>
        <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric"><a class="detail-project" href="javascript:detailItem(${data.id});">(${data.reference_number}) - ${data.title}</a></td>
        
        <td>${data.fiscal_year}</td>
       </tr>`;
           
      $(document).ready(function() {
          $('#example').DataTable( {
              responsive: {
                      details: false
                  },
              "language": {
                        "search": "_INPUT_",
                        "searchPlaceholder": "Search...",
                        "lengthMenu": "Display _MENU_ Project/Page",
                        "zeroRecords": "Tidak ada project",
                    },
                  "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

          } );
      } );
       


   }

   function createListProjectCachePartner(data) {
       if(data.partner_id === null) {
         projectData.innerHTML +=
        `<tr>
         <td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric">(${data.reference_number}) - ${data.title}
         <br><br>
         <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="accept_${data.id}">
             <input onchange="acceptProject(${data.id})" type="checkbox" id="accept_${data.id}" class="mdl-checkbox__input">
             <span style="font-size:12px;" class="mdl-checkbox__label">Accept</span>
           </label>
           <input style="display:none;" id="duration_${data.id}" type="text" value="${data.duration}">
         </td>
         <td>
           ${data.fiscal_year}
         </td>
        </tr>`;
       } else {
         projectData.innerHTML +=
        `<tr>
         <td class="mdl-data-table__cell--non-numeric"><a class="detail-project" href="javascript:detailItem(${data.id});">(${data.reference_number}) - ${data.title}</a></td>
         <td>${data.fiscal_year}</td>
        </tr>`;
       }
        
           
      $(document).ready(function() {
          $('#example').DataTable( {
              responsive: {
                      details: false
                  },
              "language": {
                        "search": "_INPUT_",
                        "searchPlaceholder": "Search...",
                        "lengthMenu": "Display _MENU_ Project/Page",
                        "zeroRecords": "Tidak ada project",
                    },
                  "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

          } );
      } );

       dialogAccept.querySelector('.close_accept').addEventListener('click', function() {
           dialogAccept.close();
         }); 


   }

    function detailItem(id) {
        localStorage.setItem('detail-project_id', id);
        window.location.href = 'detail_project.html';
    }
    // var detailProjet = document.querySelector('.detail-project');
    // detailProjet.addEventListener('click', function (event) {
    //   localStorage.setItem('detail-project_id', id);
    // })

    function acceptProject(id) {
      
      var projectId = localStorage.setItem('project_accept', id);
      var deadlineProject = document.querySelector('#duration_'+id);
      var deadline = deadlineProject.value
      var deadlineInt = parseInt(deadline)
      var acceptProject = document.querySelector('#accept_'+id);
      var someDate = new Date();
      var numberOfDaysToAdd = deadlineInt;
      someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

      var dd = someDate.getDate();
      var mm = someDate.getMonth() + 1;
      var yyyy = someDate.getFullYear();

      if(dd<10) 
           {
               dd='0'+dd;
           } 

           if(mm<10) 
           {
               mm='0'+mm;
           } 
      var someFormattedDate = yyyy + '-'+ mm + '-'+ dd;
      var deadlineProjectAccept = localStorage.setItem('deadline', someFormattedDate);
      if (acceptProject.checked) {
        dialogAccept.showModal();
        acceptProject.checked = false;
      }

    }

    var dialogAccept = document.querySelector('.accept-project');
    var acceptBtn = document.querySelector('.accept-projectYa');
    if (! dialogAccept.showModal) {
        dialogPolyfill.registerDialog(dialogAccept);
    }

    acceptBtn.addEventListener('click', function () {
      var userId = localStorage.getItem('user_id');
      var projectId = localStorage.getItem('project_accept');
      var urlAccept = 'api_poremo/public/api/v1/project/'+projectId+'/accept'
      var deadlineProjectAccept = localStorage.getItem('deadline');
      var sendDataAccept = new FormData();
      sendDataAccept.append('user_id', userId);
      sendDataAccept.append('project_id', projectId);
      sendDataAccept.append('deadline', deadlineProjectAccept);

      fetch(urlAccept, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendDataAccept
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log('Accept Berhasil', data);
        window.location.href= 'home.html';
      }).catch(function (err) {
        console.log('Accept ada error', err);
      })
    })




    
