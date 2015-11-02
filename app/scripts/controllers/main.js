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

  	$scope.origin = Origin;
  	$scope.places = Places;
  	$scope.place = Places[0]

	$scope.updateMap = function(location2){
		$scope.place = location2;
	}

	$scope.isSelected = function(which){
		return which === $scope.place;
	}

	$scope.setOrigin = function(which){
		GetDistance.getOrigin(which).then(function(data){
			$scope.origin = data;
			GetDistance.getPlaces(CONFIG.places).then(function(data){
				$scope.places = data;
				$scope.place = $scope.places[0];
			});
		});
	}
  });
