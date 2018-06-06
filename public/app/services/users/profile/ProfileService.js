(() => {
  angular.module('dashboard').service('Profile', ['$http','Config', ($http,Config) => {

    const url_base = Config.url_base

    return {
      updatePicture: (_id, pictureUrl) => {
        return $http.put(url_base+'/users/'+_id+'/profile/picture', pictureUrl).then((result) => { return result })
      },
      deletePicture: (_id) => {
        return $http.delete(url_base+'/users/'+_id+'/profile/picture').then((result) => { return result })
      },
      getProfile: (_id) => {
        return $http.get(url_base+'/users/'+_id+'/profile').then((result) => { return result })
      }
    }

  }])
})()
