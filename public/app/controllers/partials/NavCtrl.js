(function() {
  angular.module('dashboard').controller('NavCtrl', ['$scope','Socket','Auth', function($scope, Socket, Auth) {

    var vm = this;

    Auth.isAuthenticated().then(function(res){
      vm.logged = true;
    }).catch(function(err){
      vm.logged = false;
    });

    Socket.on('login success',function(msg){
      vm.logged = true;
    });

    Socket.on('logout success',function(msg){
      vm.logged = false;
    });

  }]);
}());
