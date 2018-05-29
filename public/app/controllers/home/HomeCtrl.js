(function() {
  angular.module('dashboard').controller('HomeCtrl', [ function() {

    var vm = this;

    var total = 10;

    vm.numbers = {
      'clients': 2,
      'sales': 4,
      'partners': 3,
      'plans': 1
    }

    vm.donutLabels = ['Clientes','Vendas','Parceiros','Planos'];
    vm.donutData = [parseFloat((vm.numbers.clients/total)*100).toFixed(2),parseFloat((vm.numbers.sales/total)*100).toFixed(2), parseFloat((vm.numbers.partners/total)*100).toFixed(2), parseFloat((vm.numbers.plans/total)*100).toFixed(2)]

    vm.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    vm.series = ['Cadastradas', 'Vendidas'];
    vm.data = [
      [10, 20, 30, 40, 20, 30, 20, 10, 0, 0, 0, 0],
      [-10, -20, 0, 30, 70, 90, 60, 30, 0, 0, 0, 0]
    ];

    vm.colors = ["rgb(255,193,7)","rgb(32,168,216)","rgb(79,255,135)","rgb(99,194,222)"];

    vm.onClick = function(points, evt) {
      console.log(points, evt);
    };

  }]);
}());
