(function() {
  angular.module('meanStarterApp').controller('ActivationController', ['$location', '$routeParams', 'ActivationService',
    function($location, $routeParams, ActivationService) {

      var vm = this;

      vm.requestStatus = '';
      vm.alert = '';

      vm.init = function() {
        if ($location.search().action === 'confirm' && $location.search().token && $routeParams.account) {
          activateAccount();
        }

        if ($location.search().action === 'request' && $routeParams.account) {
          vm.requestStatus = 'notActiveError';
        }

      };

      vm.closeAlert = function() {
        vm.alert = '';
      };

      var activateAccount = function() {
        vm.requestStatus = 'loading';
        ActivationService.activateAccount($routeParams.account, $location.search().token).then(function(result) {
          if (result.status == 200) {
            vm.requestStatus = 'success';
          }
        }).catch(function(err) {
          vm.requestStatus = 'invalidError';
          if (err.status && err.status == 422) {
            vm.alert = 'activatedError';
          } else {
            vm.alert = 'unkownError';
          }
          vm.requestStatus = 'invalidError';
          console.log('Error: ' + err);
        });
      };

      vm.requestEmail = function() {
        console.log('test')
        ActivationService.requestEmail($routeParams.account).then(function(result) {
          if (result.status == 200) {
            vm.alert = 'sent';
          }
        }).catch(function(err) {
          if (err.status && err.status == 422) {
            vm.alert = 'activatedError';
          } else {
            vm.alert = 'unkownError';
          }
          console.log('Error: ' + err);
        });
      };
    }
  ]);
}());
