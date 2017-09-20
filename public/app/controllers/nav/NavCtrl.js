(function() {
  angular.module('meanStarterApp').controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {

    $scope.logout = function() {
      Auth.logout().then(function(result) {
        if (result.status == 200) {
          $location.path("/");
        }
      });
    };

  }]);
}());
