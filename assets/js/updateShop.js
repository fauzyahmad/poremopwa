var titleShop = document.querySelector('#title');
var fileShop = document.querySelector('#filed');
var idURL = localStorage.getItem('detail-shopD_id');
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
    window.location.href = 'shop-drawing.html';
})

var dialogFile = document.querySelector('.dialog-File');
var okBtnFile = document.querySelector('.ok-File');
if (! dialogFile.showModal) {
    dialogPolyfill.registerDialog(dialogFile);
}

okBtnFile.addEventListener('click', function () {
    dialogFile.close();
})

function uploadFile() {
	dialogFile.showModal();
}

var form = document.querySelector('#form-shop');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var shopId = localStorage.getItem('detail-shopD_id')
	var fileInput = document.querySelector('#filed');
	var drawingName = document.querySelector('#title');
	var sendDataShop = new FormData();
	sendDataShop.append('user_id', userId);
	sendDataShop.append('project_id', shopId);
	sendDataShop.append('drawing_name', drawingName.value);
	sendDataShop.append('drawing', fileInput.files[0]);

	fetch('api_poremo/public/api/v1/shop', {
		method: 'POST',
		headers: {
		  'Authorization': 'Bearer'+bearerToken
		},
		body: sendDataShop
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
		dialogCreate.showModal();
	}).catch(function (err) {
		console.log('Ada error', err);
	});
})