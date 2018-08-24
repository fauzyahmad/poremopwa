var namaPIC = document.querySelector('#name');
var phoneNumber = document.querySelector('#phone_number');
// var idURL = localStorage.getItem('detail-shopD_id');
var userId = localStorage.getItem('user_id');
var bearerToken = localStorage.getItem('access_token');

// function updateShop(data) {
// 	for (var i in data.shopDrawings) {
// 		console.log(data.shopDrawings[i].path.split("ShopDrawing/")[1]);
// 		titleShop.value = data.shopDrawings[i].drawing_name;
// 		fileShop.value = 'https://poremo.web.id/api_poremo/public/storage/'+data.shopDrawings[i].path.split("public/")[1];
// 	}
// 	// var fileShopName = fileShop.value.toString().split("ShopDrawing/")[1];

	
// }

// fetch('api_poremo/public/api/v1/shop/project/'+idURL, {
 
// }).then(function (response) {
// 	return response.json();
// }).then(function (data) {
// 	updateShop(data);
// 	console.log('data berhasil diterima');
// })
var dialogCreate = document.querySelector('.dialog-create');
var okBtnCreate = document.querySelector('.ok-create');
if (! dialogCreate.showModal) {
    dialogPolyfill.registerDialog(dialogCreate);
}

okBtnCreate.addEventListener('click', function () {
    window.location.href = 'pic.html';
})



var form = document.querySelector('#form-pic');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var projectId = localStorage.getItem('detail-project_id');
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

	fetch('api_poremo/public/api/v1/PIC', {
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