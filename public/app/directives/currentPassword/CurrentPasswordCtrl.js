(() => {
  angular.module('dashboard').controller('CurrentPasswordCtrl', ['$scope','Auth', ($scope, Auth) => {

    $scope.checkPassword = (value, email) => {
      return Auth.login(email, value).then((res) => { return res.status == 200 ? true : false }).catch((err) => { return false })
    }

  }])
})()
