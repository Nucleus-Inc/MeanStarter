(function() {
  angular.module('meanStarterApp').controller('EmailConfirmationController', ['$location', '$routeParams', 'ActivationService',
    function($location, $routeParams, ActivationService) {

      var vm = this;

      var userId = null;
      var action = null;

      vm.requestStatus = null;

      init();

      function init() {
        userId = $routeParams.id;
        action = $location.search().action;
        if (action === 'resend') {
          requestEmail();
        }
      };

      function requestEmail() {
        ActivationService.requestEmail(userId).then(function(result) {
          vm.requestStatus = result.status;
        }).catch(function(err) {
          vm.requestStatus = err.status;
        });
      };
    }
  ]);
}());
