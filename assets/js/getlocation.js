$(document).ready(function() {
	var geocoder;
	var map;
	
	$('#get-location__input').click(function () {
		var locationLoader = document.querySelector('#location-loader');
		var lihatMap = document.querySelector('#get-location__input');
		var setMap = document.querySelector('#get-address__input');
		var addressLokasi = document.querySelector('#lokasi');
		locationLoader.style.display = 'block';
		lihatMap.style.display = 'none';
		var address=$('#lokasi').val();

		if (addressLokasi.value.trim() === '') {
			locationLoader.style.display = 'none';
			lihatMap.style.display = 'block';
			alert('Lokasi Harus diisi');
			return;
		}
		 
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				document.querySelector('.map').style.display = 'block';
				console.log('geocoder results:');
				console.dir(results);
				locationLoader.style.display = 'none';
				lihatMap.style.display = 'block';
				setMap.style.display = 'block';
				
				var mapOptions = {
					zoom: 16,
					mapTypeControl: true,
					mapTypeControlOptions: {
					  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
					},
					zoomControl: true,
					zoomControlOptions: {
					  style: google.maps.ZoomControlStyle.SMALL
					},
					//streetViewControl: false,
					center: results[0].geometry.location
				}
				
				map = new google.maps.Map(document.getElementById('map1'), mapOptions);
				
				$('#coord_x').val(results[0].geometry.location.lat());
				$('#coord_y').val(results[0].geometry.location.lng());
				
				//map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					draggable: true,
					animation: google.maps.Animation.DROP
				});
				
				google.maps.event.addListener(marker, 'dragend', function() {
					
					marker.setAnimation(google.maps.Animation.DROP);
					
					var marker_pos=marker.getPosition();
					
					console.log('Marker getPosition():');
					console.dir(marker_pos);
					
					$('#coord_x').val(marker_pos.lat());
					$('#coord_y').val(marker_pos.lng());
				});
				
			} else {
				alert('Terjadi Kesalahan (' + status + ')');
			}
		});
	   
	})
  // .trigger('click');
	
	$('#get-address__input').click(function () {
		var coordX = document.querySelector('#id_coord_x');
		var coordY = document.querySelector('#id_coord_y');
		var addressMap = document.querySelector('#id_address');
		var cityMap = document.querySelector('#id_city');
		
		var lat = parseFloat($('#coord_x').val());
		var lng = parseFloat($('#coord_y').val());
		var latlng = new google.maps.LatLng(lat, lng);
	   
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				
				console.log('Reverse Geocoding:');
				console.dir(results);
				coordX.style.display = 'block';
				coordY.style.display = 'block';
				addressMap.style.display = 'block';
				cityMap.style.display = 'block';
				addressMap.classList.add('is-focused');
				addressMap.classList.add('is-dirty');

				$('#address').val(results[0].formatted_address);
				
				// address components: recupero di tutti gli elementi 
				// console.log('Address components:');
				// console.dir(results[0].address_components[4].long_name);
			   if (results[0]) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].types[0] === "locality") {
                            var city = results[i].address_components[2].long_name;
                            var state = results[i].address_components[5].long_name;
                            $('#city').val(city);
                        }
                        else {
                            var city1 = results[i].address_components[3].long_name;
                            var state1 = results[i].address_components[5].long_name;
                            $('#city').val(city1);
                        }
                    }
                }
				// var temp=[];
				// for(var i=0; i<results[0].address_components.length; i++) {
					
				// 	console.log(results[0].address_components[i]);
					
				// 	if($.inArray(results[0].address_components[i].long_name, temp) === -1) { // evita potenziali duplicati
				// 		temp.push(results[0].address_components[i].long_name);
				// 	}
				// 	if($.inArray(results[0].address_components[i].short_name, temp) === -1) { // evita potenziali duplicati
				// 		temp.push(results[0].address_components[i].short_name);
				// 	}
				// }
				
				// console.log('Address components (elaborati):');
				// console.dir(temp);
				// $('#reverseGeocodingResult_address_components').html(temp.join('<br>'));
				
			} else {
				alert("Geocoder failed due to: " + status);
			}
		});
	});
	
});
