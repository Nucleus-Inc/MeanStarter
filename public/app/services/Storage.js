angular.module('Storage', [])
  .service('Storage', function(localStorageService) {

    this.setUser = function(token) {
      return localStorageService.set('user', token);
    };

    this.getUser = function() {
      return localStorageService.get('user');
    };
  });
