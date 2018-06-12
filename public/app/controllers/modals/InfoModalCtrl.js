(() => {
  angular.module('dashboard').controller('InfoModalCtrl', ['close','title','info',
    function(close, title, info) {

      let vm = this

      vm.title = title
      vm.info = info

      vm.close = (result) => {
        close({'status': result}, 500)
        angular.element('.modal').modal('hide')
      }

    }
  ])
})()
