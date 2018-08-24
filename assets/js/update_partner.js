var editBoq = document.querySelector('#edit_boq');
var form = document.querySelector('#form-edit_partner'); 
var bearerToken = localStorage.getItem('access_token');

function getPartnerOne(data) {
	var bidPekerjaan = document.querySelector('#bidPekerjaan');
	var subBidang = document.querySelector('#subBidang');
	var namaMitra = document.querySelector('#namaMitra');
	var alamatKantor = document.querySelector('#alamatKantor');
	var emailUtama = document.querySelector('#emailUtama');
	var emailLain = document.querySelector('#emailLain');
	var telpKantor = document.querySelector('#telpKantor');
	var telpKantor2 = document.querySelector('#telpKanto2');
	var contactPerson1 = document.querySelector('#contactPerson1');
	var noTel1 = document.querySelector('#noTel1');
	var contactPerson2 = document.querySelector('#contactPerson2');
	var noTel2 = document.querySelector('#noTel2');
	

	var work_category = document.querySelector('#work_category');
	var sub_work_category = document.querySelector('#sub_work_category');
	var institution = document.querySelector('#institution');
	var address = document.querySelector('#address');
	var main_email = document.querySelector('#main_email');
	var alternate_email = document.querySelector('#alternate_email');
	var office_phone1 = document.querySelector('#office_phone1');
	var office_phone2 = document.querySelector('#office_phone1');
	var contact_person1 = document.querySelector('#contact_person1');
	var contact_person1_telephone = document.querySelector('#contact_person1_telephone');
	var contact_person2 = document.querySelector('#contact_person2');
	var contact_person2_telephone = document.querySelector('#contact_person2_telephone');
	
	
		work_category.value = data.partner.work_category;
		sub_work_category.value = data.partner.sub_work_category;
		institution.value = data.partner.institution;
		address.value = data.partner.address;
		main_email.value = data.partner.main_email;
		alternate_email.value = data.partner.alternate_email;
		office_phone1.value = data.partner.office_phone1;
		office_phone2.value = data.partner.office_phone2;
		contact_person1.value = data.partner.contact_person1;
		contact_person1_telephone.value = data.partner.contact_person1_telephone;
		contact_person2.value = data.partner.contact_person2;
		contact_person2_telephone.value = data.partner.contact_person2_telephone;
		
	
	bidPekerjaan.classList.add('is-focused', 'is-dirty');
	subBidang.classList.add('is-focused', 'is-dirty');
	namaMitra.classList.add('is-focused', 'is-dirty');
	alamatKantor.classList.add('is-focused', 'is-dirty');
	emailUtama.classList.add('is-focused', 'is-dirty');
	emailLain.classList.add('is-focused', 'is-dirty');
	telpKantor.classList.add('is-focused', 'is-dirty');
	telpKantor2.classList.add('is-focused', 'is-dirty');
	contactPerson1.classList.add('is-focused', 'is-dirty');
	noTel1.classList.add('is-focused', 'is-dirty');
	contactPerson2.classList.add('is-focused', 'is-dirty');
	noTel2.classList.add('is-focused', 'is-dirty');
		
}

if(localStorage.getItem('email') && localStorage.getItem('password') !== null) {
	var emailPartner = localStorage.getItem('email');
	var passwordPartner = localStorage.getItem('password');
	var sendLogin = new FormData();
	sendLogin.append('email', emailPartner);
	sendLogin.append('password', passwordPartner);

	fetch('api_poremo/public/api/v1/user/login', {
		method: 'POST',
		headers: {
		  'Authorization': 'Bearer'+bearerToken
		},
		body: sendLogin
	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		localStorage.setItem('edit-partner_id', data.user.partners.id);
		console.log('berhasil menarik data userPartner', data);
	})
}

setTimeout(fetchUrl, 500)

function fetchUrl() {
	var idURL = localStorage.getItem('edit-partner_id');
	var url = 'api_poremo/public/api/v1/partner';
	fetch(url+'/'+idURL, {
		headers: {
		  'Authorization': 'Bearer'+bearerToken
		},

	}).then(function (response) {
		return response.json();
	}).then(function (data) {
		// script.innerHTML = `<script src="assets/js/material.min.js"></script>`;
		console.log('data partner', data);
		getPartnerOne(data);
	}).then(function () {
		var getItemPass = localStorage.getItem('password');
		var getItemEmail = localStorage.getItem('email');
		localStorage.removeItem('email', getItemEmail);
		localStorage.removeItem('password', getItemPass);
		console.log('berhasil mendelete');
	})
}



// form.addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	var boqId = localStorage.getItem('data-boq-id');

// })
var dialogUpdate = document.querySelector('.dialog-update');
var okBtnUpdate = document.querySelector('.ok-update');
if (! dialogUpdate.showModal) {
    dialogPolyfill.registerDialog(dialogUpdate);
}

okBtnUpdate.addEventListener('click', function () {
    window.location.href = 'partners.html';
})


var dialogFailed = document.querySelector('.dialog-failed');
var okBtnFailed = document.querySelector('.ok-failed');
if (! dialogFailed.showModal) {
    dialogPolyfill.registerDialog(dialogFailed);
}

okBtnFailed.addEventListener('click', function () {
    dialogFailed.close();
})

form.addEventListener('submit', function (event) {
	event.preventDefault();
	var work_category = document.querySelector('#work_category');
	var sub_work_category = document.querySelector('#sub_work_category');
	var institution = document.querySelector('#institution');
	var address = document.querySelector('#address');
	var main_email = document.querySelector('#main_email');
	var alternate_email = document.querySelector('#alternate_email');
	var office_phone1 = document.querySelector('#office_phone1');
	var office_phone2 = document.querySelector('#office_phone2');
	var contact_person1 = document.querySelector('#contact_person1');
	var contact_person1_telephone = document.querySelector('#contact_person1_telephone');
	var contact_person2 = document.querySelector('#contact_person2');
	var contact_person2_telephone = document.querySelector('#contact_person2_telephone');
	
	if(work_category.value.trim() === '' || sub_work_category.value.trim() === ''
		|| institution.value.trim() === '' || address.value.trim() === '' 
		|| main_email.value.trim() === '' || alternate_email.value.trim() === ''
		|| alternate_email.value.trim() === '' || office_phone1.value.trim() === ''
		|| contact_person1.value.trim() === '' || contact_person1_telephone.value.trim() === '')
	{
		dialogFailed.showModal();
	}

	var idURL = localStorage.getItem('edit-partner_id');
	// var editId = localStorage.getItem('boq_item_id');
	var userId = localStorage.getItem('user_id');
	// var userIdInt = parseInt(userId);

	fetch('api_poremo/public/api/v1/partner/'+idURL+'/update', {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
        },
        body: JSON.stringify({
        	work_category: work_category.value,
        	subwork_category: sub_work_category.value,
        	institution: institution.value,
        	address: address.value,
        	branch1: 'N/A',
        	branch2: 'N/A',
        	main_email: main_email.value,
        	alternate_email: alternate_email.value,
        	office_phone1: office_phone1.value,
        	office_phone2: 'N/A',
        	office_phone3: 'N/A',
        	contact_person1: contact_person1.value,
        	contact_person1_telephone: contact_person1_telephone.value,
        	contact_person2: contact_person2.value,
        	contact_person2_telephone: contact_person2_telephone.value,
        	user_id: userId
        })
	}).then(function (response) {
        	console.log(response.status);
        	return response.json();
        }).then(function (data) {
        	console.log(data);
        	dialogUpdate.showModal();
        	// window.location.href = 'users.html';
        }).catch(function (err) {
        	console.log('ada error', err)
        })
})