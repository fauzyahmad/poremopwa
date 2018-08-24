var editBoq = document.querySelector('#edit_boq');
var form = document.querySelector('#form-edit_boq'); 
var bearerToken = localStorage.getItem('access_token');

function getBoq(data) {
	var namaDiv = document.querySelector("#subSequenceProject");
	var spesifikasiDiv = document.querySelector("#specificationBoq");
	var volumeDiv = document.querySelector("#volumeBoq");
	var unitDiv = document.querySelector("#unitBoq");
	var bobotDiv = document.querySelector("#bobotBoq");
	var informationDiv = document.querySelector("#informationBoq");

	var namaSubSequence = document.querySelector("#boq_items_name");
	var spesifikasiBoq = document.querySelector("#specification");
	var volumeBoq = document.querySelector("#volume");
	var unitBoq = document.querySelector("#unit");
	var bobotBoq = document.querySelector("#weight");
	var informationBoq = document.querySelector("#information");

	namaSubSequence.value = data.boqItem.name;
	spesifikasiBoq.value = data.boqItem.specifications;
	volumeBoq.value = data.boqItem.volume;
	unitBoq.value = data.boqItem.unit;
	bobotBoq.value = data.boqItem.weight;
	informationBoq.value = data.boqItem.information;
	
	namaDiv.classList.add('is-focused', 'is-dirty');
	spesifikasiDiv.classList.add('is-focused', 'is-dirty');
	volumeDiv.classList.add('is-focused', 'is-dirty');
	unitDiv.classList.add('is-focused', 'is-dirty');
	bobotDiv.classList.add('is-focused', 'is-dirty');
	informationDiv.classList.add('is-focused', 'is-dirty');
	  	
}



var idURL = localStorage.getItem('boq_item_id');
var url = 'api_poremo/public/api/v1/boq/item';
fetch(url+'/'+idURL, {
	headers: {
	  'Authorization': 'Bearer'+bearerToken
	},

}).then(function (response) {
	return response.json();
}).then(function (data) {
	// script.innerHTML = `<script src="assets/js/material.min.js"></script>`;
	console.log('data Boq', data);
	getBoq(data);
})

// form.addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	var boqId = localStorage.getItem('data-boq-id');

// }) 

var dialogEdit = document.querySelector('.dialog-Edit');
var replyBtnEdit = document.querySelector('.ok-Edit');
if (! dialogEdit.showModal) {
    dialogPolyfill.registerDialog(dialogEdit);
}

replyBtnEdit.addEventListener('click', function () {
  window.location.href = 'boq.html';
})

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var namaSubSequence = document.querySelector("#boq_items_name");
	var spesifikasiBoq = document.querySelector("#specification");
	var volumeBoq = document.querySelector("#volume");
	var unitBoq = document.querySelector("#unit");
	var bobotBoq = document.querySelector("#weight");
	var informationBoq = document.querySelector("#information");
	var editId = localStorage.getItem('boq_item_id');
	var userId = localStorage.getItem('user_id');
	var userIdInt = parseInt(userId)
	var bobotBoqInt = parseInt(bobotBoq.value);

	fetch('api_poremo/public/api/v1/boq/item/'+editId+'/update', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
        },
        body: JSON.stringify({
        	name: namaSubSequence.value,
        	specifications: spesifikasiBoq.value,
        	volume: volumeBoq.value,
        	unit: unitBoq.value,
        	weight: bobotBoq.value,
        	information: informationBoq.value,
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