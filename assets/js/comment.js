var insertComment = document.querySelector('#comment_insert');
var userId = localStorage.getItem('user_id');
var bearerToken = localStorage.getItem('access_token');
// var userIdSend = new FormData();
// userIdSend.append('user_id', userId);

insertComment.addEventListener('click', function (event) {
	event.preventDefault();
	var contentComment = document.querySelector('#content');
	var reportItem = localStorage.getItem('comment_report-item');
	var sendCommentHeader = new FormData();
	sendCommentHeader.append('parent_id', 0);
	sendCommentHeader.append('user_id', userId);
	sendCommentHeader.append('content', contentComment.value);

	var url = 'api_poremo/public/api/v1/comment/report/item';
	fetch(url+'/'+reportItem, {
		method: 'POST',
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },
		body: sendCommentHeader
	}).then(function (response) {
		console.log(response.status);
		return response.json();
	}).then(function (data) {
		console.log('Berhasil Memasukkan data', data);
		window.location.href = 'notes.html';
	}).catch(function (err) {
		console.log('Tidak berhasil memasukkan Data', err);
	})
});

var commentHeader = document.querySelector('#comment_header');
var commentHeaderHtml = '';
var commentAnswers = document.querySelector('#comment_answers');

function createListCommentHeader(data) {

	for(var i in data.comments) {
		commentHeaderHtml += 
			`<header style="margin-top:25px;" class="comment__header">
						  <i style="font-size:40px;margin-right:8px;" class="material-icons">person</i>
						  <div class="comment__author">
						    <strong id="namaAuthor_${data.comments[i].id}">${data.comments[i].user.name} / ${data.comments[i].user.role}</strong>
						    <span>${data.comments[i].updated_at}</span>
						  </div>
						</header>
						<div class="comment__text" id="content_isi_${data.comments[i].id}">${data.comments[i].content}</div>
						<nav class="comment__actions">
						  <button onclick="replyComment(${data.comments[i].id})" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
						    <i class="material-icons" role="presentation">reply</i><span class="visuallyhidden">balas notes</span>
						  </button>
						  `;

						  if (localStorage.getItem('user_id') == data.comments[i].user_id) {
						  	commentHeaderHtml += 
                `<button onclick="editComment(${data.comments[i].id})" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                   <i class="material-icons" role="presentation">mode_edit</i><span class="visuallyhidden">edit notes</span>
                 </button>
                <button onclick="deleteComment(${data.comments[i].id})" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
						      <i class="material-icons" role="presentation">delete_forever</i><span class="visuallyhidden">hapus</span>
						     </button>`;
						  }
						  
						commentHeaderHtml+=`</nav>`;
		for(var j in data.comments[i].child_comments) {
			commentHeaderHtml += 
			`<div class="comment__answers">
				<div class="comment">
				  <header class="comment__header">
				    <i style="font-size:40px;margin-right:8px;" class="material-icons">person</i>
				    <div class="comment__author">
				      <strong id="namaAuthor_${data.comments[i].child_comments[j].id}">${data.comments[i].child_comments[j].user.name} / ${data.comments[i].child_comments[j].user.role}</strong>
				      <span>${data.comments[i].child_comments[j].updated_at}</span>
				      <span style="display:none;" id="parentId_${data.comments[i].child_comments[j].id}">${data.comments[i].id}</span>
				    </div>
				  </header>
				  <div class="comment__text" id="content_isi_${data.comments[i].child_comments[j].id}">${data.comments[i].child_comments[j].content}</div>
				  <nav class="comment__actions">
				    <button onclick="replyChildComment(${data.comments[i].child_comments[j].id})" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
				      <i class="material-icons" role="presentation">reply</i><span class="visuallyhidden">balas notes</span>
				    </button>`;
            if (localStorage.getItem('user_id') == data.comments[i].child_comments[j].user_id) {
              commentHeaderHtml += 
              `<button onclick="editComment(${data.comments[i].child_comments[j].id})" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i class="material-icons" role="presentation">mode_edit</i><span class="visuallyhidden">edit notes</span>
              </button>
              <button onclick="deleteComment(${data.comments[i].child_comments[j].id})" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i class="material-icons" role="presentation">delete_forever</i><span class="visuallyhidden">hapus</span>
              </button>`; 
            }
				    commentHeaderHtml +=
				  `</nav>
				</div>
			</div>`;
		}
		
	}

  commentHeader.innerHTML = commentHeaderHtml;

	// for(var j in data.comments) {
	// 	for(var k in data.comments[j].child_comments) {
	// 		if(data.comments[j].child_comments.length > 0) {
				
	// 		}
	// 	}
	// }
	dialogDelete.querySelector('.close_delete').addEventListener('click', function() {
	    dialogDelete.close();
	  });
	dialogEdit.querySelector('.close_edit').addEventListener('click', function() {
	    dialogEdit.close();
	  });
	dialogReply.querySelector('.close_reply').addEventListener('click', function() {
	    dialogReply.close();
	  });
	
}

var urlGet = 'api_poremo/public/api/v1/comment/report/item';
var reportItem_ID = localStorage.getItem('comment_report-item');
fetch(urlGet+'/'+reportItem_ID, {
  headers: {
    'Authorization': 'Bearer'+bearerToken
  },

}).then(function (response) {
	return response.json();
}).then(function (data) {
	console.log('Data dari Web', data);
	createListCommentHeader(data);
})

var dialogDelete = document.querySelector('.delete_dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialogDelete.showModal) {
    dialogPolyfill.registerDialog(dialogDelete);
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('delete-comment-reports_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/comment';
        fetch(urlDel+'/'+idDel+'/delete', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Data berhasil terdelete', data);
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-reports', 'readwrite');
            //     var store = tx.objectStore('data-reports');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // }).then(function(){
              window.location.href = 'notes.html';
            // }) 
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

var dialogEdit = document.querySelector('.edit_dialog');
var editBtnId = document.querySelector('.edit');
if (! dialogEdit.showModal) {
    dialogPolyfill.registerDialog(dialogEdit);
}

editBtnId.addEventListener('click', function () {
        var idEdit = localStorage.getItem('edit-comment-reports_id');
        var contentEdit = document.querySelector('#content_edit');
        var sendContentEdit = new FormData();
        sendContentEdit.append('content', contentEdit.value);
        var idEditInt = parseInt(idEdit);
        var urlEdit = 'api_poremo/public/api/v1/comment';
        fetch(urlEdit+'/'+idEdit+'/update', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendContentEdit
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Data berhasil terupdate', data);
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-reports', 'readwrite');
            //     var store = tx.objectStore('data-reports');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // }).then(function(){
              window.location.href = 'notes.html';
            // }) 
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

var dialogReply = document.querySelector('.reply_dialog');
var replyBtnId = document.querySelector('.reply');
if (! dialogReply.showModal) {
    dialogPolyfill.registerDialog(dialogReply);
}

replyBtnId.addEventListener('click', function () {
        var parentId = localStorage.getItem('reply-comment-reports_id'); //parent_id
        var contentReply = document.querySelector('#content-header_reply');
        var reportItem = localStorage.getItem('comment_report-item');
        var sendContentReply = new FormData();
        sendContentReply.append('content', contentReply.value);
        sendContentReply.append('user_id', userId);
        sendContentReply.append('parent_id', parentId);
        // var idEditInt = parseInt(idEdit);
        var urlReply = 'api_poremo/public/api/v1/comment/report/item';
        fetch(urlReply+'/'+reportItem, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer'+bearerToken
            },
            body: sendContentReply
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Komen berhasil Dibalas', data);
            // return dbPromise
            // .then(function (db) {
            //     var tx = db.transaction('data-reports', 'readwrite');
            //     var store = tx.objectStore('data-reports');
            //     store.delete(idDelInt);
            //     return tx.complete;
            // })
            // .then(function () {
            //     console.log('Item deleted!');
            // }).then(function(){
              window.location.href = 'notes.html';
            // }) 
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })

function deleteComment(id) {
  localStorage.setItem('delete-comment-reports_id', id);
  dialogDelete.showModal();
}

function editComment(id) {
  localStorage.setItem('edit-comment-reports_id', id);
  var contentEdit = document.querySelector('#content_edit');
  var contentIsi = document.querySelector('#content_isi_'+id).innerHTML;
  contentEdit.value = contentIsi;
  dialogEdit.showModal();
}

function replyComment(id) {
  localStorage.setItem('reply-comment-reports_id', id);
  var namaComment = document.querySelector('#nama_comment');
  var namaAuthor = document.querySelector('#namaAuthor_'+id).textContent;
  namaComment.textContent = namaAuthor;
  var commentReply = document.querySelector('#comment-reply_header');
  var contentIsi = document.querySelector('#content_isi_'+id).innerHTML;
  commentReply.textContent = contentIsi;
  dialogReply.showModal();
}

function replyChildComment(id) {
  var parentIdAnswer = document.querySelector('#parentId_'+id);	
  localStorage.setItem('reply-comment-reports_id', parentIdAnswer.textContent);
  var namaComment = document.querySelector('#nama_comment');
  var namaAuthor = document.querySelector('#namaAuthor_'+id).textContent;
  namaComment.textContent = namaAuthor;
  var commentReply = document.querySelector('#comment-reply_header');
  var contentIsi = document.querySelector('#content_isi_'+id).innerHTML;
  commentReply.textContent = contentIsi;
  dialogReply.showModal();
}