(function() {
  angular.module('dashboard').factory('Config', ['url_base', function(url_base) {
    return {
      'url_base': url_base,
      _id: ''
    }
  }]);
}());
