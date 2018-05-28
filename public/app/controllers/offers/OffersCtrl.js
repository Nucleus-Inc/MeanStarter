(function() {
  angular.module('dashboard').controller('OffersCtrl', ['$scope','$filter','Offers','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Offers, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 3,
          value: 'pending',
          label: 'Ofertas Pendentes'
        },
        {
          _id: 4,
          value: 'reproved',
          label: 'Ofertas Reprovadas'
        },
        {
          _id: 5,
          value: 'approved',
          label : 'Ofertas Aprovadas'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      var selectedCondition = function(selectedPredicate) {

        var i=0;
        var item = vm.predicates[i];

        do{
          item = vm.predicates[i];
          i++;
        }while(i < vm.predicates.length && item.label != selectedPredicate);

        if(item._id == 1 || item._id == 2 || item._id == 0)
          return 'isActive';
        return 'status';

      };

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Offers.getOffers().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('showCreateOffers',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('showUpdateOffers',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id){
            item.title = msg.title;
          }
        });
      });

      Socket.on('offers active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.approval.status = "approved";
        });
      });

      Socket.on('offers inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.approval.status = "reproved";
        });
      });

      var search = function(value){
        Tables.search([value.status,value.title,value.partner,value.duration,value.companyName],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item._id == value._id){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {

        var condition = selectedCondition(vm.selectedPredicate);

        var offers = [];
        buffer.filter(function(item){
          offers.push({
            _id: item._id,
            status: item.approval.status,
            duration: item.duration.expireDate,
            title: item.title,
            partner: item.partner.name,
            companyName: item.partner.companyName
          });
        });

        vm.filteredList = [];
        Tables.update(offers,vm.predicates,vm.selectedPredicate,condition,function(res){
          if(res!=null)
            search(res);
        });

      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
            inputs: {
              title: isActive == 'approved' || isActive == 'approv' ? 'Desativar oferta' : 'Aprovar oferta',
              question: isActive == 'approved' || isActive == 'approv' ? 'Você desja realmente desativar esta oferta?' : 'Você desja realmente aprovar esta oferta?',
              user: title
            }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive=='approved' || isActive=='approv'){
                Offers.reproveOffer(_id).then(function(res){
                  Notify.run('Oferta desativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('offers inactivate',_id);
                  });
                });
              }else{
                Offers.approveOffer(_id).then(function(res){
                  Notify.run('Oferta aprovada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('offers active',_id);
                  });
                });
              }
            }
          });
        });
      };

      var getOfferId = function(id){
        var i = 0;
        while(i<vm.filteredList.length && vm.filteredList[i]._id != id)
          i++;
        return i < vm.filteredList.length ? vm.filteredList[i] : null;
      }

      vm.view = function(offerId) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/offers.html',
          controller: 'OffersModalCtrl as offersModalCtrl',
          inputs: {
            title: 'Detalhes',
            input: getOfferId(offerId)
          }
        }).then(function(modal){
          modal.element.modal();
          modal.close.then(function(result){
            if(result){
              console.log(result);
            }
          });
        })
      };

  }]);
}());
