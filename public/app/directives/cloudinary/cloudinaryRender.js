(() => {
  angular.module('dashboard').directive('cloudinaryRender', ($window) => {
    return {
      restrict: 'AEC',
      scope: {
        url: '='
      },
      templateUrl: 'app/directives/cloudinary/cloudinary.html',
      controller: 'CloudinaryCtrl as cloudinaryCtrl',
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        let urls = []
        if(iAttrs.data == 'json'){
          urls.push({
            'path': scope.setUrl(scope.url.frontUrl),
            'title': null,
            'description': null
          })
          urls.push({
            'path': scope.setUrl(scope.url.backUrl),
            'title': null,
            'description': null
          })
        }else{
          for(let i=0; i<scope.url.length; i++)
            urls.push({
              'path': scope.setUrl(scope.url[i].url),
              'title': scope.url[i].title,
              'description': scope.url[i].desc
            })
        }
        scope.show(urls)
      }
    }
  })
})()
