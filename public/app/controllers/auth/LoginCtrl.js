(function() {
  angular.module('dashboard').controller('LoginCtrl', ['$scope','Auth','$location','Socket','Config','$localStorage', function($scope,Auth,$location,Socket,Config,$localStorage) {

    var vm = this;

    vm.hidepassword = true;
    vm.show = true;
    vm.hide = false;
    vm.errLogin = false;
    vm.start = false;

    vm.toggle = function(param){
      if(param==='show'){
        vm.hidepassword = false;
        vm.show = false;
        vm.hide = true;
      }else{
        vm.hidepassword = true;
        vm.show = true;
        vm.hide = false;
      }
    };

    vm.close = function(){
      vm.errLogin = false;
    };

    vm.submit = function() {
      if(!$scope.LoginForm.$invalid) {
        vm.start = true;
        Auth.login(vm.user.email,vm.user.password).then(function(res){
          if(res.status == 200 && res.data && res.data.isActive){
            $localStorage.id = res.data._id;
            Socket.emit('login success', res.data);
            $location.path('/');
          }else
            vm.errLogin = true;
          vm.start = false;
        }).catch(function(err){
          vm.errLogin = true;
          vm.start = false;
        });
      }else{
        vm.errLogin = true;
        vm.start = false;
      }
    };

  }]);
}());
