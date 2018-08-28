(() => {
  angular.module('dashboard').controller('SettingsCtrl', ['$scope','$timeout','$window','Upload','Account','Profile','notify','$localStorage','Auth','$location','cloudinary','ModalService','Socket',
    function($scope, $timeout, $window, Upload, Account, Profile, notify, $localStorage, Auth, $location, cloudinary, ModalService, Socket) {

      let vm = this

      vm.tab = 1
      vm.start = false
      vm.alertMessage = {}
      vm.btn = {
        'name': '',
        'select': false
      }

      Auth.isAuthenticated().then((res) => {
        vm.inputs = {
          '_id': res.data._id,
          'name': res.data.account.name,
          'email': res.data.account.email,
          'phoneNumber': res.data.account.phoneNumber,
          'isActive': res.data.account.isActive
        }
        let cachedFile = $window.localStorage.getItem('persistentCache:imageProfile')
        if(cachedFile == null || cachedFile === ''){
          Profile.getProfile(res.data._id).then((result) => {
            if(res.data.profile!=null && result.data.profilePicture){
              $window.localStorage.setItem('persistentCache:imageProfile',result.data.profile.profilePicture)
              display(result.data.profile.profilePicture, true)
            }else
              display(null,false)
          }).catch((err) => {
            display(null,false)
          })
        }else
          display(cachedFile, true)
      }).catch((err) => {
        vm.alertMessage.show = true
        vm.alertMessage.type = 'danger'
        let keyErrors = Object.keys(err.data.errors)
        let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
        if (keyErrors.length > 1) {
          for (let i = 1; i < keyErrors.length; i++)
            description += keyErrors[i] + ', '
        }
        vm.alertMessage.message = description
      })

      vm.updatePassword = () => {
        if(!$scope.UpdatePassForm.$invalid) {
          vm.start = true
          Account.updatePassword(vm.inputs._id,vm.account.currentPassword,vm.account.newPassword).then((data) => {
            ModalService.showModal({
              templateUrl: 'app/views/modals/info.html',
              controller: 'InfoModalCtrl as infoModalCtrl',
              inputs: {
                title: 'Senha Alterada',
                info: 'Você será direcionado para o Login para que possa entrar novamente na aplicação.'
              }
            }).then((modal) => {
              modal.element.modal()
              modal.close.then((result) => {
                if(result && result.status){
                  vm.start = false
                  Auth.logout().then((res) => {
                    Socket.emit('logout success', res.data)
                    $location.path('/login')
                  }).catch((err) => {
                    vm.alertMessage.show = true
                    vm.alertMessage.type = 'warning'
                    vm.alertMessage.message = 'Sua senha foi atualizada por isso é altamente recomendável que você faça login novamente.'
                  })
                }
              })
            })
          }).catch((err) => {
            vm.start = false
            vm.alertMessage.show = true
            vm.alertMessage.type = 'danger'
            let keyErrors = Object.keys(err.data.errors)
            let description = 'Por favor, verifique os seguintes campos: ' + keyErrors[0]
            if (keyErrors.length > 1) {
              for (let i = 1; i < keyErrors.length; i++)
                description += keyErrors[i] + ', '
            }
            vm.alertMessage.message = description
          })
        }else{
          vm.start = false
          vm.alertMessage.show = true
          vm.alertMessage.type = 'danger'
          vm.alertMessage.message = 'Por favor, verifique os campos do formulário.'
        }
      }

      vm.updateProfile = () => {
        if(vm.pictures.length > 0){
          vm.upload(vm.pictures)
        }
      }

      vm.upload = (files) => {
        files.filter((item, index) => {
          if(!item.flag){
            Upload.upload({
              url: 'https://api.cloudinary.com/v1_1/'+cloudinary.config().cloud_name+'/upload/',
              withCredentials: false,
              data: {
                upload_preset: cloudinary.config().upload_preset,
                tags: 'profile',
                file: item.url
              }
            }).then((res) => {
              Account.updatePicture(vm.inputs._id, res.data.secure_url).then((res) => {
                vm.alertMessage.show = true
                if(res.status == 200){
                  cacheUpdate(res.data.profilePicture)
                  Socket.emit('change profile', res.data.profilePicture)
                  vm.alertMessage.type = 'success'
                  vm.alertMessage.message = 'Perfil atualizado com sucesso'
                }else{
                  vm.alertMessage.type = 'danger'
                  vm.alertMessage.message = 'Erro ao atualizar perfil'
                }
                vm.start = false
              }).catch((err) => {
                vm.start = false
                vm.alertMessage.show = true
                vm.alertMessage.type = 'danger'
                vm.alertMessage.message = 'Erro ao atualizar perfil'
              })
            }, (err) => {
              vm.start = false
              vm.alertMessage.show = true
              vm.alertMessage.type = 'danger'
              vm.alertMessage.message = 'Erro ao tentar fazer upload de imagem'
            }, (evt) => {
              vm.start = true
            })
          }
        })
      }

      vm.setInBuffer = (files) => {
        if(files){
          angular.forEach(files,(file) => {
            vm.pictures[0] = {
              'flag': false,
              'url': file
            }
            vm.btn.name = 'Remover'
            vm.btn.select = true
            angular.element('#uploadPicture').removeClass('btn-primary')
            angular.element('#uploadPicture').addClass('btn-danger')
          })
        }
      }

      vm.remove = () => {
        if(vm.btn.select){
          vm.pictures = []
          vm.btn.name = 'Adicionar'
          vm.btn.select = false
          angular.element('#uploadPicture').addClass('btn-primary')
          angular.element('#uploadPicture').removeClass('btn-danger')
        }
      }

      vm.closeAlert = () => {
        vm.alertMessage.show = false
      }

      vm.setTab = (newTab) => {
        vm.alertMessage.show = false
        vm.start = false
        vm.tab = newTab
      }

      vm.isSet = (tabNum) => {
        return vm.tab === tabNum
      }

      const display = (cachedFile, remove) => {
        if(remove){
          vm.btn.name = 'Remover'
          vm.btn.select = true
          $timeout(() => {
            angular.element('#uploadPicture').removeClass('btn-primary')
            angular.element('#uploadPicture').addClass('btn-danger')
            $scope.$apply()
          },5)
        }else{
          vm.btn.name = 'Adicionar'
          vm.btn.select = false
          $timeout(() => {
            angular.element('#uploadPicture').addClass('btn-primary')
            angular.element('#uploadPicture').removeClass('btn-danger')
            $scope.$apply()
          },5)
        }
        vm.pictures = []
        vm.pictures.push({'url': cachedFile})
      }

      const cacheUpdate = (url) => {
        $window.localStorage.setItem('persistentCache:imageProfile',url)
      }

  }])
})()
