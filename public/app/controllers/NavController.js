(function() {
  angular.module('meanStarterApp').controller('NavController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

    $scope.logout = function() {
      AuthService.logout().then(function(result) {
        if (result.status == 200) {
          $location.path("/");
        }
      });
    };

  }]);
}());
