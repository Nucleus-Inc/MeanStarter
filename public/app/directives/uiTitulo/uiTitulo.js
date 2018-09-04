(() => {
  angular.module('dashboard').directive('uiTitulo', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        const clearValue = (rawValue) => {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 12)
      	}

        const format = (cleanValue) => {
      		return cleanValue.trim().replace(/[^0-9]$/, '')
      	}

        const getModelValue = (formattedValue, originalModelType) => {
      		let cleanValue = this.clearValue(formattedValue)
      		return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue
      	}

        const validations = (value) => {
          let uf = value.substr(-4, 2)
          if((value.length < 5 || value.length > 13) || (value[1].repeat(value.length) == value) || (uf < 1 || uf > 28))
            return false
          let dv = value.substr(-2)
          let base = 2
          let sequence = value.substr(0,value.length-4)
          for(let i = 0; i < 2; i++){
            let fator = 9
            let soma = 0
            for(let j = sequence.length - 1; j > -1; j--){
              soma += sequence[j] * fator
              if(fator == base)
                fator = 10
              fator--
            }
            let digit = soma % 11
            if(digit == 0 && uf < 3)
              digit = 1
            else if(digit == 10)
              digit = 0
            if(dv[i] != digit)
                return false
            switch (i) {
              case 0:
                sequence = uf.concat(digit)
                break;
            }
          }
          return true
        }

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value
          }
          let cleanValue = clearValue(value.toString())
          return format(cleanValue)
        })

        ngModelCtrl.$parsers.push(function parser(value) {
          ngModelCtrl.$setValidity('titulo', true)
          if (ngModelCtrl.$isEmpty(value))
            return value
          let cleanValue = clearValue(value.toString())
          let formattedValue = format(cleanValue)
          if(!validations(cleanValue))
            ngModelCtrl.$setValidity('titulo', false)
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
