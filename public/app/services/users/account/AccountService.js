(function() {
  angular.module('dashboard').service('Account', ['$http','$q','Config', function($http,$q,Config) {

    var url_base = Config.url_base;

    this.signup = function(name,email,phoneNumber,password){
      return $http.post(url_base+'/users/account/signup',{
        'name': name,
        'email': email,
        'phoneNumber': phoneNumber,
        'password': password
      }).then(function(result){
        return result;
      })
    };

    this.active = function(_id){
      return $http.put(url_base+'/users/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.inactivate = function(_id){
      return $http.put(url_base+'/users/'+_id+'/account/inactivation').then(function(result){
        return result;
      });
    };

    this.setActivationCode = function(_id){
      return $http.put(url_base+'/users/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.setRecoveryToken = function(recoveryKey) {
      return $http.patch(url_base+'/users/account/recovery',recoveryKey).then(function(result){
        return result;
      });
    };

    this.recoverPassword = function(recoveryKey, token, newPassword) {
      return $http.put(url_base+'/users/account/recovery',{
        'recoveryKey': recoveryKey,
        'token': token,
        'newPassword': newPassword
      }).then(function(result){
        return result;
      })
    };

    this.setEmailChangeToken = function(id,email){
      return $http.patch(url_base+'/users/'+id+'/account/email',{
        'email': email
      }).then(function(result){
        return result;
      });
    };

    this.updateEmail = function(id,token){
      return $http.put(url_base+'/users/'+id+'/account/email',{
        'token': token
      }).then(function(result){
        return result;
      });
    };

    this.updatePassword = function(id,currentPassword,newPassword){
      return $http.put(url_base+'/users/'+id+'/account/password',{
        'currentPassword': currentPassword,
        'newPassword': newPassword
      }).then(function(result){
        return result;
      });
    };

    this.getAccount = function(id){
      return $http.get(url_base+'/users/'+id+'/account').then(function(result){
        return result;
      });
    };

    this.updatePicture = function(id,profilePicture){
      return $http.put(url_base+'/users/'+id+'/account/picture',{
        'profilePicture': profilePicture
      }).then(function(result){
        return result;
      });
    };

  }]);
}());
