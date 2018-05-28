(function() {
  angular.module('dashboard').directive('menuNavbar', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuNavbar/menuNavbar.html',
      controller: 'MenuNavbarCtrl as menuNavbarCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

      }
    };
  });
}());
