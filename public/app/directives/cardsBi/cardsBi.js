(() => {
  angular.module('dashboard').directive('cardsBi', () => {
    return {
      restrict: 'AEC',
      scope: {
        biData: '=?',
        biName: '@',
        biIcon: '@',
        biColor: '@'
      },
      templateUrl: 'app/directives/cardsBi/cardsBi.html',
      controller: 'CardsBiCtrl as cardsBiCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        scope.setColor(iElement.children().children()[0], scope.biColor)
        scope.setIcon(scope.biIcon)
        scope.setLabel(scope.biName)
        scope.$watch('biData', (newVal, oldVal) => {
          if(newVal!=undefined)
            scope.setValue(newVal[scope.biName])
        }, true)

      }
    }
  })
})()
