(() => {
  angular.module('dashboard').controller('ActivationCtrl', ['$scope', function($scope) {

    let vm = this

    vm.success = false
    vm.activationSuccess = false

    vm.danger = true
    vm.activationDanger = true

    vm.errLogin = false
    vm.resend = false

    vm.hidepassword = true
    vm.show = true
    vm.hide = false

    vm.toggle = (param) => {
      if(param==='show'){
        vm.hidepassword = false
        vm.show = false
        vm.hide = true
      }else{
        vm.hidepassword = true
        vm.show = true
        vm.hide = false
      }
    }

    vm.close = (code) => {
      if(code==0)
        vm.activationSuccess = false
      else
        if(code==1)
          vm.activationDanger = false
        else
          if(code==2)
            vm.errLogin = false
          else
            vm.resend = false
    }

    vm.submit = () => {
      vm.activationSuccess = false
      vm.errLogin = true
    }

    vm.send = () => {
      vm.activationDanger = false
      vm.resend = true
    }

  }])
})()
