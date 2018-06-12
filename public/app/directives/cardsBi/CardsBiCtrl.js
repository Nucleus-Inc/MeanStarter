(() => {
  angular.module('dashboard').controller('CardsBiCtrl', ['$scope','Bi', function($scope,Bi) {

    let vm = this
    vm.start = true

    $scope.setColor = (iElement, color) => {
      angular.element(iElement).addClass(color)
    }

    $scope.setLabel = (label) => {
      vm.label = label
    }

    $scope.setIcon = (icon) => {
      vm.icon = icon
    }

    $scope.setValue = (value) => {
      vm.start = false
      vm.value = value
    }

  }])
})()
