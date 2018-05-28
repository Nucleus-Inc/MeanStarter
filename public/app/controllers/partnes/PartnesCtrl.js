(function() {
  angular.module('dashboard').controller('PartnesCtrl', ['$scope','$filter','Partnes','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Partnes, ModalService, Notify, Socket, Tables) {

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
          label: 'Parceiros Ativos'
        },
        {
          _id: 2,
          value: false,
          label: 'Parceiros Pendentes'
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
      Partnes.getPartnes().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('partners add',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('partners inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      //Socket.emit('partners update',_id);
      Socket.on('partners activate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('partners update',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id == msg._id)
            Object.assign(item, msg);
        });
      });

      var search = function(value){
        Tables.search([value.name,value.email],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.email == value.email){
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

      vm.active = function(_id, email, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
            inputs: {
              title: isActive ? 'Desativar usuário' : 'Ativar usuário',
              question: isActive ? 'Você desja realmente desativar este usuário?' : 'Você deseja realmente ativar este usuário?',
              user: email
            }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Partnes.inactivate(_id).then(function(res){
                  Notify.run('Parceiro desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('partners inactivate',_id);
                  });
                });
              }else{
                Partnes.active(_id).then(function(res){
                  Notify.run('Parceiro ativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('partners activate',_id);
                  });
                });
              }
            }
          });
        });
      };

        vm.edit = function(_id) {
          vm.input = {};
          vm.filteredList.filter(function(item){
            if(item._id == _id){
              Object.assign(vm.input, item);
              ModalService.showModal({
                templateUrl: 'app/views/modals/partner-form-modal.html',
                controller: 'PartnerFormModalCtrl as partnerFormModalCtrl',
                inputs: {
                  title: 'Atualize o cadastro do parceiro',
                  input: vm.input,
                  label: 'Atualizar'
                }
              }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result) {
                  if(result && result.email){
                    Partnes.updateProfile(_id,result).then(function(response){
                      Notify.run('Parceiro atualizado com sucesso','alert-success',null,null,null,function(res){
                        if(res)
                          Socket.emit('partners update',response.data);
                      });
                    }).catch(function(err){
                      Notify.run('Erro ao atualizar parceiro','alert-danger',null,null,null,function(res){});
                    });
                  }
                });
              });
            }
          });
        };

  }]);
}());
