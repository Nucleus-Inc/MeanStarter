(() => {
  angular.module('dashboard').service('Profile', ['$http', ($http) => {

    return {
      updatePicture: (_id, pictureUrl) => {
        return $http.put('/users/'+_id+'/profile/picture', pictureUrl).then((result) => { return result })
      },
      deletePicture: (_id) => {
        return $http.delete('/users/'+_id+'/profile/picture').then((result) => { return result })
      },
      getProfile: (_id) => {
        return $http.get('/users/'+_id+'/profile').then((result) => { return result })
      }
    }

  }])
})()
