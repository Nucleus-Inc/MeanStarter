(() => {
  angular.module('dashboard').controller('UiBrCellphoneCtrl', ['$scope','Verification', ($scope, Verification) => {

    $scope.verifyPhoneNumber = (value) => {
      let phoneNumber = '55' + value.toString().replace(/[^0-9]/g, '')
      return Verification.userVerifyPhoneNumber(phoneNumber).then((result) => { return result })
    }

  }])
})()
