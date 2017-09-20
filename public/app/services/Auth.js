angular.module('Auth', [])
  .service('Auth', function($http, $q, localStorageService, $location) {

    this.login = function(email, password) {
      return $http.post('/users/auth/local/login', {
        'email': email,
        'password': password
      }).then(function(result) {
        if (!result.data.isActive) {
          $location.path('/account/' + result.data.id + '/verify').search({
            action: 'resend'
          });
        } else if (result.data.isActive) {
          $location.path('/profile');
        }
        //localStorageService.set('user', result.data);
        return result;
      });
    };

    this.isAuthenticated = function() {
      return $http.get('/users/auth/local/login').then(function(result) {
        if (result.status == 200) {
          return "Authenticated";
        } else {
          return $q.reject("Not Authenticated");
        }
      });
    };

    this.logout = function() {
      return $http.post('/users/auth/local/logout').then(function(result) {
        return result;
      });
    };

  });
