(function() {
  angular.module('dashboard').controller('CardsBiCtrl', ['$scope','Bi', function($scope,Bi) {

    var vm = this;
    vm.start = true;

    var customColors = [
      'bg-berlim',
      'bg-tokyo',
      'bg-nairobi',
      'bg-rio'
    ];

    $scope.setColor = function(iElement){
      angular.forEach(iElement,function(value,key){
        angular.element(value).addClass(customColors[key]);
      });
    };

    $scope.setLabel = function(label){
      vm.label = label;
    };

    $scope.setIcon = function(icon){
      vm.icon = icon;
    };

    $scope.setValue = function(value){
      vm.start = false;
      vm.value = value;
    };

  }]);
}());
