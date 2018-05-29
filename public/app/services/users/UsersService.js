(function() {
  angular.module('dashboard').service('Users', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getUsers = function(){
      return $http.get(url_base+'/users').then(function(result){
        return result;
      });
    };

  }]);
}());
