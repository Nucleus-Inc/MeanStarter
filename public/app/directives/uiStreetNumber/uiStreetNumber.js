(function() {
  angular.module('dashboard').directive('uiStreetNumber', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Input accept numbers-only
        function parserName(number) {
          var input = number.replace(/[^0-9]/g,'');
          if(input !== number) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return Number(input);
        }
        ngModelCtrl.$parsers.push(parserName);
        
      }
    };
  });
}());
