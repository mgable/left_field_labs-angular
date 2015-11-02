'use strict';

/**
 * @ngdoc function
 * @name leftfieldlabsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leftfieldlabsApp
 */
angular.module('leftfieldlabsApp')
  .controller('MainCtrl', function ($scope, GetDistance, CONFIG) {

    GetDistance.getLocation(CONFIG.origin).then(function(data){
    	$scope.origin = data.data.results[0];
   
	    GetDistance.getLocations(CONFIG.places).then(function(data){

	    	var places = data.map(function(v,i,a){
	    		var obj = a[i].data.results[0];
	    		obj.distanceFromOrigin= GetDistance.getDistance($scope.origin, obj);
	    		return obj;
	    	});

	    	places.sort(GetDistance.sort);

	    	$scope.places = places;

	    	showMap($scope.origin, $scope.places[0]);
	    });
	});

	// creates and shows the map
	function showMap(locationObj1, locationObj2){
		// center of the map (compute the mean value between the two locations)
		var location1 = locationObj1.geometry.location,
			location2 = locationObj2.geometry.location,
			latlng = new google.maps.LatLng( (location1.lat + location2.lat) / 2, (location1.lng + location2.lng) / 2),
		
			mapOptions = {
				zoom: 1,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.HYBRID
			},
		
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions),
		
			// show route between the points
			directionsService = new google.maps.DirectionsService(),
			directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true,suppressInfoWindows: true}),

			request = {
				origin:location1, 
				destination:location2,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};

		directionsDisplay.setMap(map);

		directionsService.route(request, function(response, status){
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				var distance = "The distance between the two points on the chosen route is: "+response.routes[0].legs[0].distance.text;
				distance += "<br/>The aproximative driving time is: "+response.routes[0].legs[0].duration.text;
				//document.getElementById("distance_road").innerHTML = distance;
			}
		});
		
		// show a line between the two points
		var line = new google.maps.Polyline({
			map: map, 
			path: [location1, location2],
			strokeWeight: 7,
			strokeOpacity: 0.8,
			strokeColor: "#FFAA00"
		});
		
		// create the markers for the two locations		
		var marker1 = new google.maps.Marker({
			map: map, 
			position: location1,
			title: "First location"
		});
		var marker2 = new google.maps.Marker({
			map: map, 
			position: location2,
			title: "Second location"
		});
		
		//create the text to be shown in the infowindows
		var text1 = '<div id="content">'+
			'<h1 id="firstHeading">First location</h1>'+
			'<div id="bodyContent">'+
			'<p>Coordinates: '+ location1.lat + " : " + location1.lng + '</p>'+
			'<p>Address: ' + locationObj1.formatted_address + '</p>'+
			'</div>'+
			'</div>';
				
		var text2 = '<div id="content">'+
			'<h1 id="firstHeading">Second location</h1>'+
			'<div id="bodyContent">'+
			'<p>Coordinates: '+ location2.lat + " : " + location2.lng + '</p>'+
			'<p>Address: ' + locationObj2.formatted_address + '</p>'+
			'</div>'+
			'</div>';
		
		// create info boxes for the two markers
		var infowindow1 = new google.maps.InfoWindow({
			content: text1
		});
		var infowindow2 = new google.maps.InfoWindow({
			content: text2
		});

		// add action events so the info windows will be shown when the marker is clicked
		google.maps.event.addListener(marker1, 'click', function() {
			infowindow1.open(map,marker1);
		});
		google.maps.event.addListener(marker2, 'click', function() {
			infowindow2.open(map,marker2);
		});		
	}
  });
