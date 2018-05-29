(function() {
  angular.module('dashboard').controller('UiBrCellphoneCtrl', ['$scope','Verification', function($scope, Verification) {

    $scope.verifyPhoneNumber = function(value){
      return Verification.userVerifyPhoneNumber(value).then(function(res){
        return res;
      }).catch(function(err){
        return err;
      })
    };

  }]);
}());
