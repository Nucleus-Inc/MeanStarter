'use strict';

/**
 * @ngdoc overview
 * @name meanStarterApp
 * @description
 * # meanStarterApp
 *
 * Main module of the application.
 */
angular
  .module('meanStarterApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {

    // Remove '!' from path
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'app/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
