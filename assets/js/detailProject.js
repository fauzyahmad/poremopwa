var descDetail = document.querySelector('.desc-project-detail');
var userRole = localStorage.getItem('user_role');
var bearerToken = localStorage.getItem('access_token');
function createOneDetail(data) {
    // console.log('ini contoh', data.project.title);
    
    	if (data.project.partner_id === null) {
    	    descDetail.innerHTML = 
    	    `<div style="margin: 0 auto;display:table;" id="detail-project-action">
    	      <button id="edit_${data.project.id}" onclick="editItem(${data.project.id})" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
    	      <i class="material-icons">border_color</i>
    	      </button>
    	      <button id="delete_${data.project.id}" onclick="deleteItem(${data.project.id})" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
    	      <i class="material-icons">delete_sweep</i>
    	      </button>
    	    </div>
    	    <table class="desc-full mdl-data-table mdl-js-data-table">
    	    <tbody>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
    	        <td>:</td>
    	        <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Alamat</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">Belum ada (Partner harus Accept Project)</td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Durasi Kerja</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.duration} Hari</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Pagu</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">Rp <span id="contract_value">${data.project.contract_value}</span></td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">List Mitra Kerja</td>
    	        <td>:</td>
    	        <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Description</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
    	      </tr>
    	    </tbody>
    	  </table>

          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>
    	  

    	  <div class="fitur-project mdl-grid">
    	      <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
    	          BOQ
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
    	          Report
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
    	          Shop
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
    	          Asbuilt
    	      </div>
    	      <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
    	      <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
    	      <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
    	      <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
    	  </div>`;
    	} else{
    		
    	
    	    descDetail.innerHTML += 
    	    `<div style="margin: 0 auto;display:table;" id="detail-project-action">
    	      <button id="edit_${data.project.id}" onclick="editItem(${data.project.id})" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
    	      <i class="material-icons">border_color</i>
    	      </button>
    	      <button id="delete_${data.project.id}" onclick="deleteItem(${data.project.id})" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
    	      <i class="material-icons">delete_sweep</i>
    	      </button>
    	    </div>
    	    <table class="desc-full mdl-data-table mdl-js-data-table">
    	    <tbody>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
    	        <td>:</td>
    	        <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Alamat</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.deadline}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Contract Value</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">Rp <span id="contract_value">${data.project.contract_value}</span></td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Mitra Kerja</td>
    	        <td>:</td>
    	        <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Description</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
    	      </tr>
    	    </tbody>
    	  </table>

          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>
    	  

    	  <div class="fitur-project mdl-grid">
    	      <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
    	          BOQ
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
    	          Report
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
    	          Shop
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
    	          Asbuilt
    	      </div>
    	      <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
    	      <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
    	      <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
    	      <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
    	  </div>`;
    	
    	}
    	
    
    

    // descDetail.innerHTML = descDetailHtml;
    
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

  var dengan_rupiah = document.getElementById('contract_value').textContent;
  var contractValue = document.getElementById('contract_value');

  // dengan_rupiah.innerHTML = formatRupiah(dengan_rupiah.innerHTML);
  var sliceValue = dengan_rupiah.slice(0, -4);
  sliceValue = formatRupiah(sliceValue);
  console.log(sliceValue);
  contractValue.innerHTML = sliceValue;
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

function createOneDetailSupervisor(data) {
    // console.log('ini contoh', data.project.title);
    
    	if (data.project.partner_id === null) {
            
    	    descDetail.innerHTML = 
    	    `<div style="margin: 0 auto;display:table;" id="detail-project-action">
    	      <button id="edit_${data.project.id}" onclick="editItem(${data.project.id})" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
    	      <i class="material-icons">border_color</i>
    	      </button>
    	      
    	    </div>
    	    <table class="desc-full mdl-data-table mdl-js-data-table">
    	    <tbody>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
    	        <td>:</td>
    	        <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Alamat</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">Belum ada (Partner harus accept Project)</td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Durasi Kerja</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.duration} Hari</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">List Mitra Kerja</td>
    	        <td>:</td>
    	        <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Description</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
    	      </tr>
    	    </tbody>
    	  </table>

          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>

    	  <div class="fitur-project mdl-grid">
    	      <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
    	          BOQ
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
    	          Report
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
    	          Shop
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
    	          Asbuilt
    	      </div>
    	      <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
    	      <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
    	      <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
    	      <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
    	  </div>`;
    	} else {
    		
    	    descDetail.innerHTML += 
    	    `<div style="margin: 0 auto;display:table;" id="detail-project-action">
    	      <button id="edit_${data.project.id}" onclick="editItem(${data.project.id})" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
    	      <i class="material-icons">border_color</i>
    	      </button>
    	      
    	    </div>
    	    <table class="desc-full mdl-data-table mdl-js-data-table">
    	    <tbody>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
    	        <td>:</td>
    	        <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Alamat</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.deadline}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Mitra Kerja</td>
    	        <td>:</td>
    	        <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Description</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
    	      </tr>
    	    </tbody>
    	  </table>
    	  
          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>

    	  <div class="fitur-project mdl-grid">
    	      <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
    	          BOQ
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
    	          Report
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
    	          Shop
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
    	          Asbuilt
    	      </div>
    	      <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
    	      <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
    	      <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
    	      <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
    	  </div>`;
    	
    }
    

    // descDetail.innerHTML = descDetailHtml;
    
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

  // var dengan_rupiah = document.getElementById('contract_value').textContent;
  // var contractValue = document.getElementById('contract_value');

  // // dengan_rupiah.innerHTML = formatRupiah(dengan_rupiah.innerHTML);
  // var sliceValue = dengan_rupiah.slice(0, -4);
  // sliceValue = formatRupiah(sliceValue);
  // console.log(sliceValue);
  // contractValue.innerHTML = sliceValue;
  // function formatRupiah(bilangan, prefix)
  // {
  //     var number_string = bilangan.replace(/[^,\d]/g, '').toString(),
  //         split   = number_string.split(','),
  //         sisa    = split[0].length % 3,
  //         rupiah  = split[0].substr(0, sisa),
  //         ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
          
  //     if (ribuan) {
  //         separator = sisa ? '.' : '';
  //         rupiah += separator + ribuan.join('.');
  //     }
      
  //     rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  //     return prefix == undefined ? rupiah : (rupiah ? rupiah : '');
  // }
}

function createOneDetailPartner(data) {
    // console.log('ini contoh', data.project.title);
    		
    	    descDetail.innerHTML += 
    	    `
    	    <table class="desc-full mdl-data-table mdl-js-data-table">
    	    <tbody>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
    	        <td>:</td>
    	        <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Alamat</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.deadline}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Mitra Kerja</td>
    	        <td>:</td>
    	        <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
    	      </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Description</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
    	      </tr>
    	      <tr>
    	        <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
    	        <td>:</td>
    	        <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
    	      </tr>
    	    </tbody>
    	  </table>

          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>
    	  
    	  <div class="fitur-project mdl-grid">
    	      <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
    	          BOQ
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
    	          Report
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
    	          Shop
    	      </div>
    	      <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
    	          Asbuilt
    	      </div>
    	      <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
    	      <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
    	      <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
    	      <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
    	  </div>`;
    	
    

    // descDetail.innerHTML = descDetailHtml;
    
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

  // var dengan_rupiah = document.getElementById('contract_value').textContent;
  // var contractValue = document.getElementById('contract_value');

  // // dengan_rupiah.innerHTML = formatRupiah(dengan_rupiah.innerHTML);
  // var sliceValue = dengan_rupiah.slice(0, -4);
  // sliceValue = formatRupiah(sliceValue);
  // console.log(sliceValue);
  // contractValue.innerHTML = sliceValue;
  // function formatRupiah(bilangan, prefix)
  // {
  //     var number_string = bilangan.replace(/[^,\d]/g, '').toString(),
  //         split   = number_string.split(','),
  //         sisa    = split[0].length % 3,
  //         rupiah  = split[0].substr(0, sisa),
  //         ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
          
  //     if (ribuan) {
  //         separator = sisa ? '.' : '';
  //         rupiah += separator + ribuan.join('.');
  //     }
      
  //     rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  //     return prefix == undefined ? rupiah : (rupiah ? rupiah : '');
  // }
}

function createOneDetailGuest(data) {
    // console.log('ini contoh', data.project.title);
    
        if (data.project.partner_id === null) {
            descDetail.innerHTML = 
            `
            <table class="desc-full mdl-data-table mdl-js-data-table">
            <tbody>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
                <td>:</td>
                <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Alamat</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">Belum ada (Partner harus Accept Project)</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Durasi Kerja</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.duration} Hari</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Pagu</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">Rp <span id="contract_value">${data.project.contract_value}</span></td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">List Mitra Kerja</td>
                <td>:</td>
                <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Description</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>

          <div class="fitur-project mdl-grid">
              <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
                  BOQ
              </div>
              <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
                  Report
              </div>
              <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
                  Shop
              </div>
              <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
                  Asbuilt
              </div>
              <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
              <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
              <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
              <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
          </div>`;
        } else {
            
        
            descDetail.innerHTML += 
            `
            <table class="desc-full mdl-data-table mdl-js-data-table">
            <tbody>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Nama Project</td>
                <td>:</td>
                <td id="titleProject_${data.project.id}" class="mdl-data-table__cell--non-numeric">${data.project.title}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Alamat</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.address}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tenggat Waktu</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.deadline}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Contract Value</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">Rp <span id="contract_value">${data.project.contract_value}</span></td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Mitra Kerja</td>
                <td>:</td>
                <td id="mitra-kerja" class="mdl-data-table__cell--non-numeric"></td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Tahun Anggaran</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.fiscal_year} - Q${data.project.quartal}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Description</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.description}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Update Terakhir</td>
                <td>:</td>
                <td class="mdl-data-table__cell--non-numeric">${data.project.updated_at}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin: 0 auto;display:table;">
            <button onclick="location.href='pic.html'" type="button" style="margin: 5px 10px;" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
                <i class="material-icons">account_circle</i> PIC
            </button>
          </div>
          

          <div class="fitur-project mdl-grid">
              <div class="mdl-tooltip mdl-tooltip--large" for="boq_${data.project.id}">
                  BOQ
              </div>
              <div class="mdl-tooltip mdl-tooltip--large" for="report_${data.project.id}">
                  Report
              </div>
              <div class="mdl-tooltip mdl-tooltip--large" for="shop_${data.project.id}">
                  Shop
              </div>
              <div class="mdl-tooltip mdl-tooltip--large" for="asbuilt_${data.project.id}">
                  Asbuilt
              </div>
              <div id="boq_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="boQ(${data.project.id})"><i class="color-icon material-icons">description</i> <p>Bill of Quantity</p></div>
              <div id="report_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="reportProject(${data.project.id})"><i class="color-icon material-icons">assessment</i> <p>Report Project</p></div>
              <div id="shop_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="shopDrawing(${data.project.id})"><i class="color-icon material-icons">collections</i> <p>Shop Drawing</p></div>
              <div id="asbuilt_${data.project.id}" class="margin-cell mdl-cell mdl-cell--3-col mdl-cell--2-col-phone" onclick="asbuiltDraw(${data.project.id})"><i class="color-icon material-icons">panorama</i> <p>Asbuilt Drawing</p></div>
          </div>`;
        
        }
        
    
    

    // descDetail.innerHTML = descDetailHtml;
    
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

  var dengan_rupiah = document.getElementById('contract_value').textContent;
  var contractValue = document.getElementById('contract_value');

  // dengan_rupiah.innerHTML = formatRupiah(dengan_rupiah.innerHTML);
  var sliceValue = dengan_rupiah.slice(0, -4);
  sliceValue = formatRupiah(sliceValue);
  console.log(sliceValue);
  contractValue.innerHTML = sliceValue;
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



var idURL = localStorage.getItem('detail-project_id');
var url = 'api_poremo/public/api/v1/project';
var id = parseInt(idURL);
fetch(url+'/'+idURL, {
    headers: {
        'Authorization': 'Bearer'+ bearerToken
    }

}).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log('Dari Project', data);
    if(userRole === 'partner') {
    	console.log('dari partner', data);
      createOneDetailPartner(data);
    } else if (userRole === 'supervisor')  {
    	console.log('dari sup', data);
      createOneDetailSupervisor(data);
    } else if(userRole === 'guest') {
        createOneDetailGuest(data);
    } else {
    	console.log('dari admin', data);
      createOneDetail(data);
    }
    var mitraArray = [];
    var mitraKerja = document.querySelector('#mitra-kerja');
    for(x = 0; x < data.project.partners.length; x++ ) {
        // var obj = data.project.partners[x].institution;
        if (data.project.partners.length > 0) {
            mitraArray.push(data.project.partners[x].institution);
        }  
    }
    mitraKerja.textContent = mitraArray;
    var strReplace = mitraKerja.textContent.replace(/,/g, ", ");
    mitraKerja.textContent = strReplace;

    
});



// if('indexedDB' in window) {
//   console.log(id);
//   dbPromise
//   .then(function (db) {
//     var tx = db.transaction('data-project', 'readonly');
//     var store = tx.objectStore('data-project');
//     return store.get(id);
//   }).then(function (data) {
//     console.log(data);
//     if(userRole === 'partner') {
//       createOneDetailPartner(data);
//     } else if (userRole === 'supervisor')  {
//       createOneDetailSupervisor(data);
//     } else {
//       createOneDetail(data);
//     }
//   })
// }

function boQ(id) {
    var titleProject = document.querySelector('#titleProject_'+id).textContent;
    localStorage.setItem('titleProject', titleProject);
    localStorage.setItem('detail-boQ_id', id);
    window.location.href = 'boq.html';
}
function reportProject(id) {
  var titleProject = document.querySelector('#titleProject_'+id).textContent;
    localStorage.setItem('titleProject', titleProject);
    localStorage.setItem('detail-report_id', id);
    window.location.href = 'report.html';
}
function shopDrawing(id) {
  var titleProject = document.querySelector('#titleProject_'+id).textContent;
    localStorage.setItem('titleProject', titleProject);
    localStorage.setItem('detail-shopD_id', id);
    window.location.href = 'shop-drawing.html'; 
}
function asbuiltDraw(id) {
  var titleProject = document.querySelector('#titleProject_'+id).textContent;
    localStorage.setItem('titleProject', titleProject);
    localStorage.setItem('detail-asD_id', id);
    window.location.href = 'asbuilt.html';
}

function editItem(id) {
    localStorage.setItem('edit-project_id', id);
    window.location.href = 'edit_project.html';
}
function deleteItem(id) {
    localStorage.setItem('delete-project_id', id);
    dialog.showModal();
}

var dialog = document.querySelector('dialog');
var deleteBtnId = document.querySelector('.delete');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

deleteBtnId.addEventListener('click', function () {
        var idDel = localStorage.getItem('delete-project_id');
        var userId = localStorage.getItem('user_id');
        var idDelInt = parseInt(idDel);
        var urlDel = 'api_poremo/public/api/v1/project';
        var sendUserId = new FormData();
        sendUserId.append('user_id', userId);
        fetch(url+'/'+idDel+'/delete', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer'+ bearerToken
            },
            body:sendUserId
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            return dbPromise
            .then(function (db) {
                var tx = db.transaction('data-project', 'readwrite');
                var store = tx.objectStore('data-project');
                store.delete(idDelInt);
                return tx.complete;
            })
            .then(function () {
                console.log('Item deleted!');
            })
            .then(function() {
                window.location.href = 'home.html';
            })
        }).catch(function (err) {
            console.log('Ada error', err);
        })
    })