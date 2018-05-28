(function() {
  angular.module('dashboard').controller('MenuNavbarCtrl', ['$scope','Socket','Auth','$location','offPaths', function($scope, Socket, Auth, $location, offPaths) {

    var vm = this;

    var path = $location.path();

    if(offPaths.includes($location.path()))
      vm.logged = false
    else{
      Auth.isAuthenticated().then(function(res){
        vm.logged = true;
      }).catch(function(err){
        vm.logged = false;
      });
    }

    Socket.on('login success',function(msg){
      vm.logged = true;
    });

    Socket.on('logout success',function(msg){
      vm.logged = false;
    });

  }]);
}());
