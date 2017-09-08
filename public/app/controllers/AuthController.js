(function() {
  angular.module('meanStarterApp').controller('AuthController', ['$scope', '$http', '$window', '$location', 'AuthService', function($scope, $http, $window, $location, AuthService) {

    $scope.authError = false;

    $scope.login = function() {
      AuthService.login($scope.email, $scope.password).then(function(result) {
        if (result.status == 200) {
          //$location.path('profile');
        }
      }).catch(function(err) {
        if (err.status == 401) {
          $scope.authError = true;
        }
      });
    };

  }]);
}());
