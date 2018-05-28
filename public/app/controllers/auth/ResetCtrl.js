(function() {
  angular.module('dashboard').controller('ResetCtrl', ['$scope','Account','$routeParams','$location', function($scope,Account,$routeParams,$location) {

    var vm = this;

    vm.hidepasswordA = true;
    vm.hidepasswordB = true;
    vm.showA = true;
    vm.hideA = false;
    vm.showB = true;
    vm.hideB = false;
    vm.resetSuccess = false;
    vm.resetDanger = false;
    vm.start = false;
    vm.errDescription = "";

    vm.toggle = function(param){
      if(param==='showA'){
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      }else{
        if(param==='hideA'){
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        }else{
          if(param==='showB'){
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          }else{
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function() {
      if(!$scope.ResetForm.$invalid){
        vm.start = true;
        Account.recoverPassword($routeParams.recoveryKey,$routeParams.token,vm.user.password).then(function(res){
          vm.resetSuccess = true;
          vm.resetDanger = false;
          $location.path('/login');
          vm.start = false;
        }).catch(function(err){
          vm.errDescription = err.data.error.description;
          vm.resetSuccess = false;
          vm.resetDanger = true;
          vm.start = false;
        });
      }else{
        vm.errDescription = "Erro ao tentar redefinir sua senha. Tente novamente mais tarde.";
        vm.resetSuccess = false;
        vm.resetDanger = true;
        vm.start = false;
      }
    };

    vm.close = function(code) {
      if(code=0)
        vm.resetSuccess = false;
      else
        vm.resetDanger = false;
    };

  }]);
}());
