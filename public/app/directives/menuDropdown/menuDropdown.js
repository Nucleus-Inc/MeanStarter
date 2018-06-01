(() => {
  angular.module('dashboard').directive('menuDropdown', () => {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuDropdown/menuDropdown.html',
      controller: 'MenuDropdownCtrl as menuDropdownCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        scope.display()
      }
    }
  })
})()
