angular.module('meanStarterApp').directive('resendAlert', function() {

  return {
    restrict: 'E',
    scope: {
      status: '='
    },
    template: '<div class="alert alert-danger alert-dismissible" role="alert" ng-show="status === 401"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> Invalid email or password</div>',
    link: function(scope, element, attrs) {
      var closeButton = angular.element(document.querySelector('.close'));
      closeButton.bind('click', function() {
        element.hide();
      });
      scope.$watch('status', function(newValue, oldValue) {
        if (newValue === 401) {
          element.show();
        }
      }, true);
    }
  };
});
