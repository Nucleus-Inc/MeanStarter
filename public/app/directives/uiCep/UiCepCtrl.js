(() => {
  angular.module('dashboard').controller('UiCepCtrl', ['$scope','PostmonService','Socket', ($scope,PostmonService,Socket) => {

    $scope.getCEP = (value) => {
      return PostmonService.getCep(value).then((res) => {
        if(res.status==200)
          Socket.emit('cep complete',res.data)
        return res
      }).catch((res) => { return res })
    }

  }])
})()
