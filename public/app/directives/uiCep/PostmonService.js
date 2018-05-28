(function() {
  angular.module('dashboard').service('PostmonService', ['$http', function($http) {

    this.getCep = function(cep) {
      return $http.get('http://api.postmon.com.br/v1/cep/' + cep, {withCredentials : false}).then(function success(response) {
        return response;
      }, function error(response) {
        return response;
      })
    }

    this.getTrackingData = function(provider, code) {
      return $http.get('http://api.postmon.com.br/v1/rastreio/' + provider + '/' + code, {withCredentials : false}).then(function success(response) {
        return response;
      }, function error(response) {
        return response;
      })
    }

  }]);
}());
