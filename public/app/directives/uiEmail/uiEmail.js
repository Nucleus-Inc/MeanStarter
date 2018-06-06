(() => {
  angular.module('dashboard').directive('uiEmail', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiEmailCtrl as uiEmailCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {

        scope.$watch('ngModel', (value) => {
          if(value){ //exists an input value
            let str = value.toString()
            let res = str.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
            if(res){ //email is match
              ngModelCtrl.$setValidity("emailExists", true)
              ngModelCtrl.$setValidity("invalidEmail", true)
              if(iAttrs.uiEmail){ //uiEmail defined .catch((err) => { ngModelCtrl.$setValidity("emailExists", res)  })
                if(iAttrs.uiEmail == 'registered'){ //uiEmail equals registered
                  scope.userVerifyEmail(scope.ngModel).then((res) => { ngModelCtrl.$setValidity("emailExists", res) })
                }else{
                  if(iAttrs.uiEmail == 'no-registered'){ //uiEmail equals no-registered

                  }else{
                    if(iAttrs.uiEmail == 'logged'){
                      scope.userVerifyEmail(scope.ngModel).then((res) => { ngModelCtrl.$setValidity("emailExists", res) })
                    }else{ //uiEmail exists and is empty
                      scope.userVerifyEmail(scope.ngModel).then((res) => { ngModelCtrl.$setValidity("emailExists", res) })
                    }
                  }
                }
              }else //uiEmail no defined
                scope.userVerifyEmail(scope.ngModel).then((res) => { ngModelCtrl.$setValidity("emailExists", res) })
            }else{ //email no match
              ngModelCtrl.$setValidity("invalidEmail",false)
              ngModelCtrl.$setValidity("emailExists",true)
            }
          }else{ //no input value
            ngModelCtrl.$setValidity("invalidEmail",true)
            ngModelCtrl.$setValidity("emailExists",true)
          }
        })

      }
    }
  })
})()
