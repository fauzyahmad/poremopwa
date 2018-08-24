var titleAdditional = document.querySelector('#title');
var fileAdditional = document.querySelector('#filed');
var idURL = localStorage.getItem('detail-boQ_id');
var userId = localStorage.getItem('user_id');
var bearerToken = localStorage.getItem('access_token');

fetch('api_poremo/public/api/v1/additional_work/project/'+idURL, {
	headers: {
	  'Authorization': 'Bearer'+bearerToken
	},
 
}).then(function (response) {
	return response.json();
}).then(function (data) {
	for (var i in data.additionalWorks) {
		titleAdditional.value = data.additionalWorks[i].name;
		// fileShop.value = data.additionalWorks[i].path;
	}
})

var form = document.querySelector('#form-additional');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var projectId = localStorage.getItem('detail-project_id')
	var fileInput = document.querySelector('#filed');
	var additionalName = document.querySelector('#title');
	var sendDataAdditional = new FormData();
	sendDataAdditional.append('user_id', userId);
	// sendDataAdditional.append('project_id', projectId);
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
		alert('Data Additional Work Berhasil Ditedit');
	}).catch(function (err) {
		console.log('Ada error', err);
	});
})