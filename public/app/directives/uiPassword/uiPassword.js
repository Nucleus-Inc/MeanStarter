(() => {
  angular.module('dashboard').directive('uiPassword', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiPasswordCtrl as uiPasswordCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        scope.$watch('ngModel', (value) => {
          ngModelCtrl.$setValidity("weakPassword", true)
          if(value){
            scope.checkPassword(value).then((res) => {
              ngModelCtrl.$setValidity('weakPassword', res )
            })
          }
        })
      }
    }
  })
})()
