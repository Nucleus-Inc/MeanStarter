(function() {
  angular.module('dashboard').directive('uiPassword', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Verification', function($scope,Verification) {
        $scope.checkPassword = function(password, view){
          Verification.verifyPassword(password).then(function(res){
            if(res.data.score > 1)
              view.$setValidity("weakPassword", true);
            else
              view.$setValidity("weakPassword", false);
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("weakPassword", true);
          if(value)
            scope.checkPassword(value,ngModelCtrl);
        });
      }
    };
  });
}());
