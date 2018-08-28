(() => {
  angular.module('dashboard').service('Bi', ['$http', ($http) => {

    return {
      getNumbers: () => {
        return $http.get('/users/management/bi/numbers').then((result) => { return result })
      }
    }

  }])
})()
