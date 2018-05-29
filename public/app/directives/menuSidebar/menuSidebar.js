(function() {
  angular.module('dashboard').directive('menuSidebar',['Socket','Auth','$location','offPaths', function(Socket,Auth,$location,offPaths,$timeout) {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuSidebar/menuSidebar.html',
      controller: 'MenuSidebarCtrl as menuSidebarCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        var addSidebar = function(){
          angular.element('#sidebar').addClass('sidebar-visible');
          angular.element('#navbarContainer').addClass('layout-sidebar-l3-md-up');
          angular.element('#toggler-button').addClass('toggle');
        };

        var removeSidebar = function(){
          angular.element('#sidebar').removeClass('sidebar-visible');
          angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
        };

        var toggleSidebar = function(){
          angular.element('#sidebar').toggleClass('sidebar-visible');
          angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
        };

        if(offPaths.includes($location.path()))
          removeSidebar();
        else{
          Auth.isAuthenticated().then(function(res){
            if(width >= 767)
              addSidebar();
            else
              removeSidebar();
            angular.element('.no-login').removeClass('full-height');
          }).catch(function(err){
            removeSidebar();
          });
        }

        Socket.on('login success',function(msg){
          if(width >= 767)
            addSidebar();
          else
            removeSidebar();
          angular.element('.no-login').removeClass('full-height');
        });

        Socket.on('logout success',function(msg){
          removeSidebar();
          angular.element('.no-login').addClass('full-height');
        });

        angular.element('.layout-content').bind('click', function(){
          if(angular.element('#sidebar').hasClass('sidebar-visible') && width < 767 && angular.element('#toggler-button').hasClass('toggle'))
            removeSidebar();
          else{
            if(width < 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height'))
              addSidebar();
            else{
              if(width >= 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height')){
                angular.element('#toggler-button').addClass('toggle');
                toggleSidebar();
              }
            }
          }
        });
      }
    };
  }]);
}());
