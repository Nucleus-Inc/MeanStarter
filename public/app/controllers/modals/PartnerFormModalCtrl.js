(function() {
  angular.module('dashboard').controller('PartnerFormModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input','label','Socket','Plans',
    function($scope, ModalService, close, title, input, label, Socket, Plans) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      vm.inputs = input;
      vm.plans = [];
      vm.tab = 1;

      if(vm.inputs.plan!=null && vm.inputs.plan.title==null){
        Plans.getPlan(vm.inputs.plan).then(function(res){
          console.log(res.data);
        });
      }

      Socket.on('cep complete',function(msg){
        vm.inputs.address.addressLine1 = msg.logradouro;
        vm.inputs.address.area = msg.bairro;
        vm.inputs.address.city = msg.cidade;
        vm.inputs.address.uf = msg.estado;
      });

      Plans.getPlans().then(function(res){
        Object.assign(vm.plans, res.data);
      });

      vm.close = function(result) {
        vm.inputs.plan = getPlanId(vm.inputs.plan.title)[0]._id;
        if(vm.inputs!=null && vm.inputs.taxDocument!=null && vm.inputs.taxDocument.documentNumber!=null)
          vm.inputs.taxDocument.documentType = vm.inputs.taxDocument.documentNumber.length < 12 ? 'cpf' : 'cnpj';
        close(result ? vm.inputs : undefined, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

      vm.setTab = function(newTab) {
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

      var getPlanId = function(value){
        return vm.plans.filter(function(item){
          return (item.title.toLowerCase() === value.toLowerCase() ? item : undefined);
        });
      };

    }
  ]);
}());
