var editBoq = document.querySelector('#edit_boq');
var form = document.querySelector('#form-edit_user'); 
var roleUser = localStorage.getItem('user_role');
var roleAkunDiv = document.querySelector('#roleAkun');
var roleAkun = document.querySelector('#role');
var bearerToken = localStorage.getItem('access_token');

function getUserOne(data) {
	var emailDiv = document.querySelector("#emailAkun");
	var namaDiv = document.querySelector("#nameAkun");
	var roleDiv = document.querySelector("#roleAkun");

	var emailAkun = document.querySelector("#email");
	var namaAkun = document.querySelector("#name");
	var roleAkun = document.querySelector("#role");
	emailAkun.value = data.user.email;
	namaAkun.value = data.user.name;
	roleAkun.value = data.user.role;

	emailDiv.classList.add('is-focused', 'is-dirty');
	namaDiv.classList.add('is-focused', 'is-dirty');
	roleDiv.classList.add('is-focused', 'is-dirty');	  	
}

var resetPass = document.querySelector('#reset-pass');
var roleUsers = localStorage.getItem('roleUser');
if(roleUser === 'partner') {
	resetPass.setAttribute('style', 'display:none;');
}
if(roleUser === 'supervisor') {
	resetPass.setAttribute('style', 'display:none;');
}
if(roleUser === 'guest') {
    resetPass.setAttribute('style', 'display:none;');
}

resetPass.addEventListener('click', function(event) {
	dialogReset.showModal();
})

var dialogReset = document.querySelector('.dialog-reset');
var resetBtnId = document.querySelector('.delete');
if (! dialogReset.showModal) {
    dialogPolyfill.registerDialog(dialogReset);
}

dialogReset.querySelector('.close-reset').addEventListener('click', function() {
    dialogReset.close();
 });

resetBtnId.addEventListener('click', function () {
        var idReset = localStorage.getItem('edit_user');
        var userId = localStorage.getItem('user_id');
        var sendUserID = new FormData();
        sendUserID.append('user_id', userId);
        var urlReset = 'api_poremo/public/api/v1/user';
        fetch(urlReset+'/'+idReset+'/password/reset', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendUserID
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Berhasil menreset user password', data);
            window.location.href = 'index.html';
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



var idURL = localStorage.getItem('edit_user');
var url = 'api_poremo/public/api/v1/user';
fetch(url+'/'+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

}).then(function (response) {
	return response.json();
}).then(function (data) {
	// script.innerHTML = `<script src="assets/js/material.min.js"></script>`;
	console.log('data Boq', data);
	getUserOne(data);
})

if (roleUser === 'partner') {
	roleAkunDiv.setAttribute('style', 'display:none;');
    roleAkun.value = 'partner';
}

if (roleUser === 'supervisor') {
	roleAkunDiv.setAttribute('style', 'display:none;');
    roleAkun.value = 'supervisor';
}

if (roleUser === 'guest') {
    roleAkunDiv.setAttribute('style', 'display:none;');
    roleAkun.value = 'guest';
}
// form.addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	var boqId = localStorage.getItem('data-boq-id');

// })

var dialogEdit = document.querySelector('.dialog-edit');
var okBtnEdit = document.querySelector('.ok-edit');
if (! dialogEdit.showModal) {
    dialogPolyfill.registerDialog(dialogEdit);
}

okBtnEdit.addEventListener('click', function () {
    window.location.href = 'users.html';
})

var dialogFailed = document.querySelector('.dialog-failed');
var okBtnFailed = document.querySelector('.ok-failed');
if (! dialogFailed.showModal) {
    dialogPolyfill.registerDialog(dialogFailed);
}

okBtnFailed.addEventListener('click', function () {
    dialogFailed.close();
})

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var emailAkun = document.querySelector("#email");
	var namaAkun = document.querySelector("#name");
	var roleAkun = document.querySelector("#role");

	var editId = localStorage.getItem('boq_item_id');
	var userId = localStorage.getItem('user_id');
	var userIdInt = parseInt(userId);

    if(emailAkun.value.trim() === '' || namaAkun.value.trim() === '' || roleAkun.value.trim() === '' )  {
        dialogFailed.showModal();
        return;
    }
	fetch('api_poremo/public/api/v1/user/'+idURL+'/update', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
        },
        body: JSON.stringify({
        	name: namaAkun.value,
        	email: emailAkun.value,
        	role: roleAkun.value,
        	user_id: userIdInt

        })
	   }).then(function (response) {
        	console.log(response.status);
        	return response.json();
        }).then(function (data) {
        	console.log(data);
        	dialogEdit.showModal();
        }).catch(function(err) {
            console.log(err);
            
        })
})