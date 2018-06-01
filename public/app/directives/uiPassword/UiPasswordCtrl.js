(() => {
  angular.module('dashboard').controller('UiPasswordCtrl', ['$scope','Verification', ($scope, Verification) => {

    $scope.checkPassword = (value) => {
      return Verification.verifyPassword(value).then((res) => { return res.data.score > 1 ? true : false })
    }

  }])
})()
