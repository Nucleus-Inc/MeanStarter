(function() {
  angular.module('dashboard').directive('verifyPlans', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Plans', function($scope, Plans) {
        $scope.verifyPlan = function(name, view){
          Plans.getPlans().then(function(res){
            res.data.filter(function(item){
              if(item.title.toUpperCase() === name)
                view.$setValidity("planExists", false);
            });
          });
        };
      }],
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

        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("planExists", true);
          if(value){ //exists an input value
            var textValue = String(value);
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            scope.verifyPlan(value.toUpperCase(), ngModelCtrl);
          }
        });

      }
    };
  });
}());
