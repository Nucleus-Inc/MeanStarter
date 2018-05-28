(function() {
  angular.module('dashboard').directive('strengthPassword', function() {
    return {
      restrict: 'AEC',
      scope: {
        strength: '='
      },
      templateUrl: 'app/directives/strengthPassword/strengthPassword.html',
      link: function(scope, iElement, iAttrs, ctrl) {

        var removeColor = function(meter){
          angular.element('#worst').removeClass('strength-meter-'+meter);
          angular.element('#bad').removeClass('strength-meter-'+meter);
          angular.element('#weak').removeClass('strength-meter-'+meter);
          angular.element('#good').removeClass('strength-meter-'+meter);
          angular.element('#strong').removeClass('strength-meter-'+meter);
        };

        var clear = function(){
          removeColor('worst');
          removeColor('bad');
          removeColor('weak');
          removeColor('good');
          removeColor('strong');
        };

        scope.$watch('strength', function(value) {

          clear();

          if(value.password){
            if(value.score == 0){
              angular.element('#worst').addClass('strength-meter-worst');
            }
            if(value.score == 1){
              angular.element('#worst').addClass('strength-meter-bad');
              angular.element('#bad').addClass('strength-meter-bad');
            }
            if(value.score == 2){
              angular.element('#worst').addClass('strength-meter-weak');
              angular.element('#bad').addClass('strength-meter-weak');
              angular.element('#weak').addClass('strength-meter-weak');
            }
            if(value.score == 3){
              angular.element('#worst').addClass('strength-meter-good');
              angular.element('#bad').addClass('strength-meter-good');
              angular.element('#weak').addClass('strength-meter-good');
              angular.element('#good').addClass('strength-meter-good');
            }
            if(value.score == 4){
              angular.element('#worst').addClass('strength-meter-strong');
              angular.element('#bad').addClass('strength-meter-strong');
              angular.element('#weak').addClass('strength-meter-strong');
              angular.element('#good').addClass('strength-meter-strong');
              angular.element('#strong').addClass('strength-meter-strong');
            }
          }else{
            clear();
          }
        });
      }
    };
  });
}());
