angular.module('selflessApp')
		.directive('map', Gmap);


styleSelfless = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]


function Gmap() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="google-map"></div>',
		scope: {
			center: '=',
			markers: '='
		},
		link: function($scope, $element, attr) {
			if(!$scope.center) throw new Error("You must provide a center for your map directive");

			var map = new google.maps.Map($element[0], {
				center: $scope.center,
				zoom: 12,
				styles: styleSelfless
			});

			var blueMarker = 'images/marker-blue.png';
			var greenMarker = 'images/marker.png';
			var MARKERS = [];

			function destroyMarkers() {
				MARKERS.forEach(function(marker) {
					marker.setMap(null);
					if(marker.infoWindow){
						marker.infoWindow.setMap(null);
						marker.infoWindow;
					}
					delete marker;
				});
				MARKERS = [];
			}

			$scope.$watch('markers', function(markers) {
				destroyMarkers();
				if(markers) {
					markers.forEach(function(position, idx) {
						var marker = new google.maps.Marker({
							name: position.name,
							map: map,
							position: { lng: parseFloat(position.lng), lat: parseFloat(position.lat) },
							icon: position.challengeMet ? greenMarker : blueMarker
						});

						MARKERS.push(marker);

						if(!position.challengeMet) {
							var posString = [position.lat, position.lng, idx].join(',');

							var content = '<button class="infowindow" onclick="meetChallenge('+posString+')">Ticked!</button>';

							marker.infoWindow = new google.maps.InfoWindow({
								content: content
							})
							marker.addListener('click', function() {
								marker.infoWindow.open(map, marker);
							});
						}
						
					});
				}
			}, true);

			// try to center map to current location.
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
			    var pos = {
			      lat: position.coords.latitude,
			      lng: position.coords.longitude
			    };

			    map.setCenter(pos);
			  }, function() {
			    handleLocationError(true, infoWindow, map.getCenter());
			  });
			}
		}
	}
}
