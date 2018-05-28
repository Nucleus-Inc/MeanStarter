(function() {
  angular.module('dashboard').directive('verifySelectCategory', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("selecOtherCategory", true);
          if(value && value == "Categorias"){ //exists an input value
            ngModelCtrl.$setValidity("selecOtherCategory", false);
          }
        });

      }
    };
  });
}());
