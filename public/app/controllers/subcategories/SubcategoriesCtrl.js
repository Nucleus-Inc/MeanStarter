(function() {
  angular.module('dashboard').controller('SubcategoriesCtrl', ['$scope','$filter','Categories','Subcategories','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Categories, Subcategories, Account, ModalService, Notify, Socket, Tables) {

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
      Subcategories.getSubcategories().then(function(res){
        res.data.filter(function(item){
          vm.filteredList.push(item);
        });
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('createSubcategory',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag){
          Categories.getCategory(msg.category).then(function(res){
            msg.category = {
              "_id": msg.category,
              "title": res.data.title
            };          
            vm.filteredList.push(msg);
          }).catch(function(err){
            vm.filteredList.push(msg);
          });
        }
        buffer = vm.filteredList;
      });

      Socket.on('updateSubcategory',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
      });

      Socket.on('subcategory active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('subcategory inactivate',function(msg){
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

      vm.active = function(_id, category, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: isActive ? 'Desativar subcategoria' : 'Ativar subcategoria',
            question: isActive ? 'Você desja realmente desativar esta subcategoria?' : 'Você deseja realmente ativar esta subcategoria?',
            user: title
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Subcategories.inactivateSubcategory(category._id, _id).then(function(res){
                  Notify.run('Subcategoria desativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('subcategory inactivate',_id);
                  });
                });
              }else{
                Subcategories.activateSubcategory(category._id, _id).then(function(res){
                  Notify.run('Subcategoria ativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('subcategory active',_id);
                  });
                });
              }
            }
          });
        });
      };

      vm.create = function(){
        ModalService.showModal({
          templateUrl: 'app/views/modals/subcategory-form-modal.html',
          controller: 'SubcategoryFormModalCtrl as subcategoryFormModalCtrl',
          inputs: {
            title: 'Aqui você cria suas subcategorias',
            input: {'name': '', 'category': ''},
            label: 'Criar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Subcategories.createSubcategory(result._id, result.name).then(function(response){
                Notify.run('Subcategoria criada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('createSubcategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar criar subcategoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

      vm.edit = function(_id, category, title){
        ModalService.showModal({
          templateUrl: 'app/views/modals/subcategory-form-modal.html',
          controller: 'SubcategoryFormModalCtrl as subcategoryFormModalCtrl',
          inputs: {
            title: 'Atualize sua subcategoria abaixo',
            input: {'name': title, 'category': category.title},
            label: 'Atualizar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Subcategories.updateSubcategory(category._id, _id, result.name).then(function(response){
                Notify.run('Subcategoria atualizada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('updateSubcategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar atualizar subcategoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

  }]);
}());
