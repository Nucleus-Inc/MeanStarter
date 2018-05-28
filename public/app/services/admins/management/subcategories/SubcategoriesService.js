(function() {
  angular.module('dashboard').service('Subcategories', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.createSubcategory = function(categoryId, title){
      return $http.post(url_base+'/admins/management/categories/'+categoryId+'/subcategories',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.updateSubcategory = function(categoryId, subcategoryId, title){
      return $http.put(url_base+'/admins/management/categories/'+categoryId+'/subcategories/'+subcategoryId+'/update',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.inactivateSubcategory = function(categoryId, subcategoryId){
      return $http.put(url_base+'/admins/management/categories/'+categoryId+'/subcategories/'+subcategoryId+'/inactivation').then(function(result){
        return result;
      });
    };

    this.activateSubcategory = function(categoryId, subcategoryId){
      return $http.put(url_base+'/admins/management/categories/'+categoryId+'/subcategories/'+subcategoryId+'/activation').then(function(result){
        return result;
      });
    };

    this.getSubcategories = function(){
      return $http.get(url_base+'/subcategories').then(function(result){
        return result;
      });
    };

    this.getSubcategory = function(_id){
      return $http.get(url_base+'/subcategories/'+_id).then(function(result){
        return result;
      });
    };

  }]);
}());
