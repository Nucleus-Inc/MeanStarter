(function() {
  angular.module('dashboard').directive('uiEmail', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Verification','Auth','Account', function($scope, Verification, Auth, Account) {

        $scope.adminVerifyEmail = function(email,view){
          Verification.adminVerifyEmail(email).then(function(res){
            view.$setValidity("emailExists",true);
          }).catch(function(err){
            if(err.status==422){
              view.$setValidity("emailExists",false);
            }
            if(err.status==404){
              view.$setValidity("emailExists",true);
            }
          });
        };

        $scope.verifyEmail = function(email,view){
          Auth.isAuthenticated().then(function(res){
            if(res.data){
              Account.getAccount(res.data._id).then(function(res){
                if(res.data.email === email)
                  view.$setValidity("emailExists",true);
                else
                  view.$setValidity("emailExists",false);
              });
            }else
              $scope.adminVerifyEmail(email,view);
          });
        };

      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        scope.$watch('ngModel', function (value) {
          if(value){ //exists an input value
            var str = ""+value;
            var res = str.match(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/);
            if(res){ //email is match
              ngModelCtrl.$setValidity("invalidEmail",true);
              if(iAttrs.uiEmail){ //uiEmail defined
                if(iAttrs.uiEmail == 'registered'){ //uiEmail equals registered
                  scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);
                }else{
                  if(iAttrs.uiEmail == 'no-registered'){ //uiEmail equals no-registered

                  }else{
                    if(iAttrs.uiEmail == 'logged'){
                      scope.verifyEmail(scope.ngModel,ngModelCtrl);
                    }else{ //uiEmail exists and is empty
                      scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);
                    }
                  }
                }
              }else //uiEmail no defined
                scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);
              /*scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);*/
            }else{ //email no match
              ngModelCtrl.$setValidity("invalidEmail",false);
              ngModelCtrl.$setValidity("emailExists",true);
            }
          }else{ //no input value
            ngModelCtrl.$setValidity("invalidEmail",true);
            ngModelCtrl.$setValidity("emailExists",true);
          }
        });

      }
    };
  });
}());
