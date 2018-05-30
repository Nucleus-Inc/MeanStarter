(() => {
  angular.module('dashboard').directive('uiBrName', () => {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        //Disable keyup press of the numbers in input
        let parserName = (textName) => {
          let input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g,'')
          if(input !== textName) {
              ngModelCtrl.$setViewValue(input)
              ngModelCtrl.$render()
          }
          return String(input)
        }
        ngModelCtrl.$parsers.push(parserName)
        //Capitalize first letter the person names
        scope.$watch('ngModel', (value) => {
          if(value){
            let textValue = ""+value
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,(a)=>{return a.toUpperCase()})
            let space = scope.ngModel.search(" ")
            if(space==-1)
              ngModelCtrl.$setValidity("minname",false)
            else
              ngModelCtrl.$setValidity("minname",true)
          }else {
            ngModelCtrl.$setValidity("minname",true)
          }
        })
      }
    }
  })
})()
