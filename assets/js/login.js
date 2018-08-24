var form = document.querySelector('#form-login');

var warningLogin = document.querySelector('.warning-login');
var okLogin = document.querySelector('.ok-login');
if (! warningLogin.showModal) {
    dialogPolyfill.registerDialog(warningLogin);
}
okLogin.addEventListener('click', function () {
  warningLogin.close();
})

var userId = localStorage.getItem('user_id');
if (!userId) {
	console.log('Silahkan Login terlebih dahulu');
}
else {
	window.location.href = 'home.html';
}

var afterLogin = document.querySelector('.after-login');
var nextHome = document.querySelector('.next-home');
if (! afterLogin.showModal) {
    dialogPolyfill.registerDialog(afterLogin);
}
nextHome.addEventListener('click', function () {
  window.location.href= 'home.html';
})

var wrongLogin = document.querySelector('.wrong-login');
var loginUlang = document.querySelector('.login-ulang');
if (! wrongLogin.showModal) {
    dialogPolyfill.registerDialog(wrongLogin);
}
loginUlang.addEventListener('click', function () {
  wrongLogin.close();
})

form.addEventListener('submit', function (event) {
	event.preventDefault();
	// var namaUser = document.querySelector('#name');
	// var roleUser = document.querySelector('#role');
	var passUser = document.querySelector('#password');
	var emailUser = document.querySelector('#email');
	var sendRegister = new FormData();
	// sendRegister.append('name', namaUser.value);
	// sendRegister.append('role', roleUser.value);
	sendRegister.append('password', passUser.value);
	sendRegister.append('email', emailUser.value);

	fetch('api_poremo/public/api/v1/user/login', {
		method: 'POST',
		body: sendRegister
	}).then(function (response) {
		console.log(response.status);
		return response.json();
	}).then(function (data) {
		window.localStorage.setItem('access_token', data.token);
		if(data.user.partners) {
			localStorage.setItem('partner_id', data.user.partners.id);
			localStorage.setItem('user_id', data.user.id);
			localStorage.setItem('user_role', data.user.role);
			localStorage.setItem('user_name', data.user.name);		
			console.log('Telah Login', data);
			afterLogin.showModal();
			
		}
		else{
			localStorage.setItem('user_id', data.user.id);
			localStorage.setItem('user_role', data.user.role);
			localStorage.setItem('user_name', data.user.name);		
			console.log('Telah Login', data);
			afterLogin.showModal();
			
		}
		
	}).catch(function(err) {
		wrongLogin.showModal();
	})
})