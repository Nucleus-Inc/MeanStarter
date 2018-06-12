(() => {
  angular.module('dashboard').service('Auth', ['$http','$q','Config', ($http,$q,Config) => {

    const url_base = Config.url_base

    return {
      login: (email, password) => {
        return $http.post(url_base+'/users/auth/local/login',{
          'email': email,
          'password': password
        }).then((result) => { return result })
      },
      isAuthenticated: () => {
        return $http.get(url_base+'/users/auth/local/login').then((result) => {
          return result.status == 200 ? result : $q.reject("Auth")
        })
      },
      isNotAuthenticated: () => {
        return $http.get(url_base+'/users/auth/local/login').then((result) => {
          return result.status == 200 ? $q.reject("isNotAuth") : result
        }).catch((err) => {
          return err.status == 401 ? err : $q.reject("isNotAuth")
        })
      },
      logout: () => {
        return $http.post(url_base+'/users/auth/local/logout').then((result) => { return result })
      }
    }

  }])
})()
