(() => {
  angular.module('dashboard').directive('uiStreetNumber', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        //Input accept numbers-only
        let parserName = (number) => {
          var input = number.replace(/[^0-9]/g,'')
          if(input !== number) {
              ngModelCtrl.$setViewValue(input)
              ngModelCtrl.$render()
          }
          return Number(input)
        }
        ngModelCtrl.$parsers.push(parserName)

      }
    }
  })
})()
