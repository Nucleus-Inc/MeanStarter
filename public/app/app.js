'use strict';

/**
 * @ngdoc overview
 * @name dashboard
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */

angular
  .module('dashboard',[
    'ngRoute',
    'ngStorage',
    'chart.js',
    'angularModalService',
    'angular-table',
    'cgNotify',
    'alexjoffroy.angular-loaders',
    'ngMessages',
    'ngAnimate',
    'ngSanitize',
    'ui.utils.masks',
    'idf.br-filters',
    'zxcvbn',
    'validation.match',
    'ngFileUpload',
    'angularMoment',
    'slickCarousel',
    'cloudinary'
  ])
  .config(function($routeProvider, $locationProvider, $httpProvider, cloudinaryProvider, CloudinaryConstant) {

    // Remove '!' from path
    $locationProvider.hashPrefix('');

    // Allow cross domain requests
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    cloudinaryProvider
     .set("cloud_name",CloudinaryConstant.cloud_name)
     .set("secure",CloudinaryConstant.secure)
     .set("upload_preset",CloudinaryConstant.upload_preset);

    $routeProvider
      .when('/',{
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl as homeCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/consultores',{
        templateUrl: 'app/views/users/users.html',
        controller: 'UsersCtrl as usersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/perfil',{
        templateUrl: 'app/views/profile/profile.html',
        controller: 'ProfileCtrl as profileCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/settings',{
        templateUrl: 'app/views/profile/settings.html',
        controller: 'SettingsCtrl as settingsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/problemas',{
        templateUrl: 'app/views/report/report.html',
        controller: 'ReportCtrl as reportCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/login',{
        templateUrl: 'app/views/auth/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/cadastrar',{
        templateUrl: 'app/views/auth/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'registerCtrl'
      })
      .when('/recuperar',{
        templateUrl: 'app/views/auth/forgot.html',
        controller: 'ForgotCtrl',
        controllerAs: 'forgotCtrl'
      })
      .when('/consultores/:recoveryKey/redefinir-senha/:token',{
        templateUrl: 'app/views/auth/reset.html',
        controller: 'ResetCtrl',
        controllerAs: 'resetCtrl'
      })
      .when('/activation/:token',{
        templateUrl: 'app/views/auth/activation.html',
        controller: 'ActivationCtrl',
        controllerAs: 'activationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })

  .run(function($rootScope, $location, amMoment) {

    amMoment.changeLocale('pt-br');

    /* Route events */
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      console.log("Route Start");
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log("Route Change Error: " + JSON.stringify(rejection));
      $location.path("/login");
    });

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      if (typeof previous != 'undefined') {
        console.log("Previous Url: " + previous.originalPath);
      }
      console.log("Current Url: " + current.originalPath);
    });

  });
