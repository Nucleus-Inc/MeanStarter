(() => {
  angular.module('dashboard').service('Users', ['$http', ($http) => {

    return {
      getUsers: () => {
        return $http.get('/users').then((result) => { return result })
      }
    }

  }])
})()
