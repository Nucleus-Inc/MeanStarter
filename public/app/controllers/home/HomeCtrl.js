(function() {
  angular.module('dashboard').controller('HomeCtrl', ['Bi', function(Bi) {

    var vm = this;

    Bi.getNumbers().then(function(res){
      vm.numbers = res.data;
      var total = res.data.offers+res.data.categories+res.data.partners+res.data.plans;
      vm.donutLabels = ['Ofertas', 'Categorias', 'Parceiros', 'Planos'];
      vm.donutData = [parseFloat((res.data.offers/total)*100).toFixed(2), parseFloat((res.data.categories/total)*100).toFixed(2), parseFloat((res.data.partners/total)*100).toFixed(2), parseFloat((res.data.plans/total)*100).toFixed(2)];
    });

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
