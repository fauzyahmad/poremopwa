
var form = document.querySelector('#form-input');
var form1 = document.querySelector('#project-upload');
var userId = localStorage.getItem('user_id');
var roleUser = localStorage.getItem('user_role');
var bearerToken = localStorage.getItem('access_token');

if (roleUser === 'supervisor') {
    form1.parentNode.removeChild(form1);
}


var institutionCode = document.querySelector('#institution_code');
var jenisProgram = document.querySelector('#jenisProgram');
var titleTelkom = document.querySelector('#titleTelkom');
var titleTelkomsel = document.querySelector('#titleTelkomsel');
var titleNonTelkom = document.querySelector('#titleNonTelkom');
var imgTelkom = document.querySelector('#imgTelkom');
var imgTelkomsel = document.querySelector('#imgTelkomsel');
var imgNonTelkom = document.querySelector('#imgNonTelkom');
if(localStorage.getItem('institution_codeProject') === '3') {
    // alert('ini nomor 3');
    titleTelkom.parentNode.removeChild(titleTelkom);
    titleNonTelkom.parentNode.removeChild(titleNonTelkom);
    imgTelkom.parentNode.removeChild(imgTelkom);
    imgNonTelkom.parentNode.removeChild(imgNonTelkom);
    jenisProgram.setAttribute('style', 'display:none;');
    institutionCode.value = '3';
    console.log(institutionCode.value);
} 
else if(localStorage.getItem('institution_codeProject') === '4') {
    // alert('ini nomor 4');
    titleTelkom.parentNode.removeChild(titleTelkom);
    titleTelkomsel.parentNode.removeChild(titleTelkomsel);
    imgTelkom.parentNode.removeChild(imgTelkom);
    imgTelkomsel.parentNode.removeChild(imgTelkomsel);
    jenisProgram.setAttribute('style', 'display:none;');
    institutionCode.value = '4';
    console.log(institutionCode.value);
} else {
    titleTelkomsel.parentNode.removeChild(titleTelkomsel);
    titleNonTelkom.parentNode.removeChild(titleNonTelkom);
    imgTelkomsel.parentNode.removeChild(imgTelkomsel);
    imgNonTelkom.parentNode.removeChild(imgNonTelkom);
}

form1.addEventListener('submit', function (event) {
    event.preventDefault();
    // var projectId = localStorage.getItem('detail-boQ_id');
    var fileInput = document.querySelector('#filed');
    var sendDataProject = new FormData();
    sendDataProject.append('project', fileInput.files[0]);
    sendDataProject.append('user_id', userId);
    sendDataProject.append('institution_code', 'S2');
    
    // var url = 'api_poremo/public/api/v1/upload/project';
    fetch('api_poremo/public/api/v1/upload/project', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + bearerToken
        },
        body: sendDataProject
    }).then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        console.log (data);
        alert('Data Project Berhasil ditambahkan');
        window.location.href = 'galeri.html';
    }).catch(function (err) {
        console.log('Ada error', err);
    });
});

var dengan_rupiah = document.getElementById('contract_value');
dengan_rupiah.addEventListener('keyup', function(e)
{
    dengan_rupiah.value = formatRupiah(this.value);
});

dengan_rupiah.addEventListener('keydown', function(event)
{
    limitCharacter(event);
});

/* Fungsi */
function formatRupiah(bilangan, prefix)
{
    var number_string = bilangan.replace(/[^,\d]/g, '').toString(),
        split   = number_string.split(','),
        sisa    = split[0].length % 3,
        rupiah  = split[0].substr(0, sisa),
        ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
        
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? rupiah : '');
}

function limitCharacter(event)
{
    key = event.which || event.keyCode;
    if ( key != 188 // Comma
         && key != 8 // Backspace
         && key != 17 && key != 86 & key != 67 // Ctrl c, ctrl v
         && (key < 48 || key > 57) // Non digit
         // Dan masih banyak lagi seperti tombol del, panah kiri dan kanan, tombol tab, dll
        ) 
    {
        event.preventDefault();
        return false;
    }
}

var selectPartner = document.querySelector('#partners');

function getPartners(data) {
    for(var i in data.partners) {
        selectPartner.innerHTML +=
        `<option value="${data.partners[i].id}">${data.partners[i].institution}</option>`;
    }
    $(document).ready(function() {
        $('.js-example-basic-multiple').select2();
        $('.js-example-basic-multiple').val('60');
        $('.js-example-basic-multiple').trigger('change');
    });
}

var urlGetLatest = 'api_poremo/public/api/v1/reference/latest';
fetch(urlGetLatest, {
    headers: {
            'Authorization': 'Bearer' + bearerToken
        },
}).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log('data latest reference', data);
    var latest_reference_number = data.latest_reference_number;
});

var urlPartner = 'api_poremo/public/api/v1/partner';
fetch(urlPartner, {
    headers: {
            'Authorization': 'Bearer' + bearerToken
        },
}).then(function (response) {
    return response.json()
}).then(function (data) {
    console.log('data Partners', data);
    getPartners(data);
})

var dialogInput = document.querySelector('.dialog-input');
var okBtnInput = document.querySelector('.ok-input');
if (! dialogInput.showModal) {
    dialogPolyfill.registerDialog(dialogInput);
}

okBtnInput.addEventListener('click', function () {
    window.location.href = 'home.html';
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
var titleProject = document.querySelector('#title');
var addressProject = document.querySelector('#address');
var typeProject = document.querySelector('#type');
var institutionCode = document.querySelector('#institution_code');
var tahunAnggaran = document.querySelector('#fiscal_year');
var coordX = document.querySelector('#coord_x');
var coordY = document.querySelector('#coord_y');
var cityKota = document.querySelector('#city');
var tenggatWaktu = document.querySelector('#duration')
var contractValueRp = document.querySelector('#contract_value');
var descProject = document.querySelector('#description');
var pekerjaProject = document.querySelector('#partners');
var quartalProject = document.querySelector('#quartal')
var valuePartners = $('#partners :selected').val();
var valuePartners = new Array();
valuePartners = $('#partners').val();
console.log(titleProject.value);
    if(titleProject.value.trim() === '' || institutionCode.value.trim() === '' || addressProject.value.trim() === '' || tahunAnggaran.value.trim() === '' || coordX.value.trim() === '' || coordY.value.trim() === '' || cityKota.value.trim() === '' || tenggatWaktu.value.trim() === '' || contractValueRp.value.trim() === '' || descProject.value.trim() === '' || typeProject.value.trim() === '' || quartalProject.value.trim() === '' )  {
        dialogFailed.showModal();
        return;
    }
    


    var contractValue = contractValueRp.value.replace(/\./g, '');
    console.log(contractValue);

   //  var latest_reference_number = latest_reference_number;
    // var current_reference_number = latest_reference_number + 1;
    // // var digit = (reference_number / 10);
    // // // alert(digit)
    // var str = current_reference_number;
    // if(current_reference_number<10){
    //  str = '000' + current_reference_number;
    // } else if (current_reference_number <100){
    //  str = '00' + current_reference_number;
    // } else if (current_reference_number <1000) {
    //  str = '0'+ current_reference_number;
    // }
    // institution_code = 'S' + current_reference_number;

    fetch('api_poremo/public/api/v1/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer' + bearerToken
        },
        body: JSON.stringify({
            // message: 'List Baru Project',
                    address: addressProject.value,
                    title: titleProject.value,
                    coord_x: coordX.value,
                    coord_y: coordY.value,
                    fiscal_year: tahunAnggaran.value,
                    contract_value: contractValue,
                    description: descProject.value,
                    partners: valuePartners,
                    duration: tenggatWaktu.value,
                    city: cityKota.value,
                    institution_code: institutionCode.value,
                    type: typeProject.value,
                    quartal: quartalProject.value,
                    user_id: userId
        })
    }).then(function (response) {
        console.log(response.message);
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        console.log(data);
        dialogInput.showModal();
    }).catch(function (err) {
        alert('Data yang dimasukkan salah atau tidak lengkap ');
        console.log(err);
    });
});

