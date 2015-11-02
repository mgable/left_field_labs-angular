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
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
