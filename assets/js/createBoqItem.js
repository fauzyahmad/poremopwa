// var editBoq = document.querySelector('#edit_boq');
var form = document.querySelector('#form-create_boqItem'); 
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
  window.location.href = 'boq.html';
})

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var namaSubSequence = document.querySelector("#boq_items_name");
	var spesifikasiBoq = document.querySelector("#specification");
	var volumeBoq = document.querySelector("#volume");
	var unitBoq = document.querySelector("#unit");
    var bobotBoq = document.querySelector("#bobot");
	var informationBoq = document.querySelector("#information");
	
	var boq_work_id = localStorage.getItem('boq_workID');
	var boq_work_idInt = parseInt(boq_work_id);

	fetch('api_poremo/public/api/v1/boq/item', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
        },
        body: JSON.stringify({
        	name: namaSubSequence.value,
        	boq_work_id: boq_work_idInt,
        	specifications: spesifikasiBoq.value,
        	volume: volumeBoq.value,
        	unit: unitBoq.value,
            weight: bobotBoq.value,
        	information: informationBoq.value

        })
	}).then(function (response) {
        	console.log(response.status);
        	return response.json();
        }).then(function (data) {
        	console.log(data);
        	dialogCreate.showModal();
        })
})