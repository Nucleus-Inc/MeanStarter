(() => {
  angular.module('dashboard').controller('FormModalCtrl', ['$scope', 'ModalService', 'close',
    function($scope, ModalService, close) {

      let vm = this

      vm.inputs = []

      vm.title = 'My Title'
      vm.question = 'My Question'

      vm.close = (result) => {
        close(vm.inputs, 500) // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide')
      }

    }
  ])
})()
