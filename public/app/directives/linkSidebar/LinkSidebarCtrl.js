(() => {
  angular.module('dashboard').controller('LinkSidebarCtrl', ['$scope','$location', ($scope, $location) => {

    $scope.path = function(href){
      $location.path(href)
    }

  }])
})()
