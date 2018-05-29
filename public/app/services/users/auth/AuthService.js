(function() {
  angular.module('dashboard').service('Auth', ['$http','$q','Config', function($http,$q,Config) {

    var url_base = Config.url_base;

    this.login = function(email,password){
      return $http.post(url_base+'/users/auth/local/login',{
        'email': email,
        'password': password
      }).then(function(result){
        return result;
      });
    };

    this.isAuthenticated = function() {
      return $http.get(url_base+'/users/auth/local/login').then(function(result) {
        if (result.status == 200) {
          return result;
        } else {
          return $q.reject("Not Authenticated");
        }
      });
    };

    this.logout = function() {
      return $http.post(url_base+'/users/auth/local/logout').then(function(result) {
        return result;
      }).catch(function(err){
        console.log(err);
      });
    };

  }]);
}());
