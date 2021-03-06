(() => {
  angular.module('dashboard').controller('RegisterCtrl', ['$scope', 'Account', 'Socket', function ($scope, Account, Socket) {

    let vm = this
    let _id = -1

    vm.hidepasswordA = true
    vm.hidepasswordB = true
    vm.showA = true
    vm.hideA = false
    vm.showB = true
    vm.hideB = false
    vm.create = true
    vm.sendSuccess = false
    vm.sendDanger = false
    vm.start = false
    vm.err = false
    vm.errDescription = ""

    vm.toggle = (param) => {
      if (param === 'showA') {
        vm.hidepasswordA = false
        vm.showA = false
        vm.hideA = true
      } else {
        if (param === 'hideA') {
          vm.hidepasswordA = true
          vm.showA = true
          vm.hideA = false
        } else {
          if (param === 'showB') {
            vm.hidepasswordB = false
            vm.showB = false
            vm.hideB = true
          } else {
            vm.hidepasswordB = true
            vm.showB = true
            vm.hideB = false
          }
        }
      }
    }

    vm.submit = () => {
      if (!$scope.RegisterForm.$invalid) {
        vm.start = true
        let phoneNumber = '55' + vm.user.phoneNumber.toString().replace(/[^0-9]/g, '')
        Account.signup(vm.user.name, vm.user.email, phoneNumber, vm.user.password).then((res) => {
          if(res.status == 201 || res.status == 200){
            if (res.data) {
              _id = res.data._id
              vm.user._id = _id
              vm.user.isActive = false
              Socket.emit('admin add', vm.user)
            }
            vm.create = false
            vm.start = false
            vm.err = false
          }else{
            let keyErrors = Object.keys(res.data.errors)
            let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
            if (keyErrors.length > 1) {
              for (let i = 1; i < keyErrors.length; i++)
                description += keyErrors[i] + ', '
            }
            vm.errDescription = description
            vm.err = true
            vm.start = false
          }
        }).catch((err) => {
          if (err.status == 400) {
            let keyErrors = Object.keys(err.data.errors)
            let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
            if (keyErrors.length > 1) {
              for (let i = 1; i < keyErrors.length; i++)
                description += keyErrors[i] + ', '
            }
            vm.errDescription = description
          }
          vm.err = true
          vm.start = false
        })
      } else {
        vm.errDescription = 'Por favor, verifique os campos do formulário'
        vm.err = true
        vm.start = false
      }
    }

    vm.close = (code) => {
      if (code == 0)
        vm.sendSuccess = false
      else
        if (code == 1)
          vm.sendDanger = false
        else
          vm.err = false
    }

  }])
})()
