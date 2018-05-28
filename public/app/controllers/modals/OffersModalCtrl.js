(function() {
  angular.module('dashboard').controller('OffersModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input',
    function($scope, ModalService, close, title, input) {

      var vm = this;

      vm.title = title;
      vm.inputs = input;
      vm.inputs.price.full = parseFloat((vm.inputs.price.full)/100).toFixed(2);
      vm.inputs.price.current = parseFloat((vm.inputs.price.current)/100).toFixed(2);
      vm.tab = 1;

      vm.close = function(result) {
        if(result!=null){
          closed({
            _id: vm.inputs._id,
            title: vm.inputs.title,
            approve: result
          });
        }else
          closed(null);
        angular.element('.modal').modal('hide');
      };

      var closed = function(json) {
        close(json,500);
      };

      vm.setTab = function(newTab) {
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

    }
  ]);
}());
