var form = document.querySelector('#form-register');
var roleAdmin = localStorage.getItem('user_role');
var userId = localStorage.getItem('user_id');
var password = document.querySelector('#password');
var bearerToken = localStorage.getItem('access_token');

if(roleAdmin !== 'admin') {
	window.location.href = 'home.html';
}

if(localStorage.getItem('role_partner') === '1') {
	var roleUsers = document.querySelector('#role');
	roleUsers.value = 'partner';
	roleUsers.setAttribute('disabled', 'true');
}

var dialog = document.querySelector('dialog');
var okBtnId = document.querySelector('.ok');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
okBtnId.addEventListener('click', function () {
    window.location.href = 'update_partner.html';
})

var dialogRegister = document.querySelector('.dialog-register');
var okBtnRegister = document.querySelector('.ok-register');
if (! dialogRegister.showModal) {
    dialogPolyfill.registerDialog(dialogRegister);
}

okBtnRegister.addEventListener('click', function () {
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
	var namaUser = document.querySelector('#name');
	var roleUser = document.querySelector('#role');
	var passUser = document.querySelector('#password');
	var emailUser = document.querySelector('#email');
	var sendRegister = new FormData();
	sendRegister.append('name', namaUser.value);
	sendRegister.append('role', roleUser.value);
	sendRegister.append('password', passUser.value);
	sendRegister.append('email', emailUser.value);
	sendRegister.append('user_id', userId);

	fetch('api_poremo/public/api/v1/user/register', {
		method: 'POST',
		headers: {
		  'Authorization': 'Bearer'+bearerToken
		},
		body: sendRegister
	}).then(function (response) {
		console.log(response.status);
		return response.json();
	}).then(function (data) {
		console.log('Data Teregister', data);
		
		if (data.user.role === 'partner') {
			localStorage.setItem('password', password.value);
			localStorage.setItem('email', data.user.email);
			dialog.showModal();
			
		} else {
			dialogRegister.showModal();
		}

		// 
	}).catch(function(err) {
		dialogFailed.showModal();
	})
})