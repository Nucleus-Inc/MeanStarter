(() => {
  angular.module('dashboard').controller('MenuDropdownCtrl', ['$scope','$window','$location','Auth','Profile','Socket', function($scope, $window, $location, Auth, Profile, Socket) {

    let vm = this

    Socket.on('change profile', (msg) => {
      let formatedImage = formatImage(msg)
      let cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile')
      if(msg != cachedFile)
        $window.localStorage.setItem('persistentCache:imageNavProfile',formatedImage)
      vm.user.picture = formatedImage
    })

    Socket.on('login success', (msg) => {
      angular.element('#sidebar').removeClass('no-transition')
      angular.element('.layout-content').removeClass('no-transition')
      $scope.display()
    })

    $scope.display = () => {
      Auth.isAuthenticated().then((res) => {
        vm.user = {
          '_id': res.data._id,
          'name': res.data.account.name,
          'email': res.data.account.email,
          'phoneNumber': res.data.account.phoneNumber,
          'isActive': res.data.account.isActive
        }
        let cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile')
        if(cachedFile == null || cachedFile === ''){
          Profile.getProfile(res.data._id).then((res) => {
            if(res.data.profile!=null && res.data.profile.profilePicture){
               let formatedImage = formatImage(res.data.profile.profilePicture)
               $window.localStorage.setItem('persistentCache:imageNavProfile',formatedImage)
               vm.user.picture = formatedImage
            }
          })
        }else
          vm.user.picture = cachedFile
      })
    }

    vm.logout = () => {
      Auth.logout().then((res) => {
        angular.element('#sidebar').addClass('no-transition')
        angular.element('.layout-content').addClass('no-transition')
        Socket.emit('logout success', res.data)
        $window.localStorage.setItem('persistentCache:imageNavProfile','')
        $window.localStorage.setItem('persistentCache:imageProfile','')
        vm.user.picture = undefined
        $location.path('/login')
      })
    }

    let formatImage = (url) => {
      if(url){
        let search = url.search('/w_40,h_40,c_pad,b_rgb:31000f')
        if(search > -1){
          return url
        }else{
          let pos = url.lastIndexOf("/upload/")
          let res = url.slice(0, pos+8)
          let posRes = url.slice(pos+7,url.length)
          res = res+'w_40,h_40,c_pad,b_rgb:31000f'
          return (res+posRes)
        }
      }
    }

  }])
})()
