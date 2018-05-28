(function() {
  angular.module('dashboard').directive('verifySubcategory', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Subcategories', function($scope, Subcategories) {
        $scope.verifySubcategory = function(name, view){
          Subcategories.getSubcategories().then(function(res){
            res.data.filter(function(item){
              if(item.title.toUpperCase() === name)
                view.$setValidity("subcategoryExists", false);
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
          ngModelCtrl.$setValidity("subcategoryExists", true);
          if(value){ //exists an input value
            var textValue = String(value);
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            scope.verifySubcategory(value.toUpperCase(), ngModelCtrl);
          }
        });

      }
    };
  });
}());
