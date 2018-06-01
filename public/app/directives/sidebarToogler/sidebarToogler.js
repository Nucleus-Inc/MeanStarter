(() => {
  angular.module('dashboard').directive('sidebarToogler', () => {
    return {
      restrict: 'AEC',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        iElement.bind('click', () => {
          setTimeout(() => {
            angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up')
            angular.element('#sidebar').toggleClass('sidebar-visible')
          },1)
        })
      }
    }
  })
})()
