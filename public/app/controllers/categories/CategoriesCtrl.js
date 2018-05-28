(function() {
  angular.module('dashboard').controller('CategoriesCtrl', ['$scope','$filter','Categories','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Categories, Account, ModalService, Notify, Socket, Tables) {

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
          label: 'Categorias Ativadas'
        },
        {
          _id: 2,
          value: false,
          label: 'Categorias Desativadas'
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
      Categories.getCategories().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('showCreateCategory',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('showUpdateCategory',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
      });

      Socket.on('category active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('category inactivate',function(msg){
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
            title: isActive ? 'Desativar categoria' : 'Ativar categoria',
            question: isActive ? 'Você desja realmente desativar esta categoria?' : 'Você deseja realmente ativar esta categoria?',
            user: title
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Categories.inactivateCategory(_id).then(function(res){
                  Notify.run('Categoria desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('category inactivate',_id);
                  });
                });
              }else{
                Categories.activateCategory(_id).then(function(res){
                  Notify.run('Categoria ativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('category active',_id);
                  });
                });
              }
            }
          });
        });
      };

      vm.create = function(){
        ModalService.showModal({
          templateUrl: 'app/views/modals/category-form-modal.html',
          controller: 'CategoryFormModalCtrl as categoryFormModalCtrl',
          inputs: {
            title: 'Aqui você cria suas categorias',
            input: '',
            label: 'Criar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Categories.createCategory(result.name).then(function(response){
                Notify.run('Categoria criada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('createCategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar criar categoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

      vm.edit = function(_id,title){
        ModalService.showModal({
          templateUrl: 'app/views/modals/category-form-modal.html',
          controller: 'CategoryFormModalCtrl as categoryFormModalCtrl',
          inputs: {
            title: 'Atualize sua categoria abaixo',
            input: title,
            label: 'Atualizar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Categories.updateCategory(_id,result.name).then(function(response){
                Notify.run('Categoria atualizada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('updateCategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar atualizar categoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

  }]);
}());
