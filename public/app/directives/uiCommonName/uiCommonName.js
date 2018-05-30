(() => {
  angular.module('dashboard').directive('uiCommonName', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        //Capitalize first letter the names
        scope.$watch('ngModel', (value) => {
          if(value){
            let textValue = value.toString()
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,(a)=>{return a.toUpperCase()})
          }
        })
      }
    }
  })
})()
