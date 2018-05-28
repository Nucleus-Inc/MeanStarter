(function() {
  angular.module('dashboard').filter('phoneNumber', function() {
    return function(str) {
      var state = '('+str.slice(2,4)+')';
      var initial = str.slice(4,9);
      var finish = str.slice(9,13);
      return state+' '+initial+'-'+finish;
    };
  });
}());
