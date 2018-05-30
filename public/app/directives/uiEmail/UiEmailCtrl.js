(() => {
  angular.module('dashboard').controller('UiEmailCtrl', ['$scope','Verification','Auth','Account', ($scope, Verification, Auth, Account) => {

    $scope.userVerifyEmail = (email) => {
      return Verification.userVerifyEmail(email).then((res) => { return true }).catch((err) => { return err.status==422 ? false : true })
    }

    $scope.verifyEmail = (email) => {
      return Auth.isAuthenticated().then((res) => {
        Account.getAccount(res.data._id).then((res) => { return res.data.email === email ? true : false })
      }).catch((err) => { return $scope.userVerifyEmail(email) })
    }

  }])
})()
