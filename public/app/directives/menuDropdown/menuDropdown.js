(function() {
  angular.module('dashboard').directive('menuDropdown', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuDropdown/menuDropdown.html',
      controller: 'MenuDropdownCtrl as menuDropdownCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.display();
      }
    };
  });
}());
