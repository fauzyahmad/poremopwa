var bearerToken = localStorage.getItem('access_token');

var form = document.querySelector('#form-edit_boqWork'); 

function getBoqWork(data) {
	var namaDiv = document.querySelector("#subProject");

	var namaSubProject = document.querySelector("#boq_works_name");
	
	namaSubProject.value = data.boqWork.name;
	namaDiv.classList.add('is-focused', 'is-dirty');
	
}

var dialogEdit = document.querySelector('.dialog-Edit');
var replyBtnEdit = document.querySelector('.ok-Edit');
if (! dialogEdit.showModal) {
    dialogPolyfill.registerDialog(dialogEdit);
}

replyBtnEdit.addEventListener('click', function () {
  window.location.href = 'boq.html';
})

var idURL = localStorage.getItem('boq_workID');
var url = 'api_poremo/public/api/v1/boq/work';
fetch(url+'/'+idURL, {
	headers: {
      'Authorization': 'Bearer'+bearerToken
    },

}).then(function (response) {
	return response.json();
}).then(function (data) {
	// script.innerHTML = `<script src="assets/js/material.min.js"></script>`;
	console.log('data Boq', data);
	getBoqWork(data);
})



form.addEventListener('submit', function (event) {
	event.preventDefault();
	var namaSubProject = document.querySelector("#boq_works_name");
	var userId = localStorage.getItem('user_id');
	var userIdInt = parseInt(userId);

	fetch('api_poremo/public/api/v1/boq/work/'+idURL+'/update', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
        },
        body: JSON.stringify({
        	name: namaSubProject.value,
        	user_id: userIdInt

        })
	}).then(function (response) {
        	console.log(response.status);
        	return response.json();
        }).then(function (data) {
        	console.log(data);
        	dialogEdit.showModal();
        })
})