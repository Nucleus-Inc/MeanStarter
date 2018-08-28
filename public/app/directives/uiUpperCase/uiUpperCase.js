(() => {
  angular.module('dashboard').directive('uiUpperCase', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        //Capitalize all letters 
        scope.$watch('ngModel', (value) => {
          if(value)
            scope.ngModel = value.toString().toUpperCase()
        })
      }
    }
  })
})()
