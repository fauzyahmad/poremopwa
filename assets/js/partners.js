var partnerData = document.querySelector('#body-partners');
var url = 'api_poremo/public/api/v1/partner';
var roleUser = localStorage.getItem('user_role');
var userId = localStorage.getItem('user_id');
var userIdSend = new FormData();
userIdSend.append('user_id', userId);
var bearerToken = localStorage.getItem('access_token');

if(roleUser !== 'admin') {
	window.location.href = 'home.html';
}

function createPartnerOne() {
  localStorage.setItem('role_partner', 1);
}


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

function createListPartners(data) {
	for(var i in data.partners) {
		partnerData.innerHTML +=
		`<tr>
			<td style="padding-left:0px;padding-right:0px;" class="mdl-data-table__cell--non-numeric"><a class="detail-partner" href="javascript:lihatDetail(${data.partners[i].id})">${data.partners[i].institution} / ${data.partners[i].work_category}</td>
			
			<td style="padding-right:0px;">
				<input style="display:none;" id="user_idPartner_${data.partners[i].id}" type="text" value="${data.partners[i].user_id}">
                <a href="#" style="min-width: 0;width: 40px;font-size: 12px;" onclick="editDetail(${data.partners[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
                <i class="material-icons">border_color</i>
                </a>
                <a href="#" style="min-width: 0;width: 40px;font-size: 12px;" onclick="deletePartner(${data.partners[i].id})" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button">
                <i class="material-icons">delete_sweep</i>
                </a>
			</td>
		</tr>`;
	}

	dialog.querySelector('.close').addEventListener('click', function() {
	    dialog.close();
	  });

    $(document).ready(function() {
        $('#example').DataTable( {
            responsive: {
                    details: false
                },
             "language": {
                     "search": "_INPUT_",
                     "searchPlaceholder": "Search...",
                     "lengthMenu": "Display _MENU_ Partner/Page",
                     "zeroRecords": "Tidak ada partner",
                 },
                "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]

        } );
    } );

	// $(document).ready(function() {
	//     // Setup - add a text input to each footer cell
	//     $('#example tfoot th').each( function () {
	//         var title = $(this).text();
	//         $(this).html( '<input type="text" placeholder="Cari '+title+'" />' );
	//     } );
	 
	//     // DataTable
	//     var table = $('#example').DataTable();
	 
	//     // Apply the search
	//     table.columns().every( function () {
	//         var that = this;
	 
	//         $( 'input', this.footer() ).on( 'keyup change', function () {
	//             if ( that.search() !== this.value ) {
	//                 that
	//                     .search( this.value )
	//                     .draw();
	//             }
	//         } );
	//     } );
	// } );

	// var inputAction = document.querySelector('#actions_tfoot');
	// inputAction.removeChild(inputAction.childNodes);
	

}

fetch(url, {
  headers: {
    'Authorization': 'Bearer'+bearerToken
  },

}).then(function (response) {
	return response.json()
}).then(function (data) {
	console.log('Data User', data);
	createListPartners(data);
})

// function deleteUser(id) {
// 	localStorage.setItem('delete_user', id);
// 	dialog.showModal();
// }

function lihatDetail(id) {
	localStorage.setItem('detail-partner_id', id);
	window.location.href = 'detail_partner.html';
}

function editDetail(id) {
	localStorage.setItem('edit-partner_id', id);
	localStorage.removeItem('password');
	localStorage.removeItem('email');
	window.location.href = 'update_partner.html';
}

function deletePartner(id) {
	localStorage.setItem('delete_partner_id', id);
	var user_idPartner = document.querySelector('#user_idPartner_'+id);
	localStorage.setItem('partner_user_id', user_idPartner.value);
	dialog.showModal();
}


var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function (event) {
        var idDel = localStorage.getItem('delete_partner_id');
        var idUserDel = localStorage.getItem('partner_user_id');
        var userId = localStorage.getItem('user_id');
        sendDataUser = new FormData();
        sendDataUser.append('user_id', userId);
        var userIdInt = parseInt(userId)
        var idDelInt = parseInt(idDel);
        var urlDelPartner = 'api_poremo/public/api/v1/partner';
        var urlDelUser = 'api_poremo/public/api/v1/user';
        fetch(urlDelPartner+'/'+idDel+'/delete', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendDataUser
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('data terhapus', data);
            // window.location.href = 'partners.html';
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-project', 'readwrite');
            //     var store = tx.objectStore('data-project');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // })
            // .then(function() {
                
            // })
        }).catch(function (err) {
            console.log('Ada error', err);
        })

        fetch(urlDelUser+'/'+idUserDel+'/delete', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendDataUser
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('data terhapus', data);
            // window.location.href = 'partners.html';
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-project', 'readwrite');
            //     var store = tx.objectStore('data-project');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // })
            // .then(function() {
                window.location.href = 'partners.html';
            // })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

