(function() {
  angular.module('dashboard').service('Bi', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getNumbers = function(){
      return $http.get(url_base+'/users/management/bi/numbers').then(function(result){
        return result;
      });
    };

  }]);
}());
