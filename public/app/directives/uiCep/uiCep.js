(() => {
  angular.module('dashboard').directive('uiCep', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiCepCtrl as uiCepCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let cepMask = new StringMask('00000-000')

        let clearValue = (rawValue) => {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8)
      	}

        let format = (cleanValue) => {
      		return (cepMask.apply(cleanValue) || '').replace(/[^0-9]$/, '')
      	}

        let validations = (value) => {
          return value.toString().trim().length === 8
        }

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value
          }
          let cleanValue = clearValue(value.toString())
          return format(cleanValue)
        })

        ngModelCtrl.$parsers.push(function parser(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value
          }
          let cleanValue = clearValue(value.toString())
          let formattedValue = format(cleanValue)
          if(!validations(cleanValue)){
            ngModelCtrl.$setValidity('invalidCep', false)
            ngModelCtrl.$setValidity('cepExists',true)
          }else{
            ngModelCtrl.$setValidity('cepExists',true)
            scope.getCEP(cleanValue).then(function(res){
              if(res.status==200)
                ngModelCtrl.$setValidity('cepExists',true)
              else
                ngModelCtrl.$setValidity('cepExists',false)
            })
          }
          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue)
            ngModelCtrl.$render()
          }
          if (angular.isUndefined(ngModelCtrl.getModelValue)) {
            return cleanValue
          }
          let actualModelType = typeof ngModelCtrl.$modelValue
          return ngModelCtrl.getModelValue(formattedValue, actualModelType)
        })

        ngModelCtrl.$validators['cep'] = function validator(modelValue) {
          return ngModelCtrl.$isEmpty(modelValue) || validations(modelValue)
        }

      }
    }
  })
})()
