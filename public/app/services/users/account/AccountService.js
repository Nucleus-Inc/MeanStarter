(() => {
  angular.module('dashboard').service('Account', ['$http','$q', ($http,$q) => {

    return {
      signup: (name, email, phoneNumber, password) => {
        return $http.post('/users/account/signup',{
          'name': name,
          'email': email,
          'phoneNumber': phoneNumber,
          'password': password
        }).then((result) => { return result })
      },
      active: (_id) => {
        return $http.put('/users/'+_id+'/account/activation').then((result) => { return result })
      },
      inactivate: (_id) => {
        return $http.put('/users/'+_id+'/account/inactivation').then((result) => { return result })
      },
      setActivationCode: (_id) => {
        return $http.put('/users/'+_id+'/account/activation').then((result) => { return result })
      },
      setRecoveryToken: (recoveryKey, token, newPassword) => {
        return $http.patch('/users/account/recovery',recoveryKey).then((result) => { return result })
      },
      recoverPassword: (recoveryKey, token, newPassword) => {
        return $http.put('/users/account/recovery',{
          'recoveryKey': recoveryKey,
          'token': token,
          'newPassword': newPassword
        }).then((result) => { return result })
      },
      setEmailChangeToken: (id, email) => {
        return $http.patch('/users/'+id+'/account/email',{
          'email': email
        }).then((result) => { return result })
      },
      updateEmail: (id, email) => {
        return $http.put('/users/'+id+'/account/email',{
          'token': token
        }).then((result) => { return result })
      },
      updatePassword: (id, currentPassword, newPassword) => {
        return $http.put('/users/'+id+'/account/password',{
          'currentPassword': currentPassword,
          'newPassword': newPassword
        }).then((result) => { return result })
      },
      getAccount: (id) => {
        return $http.get('/users/'+id+'/account').then((result) => { return result })
      },
      updatePicture: (id, profilePicture) => {
        return $http.put('/users/'+id+'/account/picture',{
          'profilePicture': profilePicture
        }).then((result) => { return result })
      }
    }

  }])
})()
