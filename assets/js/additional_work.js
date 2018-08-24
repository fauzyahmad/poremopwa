var titleAdditional = document.querySelector('#title');
var fileAdditional = document.querySelector('#filed');
// var idURL = localStorage.getItem('detail-shopD_id');
var userId = localStorage.getItem('user_id');
var bearerToken = localStorage.getItem('access_token');

var dialogFile = document.querySelector('.dialog-File');
var okBtnFile = document.querySelector('.ok-File');
if (! dialogFile.showModal) {
    dialogPolyfill.registerDialog(dialogFile);
}

okBtnFile.addEventListener('click', function () {
    dialogFile.close();
})

var dialogCreate = document.querySelector('.dialog-create');
var okBtnCreate = document.querySelector('.ok-create');
if (! dialogCreate.showModal) {
    dialogPolyfill.registerDialog(dialogCreate);
}

okBtnCreate.addEventListener('click', function () {
    window.location.href = 'boq.html';
})

function uploadFile() {
	dialogFile.showModal();
}

// fetch('api_poremo/public/api/v1/shop/project/'+idURL, {
 
// }).then(function (response) {
// 	return response.json();
// }).then(function (data) {
// 	for (var i in data.shopDrawings) {
// 		titleShop.value = data.shopDrawings[i].drawing_name;
// 		fileShop.value = data.shopDrawings[i].path;
// 	}
// })

var form = document.querySelector('#form-additional');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var projectId = localStorage.getItem('detail-project_id')
	var fileInput = document.querySelector('#filed');
	var additionalName = document.querySelector('#title');
	var sendDataAdditional = new FormData();
	sendDataAdditional.append('user_id', userId);
	sendDataAdditional.append('project_id', projectId);
	sendDataAdditional.append('name', additionalName.value);
	sendDataAdditional.append('rab', fileInput.files[0]);

	fetch('api_poremo/public/api/v1/additional_work', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer'+bearerToken
		},
		body: sendDataAdditional
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log(data);
		dialogCreate.showModal();
	}).catch(function (err) {
		console.log('Ada error', err);
	});
})