(() => {
  angular.module('dashboard').controller('ResetCtrl', ['$scope','Account','$routeParams','$location', function($scope,Account,$routeParams,$location) {

    let vm = this

    vm.hidepasswordA = true
    vm.hidepasswordB = true
    vm.showA = true
    vm.hideA = false
    vm.showB = true
    vm.hideB = false
    vm.resetSuccess = false
    vm.resetDanger = false
    vm.start = false
    vm.errDescription = ""

    vm.toggle = (param) => {
      if(param==='showA'){
        vm.hidepasswordA = false
        vm.showA = false
        vm.hideA = true
      }else{
        if(param==='hideA'){
          vm.hidepasswordA = true
          vm.showA = true
          vm.hideA = false
        }else{
          if(param==='showB'){
            vm.hidepasswordB = false
            vm.showB = false
            vm.hideB = true
          }else{
            vm.hidepasswordB = true
            vm.showB = true
            vm.hideB = false
          }
        }
      }
    }

    vm.submit = () => {
      if(!$scope.ResetForm.$invalid){
        vm.start = true
        Account.recoverPassword($routeParams.recoveryKey,$routeParams.token,vm.user.password).then((res) => {
          vm.start = false
          if(res.status == 201 || res.status == 200){
            vm.resetSuccess = true
            vm.resetDanger = false
            $location.path('/login')
          }else{
            let keyErrors = Object.keys(res.data.errors)
            let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
            if (keyErrors.length > 1) {
              for (let i = 1; i < keyErrors.length; i++)
                description += keyErrors[i] + ', '
            }
            vm.errDescription = description
            vm.resetSuccess = false
            vm.resetDanger = true
          }
        }).catch((err) => {
          vm.start = false
          let keyErrors = Object.keys(err.data.errors)
          let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
          if (keyErrors.length > 1) {
            for (let i = 1; i < keyErrors.length; i++)
              description += keyErrors[i] + ', '
          }
          vm.errDescription = description
          vm.resetSuccess = false
          vm.resetDanger = true
        })
      }else{
        vm.errDescription = "Erro ao tentar redefinir sua senha. Tente novamente mais tarde."
        vm.resetSuccess = false
        vm.resetDanger = true
        vm.start = false
      }
    }

    vm.close = (code) => {
      if(code=0)
        vm.resetSuccess = false
      else
        vm.resetDanger = false
    }

  }])
})()
