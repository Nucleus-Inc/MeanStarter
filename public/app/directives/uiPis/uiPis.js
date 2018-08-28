(() => {
  angular.module('dashboard').directive('uiPis', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let pisMask = new StringMask('000.00000.00.0')
        const pisBase = '3298765432'
        const invalidPis = [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999'
        ]

        const clearValue = (rawValue) => {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 11)
      	}

        const format = (cleanValue) => {
          let formattedValue = pisMask.apply(cleanValue)
      		return formattedValue.trim().replace(/[^0-9]$/, '')
      	}

        const getModelValue = (formattedValue, originalModelType) => {
      		let cleanValue = this.clearValue(formattedValue)
      		return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue
      	}

        const validations = (value) => {
          let total = 0
          for(let i=0; i<10; i++){
            let multiplying = parseInt(value.substring(i,i+1))
            let multiplier = parseInt(pisBase.substring(i,i+1))
            total += multiplying * multiplier
          }
          let rest = 11 - total % 11
          rest = rest === 10 || rest === 11 ? 0 : rest
          let digit = parseInt(value.toString().charAt(10))
          return value && value.toString().length == 11 && !invalidPis.includes(value) && rest === digit
        }

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value
          }
          let cleanValue = clearValue(value.toString())
          return format(cleanValue)
        })

        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('pis', true)
          if (ngModelCtrl.$isEmpty(value))
            return value
          let cleanValue = clearValue(value.toString())
          let formattedValue = format(cleanValue)
          if(!validations(cleanValue))
            ngModelCtrl.$setValidity('pis', false)
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
