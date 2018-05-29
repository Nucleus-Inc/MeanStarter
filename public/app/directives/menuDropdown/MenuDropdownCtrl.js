(function() {
  angular.module('dashboard').controller('MenuDropdownCtrl', ['$scope','$window','$location','Auth','Profile','Socket', function($scope, $window, $location, Auth, Profile, Socket) {

    var vm = this;

    Socket.on('change profile',function(msg){
      var formatedImage = formatImage(msg);
      var cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile');
      if(msg != cachedFile)
        $window.localStorage.setItem('persistentCache:imageNavProfile',formatedImage);
      vm.user.picture = formatedImage;
    });

    Socket.on('login success',function(msg){
      $scope.display();
    });

    $scope.display = function(){
      Auth.isAuthenticated().then(function(res){
        vm.user = {
          '_id': res.data._id,
          'name': res.data.account.name,
          'email': res.data.account.email,
          'phoneNumber': res.data.account.phoneNumber,
          'isActive': res.data.account.isActive
        };
        var cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile');
        if(cachedFile == null || cachedFile === ''){
          Profile.getProfile(res.data._id).then(function(res){
            if(res.data.profile!=null && res.data.profile.profilePicture){
               var formatedImage = formatImage(res.data.profile.profilePicture);
               $window.localStorage.setItem('persistentCache:imageNavProfile',formatedImage);
               vm.user.picture = formatedImage;
            }
          }).catch(function(err){
            console.log(err);
          });
        }else
          vm.user.picture = cachedFile;
      }).catch(function(err){
        console.log(err);
      });
    };

    vm.logout = function(){
      Auth.logout().then(function(res){
        Socket.emit('logout success', res.data);
        $window.localStorage.setItem('persistentCache:imageNavProfile','');
        $window.localStorage.setItem('persistentCache:imageProfile','');
        vm.user.picture = undefined;
        $location.path('/login');
      }).catch(function(err){
        console.log('err');
        // Socket.emit('logout success', res.data);
      });
    };

    var formatImage = function(url){
      if(url){
        var search = url.search('/w_40,h_40,c_pad,b_rgb:31000f');
        if(search > -1){
          return url;
        }else{
          var pos = url.lastIndexOf("/upload/");
          var res = url.slice(0, pos+8);
          var posRes = url.slice(pos+7,url.length);
          res = res+'w_40,h_40,c_pad,b_rgb:31000f';
          return (res+posRes);
        }
      }
    };

  }]);
}());
