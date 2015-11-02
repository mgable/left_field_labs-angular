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

    this.getLocation = getLocation;
    this.getLocations = getLocations;
    this.getDistance = getDistance;
    this.sort = sort;

    
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


