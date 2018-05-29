(function() {
  angular.module('dashboard').service('Profile', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.updatePicture = function(_id, pictureUrl){
      return $http.put(url_base+'/users/'+_id+'/profile/picture', pictureUrl).then(function(result){
        return result;
      });
    };

    this.deletePicture = function(_id){
      return $http.delete(url_base+'/users/'+_id+'/profile/picture').then(function(result){
        return result;
      });
    };

    this.getProfile = function(_id){
      return $http.get(url_base+'/users/'+_id+'/profile').then(function(result){
        return result;
      });
    };

  }]);
}());
