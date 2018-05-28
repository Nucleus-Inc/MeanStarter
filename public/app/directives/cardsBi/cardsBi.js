(function() {
  angular.module('dashboard').directive('cardsBi', function() {
    return {
      restrict: 'AEC',
      scope: {
        biData: '=?',
        biName: '@',
        biIcon: '@'
      },
      templateUrl: 'app/directives/cardsBi/cardsBi.html',
      controller: 'CardsBiCtrl as cardsBiCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        
        scope.setColor(angular.element('.card-box'));
        scope.setIcon(scope.biIcon);
        scope.setLabel(scope.biName);
        scope.$watch('biData', watchData, true);

        function watchData (newVal, oldVal) {
          if(newVal!=undefined)
            scope.setValue(newVal[scope.biName]);
        };

      }
    };
  });
}());
