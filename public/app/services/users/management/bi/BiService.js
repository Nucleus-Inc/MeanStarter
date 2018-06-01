(() => {
  angular.module('dashboard').service('Bi', ['$http','Config', ($http,Config) => {

    const url_base = Config.url_base

    return {
      getNumbers: () => {
        return $http.get(url_base+'/users/management/bi/numbers').then((result) => { return result })
      }
    }

  }])
})()
