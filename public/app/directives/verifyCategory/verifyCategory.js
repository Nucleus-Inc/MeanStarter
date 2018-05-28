(function() {
  angular.module('dashboard').directive('verifyCategory', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Categories', function($scope, Categories) {
        $scope.verifyCategory = function(name, view){
          Categories.getCategories().then(function(res){
            res.data.filter(function(item){
              if(item.title.toUpperCase() === name)
                view.$setValidity("categoryExists", false);
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
          ngModelCtrl.$setValidity("categoryExists", true);
          if(value){ //exists an input value
            var textValue = String(value);
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            scope.verifyCategory(value.toUpperCase(), ngModelCtrl);
          }
        });

      }
    };
  });
}());
