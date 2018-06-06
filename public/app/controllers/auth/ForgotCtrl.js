(() => {
  angular.module('dashboard').controller('ForgotCtrl', ['$scope','Account','$compile', function($scope,Account,$compile) {

    let vm = this

    vm.send = false
    vm.start = false
    vm.err = false
    vm.errDescription = ""

    vm.close = () => {
      vm.send = false
      vm.err = false
    }

    vm.submit = () => {
      if (!$scope.ForgotForm.$invalid) {
        vm.start = true
        Account.setRecoveryToken({
          'recoveryKey': vm.user.email
        }).then((res) => {
          if(res.status == 200){
            vm.send = true
            vm.err = false
            $scope.ForgotForm.$setPristine()
            vm.user.email = ''
          }else{
            vm.err = true
            vm.errDescription = "Não foi possível enviar o seu email de recuperação de senha, tente novamente mais tarde"
          }
          vm.start = false
        }).catch((err) => {
          let keyErrors = Object.keys(err.data.errors)
          let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
          if (keyErrors.length > 1) {
            for (let i = 1; i < keyErrors.length; i++)
              description += keyErrors[i] + ', '
          }
          vm.errDescription = description
          vm.start = false
          vm.err = true
        })
      } else {
        vm.err = true
        vm.start = false
        vm.errDescription = 'Por favor, verifique os campos do formulário'
      }
    }

  }])
})()
