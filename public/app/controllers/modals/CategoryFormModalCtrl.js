(function() {
  angular.module('dashboard').controller('CategoryFormModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input','label',
    function($scope, ModalService, close, title, input, label) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      vm.inputs = {
        'name': input
      }

      vm.close = function(result) {
        close(result ? vm.inputs : null, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());
