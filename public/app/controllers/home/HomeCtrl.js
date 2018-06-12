(() => {
  angular.module('dashboard').controller('HomeCtrl', [ function() {

    let vm = this

    let total = 10

    vm.numbers = {
      'users': 2,
      'example1': 4,
      'example2': 3,
      'example3': 1
    }

    vm.donutLabels = ['Usuários','Exemplo #1','Exemplo #2','Exemplo #3']
    vm.donutData = [parseFloat((vm.numbers.users/total)*100).toFixed(2),parseFloat((vm.numbers.example1/total)*100).toFixed(2), parseFloat((vm.numbers.example2/total)*100).toFixed(2), parseFloat((vm.numbers.example3/total)*100).toFixed(2)]

    vm.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    vm.series = ['Ativados', 'Desativados']
    vm.data = [
      [10, 20, 30, 40, 20, 30, 20, 10, 0, 0, 0, 0],
      [-10, -20, 0, 30, 70, 90, 60, 30, 0, 0, 0, 0]
    ]

    vm.colors = ["rgb(255,193,7)","rgb(32,168,216)","rgb(79,255,135)","rgb(99,194,222)"]

    vm.onClick = (points, evt) => {

    }

  }])
})()
