(() => {
  angular.module('dashboard').controller('UsersCtrl', ['$scope','$filter','Users','Account','ModalService','Socket','Tables','Notify',
    function($scope, $filter, Users, Account, ModalService, Socket, Tables, Notify) {

      let vm = this

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Consultores Ativos'
        },
        {
          _id: 2,
          value: false,
          label: 'Consultores Pendentes'
        }
      ]
      vm.selectedPredicate = vm.predicates[0].label

      vm.config = {
        itemsPerPage: 10
      }

      let buffer = []
      vm.filteredList = []
      Users.getUsers().then((res) => {
        for(let i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i])
        buffer = vm.filteredList
      })

      Socket.on('admin add',(msg) => {
        let flag = true
        vm.filteredList.filter((item) => {
          if(item._id === msg.id)
            flag = false
        })
        if(flag)
          vm.filteredList.push(msg)
      })

      Socket.on('admin active',(msg) => {
        vm.filteredList.filter((item) => {
          if(item._id === msg)
            item.account.isActive = true
        })
      })

      Socket.on('admin inactivate',(msg) => {
        vm.filteredList.filter((item) => {
          if(item._id === msg)
            item.account.isActive = false
        })
      })

      let search = (value) => {
        Tables.search([value.name,value.email],vm.key,(res) => {
          if(res){
            buffer.filter((item) => {
              if(item.account.email == value.email){
                vm.filteredList.push(item)
              }
            })
          }
        })
      }

      vm.update = () => {
        Tables.condition(vm.predicates,vm.selectedPredicate,(condition) => {
          let account = []
          buffer.filter((item) => {
            account.push(item.account)
          })
          vm.filteredList = []
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,(res) => {
            if(res!=null)
              search(res)
          })
        })
      }

      vm.clean = () => {
        Tables.clean(vm,buffer,(res) => { })
      }

      vm.active = (id, email, isActive) => {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: isActive ? 'Desativar usuário' : 'Ativar usuário',
            question: isActive ? 'Você desja realmente Desativar este usuário?' : 'Você deseja realmente ativar este usuário?',
            user: email
          }
        }).then((modal) => {
          modal.element.modal()
          modal.close.then((result) => {
            if(result && result.status){
              if(isActive){
                Account.inactivate(id).then((res) => {
                  Notify.run('Usuário desativado com sucesso','alert-success',null,null,null,(res) => {
                    if(res)
                      Socket.emit('admin inactivate',id)
                  })
                })
              }else{
                Account.active(id).then((res) => {
                  Notify.run('Usuário ativado com sucesso','alert-success',null,null,null,(res) => {
                    if(res)
                      Socket.emit('admin active',id)
                  })
                })
              }
            }
          })
        })
      }

  }])
})()
