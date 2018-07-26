(() => {
  angular.module('dashboard').service('Verification', ['$http', ($http) => {

    return {
      userVerifyEmail : (email) => {
        return $http.get('/verifications/user?email=' + email).then((result) => { return result })
      },
      userVerifyPhoneNumber : (phoneNumber) => {
        return $http.get('/verifications/user?phoneNumber=' + phoneNumber).then((result) => { return result })
      },
      verifyPassword : (password) => {
        return $http.post('/verifications/password',{
          'password': password
        }).then((result) => { return result })
      }
    }

  }])
})()
