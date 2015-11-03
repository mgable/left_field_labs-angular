'use strict';

/**
 * @ngdoc function
 * @name leftfieldlabsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leftfieldlabsApp
 */
angular.module('leftfieldlabsApp')
  .controller('MainCtrl', function ($scope, GetDistance, CONFIG, Origin, Places) {
  	var origin_address_reset;

  	$scope.origin = Origin;
  	$scope.places = Places;
  	$scope.place = Places[0];

  	remember($scope.origin.formatted_address);

	$scope.updateMap = function(location2){
		$scope.place = location2;
	}

	$scope.isSelected = function(which){
		return which === $scope.place;
	}

	$scope.setOrigin = function(which){
		GetDistance.getOrigin(which).then(function(data){
			if (data){
				$scope.origin = data;
				remember($scope.origin.formatted_address);
				GetDistance.getPlaces(CONFIG.places).then(function(data){
					$scope.places = data;
					$scope.place = $scope.places[0];
				});
			} else {
				resetOrigin(origin_address_reset);
				alert ("No results where found for that search");
			}
		});
	}

	function remember(which){
		origin_address_reset = which; 
	}

	function resetOrigin(which){
		$scope.origin.formatted_address = which;
	}

  });
