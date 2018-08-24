var form = document.querySelector('#dialog-form');
var form1 = document.querySelector('#update-report-item');
var userId = localStorage.getItem('user_id');
var bearerToken = localStorage.getItem('access_token');

form1.addEventListener('submit', function (event) {
    event.preventDefault();
    var report_Id = localStorage.getItem('detail-report_update');
    var datetime = document.querySelector('#datetime').value;
    var sendDataReportDetail = new FormData();
    sendDataReportDetail.append('user_id', userId);
    sendDataReportDetail.append('date', datetime);

    fetch('api_poremo/public/api/v1/report'+'/'+report_Id+'/update', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendDataReportDetail
    }).then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        console.log(data);
        alert('Berhasil Mengupdate Report pada tanggal: '+data.report.date);
        window.location.href = 'report.html';
    }).catch(function (err) {
        console.log('Ada error', err);
    })
})

var titleSubProject = document.querySelector('#titleSub');
titleSubProject.textContent = localStorage.getItem('titleProject');

var dialogUpdate = document.querySelector('.dialog-Update');
var okBtnUpdate = document.querySelector('.ok-Update');
if (! dialogUpdate.showModal) {
    dialogPolyfill.registerDialog(dialogUpdate);
}

okBtnUpdate.addEventListener('click', function () {
    window.location.href = 'update_report.html'
})

var dialogFail = document.querySelector('.dialog-Fail');
var okBtnFail = document.querySelector('.ok-Fail');
if (! dialogFail.showModal) {
    dialogPolyfill.registerDialog(dialogFail);
}

okBtnFail.addEventListener('click', function () {
    dialogFail.close();
})

var dialogFailPercent = document.querySelector('.dialog-FailPercent');
var okBtnFail = document.querySelector('.ok-FailPercent');
if (! dialogFailPercent.showModal) {
    dialogPolyfill.registerDialog(dialogFailPercent);
}

okBtnFail.addEventListener('click', function () {
    dialogFailPercent.close();
})

form.addEventListener('submit', function (event) {

    event.preventDefault();
    var percentageReport = document.querySelector('#percentage').value;
    var bobotReport = document.querySelector('#weight').value;
    var persenFloat = parseFloat(percentageReport);
    var bobotFloat = parseFloat(bobotFloat);
    if(percentageReport > bobotReport) {
      dialogFailPercent.showModal();
      return;
    }

    var thumbPhoto = document.querySelectorAll('.thumb');
    if(thumbPhoto.length > 5) {
      dialogFail.showModal();
      return;
    }
    var loaderSubmit = document.querySelector('#location-loaders');
    var submitBtn = document.querySelector('#submitBtn');
    loaderSubmit.style.display = 'block';
    loaderSubmit.style.margin = '0 10px';
    submitBtn.setAttribute('style', 'display:none;');
    var reportItem_Id = localStorage.getItem('update_report-item_id');
    
    var fileInput = $('#file');
    var imgPhoto = document.querySelectorAll('.thumb');
    var sendDataPercentage = new FormData();
    var sendDataReport = new FormData();
    // if(fileInput.val()) {
    //     var fileList = fileInput.get(0).files;
    //     for(var x=0;x<fileList.length;x++) { 
    //         sendDataReport.append('photo'+(x+1), fileList.item(x));    
    //     }
    //     sendDataReport.append('total_photos', fileList.length);
    // }
    for(var i = 0; i < imgPhoto.length; i++) {
      sendDataReport.append('photo'+(i+1), imgPhoto[i].src);
      console.log(imgPhoto[i].src);
    }
    // sendDataReport.append('photo1', $('#img img').attr('src'));  
    sendDataReport.append('total_photos', imgPhoto.length);
    // for (let i = 0; i < fileInput.length; i++) {
    //   let file = JSON.parse(fileInput.eq(i).val());
    //   sendDataReport.append('photo'+(i+1), file.data);
    // }
    // sendDataReport.append('total_photos', fileInput.length);
    sendDataReport.append('user_id', userId);
    // console.log('total_photos', fileInput.length);
    console.log(percentageReport);
    sendDataPercentage.append('user_id', userId);
    sendDataPercentage.append('coord_x', coordX.value);
    sendDataPercentage.append('coord_y', coordY.value);
    sendDataPercentage.append('address', alamatMap.value);
    sendDataPercentage.append('city', lokasiMap.value);
    sendDataPercentage.append('percentage', percentageReport);
    
    var url1 = 'api_poremo/public/api/v1/report/item/'+reportItem_Id+'/photos/update';
    fetch(url1, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendDataReport
    }).then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (data) {
        console.log(data);

    }).then(function (){
        // dialog.close();
        loaderSubmit.style.display = 'none';
        submitBtn.style.display = 'block';
        dialogUpdate.showModal();

        inputLokasi.style.display = 'none';
        inputLokasi.classList.remove('is-dirty');
        inputLokasi.classList.remove('is-focused');
        alamatDiv.style.display = 'none';
        alamatDiv.classList.remove('is-dirty');
        alamatDiv.classList.remove('is-focused');
        alamatMap.removeAttribute('disabled'); 
        geoLocationBtn.style.display = 'block';

    }).catch(function (err) {
        console.log('Ada error', err);
    });

    var url2 = 'api_poremo/public/api/v1/report/item/'+reportItem_Id+'/update';
    console.log(url2);
    fetch(url2, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer'+bearerToken
        },
        body: sendDataPercentage
    }).then(function (response) {
        console.log(response.status);
        console.log(response.statusText);
        return response.json();
    }).then(function (data) {
        console.log(data);
    }).catch(function (err) {
       console.log(err);
    })
});

var reportDetailData = document.querySelector('#only-one');
var reportDetailDataHtml = '';

function clearDatas() {
    while (reportDetailData.hasChildNodes()) {
        reportDetailData.removeChild(reportDetailData.lastChild);
    }
}

function createOneListBoq(data) {
	reportDetailDataHtml = `<div id="date" style="width:100%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused is-dirty">
					<input disabled id="datetime" class="mdl-textfield__input" type="text" name="datetime">
					<label class="mdl-textfield__label" for="datetime">Tanggal dan Waktu</label>
														
				</div>`;
    for (var i in data.report.report_items) {
        reportDetailDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">${data.report.report_items[i].boq_item.name}</h4>
        </header>
        <div data-content>
          <div class="action mdl-card__actions mdl-card--border">
                  <a style="padding:0 3px;" onclick="update(${data.report.report_items[i].id})" class="show-dialog mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                    Update
                  </a>
                  <div style="float: right;">
                      <button style="display:none;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                        <span id="bobot_item_${data.report.report_items[i].id}">${data.report.report_items[i].boq_item.weight}</span>
                      </button>
                      <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                        <span id="persentase_item_${data.report.report_items[i].id}">${data.report.report_items[i].percentage}</span>%
                      </button>
                      <a onclick="commentReport(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">comment</i>
                      </a>
                      <a onclick="photoGaleri(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                      </a>
                  </div>
                </div>
        </div>
</section>`;
        }
         reportDetailData.innerHTML = reportDetailDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });
     
     dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
      
      var fileInput = document.querySelector('#file');
      inputLokasi.style.display = 'none';
      inputLokasi.classList.remove('is-dirty');
      inputLokasi.classList.remove('is-focused');
      alamatDiv.style.display = 'none';
      alamatDiv.classList.remove('is-dirty');
      alamatDiv.classList.remove('is-focused');
      alamatMap.removeAttribute('disabled'); 
      geoLocationBtn.style.display = 'block';
      fileInput.value = null;
      var fileListHtml = document.querySelector('#Filelist');
      fileListHtml.innerHTML = '';
    });

     var today = new Date();
     var dd = today.getDate();

     var mm = today.getMonth()+1; 
     var yyyy = today.getFullYear();
     if(dd<10) 
     {
         dd='0'+dd;
     } 

     if(mm<10) 
     {
         mm='0'+mm;
     } 
     today = yyyy+'-'+mm+'-'+dd;

	// For the time now
	Date.prototype.timeNow = function () {
	     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
	}

	var datetime = today + " " + new Date().timeNow();
	var datetimeNow = document.querySelector('#datetime');
	datetimeNow.value = datetime;
}

function createOneListUpdatePartner(data) {
  reportDetailDataHtml = `<div id="date" style="width:100%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused is-dirty">
          <input disabled id="datetime" class="mdl-textfield__input" type="text" name="datetime">
          <label class="mdl-textfield__label" for="datetime">Tanggal dan Waktu</label>
                            
        </div>`;
  if (data.report.revision_right === 1) {
        for (var i in data.report.report_items) {
            reportDetailDataHtml += `<section data-accordion>
            <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
                <h4 class="title-sub__project mdl-card__title-text">${data.report.report_items[i].boq_item.name}</h4>
            </header>
            <div data-content>
              <div class="action mdl-card__actions mdl-card--border">
                      <a style="padding:0 3px;" onclick="update(${data.report.report_items[i].id})" class="show-dialog mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                        Update
                      </a>
                      <div style="float: right;">
                          <button style="display:none;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                            <span id="bobot_item_${data.report.report_items[i].id}">${data.report.report_items[i].boq_item.weight}</span>
                          </button>
                          <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                            <span id="persentase_item_${data.report.report_items[i].id}">${data.report.report_items[i].percentage}</span>%
                          </button>
                          <a onclick="commentReport(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">comment</i>
                          </a>
                          <a onclick="photoGaleri(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                          </a>
                      </div>
                    </div>
            </div>
    </section>`;
            }
  } else {
        for (var i in data.report.report_items) {
            reportDetailDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">${data.report.report_items[i].boq_item.name}</h4>
        </header>
        <div data-content>
          <div class="action mdl-card__actions mdl-card--border">
                  
                  
                      <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                        <span id="persentase_item_${data.report.report_items[i].id}">${data.report.report_items[i].percentage}</span>%
                      </button>
                      <a onclick="commentReport(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">comment</i>
                      </a>
                      <a onclick="photoGaleri(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                      </a>
                  
                </div>
        </div>
</section>`;
            }
          var submitReport = document.querySelector('#submit-report');
          submitReport.parentNode.removeChild(submitReport);
          var cancelBtn = document.querySelector('#cancel_btn');
          cancelBtn.innerHTML = 'Back';
          cancelBtn.setAttribute('onclick', 'location.href = "report.html"');
  }
  
    
         reportDetailData.innerHTML = reportDetailDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });
     
     dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
      var fileInput = document.querySelector('#file');
      inputLokasi.style.display = 'none';
      inputLokasi.classList.remove('is-dirty');
      inputLokasi.classList.remove('is-focused');
      alamatDiv.style.display = 'none';
      alamatDiv.classList.remove('is-dirty');
      alamatDiv.classList.remove('is-focused');
      alamatMap.removeAttribute('disabled'); 
      geoLocationBtn.style.display = 'block';
      fileInput.value = null;
      var fileListHtml = document.querySelector('#Filelist');
      fileListHtml.innerHTML = '';
    });

     var today = new Date();
     var dd = today.getDate();

     var mm = today.getMonth()+1; 
     var yyyy = today.getFullYear();
     if(dd<10) 
     {
         dd='0'+dd;
     } 

     if(mm<10) 
     {
         mm='0'+mm;
     } 
     today = yyyy+'-'+mm+'-'+dd;

  // For the time now
  Date.prototype.timeNow = function () {
       return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
  }

  var datetime = today + " " + new Date().timeNow();
  var datetimeNow = document.querySelector('#datetime');
  datetimeNow.value = datetime;
}

function createOneListUpdateGuest(data) {
  reportDetailDataHtml = `<div id="date" style="width:100%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused is-dirty">
          <input disabled id="datetime" class="mdl-textfield__input" type="text" name="datetime">
          <label class="mdl-textfield__label" for="datetime">Tanggal dan Waktu</label>
                            
        </div>`;
  
        for (var i in data.report.report_items) {
            reportDetailDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">${data.report.report_items[i].boq_item.name}</h4>
        </header>
        <div data-content>
          <div class="action mdl-card__actions mdl-card--border">
                  
                      
                      <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                        <span id="persentase_item_${data.report.report_items[i].id}">${data.report.report_items[i].percentage}</span>%
                      </button>
                      
                      <a onclick="photoGaleri(${data.report.report_items[i].id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                      </a>
                  
                </div>
        </div>
</section>`;
            }
          var submitReport = document.querySelector('#submit-report');
          submitReport.parentNode.removeChild(submitReport);
          var cancelBtn = document.querySelector('#cancel_btn');
          cancelBtn.innerHTML = 'Back';
          cancelBtn.setAttribute('onclick', 'location.href = "report.html"');
  
  
    
         reportDetailData.innerHTML = reportDetailDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });

     var today = new Date();
     var dd = today.getDate();

     var mm = today.getMonth()+1; 
     var yyyy = today.getFullYear();
     if(dd<10) 
     {
         dd='0'+dd;
     } 

     if(mm<10) 
     {
         mm='0'+mm;
     } 
     today = yyyy+'-'+mm+'-'+dd;

  // For the time now
  Date.prototype.timeNow = function () {
       return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
  }

  var datetime = today + " " + new Date().timeNow();
  var datetimeNow = document.querySelector('#datetime');
  datetimeNow.value = datetime;
}

function createOneCacheListBoq(data) {
    reportDetailDataHtml = `<div id="date" style="width:100%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused is-dirty">
                    <input disabled id="datetime" class="mdl-textfield__input" type="text" name="datetime">
                    <label class="mdl-textfield__label" for="datetime">Tanggal dan Waktu</label>
                                                        
                </div>`;
        reportDetailDataHtml += `<section data-accordion>
        <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
            <h4 class="title-sub__project mdl-card__title-text">${data.boq_item.name}</h4>
        </header>
        <div data-content>
          <div class="action mdl-card__actions mdl-card--border">
                  <a style="padding:0 3px;" onclick="update(${data.id})" class="show-dialog mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                    Update
                  </a>
                  <div style="float: right;">
                      <button style="display:none;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                        <span id="bobot_item_${data.id}">${data.boq_item.weight}</span>
                      </button>
                      <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                        <span id="persentase_item_${data.id}">${data.percentage}</span>%
                      </button>
                      <a onclick="commentReport(${data.id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">comment</i>
                      </a>
                      <a onclick="photoGaleri(${data.id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                      </a>
                  </div>
                </div>
        </div>
</section>`;

         reportDetailData.innerHTML = reportDetailDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });
     
     dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
      var fileInput = document.querySelector('#file');
      inputLokasi.style.display = 'none';
      inputLokasi.classList.remove('is-dirty');
      inputLokasi.classList.remove('is-focused');
      alamatDiv.style.display = 'none';
      alamatDiv.classList.remove('is-dirty');
      alamatDiv.classList.remove('is-focused');
      alamatMap.removeAttribute('disabled'); 
      fileInput.value = null;
      geoLocationBtn.style.display = 'block';
      var fileListHtml = document.querySelector('#Filelist');
      fileListHtml.innerHTML = '';
    });

     var today = new Date();
     var dd = today.getDate();

     var mm = today.getMonth()+1; 
     var yyyy = today.getFullYear();
     if(dd<10) 
     {
         dd='0'+dd;
     } 

     if(mm<10) 
     {
         mm='0'+mm;
     } 
     today = yyyy+'-'+mm+'-'+dd;

    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }

    var datetime = today + " " + new Date().timeNow();
    var datetimeNow = document.querySelector('#datetime');
    datetimeNow.value = datetime;
}

function createOneCacheListUpdatePartner(data) {
    reportDetailDataHtml = `<div id="date" style="width:100%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused is-dirty">
                    <input disabled id="datetime" class="mdl-textfield__input" type="text" name="datetime">
                    <label class="mdl-textfield__label" for="datetime">Tanggal dan Waktu</label>
                                                        
                </div>`;
        if(data.revision_right === 1) {
                  reportDetailDataHtml += `<section data-accordion>
                  <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
                      <h4 class="title-sub__project mdl-card__title-text">${data.boq_item.name}</h4>
                  </header>
                  <div data-content>
                    <div class="action mdl-card__actions mdl-card--border">
                            <a style="padding:0 3px;" onclick="update(${data.id})" class="show-dialog mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                              Update
                            </a>
                            <div style="float: right;">
                                <button style="display:none;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                                  <span id="bobot_item_${data.id}">${data.boq_item.weight}</span>
                                </button>
                                <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                                  <span id="persentase_item_${data.id}">${data.percentage}</span>%
                                </button>
                                <a onclick="commentReport(${data.id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">comment</i>
                                </a>
                                <a onclick="photoGaleri(${data.id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                                </a>
                            </div>
                          </div>
                  </div>
          </section>`;
        } else {
                  reportDetailDataHtml += `<section data-accordion>
                  <header data-control class="mdl-card__title mdl-color--primary mdl-color-text--primary-contrast">
                      <h4 class="title-sub__project mdl-card__title-text">${data.boq_item.name}</h4>
                  </header>
                  <div data-content>
                    <div class="action mdl-card__actions mdl-card--border">
                            
                            
                                <button style="padding:0 3px;" type="button" class="percentage-show mdl-button mdl-button--colored mdl-js-button">
                                  <span id="persentase_item_${data.id}">${data.percentage}</span>%
                                </button>
                                <a onclick="commentReport(${data.id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">comment</i>
                                </a>
                                <a onclick="photoGaleri(${data.id})" type="button" class="mdl-button mdl-button--icon mdl-button--colored mdl-js-button"><i class="material-icons">photo_library</i>
                                </a>
                            
                          </div>
                  </div>
          </section>`;

          var submitReport = document.querySelector('#submit-report');
          submitReport.parentNode.removeChild(submitReport);
          var cancelBtn = document.querySelector('#cancle_btn');
          cancelBtn.innerHTML = 'Back';
          cancelBtn.setAttribute('onclick', 'location.href = "report.html"');
        }
        

         reportDetailData.innerHTML = reportDetailDataHtml;
    $(document).ready(function() {
        $('#only-one [data-accordion]').accordion();
     });
     
     dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
      var fileInput = document.querySelector('#file');
      inputLokasi.style.display = 'none';
      inputLokasi.classList.remove('is-dirty');
      inputLokasi.classList.remove('is-focused');
      alamatDiv.style.display = 'none';
      alamatDiv.classList.remove('is-dirty');
      alamatDiv.classList.remove('is-focused');
      alamatMap.removeAttribute('disabled'); 
      fileInput.value = null;
      geoLocationBtn.style.display = 'block';
      var fileListHtml = document.querySelector('#Filelist');
      fileListHtml.innerHTML = '';
    });

     var today = new Date();
     var dd = today.getDate();

     var mm = today.getMonth()+1; 
     var yyyy = today.getFullYear();
     if(dd<10) 
     {
         dd='0'+dd;
     } 

     if(mm<10) 
     {
         mm='0'+mm;
     } 
     today = yyyy+'-'+mm+'-'+dd;

    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }

    var datetime = today + " " + new Date().timeNow();
    var datetimeNow = document.querySelector('#datetime');
    datetimeNow.value = datetime;
}

var idURL = localStorage.getItem('detail-report_update');
var reportId = parseInt(idURL);
var url = 'api_poremo/public/api/v1/report';
var networkDataReceived = false;
var roleUser = localStorage.getItem('user_role');

if ('indexedDB' in window) {
  if (roleUser === 'partner') {
     console.log(reportId)
    dbPromise.then(function(db) {
       var tx = db.transaction('data-update_report', 'readonly');
       var store = tx.objectStore('data-update_report');
       var index = store.index('report_id');
       return index.getAll(reportId);
     })
    .then(function (data) {
        if (!networkDataReceived) {
            console.log('From cache', data);
            clearDatas();
            for (var i = 0; i < data.length; i++) {
             createOneCacheListUpdatePartner(data[i]);
           }
        }
    });

  } else {
     console.log(reportId)
    dbPromise.then(function(db) {
       var tx = db.transaction('data-update_report', 'readonly');
       var store = tx.objectStore('data-update_report');
       var index = store.index('report_id');
       return index.getAll(reportId);
     })
    .then(function (data) {
        if (!networkDataReceived) {
            console.log('From cache', data);
            clearDatas();
            for (var i = 0; i < data.length; i++) {
             createOneCacheListBoq(data[i]);
           }
        }
    });
  }
    
}

var idUrl = localStorage.getItem('detail-report_update');

if (roleUser === 'partner') {
  fetch(url+'/'+idUrl, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
      networkDataReceived = true;
      clearAllData('data-update_report'); 
      console.log('Dari Project', data);
      clearDatas();
      createOneListUpdatePartner(data);
      
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-update_report', 'readwrite');
          var store = tx.objectStore('data-update_report');
          return Promise.all(data.report.report_items.map(function(itemReport) {
              console.log('Adding item: ', itemReport);
              store.put(itemReport);
              return tx.complete;
             })
           )
          });
  })
  // var titleBoqItem = document.querySelectorAll('.title-sub__project')
  //     for(var i = 0; i < titleBoqItem; i++) {
  //       var titleBoqItemID = titleBoqItem[i].textContent;
  //       fetch('https://poremo.web.id/api_poremo/public/api/v1/boq/item'+'/'+titleBoqItemID, {

  //       }).then(function (response) {
  //         return response.json();
  //       }).then(function (data) {
  //         titleBoqItem[i].textContent = data.boqItem.name;
  //       })
  //     }
} else if(roleUser === 'guest') {
  fetch(url+'/'+idUrl, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
      networkDataReceived = true;
      clearAllData('data-update_report'); 
      console.log('Dari Project', data);
      clearDatas();
      createOneListUpdateGuest(data);
      
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-update_report', 'readwrite');
          var store = tx.objectStore('data-update_report');
          return Promise.all(data.report.report_items.map(function(itemReport) {
              console.log('Adding item: ', itemReport);
              store.put(itemReport);
              return tx.complete;
             })
           )
          });
  })
  // var titleBoqItem = document.querySelectorAll('.title-sub__project')
  //     for(var i = 0; i < titleBoqItem; i++) {
  //       var titleBoqItemID = titleBoqItem[i].textContent;
  //       fetch('https://poremo.web.id/api_poremo/public/api/v1/boq/item'+'/'+titleBoqItemID, {

  //       }).then(function (response) {
  //         return response.json();
  //       }).then(function (data) {
  //         titleBoqItem[i].textContent = data.boqItem.name;
  //       })
  //     }
} else {
  fetch(url+'/'+idUrl, {
    headers: {
      'Authorization': 'Bearer'+bearerToken
    },

  }).then(function (response) {
      return response.json();
  }).then(function (data) {
      networkDataReceived = true;
      clearAllData('data-update_report'); 
      console.log('Dari Project', data);
      clearDatas();
      createOneListBoq(data);
      
      return dbPromise
          .then(function (db) {
          var tx = db.transaction('data-update_report', 'readwrite');
          var store = tx.objectStore('data-update_report');
          return Promise.all(data.report.report_items.map(function(itemReport) {
              console.log('Adding item: ', itemReport);
              store.put(itemReport);
              return tx.complete;
             })
           )
          });
  })
  // var titleBoqItem = document.querySelectorAll('.title-sub__project')
  //     for(var i = 0; i < titleBoqItem; i++) {
  //       var titleBoqItemID = titleBoqItem[i].textContent;
  //       fetch('https://poremo.web.id/api_poremo/public/api/v1/boq/item'+'/'+titleBoqItemID, {

  //       }).then(function (response) {
  //         return response.json();
  //       }).then(function (data) {
  //         titleBoqItem[i].textContent = data.boqItem.name;
  //       })
  //     }
}
	
// function getPhoto() {
//   var photoReportId = localStorage.getItem('update_report-item_id');
//   var url = 'https://poremo.web.id/api_poremo/public/api/v1/report/item';
//   var fileListOut = document.querySelector('#Filelist');

//   fetch(url+'/'+photoReportId+'/photos', {

//   }).then(function (response) {
//     return response.json();
//   }).then(function (data) {
//     console.log(data);
//     for(var i in data.reportItem.report_photos) {
//       Filelist.innerHTML +=
//       `<ul class="thumb-Images" id="imgList">
//         <li>
//           <div class="img-wrap"> 
//             <span class="close">×</span>
//             <img class="thumb" src="api_poremo/public${data.reportItem.report_photos[i].path}">
//           </div>
//         </li>
//       </ul>`;
//     }
//     var photoThumb = document.querySelectorAll('.thumb');
//     for(var j = 0; j < photoThumb.length; j++) {
//       var base64Src = photoThumb[j].toDataURL("image/jpeg");
//       photoThumb[j].src = base64Src;
//     }
//   })
// }
      
var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelectorAll('.show-dialog');
    
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    function update(id){
    	var progressPersen = document.querySelector('#persentase-progress');
    	var percentProject = document.querySelector('#percentage');
      var bobotReport = document.querySelector('#bobot-report');
      var bobotProject = document.querySelector('#weight');
    	var reportItemId = localStorage.setItem('update_report-item_id', id);
		var persentase = document.querySelector('#persentase_item_' + id).innerHTML;
		percentProject.value = persentase;
    var bobot = document.querySelector('#bobot_item_' + id).innerHTML;
    bobotProject.value = bobot;
		dialog.showModal();
		progressPersen.classList.add('is-focused');
		progressPersen.classList.add('is-dirty');
    bobotReport.classList.add('is-focused');
    bobotReport.classList.add('is-dirty');
    // getPhoto();
	}

    function photoGaleri(id) {
      localStorage.setItem('photo_report-item', id);
      window.location.href = 'picture-progress_boq.html'; 
    }

    function commentReport(id) {
      localStorage.setItem('comment_report-item', id);
      window.location.href = 'notes.html'; 
    }

    // function tambahPersen() {
    //   var persencentageValue = document.querySelector('#percentage');
    //   persencentageValue.stepUp(2);
    // }