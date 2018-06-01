(() => {
  angular.module('dashboard').directive('menuSidebar',['Socket','Auth','$location','offPaths', (Socket,Auth,$location,offPaths,$timeout) => {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuSidebar/menuSidebar.html',
      controller: 'MenuSidebarCtrl as menuSidebarCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let width = angular.element(window).width()

        let addSidebar = () => {
          angular.element('#sidebar').addClass('sidebar-visible')
          angular.element('#navbarContainer').addClass('layout-sidebar-l3-md-up')
          angular.element('#toggler-button').addClass('toggle')
        }

        let removeSidebar = () => {
          angular.element('#sidebar').removeClass('sidebar-visible')
          angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up')
        }

        let toggleSidebar = () => {
          angular.element('#sidebar').toggleClass('sidebar-visible')
          angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up')
        }

        if(offPaths.includes($location.path()))
          removeSidebar()
        else{
          Auth.isAuthenticated().then((res) => {
            width >= 767 ? addSidebar() : removeSidebar()
            angular.element('.no-login').removeClass('full-height')
          }).catch((err) => { removeSidebar() })
        }

        Socket.on('login success', (msg) => {
          width >= 767 ? addSidebar() : removeSidebar()
          angular.element('.no-login').removeClass('full-height')
        })

        Socket.on('logout success', (msg) => {
          removeSidebar()
          angular.element('.no-login').addClass('full-height')
        })

        angular.element('.layout-content').bind('click', () => {
          if(angular.element('#sidebar').hasClass('sidebar-visible') && width < 767 && angular.element('#toggler-button').hasClass('toggle'))
            removeSidebar()
          else{
            if(width < 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height'))
              addSidebar()
            else{
              if(width >= 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height')){
                angular.element('#toggler-button').addClass('toggle')
                toggleSidebar()
              }
            }
          }
        })
      }
    }
  }])
})()
