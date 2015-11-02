'use strict';

/**
 * @ngdoc overview
 * @name leftfieldlabsApp
 * @description
 * # leftfieldlabsApp
 *
 * Main module of the application.
 */
angular
  .module('leftfieldlabsApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          "Origin": function(GetDistance){ return GetDistance.getOrigin()},
          "Places": function(GetDistance){ return GetDistance.getPlaces()}
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
