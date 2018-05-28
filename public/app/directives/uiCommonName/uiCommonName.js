(function() {
  angular.module('dashboard').directive('uiCommonName', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        //Capitalize first letter the names
        scope.$watch('ngModel', function (value) {
          if(value){
            var textValue = ""+value;
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
          }
        });
      }
    };
  });
}());
