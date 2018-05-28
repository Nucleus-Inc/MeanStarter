(function() {
  angular.module('dashboard').controller('SubcategoryFormModalCtrl', ['$scope', 'ModalService', 'Categories', 'close', 'title', 'input','label',
    function($scope, ModalService, Categories, close, title, input, label) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      // vm.disabledCategory = vm.label === 'Atualizar' ? true : false;
      vm.inputs = {
        'name': input.name,
        'category': input.category
      };

      vm.categories = [];

      vm.categories.push({_id: '0', title: 'Categorias'});
      vm.selectedCategory = vm.inputs.category == '' ? vm.categories[0].title : vm.inputs.category;
      vm.inputs.category = vm.selectedCategory;

      Categories.getCategories().then(function(res){
        for(var i=0;i<res.data.length;i++){
          vm.categories.push(res.data[i]);
        }
      });

      var getIdCategory = function(title){
        var i = 0;
        while(vm.categories[i].title != title && i < vm.categories.length){
          i++;
        }
        return vm.categories[i]._id;
      };

      vm.close = function(result) {
        var response = result ? { _id: getIdCategory(vm.inputs.category), name: vm.inputs.name } : null;
        close(response, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());
