var userData = document.querySelector('#body-user');
var urlUser = 'api_poremo/public/api/v1/user';
var roleUser = localStorage.getItem('user_role');
var userId = localStorage.getItem('user_id');
var bearerToken = localStorage.getItem('access_token');
var userIdSend = new FormData();
userIdSend.append('user_id', userId);

if(roleUser !== 'admin') {
	window.location.href = 'home.html';
} else if (roleUser === 'guest') {
  window.location.href = 'summary.html';
} else {
  console.log('Ini admin');
}

var registerBtn = document.querySelector('#users');
var summaryBtn = document.querySelector('#summary');
var partnersBtn = document.querySelector('#partners');
if(roleUser === 'admin') {
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

function createListUser(data) {
	for(var i in data.users) {
		userData.innerHTML +=
		`<tr>
			<td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric">${data.users[i].name} / ${data.users[i].role}</td>
			<td style="padding-right:0px;">
				<a href="#" style="min-width: 0;width: 40px;font-size: 12px;" onclick="editUsers(${data.users[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
				<i class="material-icons">border_color</i>
				</a>
				<a href="#" style="min-width: 0;width: 40px;font-size: 12px;" onclick="deleteUser(${data.users[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
				<i class="material-icons">delete_sweep</i>
				</a>
			</td>
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
                   "lengthMenu": "Display _MENU_ User/Page",
                   "zeroRecords": "Tidak ada User",
               },
              "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

      } );
  } );

	dialog.querySelector('.close').addEventListener('click', function() {
	  dialog.close();
	});
}

fetch(urlUser+'?user_id='+userId, {
  headers: {
    'Authorization': 'Bearer'+bearerToken
  },

}).then(function (response) {
	return response.json()
}).then(function (data) {
	console.log('Data User', data);
	createListUser(data);
})

function deleteUser(id) {
	localStorage.setItem('delete_user', id);
	dialog.showModal();
}

function editUsers(id) {
	localStorage.setItem('edit_user', id);
	window.location.href = 'edit_user.html';
}


var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function (event) {
        var idDel = localStorage.getItem('delete_user');
        var userId = localStorage.getItem('user_id');
        sendDataUser = new FormData();
        sendDataUser.append('user_id', userId);
        var userIdInt = parseInt(userId)
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/user';
        fetch(urlDel+'/'+idDel+'/delete', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendDataUser
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('data terhapus', data);
            window.location.href = 'users.html';
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-project', 'readwrite');
            //     var store = tx.objectStore('data-project');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // })
            // .then(function() {
            //     window.location.href = 'galeri.html';
            // })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

