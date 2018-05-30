(() => {
  angular.module('dashboard').controller('LinkSidebarCloseCtrl', ['$scope','$location', ($scope, $location) => {

    $scope.dimension = (width) => {
      setTimeout(() => {
        if(width < 767) {
          angular.element('#sidebar').removeClass('sidebar-visible')
          angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up')
          $scope.$apply()
        }
      },1)
    }

  }])
})()
