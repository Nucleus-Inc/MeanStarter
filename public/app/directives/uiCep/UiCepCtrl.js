(function() {
  angular.module('dashboard').controller('UiCepCtrl', ['$scope','PostmonService','Socket', function($scope,PostmonService,Socket) {

    $scope.getCEP = function(value){
      return PostmonService.getCep(value).then(function(res){
        if(res.status==200)
          Socket.emit('cep complete',res.data);
        return res;
      }).catch(function(res){
        return res;
      });
    };

  }]);
}());
