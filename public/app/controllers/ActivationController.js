(function() {
  angular.module('meanStarterApp').controller('ActivationController', ['$location', '$routeParams', 'ActivationService',
    function($location, $routeParams, ActivationService) {

      var vm = this;

      var userId = null;
      var token = null;

      vm.requestStatus = null;
      vm.resendStatus = null;

      init();

      function init() {
        userId = $routeParams.id;
        token = $location.search().token;
        activateAccount();
      };

      function activateAccount() {
        ActivationService.activateAccount(userId, token).then(function(result) {
          vm.requestStatus = result.status;
        }).catch(function(err) {
          vm.requestStatus = err.status;
        });
      };

      vm.resendEmail = function() {
        ActivationService.requestEmail(userId).then(function(result) {
          vm.resendStatus = result.status;
        }).catch(function(err) {
          vm.resendStatus = err.status;
        });
      };

      vm.closeAlert = function() {
        vm.resendStatus = null;
      };
    }
  ]);
}());
