(function() {
  angular.module('dashboard').directive('linkSidebar', function() {
    return {
      restrict: 'AEC',
      priority: 200,
      controller: ['$scope','$location', function($scope,$location) {
        $scope.path = function(href){
          $location.path(href);
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click',function() {
          scope.$apply(function(){
            scope.path(iAttrs.href);
          });
        });
      }
    };
  });
}());
