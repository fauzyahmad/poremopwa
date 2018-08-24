
var form = document.querySelector('#form-edit_password'); 
var roleUser = localStorage.getItem('user_role');
var roleAkunDiv = document.querySelector('#roleAkun');
var roleAkun = document.querySelector('#role');
var bearerToken = localStorage.getItem('access_token');

function getUserOne(data) {
	var emailDiv = document.querySelector("#emailAkun");
	var emailAkun = document.querySelector("#email");
	emailAkun.value = data.user.email;
	emailDiv.classList.add('is-focused', 'is-dirty');	  	
}

// var resetPass = document.querySelector('#reset-pass');
// var roleUsers = localStorage.getItem('roleUser');
// if(roleUsers === 'partner') {
// 	resetPass.setAttribute('style', 'display:none;');
// }
// if(roleUsers === 'supervisor') {
// 	resetPass.setAttribute('style', 'display:none;');
// }

// resetPass.addEventListener('click', function(event) {
// 	dialog.showModal();
// })

// var dialog = document.querySelector('dialog');
// var resetBtnId = document.querySelector('.delete');
// if (! dialog.showModal) {
//     dialogPolyfill.registerDialog(dialog);
// }

// resetBtnId.addEventListener('click', function () {
//         var idReset = localStorage.getItem('edit_user');
//         var userId = localStorage.getItem('user_id');
//         var sendUserID = new FormData();
//         sendUserID.append('user_id', userId);
//         var urlReset = 'api_poremo/public/api/v1/user';
//         fetch(urlReset+'/'+idReset+'/password/reset', {
//             method: 'POST',
//             body: sendUserID
//         }).then(function (response) {
//             return response.json();
//         }).then(function (data) {
//             console.log('Berhasil menreset user password', data);
//             // return dbPromise
//             // .then(function (db) {
//             //     var tx = db.transaction('data-shop-drawing', 'readwrite');
//             //     var store = tx.objectStore('data-shop-drawing');
//             //     store.delete(idDelInt);
//             //     return tx.complete;
//             // })
//             // .then(function () {
//             //     console.log('Item deleted!');
//             // })
//             // .then(function () {
//             //   window.location.href = 'shop-drawing.html';
//             //   // console.log('data-dihapus');
//             // })
//         }).catch(function (err) {
//             console.log('Ada error', err);
//         })
//     })
// dialog.querySelector('.close').addEventListener('click', function() {
//     dialog.close();
//  });


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

// if (roleUser === 'partner') {
// 	roleAkunDiv.setAttribute('style', 'display:none;');
// }

// if (roleUser === 'supervisor') {
// 	roleAkunDiv.setAttribute('style', 'display:none;');
// }
// form.addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	var boqId = localStorage.getItem('data-boq-id');

// })

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var emailAkun = document.querySelector("#email");
	var oldPassAkun = document.querySelector("#old_password");
	var newPassAkun = document.querySelector("#new_password");

	// var editId = localStorage.getItem('boq_item_id');
	var userId = localStorage.getItem('user_id');
	var userIdInt = parseInt(userId);

	fetch('api_poremo/public/api/v1/user/'+idURL+'/password/update', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
        },
        body: JSON.stringify({
        	email: emailAkun.value,
        	old_password: oldPassAkun.value,
        	new_password: newPassAkun.value

        })
	}).then(function (response) {
        	console.log(response.status);
        	return response.json();
        }).then(function (data) {
        	console.log(data);
        	alert('data User berhasil di edit');
        	window.location.href = 'home.html';
        })
})