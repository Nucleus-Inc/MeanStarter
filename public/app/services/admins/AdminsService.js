(function() {
  angular.module('dashboard').service('Admins', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getAdmins = function(){
      return $http.get(url_base+'/admins').then(function(result){
        return result;
      });
    };

  }]);
}());
