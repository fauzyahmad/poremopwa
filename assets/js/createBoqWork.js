// var editBoq = document.querySelector('#edit_boq');
var form = document.querySelector('#form-create_boqWork'); 
var bearerToken = localStorage.getItem('access_token');
// form.addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	var boqId = localStorage.getItem('data-boq-id');

// })

var dialogCreate = document.querySelector('.dialog-Create');
var replyBtnCreate = document.querySelector('.ok-Create');
if (! dialogCreate.showModal) {
    dialogPolyfill.registerDialog(dialogCreate);
}

replyBtnCreate.addEventListener('click', function () {
  window.location.href = 'create-BoqItem.html';
})

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var namaSubProject = document.querySelector("#boq_works_name");
	
	
	var boq_work_id = localStorage.getItem('boq_workID');
    var boqId = localStorage.getItem('data-boq-id');
    var userId = localStorage.getItem('user_id');
	var boq_work_idInt = parseInt(boq_work_id);
    var boqIdInt = parseInt(boqId);
    var userIdInt = parseInt(userId);
    var sendCreateBoqWork = new FormData();
    sendCreateBoqWork.append('name', namaSubProject.value);
    sendCreateBoqWork.append('boq_id', boqId);
    sendCreateBoqWork.append('user_id', userId);

	fetch('api_poremo/public/api/v1/boq/work', {
		method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendCreateBoqWork
	}).then(function (response) {
        	console.log(response.status);
        	return response.json();
        }).then(function (data) {
        	localStorage.setItem('boq_workID', data.boqWork.id);
        	dialogCreate.showModal();
        })
})