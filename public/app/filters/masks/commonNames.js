(function() {
  angular.module('dashboard').filter('commonNames', function() {
    return function(string) {
      if(!angular.isString(string))
          return string;
      return string.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
    };
  });
}());
