(function() {
  angular.module('dashboard').controller('AlertModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'question','user',
    function($scope, ModalService, close, title, question, user) {

      var vm = this;

      vm.title = title;
      vm.question = question;
      vm.user = user;

      vm.close = function(result) {
        close({'status': result}, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());
