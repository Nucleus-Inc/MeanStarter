(function() {
  angular.module('dashboard').controller('PlansCtrl', ['$scope','$filter','Plans','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Plans, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Planos Ativados'
        },
        {
          _id: 2,
          value: false,
          label: 'Planos Desativados'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Plans.getPlans().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('create plan',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('update plan',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id){
            item.title = msg.title;
            item.description = msg.description;
          }
        });
      });

      Socket.on('plan active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('plan inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      var search = function(value){
        Tables.search([value.title],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.title == value.title){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {
        Tables.condition(vm.predicates,vm.selectedPredicate,function(condition){
          var account = [];
          buffer.filter(function(item){
            account.push(item);
          });
          vm.filteredList = [];
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,function(res){
            if(res!=null){
              search(res);
            }
          });
        });
      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: isActive ? 'Desativar plano' : 'Ativar plano',
            question: isActive ? 'Você desja realmente desativar este plano?' : 'Você deseja realmente ativar este plano?',
            user: title
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Plans.inactivatePlan(_id).then(function(res){
                  Notify.run('Plano desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('plan inactivate',_id);
                  });
                });
              }else{
                Plans.activatePlan(_id).then(function(res){
                  Notify.run('Plano ativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('plan active',_id);
                  });
                });
              }
            }
          });
        });
      };

      vm.create = function(){
        ModalService.showModal({
          templateUrl: 'app/views/modals/plan-form-modal.html',
          controller: 'PlanFormModalCtrl as planFormModalCtrl',
          inputs: {
            title: 'Aqui você cria seus planos',
            input: '',
            label: 'Criar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Plans.createPlan(result.name, result.desc).then(function(response){
                Notify.run('Plano criada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('create plan',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar criar plano','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

      vm.edit = function(_id,plan){
        ModalService.showModal({
          templateUrl: 'app/views/modals/plan-form-modal.html',
          controller: 'PlanFormModalCtrl as planFormModalCtrl',
          inputs: {
            title: 'Atualize seu plano abaixo',
            input: plan,
            label: 'Atualizar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Plans.updatePlan(_id,result.name, result.desc).then(function(response){
                Notify.run('Plano atualizado com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('update plan',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar atualizar plano','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

  }]);
}());
