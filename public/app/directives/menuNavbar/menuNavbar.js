(() => {
  angular.module('dashboard').directive('menuNavbar', () => {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuNavbar/menuNavbar.html',
      controller: 'MenuNavbarCtrl as menuNavbarCtrl'
    }
  })
})()
