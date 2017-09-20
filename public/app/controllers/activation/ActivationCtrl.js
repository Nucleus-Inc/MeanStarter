(function() {
  angular.module('meanStarterApp').controller('ActivationCtrl', ['$scope', '$location', '$routeParams', 'Activation',
    function($scope, $location, $routeParams, Activation) {

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
        Activation.activateAccount(userId, token).then(function(result) {
          vm.requestStatus = result.status;
        }).catch(function(err) {
          vm.requestStatus = err.status;
        });
      };

      vm.resendEmail = function() {
        Activation.requestEmail(userId).then(function(result) {
          vm.resendStatus = result.status;
        }).catch(function(err) {
          vm.resendStatus = err.status;
        });
      };

      vm.closeAlert = function() {
        vm.resendStatus = null;
      };

      /* Change route if requests return 404 error */

      $scope.$watch('activationCtrl.requestStatus', function(newValue, oldValue) {
        if (newValue === 404) {
          $location.path('/404');
        }
      }, true);

      $scope.$watch('activationCtrl.resendStatus', function(newValue, oldValue) {
        if (newValue === 404) {
          $location.path('/404');
        }
      }, true);

    }
  ]);
}());
