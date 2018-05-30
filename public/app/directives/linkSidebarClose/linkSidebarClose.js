(() => {
  angular.module('dashboard').directive('linkSidebarClose', () => {
    return {
      restrict: 'AEC',
      priority: 100,
      controller: 'LinkSidebarCloseCtrl as linkSidebarCloseCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let width = angular.element(window).width()

        scope.dimension(width)

        iElement.bind('click', () => {
          scope.dimension(width)
        })

      }
    }
  })
})()
