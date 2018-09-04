(() => {
  angular.module('dashboard').directive('uiAgencia', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let agenciaMask = new StringMask('00000-00')
        const invalidAgencia = [
          '0000000',
          '1111111',
          '2222222',
          '3333333',
          '4444444',
          '5555555',
          '6666666',
          '7777777',
          '8888888',
          '9999999'
        ]

        const clearValue = (rawValue) => {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 7)
      	}

        const format = (cleanValue) => {
          let formattedValue = agenciaMask.apply(cleanValue)
      		return formattedValue.trim().replace(/[^0-9]$/, '')
      	}

        const getModelValue = (formattedValue, originalModelType) => {
      		let cleanValue = this.clearValue(formattedValue)
      		return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue
      	}

        const validations = (value) => {
          return value && value.toString().length == 7 && !invalidAgencia.includes(value)
        }

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value
          }
          let cleanValue = clearValue(value.toString())
          return format(cleanValue)
        })

        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('agencia', true)
          if (ngModelCtrl.$isEmpty(value))
            return value
          let cleanValue = clearValue(value.toString())
          let formattedValue = format(cleanValue)
          if(!validations(cleanValue))
            ngModelCtrl.$setValidity('agencia', false)
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

      }
    }
  })
})()
