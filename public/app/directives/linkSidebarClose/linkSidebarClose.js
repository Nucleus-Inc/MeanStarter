(function() {
  angular.module('dashboard').directive('linkSidebarClose', function() {
    return {
      restrict: 'AEC',
      priority: 100,
      controller: ['$scope','$timeout', function($scope,$timeout) {
        $scope.dimension = function(width){
          setTimeout(function(){
            if(width < 767) {
              angular.element('#sidebar').removeClass('sidebar-visible');
              angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
              $scope.$apply();
            }
          },1);
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        scope.dimension(width);

        iElement.bind('click',function() {
          scope.dimension(width);
        });

      }
    };
  });
}());
