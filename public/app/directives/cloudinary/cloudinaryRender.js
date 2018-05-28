(function() {
  angular.module('dashboard').directive('cloudinaryRender', function($window) {
    return {
      restrict: 'AEC',
      scope: {
        url: '='
      },
      templateUrl: 'app/directives/cloudinary/cloudinary.html',
      controller: 'CloudinaryCtrl as cloudinaryCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        var urls = [];
        if(iAttrs.data == 'json'){
          urls.push({
            'path': scope.setUrl(scope.url.frontUrl),
            'title': null,
            'description': null
          });
          urls.push({
            'path': scope.setUrl(scope.url.backUrl),
            'title': null,
            'description': null
          });
        }else{
          for(var i=0;i<scope.url.length;i++)
            urls.push({
              'path': scope.setUrl(scope.url[i].url),
              'title': scope.url[i].title,
              'description': scope.url[i].desc
            });
        }
        scope.show(urls);
      }
    };
  });
}());
