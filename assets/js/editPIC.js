var bearerToken = localStorage.getItem('access_token');
var form = document.querySelector('#form-pic');
var urlGetPIC = 'api_poremo/public/api/v1/PIC?id=';
var projectId = localStorage.getItem('detail-project_id');
var picId = localStorage.getItem('detail-pic_edit');
var namaPIC = document.querySelector('#name');
var phoneNumber = document.querySelector('#phone_number');
var userId = localStorage.getItem('user_id');

function createPICData(data) {
 	var namaPICDiv = document.querySelector('#namaPIC');
 	var noHPPICDiv = document.querySelector('noHP');

 	var namaPIC = document.querySelector('#name');
 	var noWA = document.querySelector('#phone_number');
 	for(var i in data.PICs) {
 		namaPIC.value = data.PICs[i].name;
 		var noWAString = data.PICs[i].phone_number;
 		var noWANum = noWAString.slice(3);
 		var noHPWA = '0'+noWANum;
 		// var noWAOri = parseInt(noHPWA);
 		// var noWAOri = noHPWA.padStart();
 		noWA.value = noHPWA;
 	}
 	namaPICDiv.classList.add('is-focused', 'is-dirty');
 } 

 fetch(urlGetPIC+picId, {
 	headers: {
 	  'Authorization': 'Bearer'+bearerToken
 	}
 }).then(function (response) {
 	return response.json();
 }).then(function (data) {
 	console.log(data);
 	createPICData(data);
 }).catch(function (err) {
 	console.log('Ada error', err);
 })

 var dialogCreate = document.querySelector('.dialog-create');
 var okBtnCreate = document.querySelector('.ok-create');
 if (! dialogCreate.showModal) {
     dialogPolyfill.registerDialog(dialogCreate);
 }

 okBtnCreate.addEventListener('click', function () {
     window.location.href = 'pic.html';
 })


 form.addEventListener('submit', function (event) {
	event.preventDefault();
	// var fileInput = document.querySelector('#filed');
	// var drawingName = document.querySelector('#title');
	// var phoneNumberString = phoneNumber.value.toString();
	var phoneNumberSlice = phoneNumber.value.slice(1);
	var phoneNumberPlus = '+62'+phoneNumberSlice;
	var sendDataPIC = new FormData();
	sendDataPIC.append('user_id', userId);
	sendDataPIC.append('project_id', projectId);
	sendDataPIC.append('name', namaPIC.value);
	sendDataPIC.append('phone_number', phoneNumberPlus);

	fetch('api_poremo/public/api/v1/PIC/'+picId+'/update', {
		method: 'POST',
		headers: {
		  'Authorization': 'Bearer'+bearerToken
		},
		body: sendDataPIC
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
		dialogCreate.showModal();
	}).catch(function (err) {
		console.log('Ada error', err);
	});
})