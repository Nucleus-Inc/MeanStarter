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
    'ngRoute',
    'LocalStorageModule',
    'Auth',
    'Activation',
    'Storage'
  ])
  .config(function($routeProvider, $locationProvider, $qProvider) {

    // Remove '!' from path
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profileCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/account/:id/activate', {
        templateUrl: 'app/views/account/activation.html',
        controller: 'ActivationCtrl',
        controllerAs: 'activationCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($rootScope, $location, Auth) {

    /* Route events */

    $rootScope.$on("$routeChangeStart", function(event, next, current) {

    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      if (rejection) {
        $location.path("/");
      }
    });

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

    });
  });
