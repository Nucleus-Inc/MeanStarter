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
    'AuthService',
    'ActivationService',
    'StorageService'
  ])
  .config(function($routeProvider, $locationProvider, $qProvider) {

    // Remove '!' from path
    $locationProvider.hashPrefix('');

    // Disable Unhandled Rejections
    $qProvider.errorOnUnhandledRejections(false);

    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'AuthController',
        controllerAs: 'authCtrl'
      })
      .when('/profile', {
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profileCtrl',
        resolve: {
          access: function(AuthService) {
            return AuthService.isAuthenticated();
          }
        }
      })
      .when('/account/:id/activate', {
        templateUrl: 'app/views/account/activation.html',
        controller: 'ActivationController',
        controllerAs: 'activationCtrl',
      })
      .when('/account/:id/verify', {
        templateUrl: 'app/views/account/verification.html',
        controller: 'EmailConfirmationController',
        controllerAs: 'emailConfirmationCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($rootScope, $location, AuthService) {

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      console.log("Route Start");
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log("Route Change Error: " + JSON.stringify(rejection));
      $location.path("/");
    });

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      if (typeof previous != 'undefined') {
        console.log("Previous Url: " + previous.originalPath);
      }
      console.log("Current Url: " + current.originalPath);

    });

  });
