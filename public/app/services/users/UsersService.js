(() => {
  angular.module('dashboard').service('Users', ['$http','Config', ($http,Config) => {

    const url_base = Config.url_base

    return {
      getUsers: () => {
        return $http.get(url_base+'/users').then((result) => { return result })
      }
    }

  }])
})()
