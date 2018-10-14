InitializeVariablesGoogleMaps();
InitializeCenterMap();
InitializeListenersGoogleMaps();

//Variables 
var mapCenter;
var map;

function InitializeVariablesGoogleMaps() {
	map = document.getElementById('google-maps');
	var mapOptions = {
		center: new google.maps.LatLng(41.66872,-8.369747),
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControl: true,
		streetViewControl: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		scrollwheel: false
	}

	map = new google.maps.Map(map, mapOptions)

}

// Google Maps Marke & Center Initialization
function InitializeCenterMap() {

	var request = {
		placeId: 'ChIJfdMyULkDJQ0RiMRmOCvYWvQ'
	};

	var infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);

	service.getDetails(request, function(place, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			});
		}
	});

	mapCenter = map.getCenter();
	
}

// Google Maps Listeners Initialization
function InitializeListenersGoogleMaps(){
	$(document).ready(function (){

		// add listener for a window resize to keep pin centered
		google.maps.event.addDomListener(window, "resize", function() {
			map.setCenter(mapCenter); 
		});
	});
}