(function() {
  angular.module('dashboard').filter('subscription', function() {
    return function(string) {
      if(string==="premium")
        return "Premium";
      return "Gratuito"
    };
  });
}());
