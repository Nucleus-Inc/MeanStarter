(() => {
  angular.module('dashboard').directive('enterPress', [() => {
    return {
      restrict: 'AEC',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        iElement.bind('keydown keypress', (event) => {
          if(event.which === 13) {
            scope.$apply(() => {
              scope.$eval(iAttrs.enterPress)
            })
            event.preventDefault()
          }
        })
      }
    }
  }])
})()
