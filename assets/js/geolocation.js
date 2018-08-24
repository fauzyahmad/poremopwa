//geolocation https://gist.github.com/danasilver/6024009
var lokasiMap = document.querySelector('#city');
var alamatMap = document.querySelector('#address');
var inputLokasi = document.querySelector('#input-lokasiKota');
var alamatDiv = document.querySelector('#id_address');
var coordX = document.querySelector('#coord_x');
var coordY = document.querySelector('#coord_y');
var geoLocationBtn = document.querySelector('#get-location__input');
var allowLocationBtn = document.querySelector('#allow-location__input');
var locationLoader = document.querySelector('#location-loader');

if('geolocation' in navigator) {
    allowLocationBtn.style.display = 'none';
    geoLocationBtn.style.display = 'block';
}
if(!('geolocation' in navigator))  {
    allowLocationBtn.style.display = 'block';
    geoLocationBtn.style.display = 'none';
}

allowLocationBtn.addEventListener('click', function (event) {
   allowLocationBtn.style.display = 'none';
   locationLoader.style.display = 'block';
   
   navigator.geolocation.getCurrentPosition(function (position) {
    locationLoader.style.display = 'none';
    geoLocationBtn.style.display = 'block';
    allowLocationBtn.style.display = 'none';
   }, function (err) {
       console.log(err);
       locationLoader.style.display = 'none';
       geoLocationBtn.style.display = 'none';
       allowLocationBtn.style.display = 'none';
       inputLokasi.style.display = 'block';
       alamatDiv.style.display = 'block';
   });
});
geoLocationBtn.addEventListener('click', function (event) {
    
    geoLocationBtn.style.display = 'none';
    locationLoader.style.display = 'block';

    navigator.geolocation.getCurrentPosition(function (position) {
        var lat      = position.coords.latitude,
            lng      = position.coords.longitude,
            latlng   = new google.maps.LatLng(lat, lng),
            geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                coordX.value = results[0].geometry.location.lat();
                coordY.value = results[0].geometry.location.lng();
                alamatMap.value = results[0].formatted_address;
                
                if (results[0]) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].types[0] === "administrative_area_level_1") {
                            var city = results[i].address_components[2].long_name;
                            var state = results[i].address_components[5].long_name;
                            lokasiMap.value = city ;
                            inputLokasi.style.display = 'block';
                            inputLokasi.classList.add('is-dirty');
                            inputLokasi.classList.add('is-focused');
                            alamatDiv.style.display = 'block';
                            alamatDiv.classList.add('is-dirty');
                            alamatDiv.classList.add('is-focused');
                            alamatMap.setAttribute('disabled', true); 

                            geoLocationBtn.style.display = 'none';
                            locationLoader.style.display = 'none';
                        }
                        else if(results[i].types[0] === "locality") {
                            var city1 = results[i].address_components[3].long_name;
                            var state1 = results[i].address_components[5].long_name;
                            lokasiMap.value = city1;
                            inputLokasi.style.display = 'block';
                            inputLokasi.classList.add('is-dirty');
                            inputLokasi.classList.add('is-focused');
                            alamatDiv.style.display = 'block';
                            alamatDiv.classList.add('is-dirty');
                            alamatDiv.classList.add('is-focused');
                            alamatMap.setAttribute('disabled', true); 
                            geoLocationBtn.style.display = 'none';
                            locationLoader.style.display = 'none';
                        }
                        else{
                            var city1 = results[i].address_components[4].long_name;
                            var state1 = results[i].address_components[5].long_name;
                            lokasiMap.value = city1;
                            inputLokasi.style.display = 'block';
                            inputLokasi.classList.add('is-dirty');
                            inputLokasi.classList.add('is-focused');
                            alamatDiv.style.display = 'block';
                            alamatDiv.classList.add('is-dirty');
                            alamatDiv.classList.add('is-focused');
                            alamatMap.setAttribute('disabled', true); 
                            geoLocationBtn.style.display = 'none';
                            locationLoader.style.display = 'none';
                        }
                    }
                } else {
                    console.log('error result');
                }
            } 
        });
    }, function (err) {
        console.log('geolocation gagal', err);
        alert('Terjadi Kesalahan, silahkan input manual lokasi Anda');
        inputLokasi.style.display = 'block';
        inputLokasi.classList.add('is-dirty');
        inputLokasi.classList.add('is-focused');
        alamatDiv.style.display = 'block';
        alamatDiv.classList.add('is-dirty');
        alamatDiv.classList.add('is-focused');
        geoLocationBtn.style.display = 'none';
        locationLoader.style.display = 'none';
    }, {timeout: 10000});
});