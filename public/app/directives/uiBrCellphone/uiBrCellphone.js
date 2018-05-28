(function() {
  angular.module('dashboard').directive('uiBrCellphone', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope', function($scope) {

        $scope.verifyPartnerPhoneNumber = function(phoneNumber,view){
          view.$setValidity("phoneNumberExists",true);
        };

      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Input accept numbers-only
        function parserName(number) {
          var input = number.replace(/[^0-9]/g,'');
          if(input !== number) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return Number(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        //Validation cellphone number
        scope.$watch('ngModel', function (value) {
          if(value){
            var str = ""+value;
            var len = str.length;
            if(len<11 || len>11){
              if(len==19){
                var country = str.slice(1,3);
                if(country=='55'){
                  var state = str.slice(5,7);
                  if(state=='11'||state=='12'||state=='13'||state=='14'||state=='15'||state=='16'||state=='17'||state=='18'||state=='19'||state=='21'||
                     state=='22'||state=='24'||state=='27'||state=='28'||state=='31'||state=='32'||state=='33'||state=='34'||state=='35'||state=='37'||
                     state=='38'||state=='41'||state=='42'||state=='43'||state=='44'||state=='45'||state=='46'||state=='47'||state=='48'||state=='49'||
                     state=='51'||state=='53'||state=='54'||state=='55'||state=='61'||state=='62'||state=='63'||state=='64'||state=='65'||state=='66'||
                     state=='67'||state=='68'||state=='69'||state=='71'||state=='73'||state=='74'||state=='75'||state=='77'||state=='79'||state=='81'||
                     state=='82'||state=='83'||state=='84'||state=='85'||state=='86'||state=='87'||state=='88'||state=='89'||state=='91'||state=='92'||
                     state=='93'||state=='94'||state=='95'||state=='96'||state=='97'||state=='98'||state=='99'){
                       ngModelCtrl.$setValidity("invalidCellphone",true);
                       scope.verifyPartnerPhoneNumber(value,ngModelCtrl);
                  }else
                    ngModelCtrl.$setValidity("invalidCellphone",false);
                }else{
                  ngModelCtrl.$setValidity("phoneNumberExists",true);
                  ngModelCtrl.$setValidity("invalidCellphone",false);
                }
              }else{
                if(len==13){
                  var country = str.slice(0,2);
                  if(country=='55'){
                    var state = '('+str.slice(2,4)+')';
                    var initial = str.slice(4,9);
                    var finish = str.slice(9,13);
                    var mask = '+'+country+' '+state+' '+initial+'-'+finish;
                    scope.ngModel = mask;
                  }else{
                    ngModelCtrl.$setValidity("phoneNumberExists",true);
                    ngModelCtrl.$setValidity("invalidCellphone",false);
                  }
                }else{
                  ngModelCtrl.$setValidity("phoneNumberExists",true);
                  ngModelCtrl.$setValidity("invalidCellphone",false);
                }
              }
            }else{
                var momentCountry = str.slice(0,2);
                if(momentCountry!='55'){
                  var country = '+55';
                  var state = '('+str.slice(0,2)+')';
                  var initial = str.slice(2,7);
                  var finish = str.slice(7,11);
                  var mask = country+' '+state+' '+initial+'-'+finish;
                  scope.ngModel = mask;
                }else{
                  ngModelCtrl.$setValidity("phoneNumberExists",true);
                  ngModelCtrl.$setValidity("invalidCellphone",false);
                }
            }
          }else{
            ngModelCtrl.$setValidity("phoneNumberExists",true);
            ngModelCtrl.$setValidity("invalidCellphone",true);
          }
        });

      }
    };
  });
}());
