(function() {
  angular.module('dashboard').controller('SettingsCtrl', ['$scope','$timeout','$window','Upload','Account','notify','$localStorage','Config','Auth','$location','cloudinary','ModalService','Socket',
    function($scope, $timeout, $window, Upload, Account, notify, $localStorage, Config, Auth, $location, cloudinary, ModalService, Socket) {

      var vm = this;

      vm.tab = 1;
      vm.start = false;
      vm.alertMessage = {};
      vm.btn = {
        'name': '',
        'select': false
      }

      Auth.isAuthenticated().then(function(res){
        vm.inputs = {
          '_id': res.data._id,
          'name': res.data.name,
          'email': res.data.email
        }
        var cachedFile = $window.localStorage.getItem('persistentCache:imageProfile');
        if(cachedFile == null || cachedFile === ''){
          Account.getAccount(res.data._id).then(function(result){
            if(result.data.profilePicture){
              $window.localStorage.setItem('persistentCache:imageProfile',result.data.profilePicture);
              display(result.data.profilePicture, true);
            }else
              display(null,false);
          }).catch(function(err){
            display(null,false);
          });
        }else
          display(cachedFile, true);
      }).catch(function(err){
        vm.alertMessage.show = true;
        vm.alertMessage.type = 'danger';
        vm.alertMessage.message = err.data.error.description;
      });

      vm.updatePassword = function(){
        if(!$scope.UpdatePassForm.$invalid) {
          vm.start = true;
          Account.updatePassword(vm.inputs._id,vm.account.currentPassword,vm.account.newPassword).then(function(data){
            ModalService.showModal({
              templateUrl: 'app/views/modals/info.html',
              controller: 'InfoModalCtrl as infoModalCtrl',
              inputs: {
                title: 'Senha Alterada',
                info: 'Você será direcionado para o Login para que possa entrar novamente na aplicação.'
              }
            }).then(function(modal){
              modal.element.modal();
              modal.close.then(function(result){
                if(result && result.status){
                  vm.start = false;
                  Auth.logout().then(function(res){
                    Socket.emit('logout success', res.data);
                    $location.path('/login');
                  }).catch(function(err){
                    vm.alertMessage.show = true;
                    vm.alertMessage.type = 'warning';
                    vm.alertMessage.message = 'Sua senha foi atualizada por isso é altamente recomendável que você faça login novamente.';
                  });
                }
              });
            });
          }).catch(function(err){
            vm.start = false;
            vm.alertMessage.show = true;
            vm.alertMessage.type = 'danger';
            // vm.alertMessage.message = err.data.error.description;
          });
        }else{
          vm.start = false;
          vm.alertMessage.show = true;
          vm.alertMessage.type = 'danger';
          // vm.alertMessage.message = err.data.error.description;
        }
      };

      vm.updateProfile = function(){
        if(vm.pictures.length > 0){
          vm.upload(vm.pictures);
        }
      };

      vm.upload = function (files) {
        files.filter(function(item, index){
          if(!item.flag){
            Upload.upload({
              url: 'https://api.cloudinary.com/v1_1/'+cloudinary.config().cloud_name+'/upload/',
              withCredentials: false,
              data: {
                upload_preset: cloudinary.config().upload_preset,
                tags: 'profile',
                file: item.url
              }
            }).then(function(res){
              Account.updatePicture(vm.inputs._id, res.data.secure_url).then(function(res){
                vm.alertMessage.show = true;
                if(res.status == 200){
                  cacheUpdate(res.data.profilePicture);
                  Socket.emit('change profile', res.data.profilePicture);
                  vm.alertMessage.type = 'success';
                  vm.alertMessage.message = 'Perfil atualizado com sucesso';
                }else{
                  vm.alertMessage.type = 'danger';
                  vm.alertMessage.message = 'Erro ao atualizar perfil';
                }
                vm.start = false;
              }).catch(function(err){
                vm.start = false;
                vm.alertMessage.show = true;
                vm.alertMessage.type = 'danger';
                vm.alertMessage.message = 'Erro ao atualizar perfil';
              });
            }, function (err) {
              vm.start = false;
              vm.alertMessage.show = true;
              vm.alertMessage.type = 'danger';
              vm.alertMessage.message = 'Erro ao tentar fazer upload de imagem';
            }, function (evt) {
              vm.start = true;
            });
          }
        });
      };

      vm.setInBuffer = function(files){
        if(files){
          angular.forEach(files,function(file){
            vm.pictures[0] = {
              'flag': false,
              'url': file
            };
            vm.btn.name = 'Remover';
            vm.btn.select = true;
            angular.element('#uploadPicture').removeClass('btn-primary');
            angular.element('#uploadPicture').addClass('btn-danger');
          });
        }
      };

      vm.remove = function(){
        if(vm.btn.select){
          vm.pictures = [];
          vm.btn.name = 'Adicionar';
          vm.btn.select = false;
          angular.element('#uploadPicture').addClass('btn-primary');
          angular.element('#uploadPicture').removeClass('btn-danger');
        }
      };

      vm.closeAlert = function() {
        vm.alertMessage.show = false;
      };

      vm.setTab = function(newTab) {
        vm.alertMessage.show = false;
        vm.start = false;
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

      var display = function(cachedFile, remove){
        if(remove){
          vm.btn.name = 'Remover';
          vm.btn.select = true;
          $timeout(function(){
            angular.element('#uploadPicture').removeClass('btn-primary');
            angular.element('#uploadPicture').addClass('btn-danger');
            $scope.$apply();
          },5);
        }else{
          vm.btn.name = 'Adicionar';
          vm.btn.select = false;
          $timeout(function(){
            angular.element('#uploadPicture').addClass('btn-primary');
            angular.element('#uploadPicture').removeClass('btn-danger');
            $scope.$apply();
          },5);
        }
        vm.pictures = [];
        vm.pictures.push({'url': cachedFile});
      };

      var cacheUpdate = function(url){
        $window.localStorage.setItem('persistentCache:imageProfile',url);
        //$window.localStorage.setItem('persistentCache:imageNavProfile',url);
      };

  }]);
}());
