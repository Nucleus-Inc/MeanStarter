(function() {
  angular.module('dashboard').service('Offers', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getOffers = function(){
      return $http.get(url_base+'/admins/management/offers').then(function(result){
        return result;
      });
    };

    this.getOffer = function(id){
      return $http.get(url_base+'/admins/management/offers/'+id).then(function(result){
        return result;
      });
    };

    this.createOffer = function(title){
      return $http.post(url_base+'/admins/management/offers',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.updateOffer = function(id,title){
      return $http.put(url_base+'/admins/management/offers/'+id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.approveOffer = function(_id){
      return $http.put(url_base+'/admins/management/offers/'+_id+'/approve').then(function(result){
        return result;
      });
    };

    this.reproveOffer = function(_id, review){
      return $http.put(url_base+'/admins/management/offers/'+_id+'/reprove',{
        'review': 'review'
      }).then(function(result){
        return result;
      });
    };

    /*this.deleteOffer = function(id){
      return $http.delete(url_base+'/admins/management/offers/'+id).then(function(result){
        return result;
      });
    };*/

  }]);
}());
