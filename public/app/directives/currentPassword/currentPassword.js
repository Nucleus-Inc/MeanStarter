(function() {
  angular.module('dashboard').directive('currentPassword', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Auth','Config','Admins', function($scope,Auth,Config,Admins) {
        $scope.checkPassword = function(password, view){
          // Admins.getAdmins().then(function(res){
          //   var i = 0;
          //   var item;
          //   do{
          //     item = res.data[i];
          //     i++;
          //   }while(res.data[i] != Config._id && i < res.data.length);
          //   Auth.login(item.email,password).then(function(res){
          //     view.$setValidity("currentPassword",res.status === 200 ? true : false);
          //   }).catch(function(err){
          //     view.$setValidity("currentPassword", false);
          //   });
          // });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("currentPassword", true);
          if(value)
            scope.checkPassword(value,ngModelCtrl);
        });
      }
    };
  });
}());
