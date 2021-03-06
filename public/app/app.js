'use strict'

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
  .config(($routeProvider, $locationProvider, $httpProvider, cloudinaryProvider, CloudinaryConstant) => {

    // Remove '!' from path
    $locationProvider.hashPrefix('')

    // Allow cross domain requests
    $httpProvider.defaults.withCredentials = true
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']

    cloudinaryProvider
     .set("cloud_name",CloudinaryConstant.cloud_name)
     .set("secure",CloudinaryConstant.secure)
     .set("upload_preset",CloudinaryConstant.upload_preset)

    $routeProvider
      .when('/',{
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl as homeCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isAuthenticated()
          }
        }
      })
      .when('/usuarios',{
        templateUrl: 'app/views/users/users.html',
        controller: 'UsersCtrl as usersCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isAuthenticated()
          }
        }
      })
      .when('/perfil',{
        templateUrl: 'app/views/profile/profile.html',
        controller: 'ProfileCtrl as profileCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isAuthenticated()
          }
        }
      })
      .when('/settings',{
        templateUrl: 'app/views/profile/settings.html',
        controller: 'SettingsCtrl as settingsCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isAuthenticated()
          }
        }
      })
      .when('/problemas',{
        templateUrl: 'app/views/report/report.html',
        controller: 'ReportCtrl as reportCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isAuthenticated()
          }
        }
      })
      .when('/login',{
        templateUrl: 'app/views/auth/login.html',
        controller: 'LoginCtrl as loginCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isNotAuthenticated()
          }
        }
      })
      .when('/cadastrar',{
        templateUrl: 'app/views/auth/register.html',
        controller: 'RegisterCtrl as registerCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isNotAuthenticated()
          }
        }
      })
      .when('/recuperar',{
        templateUrl: 'app/views/auth/forgot.html',
        controller: 'ForgotCtrl as forgotCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isNotAuthenticated()
          }
        }
      })
      .when('/consultores/:recoveryKey/redefinir-senha/:token',{
        templateUrl: 'app/views/auth/reset.html',
        controller: 'ResetCtrl as resetCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isNotAuthenticated()
          }
        }
      })
      .when('/activation/:token',{
        templateUrl: 'app/views/auth/activation.html',
        controller: 'ActivationCtrl as activationCtrl',
        resolve: {
          access: (Auth) => {
            return Auth.isNotAuthenticated()
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      })

  })
  .run(($rootScope, $location, amMoment, offPaths) => {

    amMoment.changeLocale('pt-br')

    $rootScope.$on("$routeChangeStart", (event, next, current) => {
      if(next!=undefined && !offPaths.includes(next.$$route.originalPath))
        angular.element('#views').addClass('display-n')
    })

    $rootScope.$on("$routeChangeError", (event, current, previous, rejection) => {
      if(rejection == 'isNotAuth')
        $location.path("/")
      else
        $location.path("/login")
    })

    $rootScope.$on('$routeChangeSuccess', (event, current, previous) => {
      if(current!=undefined && !offPaths.includes(current.$$route.originalPath))
        angular.element('#views').removeClass('display-n')
    })

  })
