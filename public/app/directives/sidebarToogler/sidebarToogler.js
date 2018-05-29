(function() {
  angular.module('dashboard').directive('sidebarToogler', function() {
    return {
      restrict: 'AEC',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click',function(){
          setTimeout(function(){
            angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
            angular.element('#sidebar').toggleClass('sidebar-visible');
          },1);
        });
      }
    };
  });
}());
