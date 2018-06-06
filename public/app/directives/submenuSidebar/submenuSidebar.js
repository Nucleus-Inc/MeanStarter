(() => {
  angular.module('dashboard').directive('submenuSidebar', () => {
    return {
      restrict: 'AEC',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        const clear = () => {
          let items = angular.element('.sidebar-menuItem-button')
          angular.forEach(items, (item) => {
            angular.element(item).parent().removeClass('open')
          })
        }
        iElement.bind('click', () => {
          if(!angular.element(iElement).parent().hasClass('open'))
            clear()
          angular.element(iElement).parent().toggleClass('open')
        })
      }
    }
  })
})()
