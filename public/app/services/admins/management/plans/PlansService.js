(function() {
  angular.module('dashboard').service('Plans', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPlans = function(){
      return $http.get(url_base+'/plans').then(function(result){
        return result;
      });
    };

    this.getPlan = function(id){
      return $http.get(url_base+'/plans/'+id).then(function(result){
        return result;
      });
    };

    this.createPlan = function(title, desc){
      return $http.post(url_base+'/admins/management/plans',{
        'title': title,
        'description': desc
      }).then(function(result){
        return result;
      });
    };

    this.updatePlan = function(id,title,desc){
      return $http.put(url_base+'/admins/management/plans/'+id,{
        'title': title,
        'description': desc
      }).then(function(result){
        return result;
      });
    };

    this.activatePlan = function(_id){
      return $http.put(url_base+'/admins/management/plans/'+_id+'/activation').then(function(result){
        return result;
      });
    };

    this.inactivatePlan = function(_id){
      return $http.put(url_base+'/admins/management/plans/'+_id+'/inactivation').then(function(result){
        return result;
      });
    };

    /*this.deletePlan = function(id){
      return $http.delete(url_base+'/admins/management/plans'+id).then(function(result){
        return result;
      });
    };*/

  }]);
}());
