var bearerToken = localStorage.getItem('access_token');
var form = document.querySelector('#form-edit'); 

function createOneEditProject(data) {
    
    var titleDiv = document.querySelector("#namaProject");
    var partnerDiv = document.querySelector("#partnerProject");
    var lokasiDiv = document.querySelector("#input-lokasi");
    var tahunDiv = document.querySelector("#tahunProject");
    var quartalDiv = document.querySelector("#pilihanKuartal");
    var valueDiv = document.querySelector("#valueProject");
    var durationDiv = document.querySelector("#durationProject");
    var descDiv = document.querySelector("#descProject");
    // var referenceDiv = document.querySelector('#referenceProject');
    var addressDiv = document.querySelector('#id_address');
    var coordXDiv = document.querySelector('#id_coord_x');
    var coordYDiv = document.querySelector('#id_coord_y');
    var cityDiv = document.querySelector('#id_city');

    var titleProject = document.querySelector('#title');
    var tahunAnggaran = document.querySelector('#fiscal_year');
    var quartalProject = document.querySelector('#quartal');
    var contractValue = document.querySelector('#contract_value');
    var descProject = document.querySelector('#description');
    var tenggatWaktu = document.querySelector('#duration');
    var deadlineProject = document.querySelector('#deadline');
    var referenceProject = document.querySelector('#reference_number');
    var addressProject = document.querySelector('#address');
    var coordX = document.querySelector('#coord_x');
    var coordY = document.querySelector('#coord_y');
    var cityKota = document.querySelector('#city');

    
    titleProject.value = data.project.title;
    tahunAnggaran.value = data.project.fiscal_year;
    quartalProject.value = data.project.quartal;
    contractValue.value = data.project.contract_value;
    descProject.value = data.project.description;
    tenggatWaktu.value = data.project.duration;
    deadlineProject.value = data.project.deadline;
    referenceProject.value = data.project.reference_number;
    addressProject.value = data.project.address;
    coordX.value = data.project.coord_x;
    coordY.value = data.project.coord_y;
    cityKota.value = data.project.city;
    titleDiv.classList.add('is-focused', 'is-dirty');
    // referenceDiv.classList.add('is-focused', 'is-dirty');
    lokasiDiv.classList.add('is-focused', 'is-dirty');
    quartalDiv.classList.add('is-focused', 'is-dirty');
    tahunDiv.classList.add('is-focused', 'is-dirty');
    valueDiv.classList.add('is-focused', 'is-dirty');
    durationDiv.classList.add('is-focused', 'is-dirty');
    descDiv.classList.add('is-focused', 'is-dirty');

    var dengan_rupiah = document.getElementById('contract_value').value;
    var contractValue = document.getElementById('contract_value');

    // dengan_rupiah.innerHTML = formatRupiah(dengan_rupiah.innerHTML);
    var sliceValue = dengan_rupiah.slice(0, -4);
    sliceValue = formatRupiah(sliceValue);
    console.log(sliceValue);
    contractValue.value = sliceValue;
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



}

var selectPartner = document.querySelector('#partners');

function getPartners(data) {
    for(var i in data.partners) {
        selectPartner.innerHTML +=
        `<option value="${data.partners[i].id}">${data.partners[i].institution}</option>`;
    }
    $(document).ready(function() {
        $('.js-example-basic-multiple').select2();
    });
}

var urlPartner = 'api_poremo/public/api/v1/partner';
fetch(urlPartner, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

}).then(function (response) {
    return response.json()
}).then(function (data) {
    console.log('data Partners', data);
    getPartners(data);
    
})

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

var idURL = localStorage.getItem('edit-project_id');
var id = parseInt(idURL);
var url = 'api_poremo/public/api/v1/project/';
// if('indexedDB' in window) {
//   console.log(id);
//   dbPromise
//   .then(function (db) {
//     var tx = db.transaction('data-project', 'readonly');
//     var store = tx.objectStore('data-project');
//     return store.get(id);
//   }).then(function (data) {
//     console.log(data);
//     createOneEditProject(data);
//   })
// }

fetch(url+idURL, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

}).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log('dari Web', data);
    if (data.project.address !== null && data.project.coord_y !== null
        && data.project.coord_x !== null && data.project.city !== null) {
        var lokasiField = document.querySelector('#input-lokasi');
        var lokasiBtn = document.querySelector('#get-location__input')
        var setBtn =  document.querySelector('#get-address__input');
        var addressDiv = document.querySelector('#id_address');
        var coordXDiv = document.querySelector('#id_coord_x');
        var coordYDiv = document.querySelector('#id_coord_y');
        var cityDiv = document.querySelector('#id_city');
        lokasiBtn.style.display = 'none';
        lokasiField.style.display = 'none';
        setBtn.style.display = 'none';
        addressDiv.style.display = 'block';
        coordXDiv.style.display = 'block';
        coordYDiv.style.display = 'block';
        cityDiv.style.display = 'block';
        createOneEditProject(data);
    } else {
        createOneEditProject(data);
    }
    var partnerArray = [];
    var partnerKerja = document.querySelector('#partners');
    for(x = 0; x < data.project.partners.length; x++ ) {
        // var obj = data.project.partners[x].institution;
        partnerArray.push(data.project.partners[x].id);
    }
    $('#partners').select2().val(partnerArray).trigger('change');
})

var dialogEdit = document.querySelector('.dialog-Edit');
var okBtnEdit = document.querySelector('.ok-Edit');
if (! dialogEdit.showModal) {
    dialogPolyfill.registerDialog(dialogEdit);
}

okBtnEdit.addEventListener('click', function () {
    window.location.href = 'detail_project.html';
})

form.addEventListener('submit', function (event) {
    event.preventDefault();
var titleProject = document.querySelector('#title');
var addressProject = document.querySelector('#address');
var tahunAnggaran = document.querySelector('#fiscal_year');
var coordX = document.querySelector('#coord_x');
var coordY = document.querySelector('#coord_y');
var cityKota = document.querySelector('#city');
var tenggatWaktu = document.querySelector('#duration');
var contractValueRp = document.querySelector('#contract_value');
var quartalProject = document.querySelector('#quartal');
var descProject = document.querySelector('#description');
var pekerjaProject = document.querySelector('#partners');
var editId = localStorage.getItem('edit-project_id');
var referenceProject = document.querySelector('#reference_number');
var editParseId = parseInt(editId);
var deadlineProject = document.querySelector('#deadline');
var userId = localStorage.getItem('user_id'); 
console.log(titleProject.value);
var valuePartners = new Array();
valuePartners = $('#partners').val();
    // if(titleProject.value.trim() === '' || addressProject.value.trim() === '' || tahunAnggaran.value.trim() === '' || coordX.value.trim() === '' || coordY.value.trim() === '' || cityKota.value.trim() === '' || tenggatWaktu.value.trim() === '' || contractValue.value.trim() === '' || descProject.value.trim() === '' ) {
    //     alert('Semua data di form harus Diisi');
    //     return;
    // }
    var contractValue = contractValueRp.value.replace(/\./g, '');
    console.log(contractValue);
    var deadlineTime = deadlineProject.value;
    if(deadlineTime === '') {
        deadlineTime = '2121-11-19';
        console.log(deadlineTime);
    }

    // var latest_reference_number = 1;
    // var current_reference_number = latest_reference_number + 1;
    // // var digit = (reference_number / 10);
    // // // alert(digit)
    // var str = current_reference_number;
    // if(current_reference_number<10){
    //   str = '000' + current_reference_number;
    // } else if (current_reference_number <100){
    //   str = '00' + current_reference_number;
    // } else if (current_reference_number <1000) {
    //   str = '0'+ current_reference_number;
    // }
    // reference_number = 'S' + current_reference_number;
    // var sendEditReport = new FormData();
    // sendEditReport.append('address', addressProject.value);
    // sendEditReport.append('title', titleProject.value);
    // sendEditReport.append('coord_x', coordX.value);
    // sendEditReport.append('coord_y', coordY.value);
    // sendEditReport.append('fiscal_year', tahunAnggaran.value);
    // sendEditReport.append('contract_value', contractValue.value);
    // sendEditReport.append('description', descProject.value);
    // sendEditReport.append('partners', [pekerjaProject.value]);
    // sendEditReport.append('duration', tenggatWaktu.value);
    // sendEditReport.append('city', cityKota.value);
    // sendEditReport.append('reference_number', referenceProject.value);
    // sendEditReport.append('user_id', 1);
    // sendEditReport.append('supervisor', 2);

    fetch('api_poremo/public/api/v1/project'+'/'+editParseId+'/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer'+bearerToken
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
                    reference_number: referenceProject.value,
                    user_id: userId,
                    deadline: deadlineTime,
                    quartal: quartalProject.value
        })
    }).then(function (response) {
        console.log(response.message);
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        console.log(data);
        dialogEdit.showModal();
    })
    .catch(function (err) {
        console.log(err);
    });
});