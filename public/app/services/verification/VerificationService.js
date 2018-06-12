(() => {
  angular.module('dashboard').service('Verification', ['$http','Config', ($http,Config) => {

    const url_base = Config.url_base

    return {
      userVerifyEmail : (email) => {
        return $http.get(url_base+'/verifications/user?email=' + email).then((result) => { return result })
      },
      userVerifyPhoneNumber : (phoneNumber) => {
        return $http.get(url_base+'/verifications/user?phoneNumber=' + phoneNumber).then((result) => { return result })
      },
      verifyPassword : (password) => {
        return $http.post(url_base+'/verifications/password',{
          'password': password
        }).then((result) => { return result })
      }
    }

  }])
})()
