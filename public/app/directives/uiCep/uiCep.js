(function() {
  angular.module('dashboard').directive('uiCep', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiCepCtrl as uiCepCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var cepMask = new StringMask('00000-000');

        var clearValue = function(rawValue) {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8);
      	};

        var format = function(cleanValue) {
      		return (cepMask.apply(cleanValue) || '').replace(/[^0-9]$/, '');
      	};

        var validations = function(value){
          return value.toString().trim().length === 8;
        };

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }
          var cleanValue = clearValue(value.toString());
          return format(cleanValue);
        });

        ngModelCtrl.$parsers.push(function parser(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }
          var cleanValue = clearValue(value.toString());
          var formattedValue = format(cleanValue);
          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }
          if (angular.isUndefined(ngModelCtrl.getModelValue)) {
            return cleanValue;
          }
          var actualModelType = typeof ngModelCtrl.$modelValue;
          return ngModelCtrl.getModelValue(formattedValue, actualModelType);
        });

        ngModelCtrl.$validators['cep'] = function validator(modelValue) {
          return ngModelCtrl.$isEmpty(modelValue) || validations(modelValue);
        };

        scope.$watch('ngModel', function (value) {
          if(value){
            ngModelCtrl.$setValidity('cepExists',true);
            var cleanValue = clearValue(value);
            scope.getCEP(cleanValue).then(function(res){
              if(res.status==200)
                ngModelCtrl.$setValidity('cepExists',true);
              else
                ngModelCtrl.$setValidity('cepExists',false);
            });
          }
        });

      }
    };
  });
}());
