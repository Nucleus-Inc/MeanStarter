(() => {
  angular.module('dashboard').service('Auth', ['$http','$q', ($http,$q) => {

    return {
      login: (email, password) => {
        return $http.post('/users/auth/local/login',{
          'email': email,
          'password': password
        }).then((result) => { return result })
      },
      isAuthenticated: () => {
        return $http.get('/users/auth/local/login').then((result) => {
          return result.status == 200 ? result : $q.reject("Auth")
        })
      },
      isNotAuthenticated: () => {
        return $http.get('/users/auth/local/login').then((result) => {
          return result.status == 200 ? $q.reject("isNotAuth") : result
        }).catch((err) => {
          return err.status == 401 ? err : $q.reject("isNotAuth")
        })
      },
      logout: () => {
        return $http.post('/users/auth/local/logout').then((result) => { return result })
      }
    }

  }])
})()
