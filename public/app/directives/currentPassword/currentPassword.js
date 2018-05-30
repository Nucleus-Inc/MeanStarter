(() => {
  angular.module('dashboard').directive('currentPassword', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'CurrentPasswordCtrl as currentPasswordCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        scope.$watch('ngModel', (value) => {
          ngModelCtrl.$setValidity("currentPassword", true)
          if(value){
            scope.checkPassword(value, iAttrs.currentEmail).then((res) => {
              ngModelCtrl.$setValidity('currentPassword', res )
            })
          }
        })
      }
    }
  })
})()
