(function() {
  angular.module('dashboard').controller('InfoModalCtrl', ['close','title','info',
    function(close, title, info) {

      var vm = this;

      vm.title = title;
      vm.info = info;

      vm.close = function(result) {
        close({'status': result}, 500); 
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());
