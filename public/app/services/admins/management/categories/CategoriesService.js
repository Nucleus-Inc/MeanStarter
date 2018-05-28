(function() {
  angular.module('dashboard').service('Categories', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.createCategory = function(title){
      return $http.post(url_base+'/admins/management/categories',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.updateCategory = function(_id,title){
      return $http.put(url_base+'/admins/management/categories/'+_id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.getCategories = function(){
      return $http.get(url_base+'/categories').then(function(result){
        return result;
      });
    };

    this.getCategory = function(_id){
      return $http.get(url_base+'/categories/'+_id).then(function(result){
        return result;
      });
    };

    this.activateCategory = function(_id){
      return $http.put(url_base+'/admins/management/categories/'+_id+'/activation').then(function(result){
        return result;
      });
    };

    this.inactivateCategory = function(_id){
      return $http.put(url_base+'/admins/management/categories/'+_id+'/inactivation').then(function(result){
        return result;
      });
    };

    /*this.deleteCategory = function(id){
      return $http.delete(url_base+'/categories/'+id).then(function(result){
        return result;
      });
    };*/

  }]);
}());
