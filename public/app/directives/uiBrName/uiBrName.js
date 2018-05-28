(function() {
  angular.module('dashboard').directive('uiBrName', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Disable keyup press of the numbers in input
        function parserName(textName) {
          var input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g,'');
          if(input !== textName) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return String(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        //Capitalize first letter the person names
        scope.$watch('ngModel', function (value) {
          if(value){
            var textValue = ""+value;
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            var space = scope.ngModel.search(" ");
            if(space==-1)
              ngModelCtrl.$setValidity("minname",false);
            else
              ngModelCtrl.$setValidity("minname",true);
          }else {
            ngModelCtrl.$setValidity("minname",true);
          }
        });

      }
    };
  });
}());
