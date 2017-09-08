angular.module('ActivationService', [])
  .service('ActivationService', function($http, $q) {

    this.activateAccount = function(account, token) {
      return $http.put('/users/' + account + '/account/activation', {
        'token': token
      }).then(function(result) {
        return result;
      });
    }

    this.requestEmail = function(account) {
      return $http.patch('/users/' + account + '/account/activation?option=email').then(function(result) {
        return result;
      });
    }

  });
