(() => {
  angular.module('dashboard').service('PostmonService', ['$http', ($http) => {

    return {
      getCep: (cep) => {
        return $http.get('http://api.postmon.com.br/v1/cep/' + cep, {withCredentials : false}).then(function success(response) {
          return response
        }, function error(response) {
          return response
        })
      },
      getTrackingData: (provider, code) => {
        return $http.get('http://api.postmon.com.br/v1/rastreio/' + provider + '/' + code, {withCredentials : false}).then(function success(response) {
          return response
        }, function error(response) {
          return response
        })
      }
    }

  }])
})()
