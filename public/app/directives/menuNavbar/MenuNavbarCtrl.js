(() => {
  angular.module('dashboard').controller('MenuNavbarCtrl', ['$scope','Socket','Auth','$location','offPaths', function($scope, Socket, Auth, $location, offPaths) {

    let vm = this

    let path = $location.path()

    if(offPaths.includes($location.path()))
      vm.logged = false
    else
      Auth.isAuthenticated().then((res) => { vm.logged = true }).catch((err) => { vm.logged = false })

    Socket.on('login success', (msg) => {
      vm.logged = true
    })

    Socket.on('logout success', (msg) => {
      vm.logged = false
    })

  }])
})()
