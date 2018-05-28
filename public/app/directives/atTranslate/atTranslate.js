(function() {
  angular.module('dashboard').directive('atTranslate', function($compile) {
    return {
      restrict: 'AEC',
      scope: true,
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        angular.forEach(angular.element('.page-item'),function(values,keys,arrays){
          angular.forEach(angular.element(values),function(value,key,array){
            if(angular.element(value).children().text() === '{{getPaginatorLabels().first}}'){
              angular.element(value).children().text("Início");
            }
            if(angular.element(value).children().text() === '{{getPaginatorLabels().last}}'){
              angular.element(value).children().text("Fim");
            }
          });
        });
      }
    };
  });
}());
