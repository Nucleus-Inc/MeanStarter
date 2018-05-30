(() => {
  angular.module('dashboard').directive('linkSidebar', () => {
    return {
      restrict: 'AEC',
      priority: 200,
      controller: 'LinkSidebarCtrl as linkSidebarCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        iElement.bind('click', () => {
          scope.$apply(() => {
            scope.path(iAttrs.href)
          })
        })
      }
    }
  })
})()
