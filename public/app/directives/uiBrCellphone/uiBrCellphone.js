(() => {
  angular.module('dashboard').directive('uiBrCellphone', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiBrCellphoneCtrl as uiBrCellphoneCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        let phoneMask8D = {
      		countryCode : new StringMask('+00 (00) 0000-0000'),   //with country code
      		areaCode    : new StringMask('(00) 0000-0000'),       //with area code
      		simple      : new StringMask('0000-0000')             //without area code
      	}, phoneMask9D = {
      		countryCode : new StringMask('+00 (00) 00000-0000'), //with country code
      		areaCode    : new StringMask('(00) 00000-0000'),     //with area code
      		simple      : new StringMask('00000-0000')           //without area code
      	}, phoneMask0800 = {
      		countryCode : null,                                   //N/A
      		areaCode    : null,                                   //N/A
      		simple      : new StringMask('0000-000-0000')         //N/A, so it's "simple"
      	}

        const clearValue = (rawValue) => {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 13)
      	}

        const format = (cleanValue) => {
          let formattedValue
      		if (cleanValue.indexOf('0800') === 0) {
      			formattedValue = phoneMask0800.simple.apply(cleanValue)
      		} else if (cleanValue.length < 9) {
      			formattedValue = phoneMask8D.simple.apply(cleanValue) || ''
      		} else if (cleanValue.length < 10) {
      			formattedValue = phoneMask9D.simple.apply(cleanValue)
      		} else if (cleanValue.length < 11) {
      			formattedValue = phoneMask8D.areaCode.apply(cleanValue)
      		} else if (cleanValue.length < 12) {
      			formattedValue = phoneMask9D.areaCode.apply(cleanValue)
      		} else if (cleanValue.length < 13) {
      			formattedValue = phoneMask8D.countryCode.apply(cleanValue)
      		} else {
      			formattedValue = phoneMask9D.countryCode.apply(cleanValue)
      		}
      		return formattedValue.trim().replace(/[^0-9]$/, '')
      	}

        const getModelValue = (formattedValue, originalModelType) => {
      		let cleanValue = this.clearValue(formattedValue)
      		return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue
      	}

        const validations = (value) => {
          let valueLength = value && value.toString().length
          //8- 8D without AC
          //9- 9D without AC
          //10- 8D with AC
          //11- 9D with AC and 0800
          //12- 8D with AC plus CC
          //13- 9D with AC plus CC
          return valueLength >= 10 && valueLength <= 13
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
            ngModelCtrl.$setValidity('phoneNumberExists', true)
            ngModelCtrl.$setValidity('invalidCellphone', true)
            return value
          }
          let cleanValue = clearValue(value.toString())
          let formattedValue = format(cleanValue)
          if(!validations(cleanValue)){
            ngModelCtrl.$setValidity('invalidCellphone', false)
            ngModelCtrl.$setValidity('phoneNumberExists', true)
          }else{
            ngModelCtrl.$setValidity('invalidCellphone', true)
            scope.verifyPhoneNumber(cleanValue).then((res) => {
              if(res.status == 422)
                ngModelCtrl.$setValidity('phoneNumberExists', false)
              else
                ngModelCtrl.$setValidity('phoneNumberExists', true)
            }).catch((err) => {
              if(err.status == 422)
                ngModelCtrl.$setValidity('phoneNumberExists', false)
              else
                ngModelCtrl.$setValidity('phoneNumberExists', true)
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

      }
    }
  })
})()
