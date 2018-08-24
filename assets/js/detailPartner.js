var descDetail = document.querySelector('.desc-partner-detail');
var bearerToken = localStorage.getItem('access_token');
function createOneDetailPartner(data) {
    // console.log('ini contoh', data.project.title);
    
        descDetail.innerHTML = 
        `<table class="desc-full mdl-data-table mdl-js-data-table">
        <tbody>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Bidang Pekerjaan</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.work_category}</span>
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Nama Pemasok</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.institution}</span>
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Alamat</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.address}</span>
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Kantor Cabang</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.branch1}</span>
            </td>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Email</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.main_email} / ${data.partner.alternate_email}</span>
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Telepon</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.office_phone1} (Telpon lain: ${data.partner.office_phone2})</span>
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric"><span style="font-size: 16px;color: #d44338;
            text-transform: uppercase;">Contact Person</span>
            <br><br>
            <span style="font-size:11.5px">${data.partner.contact_person1} (${data.partner.contact_person1_telephone}) 
            / ${data.partner.contact_person2} (${data.partner.contact_person2_telephone})</span>
            </td>
          </tr>
        </tbody>
      </table>`;
    
}
    
var urlId = localStorage.getItem('detail-partner_id');
var url = 'api_poremo/public/api/v1/partner';

fetch(url+'/'+urlId, {
  headers: {
    'Authorization': 'Bearer'+bearerToken
  },

}).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log('berhasil menarik data', data);
  createOneDetailPartner(data);
})