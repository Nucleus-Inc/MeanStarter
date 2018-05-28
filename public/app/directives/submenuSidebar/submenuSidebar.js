(function() {
  angular.module('dashboard').directive('submenuSidebar', function() {
    return {
      restrict: 'AEC',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        var clear = function(){
          var items = angular.element('.sidebar-menuItem-button');
          angular.forEach(items,function(item){
            angular.element(item).parent().removeClass('open');
          });
        };
        iElement.bind('click',function(){
          if(!angular.element(iElement).parent().hasClass('open'))
            clear();
          angular.element(iElement).parent().toggleClass('open');
        });
      }
    };
  });
}());
