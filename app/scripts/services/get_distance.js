'use strict';

/**
 * @ngdoc service
 * @name leftfieldlabsApp.getDistances
 * @description
 * # getDistances
 * Service in the leftfieldlabsApp.
 */
angular.module('leftfieldlabsApp')
  .service('GetDistance', function ($http, CONFIG, $q) {
  	var origin,
  		places;

    this.getOrigin = getOrigin;
    this.getPlaces = getPlaces;

	function getPlaces(){
		return getLocations(CONFIG.places).then(function(data){

	    	places = data.map(function(v,i,a){
	    		var obj = a[i].data.results[0];
	    		obj.distanceFromOrigin= getDistance(origin, obj);
	    		return obj;
	    	});

	    	return places.sort(sort);
		});
	}

	function getOrigin(){
		return getLocation(CONFIG.origin).then(function(data){
			origin = data.data.results[0]
	    	return origin;
	    });
	}
    
    function getLocations(addresses){
    	return $q.all(addresses.map(getLocation));
    }

    function getLocation(address){
    	return $http.get(makeUrl(address));
    }

    function makeUrl(address){
    	return CONFIG.protocal + "://" + CONFIG.domain  + CONFIG.format + "?key=" + CONFIG.apiKey + "&address=" + address
    }

    function sort(a,b){
    	return a.distanceFromOrigin - b.distanceFromOrigin;
    }

    function getDistance(location1Obj, location2Obj){
		var RADIUS = CONFIG.radius[CONFIG.radius.selected],
			location1 = location1Obj.geometry.location,
			location2 = location2Obj.geometry.location,
			dLat = toRad(location2.lat - location1.lat),
			dLon = toRad(location2.lng - location1.lng),
			dLat1 = toRad(location1.lat),
			dLat2 = toRad(location2.lat),
			a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(dLat1) * Math.cos(dLat1) * Math.sin(dLon/2) * Math.sin(dLon/2),
			c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
			distance = RADIUS.distance * c;

		return distance.toFixed(0);
	}

	function toRad(deg) {
		return deg * Math.PI/180;
	}

  });


