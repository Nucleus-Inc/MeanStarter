(() => {
  angular.module('dashboard').directive('uiConta', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let contaMask = new StringMask('000000000000-00')
        const invalidConta = [
          '00000000000000',
          '11111111111111',
          '22222222222222',
          '33333333333333',
          '44444444444444',
          '55555555555555',
          '66666666666666',
          '77777777777777',
          '88888888888888',
          '99999999999999'
        ]

        const clearValue = (rawValue) => {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 14)
      	}

        const format = (cleanValue) => {
          let formattedValue = contaMask.apply(cleanValue)
      		return formattedValue.trim().replace(/[^0-9]$/, '')
      	}

        const getModelValue = (formattedValue, originalModelType) => {
      		let cleanValue = this.clearValue(formattedValue)
      		return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue
      	}

        const validations = (value) => {
          return value && value.toString().length == 14 && !invalidConta.includes(value)
        }

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value
          }
          let cleanValue = clearValue(value.toString())
          return format(cleanValue)
        })

        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('conta', true)
          if (ngModelCtrl.$isEmpty(value))
            return value
          let cleanValue = clearValue(value.toString())
          let formattedValue = format(cleanValue)
          if(!validations(cleanValue))
            ngModelCtrl.$setValidity('conta', false)
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
