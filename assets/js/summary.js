var userData = document.querySelector('#body-summary');
var url = 'api_poremo/public/api/v1/summary';
var roleUser = localStorage.getItem('user_role');
var userId = localStorage.getItem('user_id');
var userIdSend = new FormData();
userIdSend.append('user_id', userId);
var bearerToken = localStorage.getItem('access_token');

if(roleUser !== 'admin' && roleUser !== 'guest') {
	window.location.href = 'home.html';
}

if(roleUser === 'guest') {
	var backHome = document.querySelector('#menu-lower');
	var backBtn = document.querySelector('#arrow-back');
	backHome.style.display = 'none';
	backBtn.style.display = 'none';
}

var signOut = document.querySelector('#sign-out');
signOut.addEventListener('click', function (event) {
  // alert('Anda telah Berhasil Sign Out');
  // localStorage.clear();
  // window.location.href = 'index.html';
  signOutModal.showModal();
})

var signOutModal = document.querySelector('.sign-outModal');
var signOutBtn = document.querySelector('.sign-outYa');
if (! signOutModal.showModal) {
    dialogPolyfill.registerDialog(signOutModal);
}

signOutBtn.addEventListener('click', function () {
  localStorage.clear();
  window.location.href = 'index.html';
})

signOutModal.querySelector('.close_signOut').addEventListener('click', function() {
    signOutModal.close();
  });  

var editUser = document.querySelector('#edit-user');
editUser.addEventListener('click', function (event) {
  var urlIdAkun = localStorage.getItem('user_id');
  localStorage.setItem('edit_user', urlIdAkun);
})

var registerBtn = document.querySelector('#users');
var summaryBtn = document.querySelector('#summary');
var partnersBtn = document.querySelector('#partners');
if(roleUser === 'admin') {
  registerBtn.removeAttribute('style');
  registerBtn.addEventListener('click', function (event) {
    window.location.href = 'users.html'
  })
  summaryBtn.removeAttribute('style');
  summaryBtn.addEventListener('click', function (event) {
    window.location.href = 'summary.html'
  })
  partnersBtn.removeAttribute('style');
  partnersBtn.addEventListener('click', function (event) {
    window.location.href = 'partners.html'
  })
}

function createListSummary(data) {
	for(var i in data.projects) {
		userData.innerHTML +=
		`<tr>
			<td class="mdl-data-table__cell--non-numeric">${data.projects[i].reference_number}
			</td>
			
			<td class="mdl-data-table__cell--non-numeric">${data.projects[i].title}
			</td>

			<td class="mdl-data-table__cell--non-numeric">Rp <span class="contract_value">${data.projects[i].contract_value}</span>
			</td>

			<td class="mdl-data-table__cell--non-numeric">${data.projects[i].partner_institution}
			</td>

			<td class="mdl-data-table__cell--non-numeric">${data.projects[i].fiscal_year} - Q${data.projects[i].quartal}
			</td>

			<td><span class="percentage">${data.projects[i].last_report_percentage}</span>%
			</td>

			<td>
				<button onclick="detailProject(${data.projects[i].project_id})" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
				<i class="material-icons">remove_red_eye</i>
				</button>
			</td>
		</tr>`; 
	}
	$(document).ready(function() {
	    // Setup - add a text input to each footer cell
	    $('#example tfoot th').each( function () {
	        var title = $(this).text();
	        $(this).html( '<input type="text" placeholder="Cari '+title+'" />' );
	    } );
	 	$('#example').DataTable( {
	 	    responsive: {
	 	            details: false
	 	        },
	 	     "language": {
	 	             "search": "_INPUT_",
	 	             "searchPlaceholder": "Search...",
	 	             "lengthMenu": "Display _MENU_ Project/Page",
	 	             "zeroRecords": "Tidak ada project",
	 	             "buttons": {
	 	             	colvis: 'Pilih Kolom'
	 	             }
	 	         },
	 	      dom: 'Bfrtip',
	 	              buttons: [
	 	                  {
	 	                      extend: 'excelHtml5',
	 	                      exportOptions: {
	 	                          columns: ':visible'
	 	                      }
	 	                  },
	 	                  {
	 	                      extend: 'csv',
	 	                      exportOptions: {
	 	                          columns: [0, 1, 2, 3, 4, 5, ':visible']
	 	                      }
	 	                  },
	 	                  'colvis'
	 	              ]
	 	              // ,
	 	              // columnDefs: [ {
	 	              //     targets: -1,
	 	              //     visible: false
	 	              // } ]
	 	} );
	    // DataTable
	    var table = $('#example').DataTable();
	 
	    // Apply the search
	    table.columns().every( function () {
	        var that = this;
	 
	        $( 'input', this.footer() ).on( 'keyup change', function () {
	            if ( that.search() !== this.value ) {
	                that
	                    .search( this.value )
	                    .draw();
	            }
	        } );
	    } );

	} );

	var idPercentage = document.querySelectorAll('.percentage');
		for(var i = 0; i < idPercentage.length; i++) {
			console.log(idPercentage.textContent);
			if(idPercentage[i].textContent !== '0') {
				var arrayPercent = new Array();
				arrayPercent = idPercentage[i].textContent.split("");
				if(arrayPercent.length >= 4) {
					idPercentage[i].textContent = arrayPercent[0]+arrayPercent[1]+arrayPercent[2]+arrayPercent[3]+arrayPercent[4];
				}
				
			}
			
		}

	// var inputAction = document.querySelector('#actions_tfoot');
	// inputAction.removeChild(inputAction.childNodes);
	var dengan_rupiah = document.querySelectorAll('.contract_value');
	// var contractValue = document.querySelectorAll('.contract_value');

	// dengan_rupiah.innerHTML = formatRupiah(dengan_rupiah.innerHTML);
	for(var i = 0; i < dengan_rupiah.length; i++) {
		var sliceValue = dengan_rupiah[i].textContent.slice(0, -4);
		sliceValue = formatRupiah(sliceValue);
		dengan_rupiah[i].textContent = sliceValue; 
	}
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

fetch(url, {
	headers: {
	  'Authorization': 'Bearer'+bearerToken
	},

}).then(function (response) {
	return response.json()
}).then(function (data) {
	console.log('Data User', data);
	createListSummary(data);
})

// function deleteUser(id) {
// 	localStorage.setItem('delete_user', id);
// 	dialog.showModal();
// }

function detailProject(id) {
	localStorage.setItem('detail-project_id', id);
	window.location.href = 'detail_project.html';
}


// var dialog = document.querySelector('dialog');
// var deleteBtnId = document.querySelector('.delete');
// if (! dialog.showModal) {
//     dialogPolyfill.registerDialog(dialog);
// }

// deleteBtnId.addEventListener('click', function (event) {
//         var idDel = localStorage.getItem('delete_user');
//         var userId = localStorage.getItem('user_id');
//         sendDataUser = new FormData();
//         sendDataUser.append('user_id', userId);
//         var userIdInt = parseInt(userId)
//         var idDelInt = parseInt(idDel);
//         var urlDel = 'api_poremo/public/api/v1/user';
//         fetch(urlDel+'/'+idDel+'/delete', {
//             method: 'POST',
//             body: sendDataUser
//         }).then(function (response) {
//             return response.json();
//         }).then(function (data) {
//             console.log('data terhapus', data);
//             window.location.href = 'users.html';
//             // return dbPromise
//             // .then(function (db) {
//             //     var tx = db.transaction('data-project', 'readwrite');
//             //     var store = tx.objectStore('data-project');
//             //     store.delete(idDelInt);
//             //     return tx.complete;
//             // })
//             // .then(function () {
//             //     console.log('Item deleted!');
//             // })
//             // .then(function() {
//             //     window.location.href = 'galeri.html';
//             // })
//         }).catch(function (err) {
//             console.log('Ada error', err);
//         })
//     })

