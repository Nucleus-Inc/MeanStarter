(function() {
  angular.module('meanStarterApp').controller('AuthCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {

    var vm = this;
    vm.auth = {};
    vm.requestStatus = null;

    vm.login = function() {
      vm.requestStatus = null;
      Auth.login(vm.auth.email, vm.auth.password).then(function(result) {
        $location.path('profile');
      }).catch(function(err) {
        vm.requestStatus = err.status;
      });
    };

    vm.closeAlert = function() {
      vm.requestStatus = null;
    };

  }]);
}());
