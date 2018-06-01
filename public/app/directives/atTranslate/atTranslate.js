(() => {
  angular.module('dashboard').directive('atTranslate', ($compile) => {
    return {
      restrict: 'AEC',
      scope: true,
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        angular.forEach(angular.element('.pagination'), (values,keys,arrays) => {
          angular.forEach(angular.element(values.children), (value, key, array) => {
            if(angular.element(value).children().text() === '{{getPaginatorLabels().first}}'){
              angular.element(value).children().text("Início")
            }
            if(angular.element(value).children().text() === '{{getPaginatorLabels().last}}'){
              angular.element(value).children().text("Fim")
            }
          })
        })
      }
    }
  })
})()
