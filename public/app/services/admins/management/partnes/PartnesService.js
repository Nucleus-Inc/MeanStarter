(function() {
  angular.module('dashboard').service('Partnes', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPartnes = function(){
      return $http.get(url_base+'/admins/management/partners').then(function(result){
        return result;
      });
    };

    this.active = function(_id){
      return $http.put(url_base+'/admins/management/partners/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.inactivate = function(_id){
      return $http.put(url_base+'/admins/management/partners/'+_id+'/account/inactivation').then(function(result){
        return result;
      });
    };

    this.updateProfile = function(_id, profile){
      return $http.put(url_base+'/admins/management/partners/'+_id+'/profile',{
        'companyName': profile.companyName,
        'tradingName': profile.tradingName,
        'taxDocument': profile.taxDocument,
        'address': profile.address,
        'contact': profile.contact,
        'representative': profile.representative,
        'desc1': profile.desc1,
        'desc2': profile.desc2,
        'plan': profile.plan,
        'profilePicture': profile.profilePicture
      }).then(function(result){
        return result;
      });
    };

  }]);
}());
