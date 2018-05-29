'use strict';

/**
 * @ngdoc overview
 * @name dashboard
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */

angular
  .module('dashboard',[
    'ngRoute',
    'ngStorage',
    'chart.js',
    'angularModalService',
    'angular-table',
    'cgNotify',
    'alexjoffroy.angular-loaders',
    'ngMessages',
    'ngAnimate',
    'ngSanitize',
    'ui.utils.masks',
    'idf.br-filters',
    'zxcvbn',
    'validation.match',
    'ngFileUpload',
    'angularMoment',
    'slickCarousel',
    'cloudinary'
  ])
  .config(function($routeProvider, $locationProvider, $httpProvider, cloudinaryProvider, CloudinaryConstant) {

    // Remove '!' from path
    $locationProvider.hashPrefix('');

    // Allow cross domain requests
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    cloudinaryProvider
     .set("cloud_name",CloudinaryConstant.cloud_name)
     .set("secure",CloudinaryConstant.secure)
     .set("upload_preset",CloudinaryConstant.upload_preset);

    $routeProvider
      .when('/',{
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl as homeCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/consultores',{
        templateUrl: 'app/views/admins/admins.html',
        controller: 'AdminsCtrl as adminsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/parceiros',{
        templateUrl: 'app/views/partnes/partnes.html',
        controller: 'PartnesCtrl as partnesCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/categorias',{
        templateUrl: 'app/views/categories/categories.html',
        controller: 'CategoriesCtrl as categoriesCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/subcategorias',{
        templateUrl: 'app/views/subcategories/subcategories.html',
        controller: 'SubcategoriesCtrl as subcategoriesCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/planos',{
        templateUrl: 'app/views/plans/plans.html',
        controller: 'PlansCtrl as plansCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/ofertas',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/destaques/banner',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/destaques/card',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/destaques/menu',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/destaques/ofertas',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/destaques/slide',{
        templateUrl: 'app/views/offers/offers.html',
        controller: 'OffersCtrl as offersCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/perfil',{
        templateUrl: 'app/views/profile/profile.html',
        controller: 'ProfileCtrl as profileCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/settings',{
        templateUrl: 'app/views/profile/settings.html',
        controller: 'SettingsCtrl as settingsCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/problemas',{
        templateUrl: 'app/views/report/report.html',
        controller: 'ReportCtrl as reportCtrl',
        resolve: {
          access: function(Auth) {
            return Auth.isAuthenticated();
          }
        }
      })
      .when('/login',{
        templateUrl: 'app/views/auth/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/cadastrar',{
        templateUrl: 'app/views/auth/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'registerCtrl'
      })
      .when('/recuperar',{
        templateUrl: 'app/views/auth/forgot.html',
        controller: 'ForgotCtrl',
        controllerAs: 'forgotCtrl'
      })
      .when('/consultores/:recoveryKey/redefinir-senha/:token',{
        templateUrl: 'app/views/auth/reset.html',
        controller: 'ResetCtrl',
        controllerAs: 'resetCtrl'
      })
      .when('/activation/:token',{
        templateUrl: 'app/views/auth/activation.html',
        controller: 'ActivationCtrl',
        controllerAs: 'activationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })

  .run(function($rootScope, $location, amMoment) {

    amMoment.changeLocale('pt-br');

    /* Route events */
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      console.log("Route Start");
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      console.log("Route Change Error: " + JSON.stringify(rejection));
      $location.path("/login");
    });

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      if (typeof previous != 'undefined') {
        console.log("Previous Url: " + previous.originalPath);
      }
      console.log("Current Url: " + current.originalPath);
    });

  });

(function() {
  angular.module('dashboard').controller('AdminsCtrl', ['$scope','$filter','Admins','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Admins, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Consultores Ativos'
        },
        {
          _id: 2,
          value: false,
          label: 'Consultores Pendentes'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Admins.getAdmins().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('admin add',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('admin active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('admin inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      var search = function(value){
        Tables.search([value.name,value.email],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.email == value.email){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {
        Tables.condition(vm.predicates,vm.selectedPredicate,function(condition){
          var account = [];
          buffer.filter(function(item){
            account.push(item);
          });
          vm.filteredList = [];
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,function(res){
            if(res!=null){
              search(res);
            }
          });
        });
      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, email, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
            inputs: {
              title: isActive ? 'Desativar usuário' : 'Ativar usuário',
              question: isActive ? 'Você desja realmente desativar este usuário?' : 'Você deseja realmente ativar este usuário?',
              user: email
            }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Account.inactivate(_id).then(function(res){
                  Notify.run('Consultor desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('admin inactivate',_id);
                  });
                });
              }else{
                Account.active(_id).then(function(res){
                  Notify.run('Consultor ativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('admin active',_id);
                  });
                });
              }
            }
          });
        });
      };

  }]);
}());

(function() {
  angular.module('dashboard').controller('ActivationCtrl', ['$scope', function($scope) {

    var vm = this;

    vm.success = false;
    vm.activationSuccess = false;

    vm.danger = true;
    vm.activationDanger = true;

    vm.errLogin = false;
    vm.resend = false;

    vm.hidepassword = true;
    vm.show = true;
    vm.hide = false;

    vm.toggle = function(param){
      if(param==='show'){
        vm.hidepassword = false;
        vm.show = false;
        vm.hide = true;
      }else{
        vm.hidepassword = true;
        vm.show = true;
        vm.hide = false;
      }
    };

    vm.close = function(code) {
      if(code==0)
        vm.activationSuccess = false;
      else
        if(code==1)
          vm.activationDanger = false;
        else
          if(code==2)
            vm.errLogin = false;
          else
            vm.resend = false;
    };

    vm.submit = function() {
      vm.activationSuccess = false;
      vm.errLogin = true;
    };

    vm.send = function() {
      vm.activationDanger = false;
      vm.resend = true;
    };

  }]);
}());

(function() {
  angular.module('dashboard').controller('ForgotCtrl', ['$scope','Account','$compile', function($scope,Account,$compile) {

    var vm = this;

    vm.send = false;
    vm.start = false;
    vm.err = false;
    vm.errDescription = "";

    vm.close = function() {
      vm.send = false;
      vm.err = false;
    };

    vm.submit = function() {
      if (!$scope.ForgotForm.$invalid) {
        vm.start = true;
        Account.setRecoveryToken({
          'recoveryKey': vm.user.email
        }).then(function(res){
          if(res.status == 200){
            vm.send = true;
            vm.err = false;
            $scope.ForgotForm.$setPristine();
            vm.user.email = '';
          }else{
            vm.err = true;
            vm.errDescription = "Não foi possível enviar o seu email de recuperação de senha, tente novamente mais tarde";
          }
          vm.start = false;
        }).catch(function(err){
          vm.errDescription = err.data.error.description;
          vm.start = false;
          vm.err = true;
        });
      }
    };

  }]);
}());

(function() {
  angular.module('dashboard').controller('LoginCtrl', ['$scope','Auth','$location','Socket','Config','$localStorage', function($scope,Auth,$location,Socket,Config,$localStorage) {

    var vm = this;

    vm.hidepassword = true;
    vm.show = true;
    vm.hide = false;
    vm.errLogin = false;
    vm.start = false;

    vm.toggle = function(param){
      if(param==='show'){
        vm.hidepassword = false;
        vm.show = false;
        vm.hide = true;
      }else{
        vm.hidepassword = true;
        vm.show = true;
        vm.hide = false;
      }
    };

    vm.close = function(){
      vm.errLogin = false;
    };

    vm.submit = function() {
      if(!$scope.LoginForm.$invalid) {
        vm.start = true;
        Auth.login(vm.user.email,vm.user.password).then(function(res){
          if(res.status == 200 && res.data && res.data.isActive){
            $localStorage.id = res.data._id;
            Socket.emit('login success', res.data);
            $location.path('/');
          }else
            vm.errLogin = true;
          vm.start = false;
        }).catch(function(err){
          vm.errLogin = true;
          vm.start = false;
        });
      }else{
        vm.errLogin = true;
        vm.start = false;
      }
    };

  }]);
}());

(function() {
  angular.module('dashboard').controller('RegisterCtrl', ['$scope','Account','Socket', function($scope,Account,Socket) {

    var vm = this;
    var _id = -1;

    vm.hidepasswordA = true;
    vm.hidepasswordB = true;
    vm.showA = true;
    vm.hideA = false;
    vm.showB = true;
    vm.hideB = false;
    vm.create = true;
    vm.sendSuccess = false;
    vm.sendDanger = false;
    vm.start = false;
    vm.err = false;
    vm.errDescription = "";

    vm.toggle = function(param){
      if(param==='showA'){
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      }else{
        if(param==='hideA'){
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        }else{
          if(param==='showB'){
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          }else{
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function() {
      if(!$scope.RegisterForm.$invalid) {
        vm.start = true;
        Account.signup(vm.user.name,vm.user.email,vm.user.password).then(function(res){
          if(res.data){
            _id = res.data._id;
            vm.user._id = _id;
            vm.user.isActive = false;
            Socket.emit('admin add',vm.user);
          }
          vm.create = false;
          vm.start = false;
          vm.err = false;
        }).catch(function(err){
          vm.errDescription = err.data.error.description;
          vm.err = true;
          vm.start = false;
        });
      }
    };

    vm.close = function(code) {
      if(code==0)
        vm.sendSuccess = false;
      else
        if(code==1)
          vm.sendDanger = false;
        else
          vm.err = false;
    };

  }]);
}());

(function() {
  angular.module('dashboard').controller('ResetCtrl', ['$scope','Account','$routeParams','$location', function($scope,Account,$routeParams,$location) {

    var vm = this;

    vm.hidepasswordA = true;
    vm.hidepasswordB = true;
    vm.showA = true;
    vm.hideA = false;
    vm.showB = true;
    vm.hideB = false;
    vm.resetSuccess = false;
    vm.resetDanger = false;
    vm.start = false;
    vm.errDescription = "";

    vm.toggle = function(param){
      if(param==='showA'){
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      }else{
        if(param==='hideA'){
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        }else{
          if(param==='showB'){
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          }else{
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function() {
      if(!$scope.ResetForm.$invalid){
        vm.start = true;
        Account.recoverPassword($routeParams.recoveryKey,$routeParams.token,vm.user.password).then(function(res){
          vm.resetSuccess = true;
          vm.resetDanger = false;
          $location.path('/login');
          vm.start = false;
        }).catch(function(err){
          vm.errDescription = err.data.error.description;
          vm.resetSuccess = false;
          vm.resetDanger = true;
          vm.start = false;
        });
      }else{
        vm.errDescription = "Erro ao tentar redefinir sua senha. Tente novamente mais tarde.";
        vm.resetSuccess = false;
        vm.resetDanger = true;
        vm.start = false;
      }
    };

    vm.close = function(code) {
      if(code=0)
        vm.resetSuccess = false;
      else
        vm.resetDanger = false;
    };

  }]);
}());

(function() {
  angular.module('dashboard').controller('CategoriesCtrl', ['$scope','$filter','Categories','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Categories, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Categorias Ativadas'
        },
        {
          _id: 2,
          value: false,
          label: 'Categorias Desativadas'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Categories.getCategories().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('showCreateCategory',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('showUpdateCategory',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
      });

      Socket.on('category active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('category inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      var search = function(value){
        Tables.search([value.title],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.title == value.title){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {
        Tables.condition(vm.predicates,vm.selectedPredicate,function(condition){
          var account = [];
          buffer.filter(function(item){
            account.push(item);
          });
          vm.filteredList = [];
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,function(res){
            if(res!=null){
              search(res);
            }
          });
        });
      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: isActive ? 'Desativar categoria' : 'Ativar categoria',
            question: isActive ? 'Você desja realmente desativar esta categoria?' : 'Você deseja realmente ativar esta categoria?',
            user: title
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Categories.inactivateCategory(_id).then(function(res){
                  Notify.run('Categoria desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('category inactivate',_id);
                  });
                });
              }else{
                Categories.activateCategory(_id).then(function(res){
                  Notify.run('Categoria ativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('category active',_id);
                  });
                });
              }
            }
          });
        });
      };

      vm.create = function(){
        ModalService.showModal({
          templateUrl: 'app/views/modals/category-form-modal.html',
          controller: 'CategoryFormModalCtrl as categoryFormModalCtrl',
          inputs: {
            title: 'Aqui você cria suas categorias',
            input: '',
            label: 'Criar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Categories.createCategory(result.name).then(function(response){
                Notify.run('Categoria criada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('createCategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar criar categoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

      vm.edit = function(_id,title){
        ModalService.showModal({
          templateUrl: 'app/views/modals/category-form-modal.html',
          controller: 'CategoryFormModalCtrl as categoryFormModalCtrl',
          inputs: {
            title: 'Atualize sua categoria abaixo',
            input: title,
            label: 'Atualizar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Categories.updateCategory(_id,result.name).then(function(response){
                Notify.run('Categoria atualizada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('updateCategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar atualizar categoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

  }]);
}());

(function() {
  angular.module('dashboard').controller('HomeCtrl', ['Bi', function(Bi) {

    var vm = this;

    Bi.getNumbers().then(function(res){
      vm.numbers = res.data;
      var total = res.data.offers+res.data.categories+res.data.partners+res.data.plans;
      vm.donutLabels = ['Ofertas', 'Categorias', 'Parceiros', 'Planos'];
      vm.donutData = [parseFloat((res.data.offers/total)*100).toFixed(2), parseFloat((res.data.categories/total)*100).toFixed(2), parseFloat((res.data.partners/total)*100).toFixed(2), parseFloat((res.data.plans/total)*100).toFixed(2)];
    });

    vm.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    vm.series = ['Cadastradas', 'Vendidas'];
    vm.data = [
      [10, 20, 30, 40, 20, 30, 20, 10, 0, 0, 0, 0],
      [-10, -20, 0, 30, 70, 90, 60, 30, 0, 0, 0, 0]
    ];

    vm.colors = ["rgb(255,193,7)","rgb(32,168,216)","rgb(79,255,135)","rgb(99,194,222)"];

    vm.onClick = function(points, evt) {
      console.log(points, evt);
    };

  }]);
}());

(function() {
  angular.module('dashboard').controller('IndexCtrl', ['Auth', function(Auth) {

    var vm = this;

  }]);
}());

(function() {
  angular.module('dashboard').controller('AlertModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'question','user',
    function($scope, ModalService, close, title, question, user) {

      var vm = this;

      vm.title = title;
      vm.question = question;
      vm.user = user;

      vm.close = function(result) {
        close({'status': result}, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('CategoryFormModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input','label',
    function($scope, ModalService, close, title, input, label) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      vm.inputs = {
        'name': input
      }

      vm.close = function(result) {
        close(result ? vm.inputs : null, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('FormModalCtrl', ['$scope', 'ModalService', 'close',
    function($scope, ModalService, close) {

      var vm = this;

      vm.inputs = [];

      vm.title = 'My Title';
      vm.question = 'My Question';

      vm.close = function(result) {
        close(vm.inputs, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };
      
    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('InfoModalCtrl', ['close','title','info',
    function(close, title, info) {

      var vm = this;

      vm.title = title;
      vm.info = info;

      vm.close = function(result) {
        close({'status': result}, 500); 
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('OffersModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input',
    function($scope, ModalService, close, title, input) {

      var vm = this;

      vm.title = title;
      vm.inputs = input;
      vm.inputs.price.full = parseFloat((vm.inputs.price.full)/100).toFixed(2);
      vm.inputs.price.current = parseFloat((vm.inputs.price.current)/100).toFixed(2);
      vm.tab = 1;

      vm.close = function(result) {
        if(result!=null){
          closed({
            _id: vm.inputs._id,
            title: vm.inputs.title,
            approve: result
          });
        }else
          closed(null);
        angular.element('.modal').modal('hide');
      };

      var closed = function(json) {
        close(json,500);
      };

      vm.setTab = function(newTab) {
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('PartnerFormModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input','label','Socket','Plans',
    function($scope, ModalService, close, title, input, label, Socket, Plans) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      vm.inputs = input;
      vm.plans = [];
      vm.tab = 1;

      if(vm.inputs.plan!=null && vm.inputs.plan.title==null){
        Plans.getPlan(vm.inputs.plan).then(function(res){
          console.log(res.data);
        });
      }

      Socket.on('cep complete',function(msg){
        vm.inputs.address.addressLine1 = msg.logradouro;
        vm.inputs.address.area = msg.bairro;
        vm.inputs.address.city = msg.cidade;
        vm.inputs.address.uf = msg.estado;
      });

      Plans.getPlans().then(function(res){
        Object.assign(vm.plans, res.data);
      });

      vm.close = function(result) {
        vm.inputs.plan = getPlanId(vm.inputs.plan.title)[0]._id;
        if(vm.inputs!=null && vm.inputs.taxDocument!=null && vm.inputs.taxDocument.documentNumber!=null)
          vm.inputs.taxDocument.documentType = vm.inputs.taxDocument.documentNumber.length < 12 ? 'cpf' : 'cnpj';
        close(result ? vm.inputs : undefined, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

      vm.setTab = function(newTab) {
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

      var getPlanId = function(value){
        return vm.plans.filter(function(item){
          return (item.title.toLowerCase() === value.toLowerCase() ? item : undefined);
        });
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('PlanFormModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'input','label',
    function($scope, ModalService, close, title, input, label) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      vm.inputs = {
        'name': input.title,
        'desc': input.description
      };

      vm.close = function(result) {
        close(result ? vm.inputs : null, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('SubcategoryFormModalCtrl', ['$scope', 'ModalService', 'Categories', 'close', 'title', 'input','label',
    function($scope, ModalService, Categories, close, title, input, label) {

      var vm = this;

      vm.title = title;
      vm.label = label;
      // vm.disabledCategory = vm.label === 'Atualizar' ? true : false;
      vm.inputs = {
        'name': input.name,
        'category': input.category
      };

      vm.categories = [];

      vm.categories.push({_id: '0', title: 'Categorias'});
      vm.selectedCategory = vm.inputs.category == '' ? vm.categories[0].title : vm.inputs.category;
      vm.inputs.category = vm.selectedCategory;

      Categories.getCategories().then(function(res){
        for(var i=0;i<res.data.length;i++){
          vm.categories.push(res.data[i]);
        }
      });

      var getIdCategory = function(title){
        var i = 0;
        while(vm.categories[i].title != title && i < vm.categories.length){
          i++;
        }
        return vm.categories[i]._id;
      };

      vm.close = function(result) {
        var response = result ? { _id: getIdCategory(vm.inputs.category), name: vm.inputs.name } : null;
        close(response, 500); // close, but give 500ms for bootstrap to animate
        angular.element('.modal').modal('hide');
      };

    }
  ]);
}());

(function() {
  angular.module('dashboard').controller('OffersCtrl', ['$scope','$filter','Offers','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Offers, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 3,
          value: 'pending',
          label: 'Ofertas Pendentes'
        },
        {
          _id: 4,
          value: 'reproved',
          label: 'Ofertas Reprovadas'
        },
        {
          _id: 5,
          value: 'approved',
          label : 'Ofertas Aprovadas'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      var selectedCondition = function(selectedPredicate) {

        var i=0;
        var item = vm.predicates[i];

        do{
          item = vm.predicates[i];
          i++;
        }while(i < vm.predicates.length && item.label != selectedPredicate);

        if(item._id == 1 || item._id == 2 || item._id == 0)
          return 'isActive';
        return 'status';

      };

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Offers.getOffers().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('showCreateOffers',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('showUpdateOffers',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id){
            item.title = msg.title;
          }
        });
      });

      Socket.on('offers active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.approval.status = "approved";
        });
      });

      Socket.on('offers inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.approval.status = "reproved";
        });
      });

      var search = function(value){
        Tables.search([value.status,value.title,value.partner,value.duration,value.companyName],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item._id == value._id){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {

        var condition = selectedCondition(vm.selectedPredicate);

        var offers = [];
        buffer.filter(function(item){
          offers.push({
            _id: item._id,
            status: item.approval.status,
            duration: item.duration.expireDate,
            title: item.title,
            partner: item.partner.name,
            companyName: item.partner.companyName
          });
        });

        vm.filteredList = [];
        Tables.update(offers,vm.predicates,vm.selectedPredicate,condition,function(res){
          if(res!=null)
            search(res);
        });

      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
            inputs: {
              title: isActive == 'approved' || isActive == 'approv' ? 'Desativar oferta' : 'Aprovar oferta',
              question: isActive == 'approved' || isActive == 'approv' ? 'Você desja realmente desativar esta oferta?' : 'Você desja realmente aprovar esta oferta?',
              user: title
            }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive=='approved' || isActive=='approv'){
                Offers.reproveOffer(_id).then(function(res){
                  Notify.run('Oferta desativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('offers inactivate',_id);
                  });
                });
              }else{
                Offers.approveOffer(_id).then(function(res){
                  Notify.run('Oferta aprovada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('offers active',_id);
                  });
                });
              }
            }
          });
        });
      };

      var getOfferId = function(id){
        var i = 0;
        while(i<vm.filteredList.length && vm.filteredList[i]._id != id)
          i++;
        return i < vm.filteredList.length ? vm.filteredList[i] : null;
      }

      vm.view = function(offerId) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/offers.html',
          controller: 'OffersModalCtrl as offersModalCtrl',
          inputs: {
            title: 'Detalhes',
            input: getOfferId(offerId)
          }
        }).then(function(modal){
          modal.element.modal();
          modal.close.then(function(result){
            if(result){
              console.log(result);
            }
          });
        })
      };

  }]);
}());

(function() {
  angular.module('dashboard').controller('NavCtrl', ['$scope','Socket','Auth', function($scope, Socket, Auth) {

    var vm = this;

    Auth.isAuthenticated().then(function(res){
      vm.logged = true;
    }).catch(function(err){
      vm.logged = false;
    });

    Socket.on('login success',function(msg){
      vm.logged = true;
    });

    Socket.on('logout success',function(msg){
      vm.logged = false;
    });

  }]);
}());

(function() {
  angular.module('dashboard').controller('PartnesCtrl', ['$scope','$filter','Partnes','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Partnes, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Parceiros Ativos'
        },
        {
          _id: 2,
          value: false,
          label: 'Parceiros Pendentes'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Partnes.getPartnes().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('partners add',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('partners inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      //Socket.emit('partners update',_id);
      Socket.on('partners activate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('partners update',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id == msg._id)
            Object.assign(item, msg);
        });
      });

      var search = function(value){
        Tables.search([value.name,value.email],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.email == value.email){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {
        Tables.condition(vm.predicates,vm.selectedPredicate,function(condition){
          var account = [];
          buffer.filter(function(item){
            account.push(item);
          });
          vm.filteredList = [];
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,function(res){
            if(res!=null){
              search(res);
            }
          });
        });
      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, email, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
            inputs: {
              title: isActive ? 'Desativar usuário' : 'Ativar usuário',
              question: isActive ? 'Você desja realmente desativar este usuário?' : 'Você deseja realmente ativar este usuário?',
              user: email
            }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Partnes.inactivate(_id).then(function(res){
                  Notify.run('Parceiro desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('partners inactivate',_id);
                  });
                });
              }else{
                Partnes.active(_id).then(function(res){
                  Notify.run('Parceiro ativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('partners activate',_id);
                  });
                });
              }
            }
          });
        });
      };

        vm.edit = function(_id) {
          vm.input = {};
          vm.filteredList.filter(function(item){
            if(item._id == _id){
              Object.assign(vm.input, item);
              ModalService.showModal({
                templateUrl: 'app/views/modals/partner-form-modal.html',
                controller: 'PartnerFormModalCtrl as partnerFormModalCtrl',
                inputs: {
                  title: 'Atualize o cadastro do parceiro',
                  input: vm.input,
                  label: 'Atualizar'
                }
              }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result) {
                  if(result && result.email){
                    Partnes.updateProfile(_id,result).then(function(response){
                      Notify.run('Parceiro atualizado com sucesso','alert-success',null,null,null,function(res){
                        if(res)
                          Socket.emit('partners update',response.data);
                      });
                    }).catch(function(err){
                      Notify.run('Erro ao atualizar parceiro','alert-danger',null,null,null,function(res){});
                    });
                  }
                });
              });
            }
          });
        };

  }]);
}());

(function() {
  angular.module('dashboard').controller('PlansCtrl', ['$scope','$filter','Plans','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Plans, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Planos Ativados'
        },
        {
          _id: 2,
          value: false,
          label: 'Planos Desativados'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Plans.getPlans().then(function(res){
        for(var i=0;i<res.data.length;i++)
          vm.filteredList.push(res.data[i]);
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('create plan',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag)
          vm.filteredList.push(msg);
        buffer = vm.filteredList;
      });

      Socket.on('update plan',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id){
            item.title = msg.title;
            item.description = msg.description;
          }
        });
      });

      Socket.on('plan active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('plan inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      var search = function(value){
        Tables.search([value.title],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.title == value.title){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {
        Tables.condition(vm.predicates,vm.selectedPredicate,function(condition){
          var account = [];
          buffer.filter(function(item){
            account.push(item);
          });
          vm.filteredList = [];
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,function(res){
            if(res!=null){
              search(res);
            }
          });
        });
      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: isActive ? 'Desativar plano' : 'Ativar plano',
            question: isActive ? 'Você desja realmente desativar este plano?' : 'Você deseja realmente ativar este plano?',
            user: title
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Plans.inactivatePlan(_id).then(function(res){
                  Notify.run('Plano desativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('plan inactivate',_id);
                  });
                });
              }else{
                Plans.activatePlan(_id).then(function(res){
                  Notify.run('Plano ativado com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('plan active',_id);
                  });
                });
              }
            }
          });
        });
      };

      vm.create = function(){
        ModalService.showModal({
          templateUrl: 'app/views/modals/plan-form-modal.html',
          controller: 'PlanFormModalCtrl as planFormModalCtrl',
          inputs: {
            title: 'Aqui você cria seus planos',
            input: '',
            label: 'Criar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Plans.createPlan(result.name, result.desc).then(function(response){
                Notify.run('Plano criada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('create plan',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar criar plano','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

      vm.edit = function(_id,plan){
        ModalService.showModal({
          templateUrl: 'app/views/modals/plan-form-modal.html',
          controller: 'PlanFormModalCtrl as planFormModalCtrl',
          inputs: {
            title: 'Atualize seu plano abaixo',
            input: plan,
            label: 'Atualizar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Plans.updatePlan(_id,result.name, result.desc).then(function(response){
                Notify.run('Plano atualizado com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('update plan',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar atualizar plano','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

  }]);
}());

(function() {
  angular.module('dashboard').controller('ProfileCtrl', ['$scope', function($scope) {

    var vm = this;

  }]);
}());

(function() {
  angular.module('dashboard').controller('SettingsCtrl', ['$scope','$timeout','$window','Upload','Account','notify','$localStorage','Config','Auth','$location','cloudinary','ModalService','Socket',
    function($scope, $timeout, $window, Upload, Account, notify, $localStorage, Config, Auth, $location, cloudinary, ModalService, Socket) {

      var vm = this;

      vm.tab = 1;
      vm.start = false;
      vm.alertMessage = {};
      vm.btn = {
        'name': '',
        'select': false
      }

      Auth.isAuthenticated().then(function(res){
        vm.inputs = {
          '_id': res.data._id,
          'name': res.data.name,
          'email': res.data.email
        }
        var cachedFile = $window.localStorage.getItem('persistentCache:imageProfile');
        if(cachedFile == null || cachedFile === ''){
          Account.getAccount(res.data._id).then(function(result){
            if(result.data.profilePicture){
              $window.localStorage.setItem('persistentCache:imageProfile',result.data.profilePicture);
              display(result.data.profilePicture, true);
            }else
              display(null,false);
          }).catch(function(err){
            display(null,false);
          });
        }else
          display(cachedFile, true);
      }).catch(function(err){
        vm.alertMessage.show = true;
        vm.alertMessage.type = 'danger';
        vm.alertMessage.message = err.data.error.description;
      });

      vm.updatePassword = function(){
        if(!$scope.UpdatePassForm.$invalid) {
          vm.start = true;
          Account.updatePassword(vm.inputs._id,vm.account.currentPassword,vm.account.newPassword).then(function(data){
            ModalService.showModal({
              templateUrl: 'app/views/modals/info.html',
              controller: 'InfoModalCtrl as infoModalCtrl',
              inputs: {
                title: 'Senha Alterada',
                info: 'Você será direcionado para o Login para que possa entrar novamente na aplicação.'
              }
            }).then(function(modal){
              modal.element.modal();
              modal.close.then(function(result){
                if(result && result.status){
                  vm.start = false;
                  Auth.logout().then(function(res){
                    Socket.emit('logout success', res.data);
                    $location.path('/login');
                  }).catch(function(err){
                    vm.alertMessage.show = true;
                    vm.alertMessage.type = 'warning';
                    vm.alertMessage.message = 'Sua senha foi atualizada por isso é altamente recomendável que você faça login novamente.';
                  });
                }
              });
            });
          }).catch(function(err){
            vm.start = false;
            vm.alertMessage.show = true;
            vm.alertMessage.type = 'danger';
            // vm.alertMessage.message = err.data.error.description;
          });
        }else{
          vm.start = false;
          vm.alertMessage.show = true;
          vm.alertMessage.type = 'danger';
          // vm.alertMessage.message = err.data.error.description;
        }
      };

      vm.updateProfile = function(){
        if(vm.pictures.length > 0){
          vm.upload(vm.pictures);
        }
      };

      vm.upload = function (files) {
        files.filter(function(item, index){
          if(!item.flag){
            Upload.upload({
              url: 'https://api.cloudinary.com/v1_1/'+cloudinary.config().cloud_name+'/upload/',
              withCredentials: false,
              data: {
                upload_preset: cloudinary.config().upload_preset,
                tags: 'profile',
                file: item.url
              }
            }).then(function(res){
              Account.updatePicture(vm.inputs._id, res.data.secure_url).then(function(res){
                vm.alertMessage.show = true;
                if(res.status == 200){
                  cacheUpdate(res.data.profilePicture);
                  Socket.emit('change profile', res.data.profilePicture);
                  vm.alertMessage.type = 'success';
                  vm.alertMessage.message = 'Perfil atualizado com sucesso';
                }else{
                  vm.alertMessage.type = 'danger';
                  vm.alertMessage.message = 'Erro ao atualizar perfil';
                }
                vm.start = false;
              }).catch(function(err){
                vm.start = false;
                vm.alertMessage.show = true;
                vm.alertMessage.type = 'danger';
                vm.alertMessage.message = 'Erro ao atualizar perfil';
              });
            }, function (err) {
              vm.start = false;
              vm.alertMessage.show = true;
              vm.alertMessage.type = 'danger';
              vm.alertMessage.message = 'Erro ao tentar fazer upload de imagem';
            }, function (evt) {
              vm.start = true;
            });
          }
        });
      };

      vm.setInBuffer = function(files){
        if(files){
          angular.forEach(files,function(file){
            vm.pictures[0] = {
              'flag': false,
              'url': file
            };
            vm.btn.name = 'Remover';
            vm.btn.select = true;
            angular.element('#uploadPicture').removeClass('btn-primary');
            angular.element('#uploadPicture').addClass('btn-danger');
          });
        }
      };

      vm.remove = function(){
        if(vm.btn.select){
          vm.pictures = [];
          vm.btn.name = 'Adicionar';
          vm.btn.select = false;
          angular.element('#uploadPicture').addClass('btn-primary');
          angular.element('#uploadPicture').removeClass('btn-danger');
        }
      };

      vm.closeAlert = function() {
        vm.alertMessage.show = false;
      };

      vm.setTab = function(newTab) {
        vm.alertMessage.show = false;
        vm.start = false;
        vm.tab = newTab;
      };

      vm.isSet = function(tabNum) {
        return vm.tab === tabNum;
      };

      var display = function(cachedFile, remove){
        if(remove){
          vm.btn.name = 'Remover';
          vm.btn.select = true;
          $timeout(function(){
            angular.element('#uploadPicture').removeClass('btn-primary');
            angular.element('#uploadPicture').addClass('btn-danger');
            $scope.$apply();
          },5);
        }else{
          vm.btn.name = 'Adicionar';
          vm.btn.select = false;
          $timeout(function(){
            angular.element('#uploadPicture').addClass('btn-primary');
            angular.element('#uploadPicture').removeClass('btn-danger');
            $scope.$apply();
          },5);
        }
        vm.pictures = [];
        vm.pictures.push({'url': cachedFile});
      };

      var cacheUpdate = function(url){
        $window.localStorage.setItem('persistentCache:imageProfile',url);
        //$window.localStorage.setItem('persistentCache:imageNavProfile',url);
      };

  }]);
}());

(function() {
  angular.module('dashboard').controller('SubcategoriesCtrl', ['$scope','$filter','Categories','Subcategories','Account','ModalService','Notify','Socket','Tables',
    function($scope, $filter, Categories, Subcategories, Account, ModalService, Notify, Socket, Tables) {

      var vm = this;

      vm.predicates = [
        {
          _id: 0,
          value: null,
          label: 'Filtros'
        },
        {
          _id: 1,
          value: true,
          label: 'Categorias Ativadas'
        },
        {
          _id: 2,
          value: false,
          label: 'Categorias Desativadas'
        }
      ];
      vm.selectedPredicate = vm.predicates[0].label;
      vm.showTable = false;

      vm.config = {
        itemsPerPage: 10,
        maxPages: 3
      };

      var buffer = [];
      vm.filteredList = [];
      Subcategories.getSubcategories().then(function(res){
        res.data.filter(function(item){
          vm.filteredList.push(item);
        });
        buffer = vm.filteredList;
        vm.showTable = true;
      });

      Socket.on('createSubcategory',function(msg){
        var flag = true;
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            flag = false;
        });
        if(flag){
          Categories.getCategory(msg.category).then(function(res){
            msg.category = {
              "_id": msg.category,
              "title": res.data.title
            };          
            vm.filteredList.push(msg);
          }).catch(function(err){
            vm.filteredList.push(msg);
          });
        }
        buffer = vm.filteredList;
      });

      Socket.on('updateSubcategory',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg._id)
            item.title = msg.title;
        });
      });

      Socket.on('subcategory active',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = true;
        });
      });

      Socket.on('subcategory inactivate',function(msg){
        vm.filteredList.filter(function(item){
          if(item._id === msg)
            item.isActive = false;
        });
      });

      var search = function(value){
        Tables.search([value.title],vm.key,function(res){
          if(res){
            buffer.filter(function(item){
              if(item.title == value.title){
                vm.filteredList.push(item);
              }
            });
          }
        });
      };

      vm.update = function() {
        Tables.condition(vm.predicates,vm.selectedPredicate,function(condition){
          var account = [];
          buffer.filter(function(item){
            account.push(item);
          });
          vm.filteredList = [];
          Tables.update(account,vm.predicates,vm.selectedPredicate,condition,function(res){
            if(res!=null){
              search(res);
            }
          });
        });
      };

      vm.clean = function() {
        Tables.clean(vm,buffer,function(res){});
      };

      vm.active = function(_id, category, title, isActive) {
        ModalService.showModal({
          templateUrl: 'app/views/modals/alert.html',
          controller: 'AlertModalCtrl as alertModalCtrl',
          inputs: {
            title: isActive ? 'Desativar subcategoria' : 'Ativar subcategoria',
            question: isActive ? 'Você desja realmente desativar esta subcategoria?' : 'Você deseja realmente ativar esta subcategoria?',
            user: title
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.status){
              if(isActive){
                Subcategories.inactivateSubcategory(category._id, _id).then(function(res){
                  Notify.run('Subcategoria desativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('subcategory inactivate',_id);
                  });
                });
              }else{
                Subcategories.activateSubcategory(category._id, _id).then(function(res){
                  Notify.run('Subcategoria ativada com sucesso','alert-success',null,null,null,function(res){
                    if(res)
                      Socket.emit('subcategory active',_id);
                  });
                });
              }
            }
          });
        });
      };

      vm.create = function(){
        ModalService.showModal({
          templateUrl: 'app/views/modals/subcategory-form-modal.html',
          controller: 'SubcategoryFormModalCtrl as subcategoryFormModalCtrl',
          inputs: {
            title: 'Aqui você cria suas subcategorias',
            input: {'name': '', 'category': ''},
            label: 'Criar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Subcategories.createSubcategory(result._id, result.name).then(function(response){
                Notify.run('Subcategoria criada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('createSubcategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar criar subcategoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

      vm.edit = function(_id, category, title){
        ModalService.showModal({
          templateUrl: 'app/views/modals/subcategory-form-modal.html',
          controller: 'SubcategoryFormModalCtrl as subcategoryFormModalCtrl',
          inputs: {
            title: 'Atualize sua subcategoria abaixo',
            input: {'name': title, 'category': category.title},
            label: 'Atualizar'
          }
        }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            if(result && result.name){
              Subcategories.updateSubcategory(category._id, _id, result.name).then(function(response){
                Notify.run('Subcategoria atualizada com sucesso','alert-success',null,null,null,function(res){
                  if(res)
                    Socket.emit('updateSubcategory',response.data);
                });
              }).catch(function(err){
                Notify.run('Erro ao tentar atualizar subcategoria','alert-danger',null,null,null,function(res){});
              });
            }
          });
        });
      };

  }]);
}());

(function() {
  angular.module('dashboard').directive('atTranslate', function($compile) {
    return {
      restrict: 'AEC',
      scope: true,
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        angular.forEach(angular.element('.page-item'),function(values,keys,arrays){
          angular.forEach(angular.element(values),function(value,key,array){
            if(angular.element(value).children().text() === '{{getPaginatorLabels().first}}'){
              angular.element(value).children().text("Início");
            }
            if(angular.element(value).children().text() === '{{getPaginatorLabels().last}}'){
              angular.element(value).children().text("Fim");
            }
          });
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').filter('biLabel', function() {
    return function(string) {
      if(string === 'admins')
        return 'Operadores';
      if(string === 'customers')
        return 'Clientes';
      if(string === 'partners')
        return 'Parceiros';
      if(string === 'services')
        return 'Serviços';
      if(string === 'categories')
        return 'Categorias';
      if(string === 'plans')
        return 'Planos';
      if(string === 'offers')
        return 'Ofertas';
      return string;
    };
  });
}());

(function() {
  angular.module('dashboard').controller('CardsBiCtrl', ['$scope','Bi', function($scope,Bi) {

    var vm = this;
    vm.start = true;

    var customColors = [
      'bg-berlim',
      'bg-tokyo',
      'bg-nairobi',
      'bg-rio'
    ];

    $scope.setColor = function(iElement){
      angular.forEach(iElement,function(value,key){
        angular.element(value).addClass(customColors[key]);
      });
    };

    $scope.setLabel = function(label){
      vm.label = label;
    };

    $scope.setIcon = function(icon){
      vm.icon = icon;
    };

    $scope.setValue = function(value){
      vm.start = false;
      vm.value = value;
    };

  }]);
}());

(function() {
  angular.module('dashboard').directive('cardsBi', function() {
    return {
      restrict: 'AEC',
      scope: {
        biData: '=?',
        biName: '@',
        biIcon: '@'
      },
      templateUrl: 'app/directives/cardsBi/cardsBi.html',
      controller: 'CardsBiCtrl as cardsBiCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        
        scope.setColor(angular.element('.card-box'));
        scope.setIcon(scope.biIcon);
        scope.setLabel(scope.biName);
        scope.$watch('biData', watchData, true);

        function watchData (newVal, oldVal) {
          if(newVal!=undefined)
            scope.setValue(newVal[scope.biName]);
        };

      }
    };
  });
}());

(function() {
  angular.module('dashboard').controller('CloudinaryCtrl', ['$scope', function($scope) {

    var vm = this;
    vm.zoomImg = "https://dummyimage.com/1024x16:9/";

    vm.slickConfig = {
      lazyLoad: 'ondemand',
      infinite: true,
      speed: 500,
      draggable: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true
    };

    vm.zoom = function(url){
      var top = angular.element('.modal').scrollTop();
      angular.element('#slick-cloudinary-modal').css({
        'top': top + 'px'
      });
      angular.element('#slick-cloudinary-modal').addClass('active');
      angular.element('.modal').addClass('overflow-h');
      angular.element('#slick-figure-img').attr("src", url.path.replace('/w_340,h_192,c_pad,b_rgb:15b0c7','/w_1024,h_576,c_pad,b_rgb:15b0c7'));
      angular.element('#slick-figure-title').text(url.title);
      angular.element('#slick-figure-desc').text(url.description);
      if(url.title==null)
        angular.element('#slick-infobox').css("display","none");
      else
        angular.element('#slick-infobox').css("display","block");
    };

    vm.close = function(){
      angular.element('#slick-cloudinary-modal').removeClass('active');
      angular.element('.modal').removeClass('overflow-h');
    };

    $scope.setUrl = function(url){
      if(url){
        var search = url.search('/w_340,h_192,c_pad,b_rgb:15b0c7');
        if(search > -1){
          return (url);
        }else{
          var pos = url.lastIndexOf("/upload/");
          var res = url.slice(0, pos+8);
          var posRes = url.slice(pos+7,url.length);
          res = res+'w_340,h_192,c_pad,b_rgb:15b0c7';
          return (res+posRes);
        }
      }else
        return ("https://dummyimage.com/340x16:9/");
    };

    $scope.show = function(urls){
      vm.urls = urls;
    };

  }]);
}());

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

(function() {
  angular.module('dashboard').directive('linkSidebar', function() {
    return {
      restrict: 'AEC',
      priority: 200,
      controller: ['$scope','$location', function($scope,$location) {
        $scope.path = function(href){
          $location.path(href);
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click',function() {
          scope.$apply(function(){
            scope.path(iAttrs.href);
          });
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('linkSidebarClose', function() {
    return {
      restrict: 'AEC',
      priority: 100,
      controller: ['$scope','$timeout', function($scope,$timeout) {
        $scope.dimension = function(width){
          setTimeout(function(){
            if(width < 767) {
              angular.element('#sidebar').removeClass('sidebar-visible');
              angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
              $scope.$apply();
            }
          },1);
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        scope.dimension(width);

        iElement.bind('click',function() {
          scope.dimension(width);
        });

      }
    };
  });
}());

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
          'name': res.data.name,
          'email': res.data.email
        };
        var cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile');
        if(cachedFile == null || cachedFile === ''){
          Profile.getProfile(res.data._id).then(function(res){
            if(res.data.profilePicture){
              var formatedImage = formatImage(res.data.profilePicture);
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

(function() {
  angular.module('dashboard').directive('menuDropdown', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuDropdown/menuDropdown.html',
      controller: 'MenuDropdownCtrl as menuDropdownCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.display();
      }
    };
  });
}());

(function() {
  angular.module('dashboard').controller('MenuNavbarCtrl', ['$scope','Socket','Auth','$location','offPaths', function($scope, Socket, Auth, $location, offPaths) {

    var vm = this;

    var path = $location.path();

    if(offPaths.includes($location.path()))
      vm.logged = false
    else{
      Auth.isAuthenticated().then(function(res){
        vm.logged = true;
      }).catch(function(err){
        vm.logged = false;
      });
    }

    Socket.on('login success',function(msg){
      vm.logged = true;
    });

    Socket.on('logout success',function(msg){
      vm.logged = false;
    });

  }]);
}());

(function() {
  angular.module('dashboard').directive('menuNavbar', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuNavbar/menuNavbar.html',
      controller: 'MenuNavbarCtrl as menuNavbarCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

      }
    };
  });
}());

(function() {
  angular.module('dashboard').controller('MenuSidebarCtrl', [function() {

    var vm = this;

    vm.menuItens = [
      {
        "icon": "dashboard",
        "label": "Dashboard",
        "href": "/",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "apps",
        "label": "Categorias",
        "href": "/categorias",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "supervisor_account",
        "label": "Consultores",
        "href": "/consultores",
        "hasSubmenu": false,
        "submenu": []
      },
      // {
      //   "icon": "loyalty",
      //   "label": "Destaques",
      //   "href": "",
      //   "hasSubmenu": true,
      //   "submenu": [
      //     {
      //       "label": "Banner",
      //       "href": "/destaques/banner"
      //     },
      //     {
      //       "label": "Card",
      //       "href": "/destaques/card"
      //     },
      //     {
      //       "label": "Menu",
      //       "href": "/destaques/menu"
      //     },
      //     {
      //       "label": "Ofertas",
      //       "href": "/destaques/ofertas"
      //     },
      //     {
      //       "label": "Slide",
      //       "href": "/destaques/slide"
      //     }
      //   ]
      // },
      {
        "icon": "shopping_cart",
        "label": "Ofertas",
        "href": "/ofertas",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "contacts",
        "label": "Parceiros",
        "href": "/parceiros",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "assignment",
        "label": "Planos",
        "href": "/planos",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "list",
        "label": "Subcategorias",
        "href": "/subcategorias",
        "hasSubmenu": false,
        "submenu": []
      }
    ];

  }]);
}());

(function() {
  angular.module('dashboard').directive('menuSidebar',['Socket','Auth','$location','offPaths', function(Socket,Auth,$location,offPaths,$timeout) {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuSidebar/menuSidebar.html',
      controller: 'MenuSidebarCtrl as menuSidebarCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        var addSidebar = function(){
          angular.element('#sidebar').addClass('sidebar-visible');
          angular.element('#navbarContainer').addClass('layout-sidebar-l3-md-up');
          angular.element('#toggler-button').addClass('toggle');
        };

        var removeSidebar = function(){
          angular.element('#sidebar').removeClass('sidebar-visible');
          angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
        };

        var toggleSidebar = function(){
          angular.element('#sidebar').toggleClass('sidebar-visible');
          angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
        };

        if(offPaths.includes($location.path()))
          removeSidebar();
        else{
          Auth.isAuthenticated().then(function(res){
            if(width >= 767)
              addSidebar();
            else
              removeSidebar();
            angular.element('.no-login').removeClass('full-height');
          }).catch(function(err){
            removeSidebar();
          });
        }

        Socket.on('login success',function(msg){
          if(width >= 767)
            addSidebar();
          else
            removeSidebar();
          angular.element('.no-login').removeClass('full-height');
        });

        Socket.on('logout success', function(msg) {
          removeSidebar();
          angular.element('.no-login').addClass('full-height');
        });

        angular.element('.layout-content').bind('click', function(){
          if(angular.element('#sidebar').hasClass('sidebar-visible') && width < 767 && angular.element('#toggler-button').hasClass('toggle'))
            removeSidebar();
          else{
            if(width < 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height'))
              addSidebar();
            else{
              if(width >= 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height')){
                angular.element('#toggler-button').addClass('toggle');
                toggleSidebar();
              }
            }
          }
        });
      }
    };
  }]);
}());

(function() {
  angular.module('dashboard').directive('sidebarToogler', function() {
    return {
      restrict: 'AEC',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click',function(){
          angular.element('#sidebar').toggleClass('sidebar-visible');
          angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('strengthPassword', function() {
    return {
      restrict: 'AEC',
      scope: {
        strength: '='
      },
      templateUrl: 'app/directives/strengthPassword/strengthPassword.html',
      link: function(scope, iElement, iAttrs, ctrl) {

        var removeColor = function(meter){
          angular.element('#worst').removeClass('strength-meter-'+meter);
          angular.element('#bad').removeClass('strength-meter-'+meter);
          angular.element('#weak').removeClass('strength-meter-'+meter);
          angular.element('#good').removeClass('strength-meter-'+meter);
          angular.element('#strong').removeClass('strength-meter-'+meter);
        };

        var clear = function(){
          removeColor('worst');
          removeColor('bad');
          removeColor('weak');
          removeColor('good');
          removeColor('strong');
        };

        scope.$watch('strength', function(value) {

          clear();

          if(value.password){
            if(value.score == 0){
              angular.element('#worst').addClass('strength-meter-worst');
            }
            if(value.score == 1){
              angular.element('#worst').addClass('strength-meter-bad');
              angular.element('#bad').addClass('strength-meter-bad');
            }
            if(value.score == 2){
              angular.element('#worst').addClass('strength-meter-weak');
              angular.element('#bad').addClass('strength-meter-weak');
              angular.element('#weak').addClass('strength-meter-weak');
            }
            if(value.score == 3){
              angular.element('#worst').addClass('strength-meter-good');
              angular.element('#bad').addClass('strength-meter-good');
              angular.element('#weak').addClass('strength-meter-good');
              angular.element('#good').addClass('strength-meter-good');
            }
            if(value.score == 4){
              angular.element('#worst').addClass('strength-meter-strong');
              angular.element('#bad').addClass('strength-meter-strong');
              angular.element('#weak').addClass('strength-meter-strong');
              angular.element('#good').addClass('strength-meter-strong');
              angular.element('#strong').addClass('strength-meter-strong');
            }
          }else{
            clear();
          }
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('submenuSidebar', function() {
    return {
      restrict: 'AEC',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        var clear = function(){
          var items = angular.element('.sidebar-menuItem-button');
          angular.forEach(items,function(item){
            angular.element(item).parent().removeClass('open');
          });
        };
        iElement.bind('click',function(){
          if(!angular.element(iElement).parent().hasClass('open'))
            clear();
          angular.element(iElement).parent().toggleClass('open');
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('uiBrCellphone', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope', function($scope) {

        $scope.verifyPartnerPhoneNumber = function(phoneNumber,view){
          view.$setValidity("phoneNumberExists",true);
        };

      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Input accept numbers-only
        function parserName(number) {
          var input = number.replace(/[^0-9]/g,'');
          if(input !== number) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return Number(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        //Validation cellphone number
        scope.$watch('ngModel', function (value) {
          if(value){
            var str = ""+value;
            var len = str.length;
            if(len<11 || len>11){
              if(len==19){
                var country = str.slice(1,3);
                if(country=='55'){
                  var state = str.slice(5,7);
                  if(state=='11'||state=='12'||state=='13'||state=='14'||state=='15'||state=='16'||state=='17'||state=='18'||state=='19'||state=='21'||
                     state=='22'||state=='24'||state=='27'||state=='28'||state=='31'||state=='32'||state=='33'||state=='34'||state=='35'||state=='37'||
                     state=='38'||state=='41'||state=='42'||state=='43'||state=='44'||state=='45'||state=='46'||state=='47'||state=='48'||state=='49'||
                     state=='51'||state=='53'||state=='54'||state=='55'||state=='61'||state=='62'||state=='63'||state=='64'||state=='65'||state=='66'||
                     state=='67'||state=='68'||state=='69'||state=='71'||state=='73'||state=='74'||state=='75'||state=='77'||state=='79'||state=='81'||
                     state=='82'||state=='83'||state=='84'||state=='85'||state=='86'||state=='87'||state=='88'||state=='89'||state=='91'||state=='92'||
                     state=='93'||state=='94'||state=='95'||state=='96'||state=='97'||state=='98'||state=='99'){
                       ngModelCtrl.$setValidity("invalidCellphone",true);
                       scope.verifyPartnerPhoneNumber(value,ngModelCtrl);
                  }else
                    ngModelCtrl.$setValidity("invalidCellphone",false);
                }else{
                  ngModelCtrl.$setValidity("phoneNumberExists",true);
                  ngModelCtrl.$setValidity("invalidCellphone",false);
                }
              }else{
                if(len==13){
                  var country = str.slice(0,2);
                  if(country=='55'){
                    var state = '('+str.slice(2,4)+')';
                    var initial = str.slice(4,9);
                    var finish = str.slice(9,13);
                    var mask = '+'+country+' '+state+' '+initial+'-'+finish;
                    scope.ngModel = mask;
                  }else{
                    ngModelCtrl.$setValidity("phoneNumberExists",true);
                    ngModelCtrl.$setValidity("invalidCellphone",false);
                  }
                }else{
                  ngModelCtrl.$setValidity("phoneNumberExists",true);
                  ngModelCtrl.$setValidity("invalidCellphone",false);
                }
              }
            }else{
                var momentCountry = str.slice(0,2);
                if(momentCountry!='55'){
                  var country = '+55';
                  var state = '('+str.slice(0,2)+')';
                  var initial = str.slice(2,7);
                  var finish = str.slice(7,11);
                  var mask = country+' '+state+' '+initial+'-'+finish;
                  scope.ngModel = mask;
                }else{
                  ngModelCtrl.$setValidity("phoneNumberExists",true);
                  ngModelCtrl.$setValidity("invalidCellphone",false);
                }
            }
          }else{
            ngModelCtrl.$setValidity("phoneNumberExists",true);
            ngModelCtrl.$setValidity("invalidCellphone",true);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('uiBrName', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Disable keyup press of the numbers in input
        function parserName(textName) {
          var input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g,'');
          if(input !== textName) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return String(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        //Capitalize first letter the person names
        scope.$watch('ngModel', function (value) {
          if(value){
            var textValue = ""+value;
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            var space = scope.ngModel.search(" ");
            if(space==-1)
              ngModelCtrl.$setValidity("minname",false);
            else
              ngModelCtrl.$setValidity("minname",true);
          }else {
            ngModelCtrl.$setValidity("minname",true);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').service('PostmonService', ['$http', function($http) {

    this.getCep = function(cep) {
      return $http.get('http://api.postmon.com.br/v1/cep/' + cep, {withCredentials : false}).then(function success(response) {
        return response;
      }, function error(response) {
        return response;
      })
    }

    this.getTrackingData = function(provider, code) {
      return $http.get('http://api.postmon.com.br/v1/rastreio/' + provider + '/' + code, {withCredentials : false}).then(function success(response) {
        return response;
      }, function error(response) {
        return response;
      })
    }

  }]);
}());

(function() {
  angular.module('dashboard').controller('UiCepCtrl', ['$scope','PostmonService','Socket', function($scope,PostmonService,Socket) {

    $scope.getCEP = function(value){
      return PostmonService.getCep(value).then(function(res){
        if(res.status==200)
          Socket.emit('cep complete',res.data);
        return res;
      }).catch(function(res){
        return res;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').directive('uiCep', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiCepCtrl as uiCepCtrl',
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        var cepMask = new StringMask('00000-000');

        var clearValue = function(rawValue) {
      		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8);
      	};

        var format = function(cleanValue) {
      		return (cepMask.apply(cleanValue) || '').replace(/[^0-9]$/, '');
      	};

        var validations = function(value){
          return value.toString().trim().length === 8;
        };

        ngModelCtrl.$formatters.push(function formatter(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }
          var cleanValue = clearValue(value.toString());
          return format(cleanValue);
        });

        ngModelCtrl.$parsers.push(function parser(value) {
          if (ngModelCtrl.$isEmpty(value)) {
            return value;
          }
          var cleanValue = clearValue(value.toString());
          var formattedValue = format(cleanValue);
          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }
          if (angular.isUndefined(ngModelCtrl.getModelValue)) {
            return cleanValue;
          }
          var actualModelType = typeof ngModelCtrl.$modelValue;
          return ngModelCtrl.getModelValue(formattedValue, actualModelType);
        });

        ngModelCtrl.$validators['cep'] = function validator(modelValue) {
          return ngModelCtrl.$isEmpty(modelValue) || validations(modelValue);
        };

        scope.$watch('ngModel', function (value) {
          if(value){
            ngModelCtrl.$setValidity('cepExists',true);
            var cleanValue = clearValue(value);
            scope.getCEP(cleanValue).then(function(res){
              if(res.status==200)
                ngModelCtrl.$setValidity('cepExists',true);
              else
                ngModelCtrl.$setValidity('cepExists',false);
            });
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('uiCommonName', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        //Capitalize first letter the names
        scope.$watch('ngModel', function (value) {
          if(value){
            var textValue = ""+value;
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
          }
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('uiEmail', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Verification','Auth','Account', function($scope, Verification, Auth, Account) {

        $scope.adminVerifyEmail = function(email,view){
          Verification.adminVerifyEmail(email).then(function(res){
            view.$setValidity("emailExists",true);
          }).catch(function(err){
            if(err.status==422){
              view.$setValidity("emailExists",false);
            }
            if(err.status==404){
              view.$setValidity("emailExists",true);
            }
          });
        };

        $scope.verifyEmail = function(email,view){
          Auth.isAuthenticated().then(function(res){
            if(res.data){
              Account.getAccount(res.data._id).then(function(res){
                if(res.data.email === email)
                  view.$setValidity("emailExists",true);
                else
                  view.$setValidity("emailExists",false);
              });
            }else
              $scope.adminVerifyEmail(email,view);
          });
        };

      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        scope.$watch('ngModel', function (value) {
          if(value){ //exists an input value
            var str = ""+value;
            var res = str.match(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/);
            if(res){ //email is match
              ngModelCtrl.$setValidity("invalidEmail",true);
              if(iAttrs.uiEmail){ //uiEmail defined
                if(iAttrs.uiEmail == 'registered'){ //uiEmail equals registered
                  scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);
                }else{
                  if(iAttrs.uiEmail == 'no-registered'){ //uiEmail equals no-registered

                  }else{
                    if(iAttrs.uiEmail == 'logged'){
                      scope.verifyEmail(scope.ngModel,ngModelCtrl);
                    }else{ //uiEmail exists and is empty
                      scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);
                    }
                  }
                }
              }else //uiEmail no defined
                scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);
              /*scope.adminVerifyEmail(scope.ngModel,ngModelCtrl);*/
            }else{ //email no match
              ngModelCtrl.$setValidity("invalidEmail",false);
              ngModelCtrl.$setValidity("emailExists",true);
            }
          }else{ //no input value
            ngModelCtrl.$setValidity("invalidEmail",true);
            ngModelCtrl.$setValidity("emailExists",true);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('uiPassword', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Verification', function($scope,Verification) {
        $scope.checkPassword = function(password, view){
          Verification.verifyPassword(password).then(function(res){
            if(res.data.score > 1)
              view.$setValidity("weakPassword", true);
            else
              view.$setValidity("weakPassword", false);
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("weakPassword", true);
          if(value)
            scope.checkPassword(value,ngModelCtrl);
        });
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('uiStreetNumber', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Input accept numbers-only
        function parserName(number) {
          var input = number.replace(/[^0-9]/g,'');
          if(input !== number) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return Number(input);
        }
        ngModelCtrl.$parsers.push(parserName);
        
      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('verifyCategory', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Categories', function($scope, Categories) {
        $scope.verifyCategory = function(name, view){
          Categories.getCategories().then(function(res){
            res.data.filter(function(item){
              if(item.title.toUpperCase() === name)
                view.$setValidity("categoryExists", false);
            });
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Disable keyup press of the numbers in input
        function parserName(textName) {
          var input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g,'');
          if(input !== textName) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return String(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("categoryExists", true);
          if(value){ //exists an input value
            var textValue = String(value);
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            scope.verifyCategory(value.toUpperCase(), ngModelCtrl);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('verifyPlans', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Plans', function($scope, Plans) {
        $scope.verifyPlan = function(name, view){
          Plans.getPlans().then(function(res){
            res.data.filter(function(item){
              if(item.title.toUpperCase() === name)
                view.$setValidity("planExists", false);
            });
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Disable keyup press of the numbers in input
        function parserName(textName) {
          var input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g,'');
          if(input !== textName) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return String(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("planExists", true);
          if(value){ //exists an input value
            var textValue = String(value);
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            scope.verifyPlan(value.toUpperCase(), ngModelCtrl);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('verifySelectCategory', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("selecOtherCategory", true);
          if(value && value == "Categorias"){ //exists an input value
            ngModelCtrl.$setValidity("selecOtherCategory", false);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').directive('verifySubcategory', function() {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: ['$scope','Subcategories', function($scope, Subcategories) {
        $scope.verifySubcategory = function(name, view){
          Subcategories.getSubcategories().then(function(res){
            res.data.filter(function(item){
              if(item.title.toUpperCase() === name)
                view.$setValidity("subcategoryExists", false);
            });
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ngModelCtrl) {

        //Disable keyup press of the numbers in input
        function parserName(textName) {
          var input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g,'');
          if(input !== textName) {
              ngModelCtrl.$setViewValue(input);
              ngModelCtrl.$render();
          }
          return String(input);
        }
        ngModelCtrl.$parsers.push(parserName);

        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("subcategoryExists", true);
          if(value){ //exists an input value
            var textValue = String(value);
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
            scope.verifySubcategory(value.toUpperCase(), ngModelCtrl);
          }
        });

      }
    };
  });
}());

(function() {
  angular.module('dashboard').factory('Config', ['url_base', function(url_base) {
    return {
      'url_base': url_base,
      _id: ''
    }
  }]);
}());

(function() {
  angular.module('dashboard').factory('Notify', ['notify',function(notify) {

    var position = 'center';
    var duration = '3000';
    var template = '';

    return {
      set: function(pos, dur, tem, callback){
        position = pos;
        duration = dur;
        template = tem;
        return callback( ( position != undefined && duration != undefined && template != undefined ) ? true : false );
      },
      get: function(callback){
        return callback({
          'position': position,
          'duratiom': duration,
          'template': template
        });
      },
      run: function(msg, cls, pos, dur, tem, callback){
        if(msg == undefined || cls == undefined)
          return callback(false);
        else{
          notify({
            'message': msg,
            'classes': cls,
            'templateUrl': tem != undefined ? tem : template,
            'position': pos != undefined ? pos : position,
            'duration': dur != undefined ? dur : duration
          });
          return callback(true);
        }
      }
    };

  }]);
}());

(function() {
  angular.module('dashboard').factory('Socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  }]);
}());

(function() {
  angular.module('dashboard').factory('Tables', ['$filter',function($filter) {

    return {
      search: function(args, key, callback){

        var i = 0;
        var item = args[i];
        var k = key;

        if(k != undefined)
          k = k.toLowerCase();

        var s = item.search(k);

        do{
          var item = args[i];
          if(item != undefined && typeof item != "boolean"){
            item = args[i].toLowerCase();
            s = item.search(k);
          }
          i++;
        }while(s < 0 && i < args.length);

        return callback( s > -1 ? true : false );

      },
      update: function(buffer, args, key, conditions, callback){

        buffer.filter(function(item){

          var i = 0;
          var arg = args[i].label.toLowerCase();
          var k = key;

          if(k != undefined)
            k = k.toLowerCase();

          do{
            arg = args[i].label.toLowerCase();
            i++;
          }while(arg.search(k) < 0 && i < args.length);

          var value = args[i==0 ? 0 : i-1].value;

          return callback( value != null ? ( item[conditions] == value ? item : null ) : item );

        });

      },
      condition: function(buffer, key, callback){

        var i=0;
        var item = buffer[i];

        do{
          item = buffer[i];
          i++;
        }while(i < buffer.length && item.label != key);

        return callback( (item._id == 1 || item._id == 2 || item._id == 0) ? 'isActive' : 'status' );

      },
      clean: function(scope, args, callback){

        scope.key = '';
        scope.selectedPredicate = scope.predicates[0].label;
        scope.filteredList = args;

        return callback(true);

      }
    };

  }]);
}());

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

(function() {
  angular.module('dashboard').filter('commonNames', function() {
    return function(string) {
      if(!angular.isString(string))
          return string;
      return string.replace(/(?:^|\s)\S/g,function(a){return a.toUpperCase();});
    };
  });
}());

(function() {
  angular.module('dashboard').filter('status', function() {
    return function(string) {
      if(string == true)
        return 'Ativo';
      if(string == false)
        return 'Inativo';
      if(string === 'new')
        return 'Novo';
      if(string === 'rejected')
        return 'Rejeitado';
      if(string === 'approved' || string === 'approv')
        return 'Aprovado';
      if(string === 'reproved' || string === 'reprov')
        return 'Reprovado';
      if(string === 'banned')
        return 'Banido';
      return 'Pendente';
    };
  });
}());

(function() {
  angular.module('dashboard').filter('subscription', function() {
    return function(string) {
      if(string==="premium")
        return "Premium";
      return "Gratuito"
    };
  });
}());

(function() {
  angular.module('dashboard').service('Admins', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getAdmins = function(){
      return $http.get(url_base+'/admins').then(function(result){
        return result;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Verification', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.adminVerifyEmail = function(email) {
      return $http.get(url_base+'/verifications/admins?email=' + email).then(function(result){
        return result;
      });
    };

    this.verifyPassword = function(password) {
      return $http.post(url_base+'/verifications/password',{
        'password': password
      }).then(function(result){
        return result;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Auth', ['$http','$q','Config', function($http,$q,Config) {

    var url_base = Config.url_base;

    this.login = function(email,password){
      return $http.post(url_base+'/admins/auth/local/login',{
        'email': email,
        'password': password
      }).then(function(result){
        return result;
      });
    };

    this.isAuthenticated = function() {
      return $http.get(url_base+'/admins/auth/local/login').then(function(result) {
        if (result.status == 200) {
          return result;
        } else {
          return $q.reject("Not Authenticated");
        }
      });
    };

    this.logout = function() {
      return $http.post(url_base+'/admins/auth/local/logout').then(function(result) {
        return result;
      }).catch(function(err){
        console.log(err);
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Account', ['$http','$q','Config', function($http,$q,Config) {

    var url_base = Config.url_base;

    this.signup = function(name,email,password){
      return $http.post(url_base+'/admins/account/signup',{
        'name': name,
        'email': email,
        'password': password
      }).then(function(result){
        return result;
      })
    };

    this.active = function(_id){
      return $http.put(url_base+'/admins/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.inactivate = function(_id){
      return $http.put(url_base+'/admins/'+_id+'/account/inactivation').then(function(result){
        return result;
      });
    };

    this.setActivationCode = function(_id){
      return $http.put(url_base+'/admins/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.setRecoveryToken = function(recoveryKey) {
      return $http.patch(url_base+'/admins/account/recovery',recoveryKey).then(function(result){
        return result;
      });
    };

    this.recoverPassword = function(recoveryKey, token, newPassword) {
      return $http.put(url_base+'/admins/account/recovery',{
        'recoveryKey': recoveryKey,
        'token': token,
        'newPassword': newPassword
      }).then(function(result){
        return result;
      })
    };

    this.setEmailChangeToken = function(id,email){
      return $http.patch(url_base+'/admins/'+id+'/account/email',{
        'email': email
      }).then(function(result){
        return result;
      });
    };

    this.updateEmail = function(id,token){
      return $http.put(url_base+'/admins/'+id+'/account/email',{
        'token': token
      }).then(function(result){
        return result;
      });
    };

    this.updatePassword = function(id,currentPassword,newPassword){
      return $http.put(url_base+'/admins/'+id+'/account/password',{
        'currentPassword': currentPassword,
        'newPassword': newPassword
      }).then(function(result){
        return result;
      });
    };

    this.getAccount = function(id){
      return $http.get(url_base+'/admins/'+id+'/account').then(function(result){
        return result;
      });
    };

    this.updatePicture = function(id,profilePicture){
      return $http.put(url_base+'/admins/'+id+'/account/picture',{
        'profilePicture': profilePicture
      }).then(function(result){
        return result;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Profile', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.updatePicture = function(_id, pictureUrl){
      return $http.put(url_base+'/admins/'+_id+'/profile/picture', pictureUrl).then(function(result){
        return result;
      });
    };

    this.deletePicture = function(_id){
      return $http.delete(url_base+'/admins/'+_id+'/profile/picture').then(function(result){
        return result;
      });
    };

    this.getProfile = function(_id){
      return $http.get(url_base+'/admins/'+_id+'/profile').then(function(result){
        return result;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Bi', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getNumbers = function(){
      return $http.get(url_base+'/admins/management/bi/numbers').then(function(result){
        return result;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Categories', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.createCategory = function(title){
      return $http.post(url_base+'/admins/management/categories',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.updateCategory = function(_id,title){
      return $http.put(url_base+'/admins/management/categories/'+_id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.getCategories = function(){
      return $http.get(url_base+'/categories').then(function(result){
        return result;
      });
    };

    this.getCategory = function(_id){
      return $http.get(url_base+'/categories/'+_id).then(function(result){
        return result;
      });
    };

    this.activateCategory = function(_id){
      return $http.put(url_base+'/admins/management/categories/'+_id+'/activation').then(function(result){
        return result;
      });
    };

    this.inactivateCategory = function(_id){
      return $http.put(url_base+'/admins/management/categories/'+_id+'/inactivation').then(function(result){
        return result;
      });
    };

    /*this.deleteCategory = function(id){
      return $http.delete(url_base+'/categories/'+id).then(function(result){
        return result;
      });
    };*/

  }]);
}());

(function() {
  angular.module('dashboard').service('Offers', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getOffers = function(){
      return $http.get(url_base+'/admins/management/offers').then(function(result){
        return result;
      });
    };

    this.getOffer = function(id){
      return $http.get(url_base+'/admins/management/offers/'+id).then(function(result){
        return result;
      });
    };

    this.createOffer = function(title){
      return $http.post(url_base+'/admins/management/offers',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.updateOffer = function(id,title){
      return $http.put(url_base+'/admins/management/offers/'+id,{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.approveOffer = function(_id){
      return $http.put(url_base+'/admins/management/offers/'+_id+'/approve').then(function(result){
        return result;
      });
    };

    this.reproveOffer = function(_id, review){
      return $http.put(url_base+'/admins/management/offers/'+_id+'/reprove',{
        'review': 'review'
      }).then(function(result){
        return result;
      });
    };

    /*this.deleteOffer = function(id){
      return $http.delete(url_base+'/admins/management/offers/'+id).then(function(result){
        return result;
      });
    };*/

  }]);
}());

(function() {
  angular.module('dashboard').service('Partnes', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPartnes = function(){
      return $http.get(url_base+'/admins/management/partners').then(function(result){
        return result;
      });
    };

    this.active = function(_id){
      return $http.put(url_base+'/admins/management/partners/'+_id+'/account/activation').then(function(result){
        return result;
      });
    };

    this.inactivate = function(_id){
      return $http.put(url_base+'/admins/management/partners/'+_id+'/account/inactivation').then(function(result){
        return result;
      });
    };

    this.updateProfile = function(_id, profile){
      return $http.put(url_base+'/admins/management/partners/'+_id+'/profile',{
        'companyName': profile.companyName,
        'tradingName': profile.tradingName,
        'taxDocument': profile.taxDocument,
        'address': profile.address,
        'contact': profile.contact,
        'representative': profile.representative,
        'desc1': profile.desc1,
        'desc2': profile.desc2,
        'plan': profile.plan,
        'profilePicture': profile.profilePicture
      }).then(function(result){
        return result;
      });
    };

  }]);
}());

(function() {
  angular.module('dashboard').service('Plans', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.getPlans = function(){
      return $http.get(url_base+'/plans').then(function(result){
        return result;
      });
    };

    this.getPlan = function(id){
      return $http.get(url_base+'/plans/'+id).then(function(result){
        return result;
      });
    };

    this.createPlan = function(title, desc){
      return $http.post(url_base+'/admins/management/plans',{
        'title': title,
        'description': desc
      }).then(function(result){
        return result;
      });
    };

    this.updatePlan = function(id,title,desc){
      return $http.put(url_base+'/admins/management/plans/'+id,{
        'title': title,
        'description': desc
      }).then(function(result){
        return result;
      });
    };

    this.activatePlan = function(_id){
      return $http.put(url_base+'/admins/management/plans/'+_id+'/activation').then(function(result){
        return result;
      });
    };

    this.inactivatePlan = function(_id){
      return $http.put(url_base+'/admins/management/plans/'+_id+'/inactivation').then(function(result){
        return result;
      });
    };

    /*this.deletePlan = function(id){
      return $http.delete(url_base+'/admins/management/plans'+id).then(function(result){
        return result;
      });
    };*/

  }]);
}());

(function() {
  angular.module('dashboard').service('Subcategories', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.createSubcategory = function(categoryId, title){
      return $http.post(url_base+'/admins/management/categories/'+categoryId+'/subcategories',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.updateSubcategory = function(categoryId, subcategoryId, title){
      return $http.put(url_base+'/admins/management/categories/'+categoryId+'/subcategories/'+subcategoryId+'/update',{
        'title': title
      }).then(function(result){
        return result;
      });
    };

    this.inactivateSubcategory = function(categoryId, subcategoryId){
      return $http.put(url_base+'/admins/management/categories/'+categoryId+'/subcategories/'+subcategoryId+'/inactivation').then(function(result){
        return result;
      });
    };

    this.activateSubcategory = function(categoryId, subcategoryId){
      return $http.put(url_base+'/admins/management/categories/'+categoryId+'/subcategories/'+subcategoryId+'/activation').then(function(result){
        return result;
      });
    };

    this.getSubcategories = function(){
      return $http.get(url_base+'/subcategories').then(function(result){
        return result;
      });
    };

    this.getSubcategory = function(_id){
      return $http.get(url_base+'/subcategories/'+_id).then(function(result){
        return result;
      });
    };

  }]);
}());

angular.module("views/admins/admins.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/admins.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"row\">"+
    "    <div class=\"col-md-12\">"+
    "      <div class=\"card\">"+
    "        <div class=\"card-header\">"+
    "          Tabela Gerencial de Consultores"+
    "        </div>"+
    "        <div class=\"card-block \">"+
    "          <div class=\"row\">"+
    "            <div class=\"col-md-12\">"+
    "              <form class=\"form-inline\">"+
    "                <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                  <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                  <input ng-model=\"adminsCtrl.key\" ng-change=\"adminsCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "                </div>"+
    "                <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"adminsCtrl.selectedPredicate\" ng-change=\"adminsCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in adminsCtrl.predicates\" ng-selected=\"{{predicate.label == adminsCtrl.selectedPredicate}}\"></select>"+
    "                <button ng-click=\"adminsCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              </form>"+
    "            </div>"+
    "          </div>"+
    ""+
    "          <table ng-if=\"adminsCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"adminsCtrl.filteredList\" at-config=\"adminsCtrl.config\">"+
    "            <thead></thead>"+
    "            <tbody class=\"col-md-12\">"+
    "            <tr ng-repeat=\"item in adminsCtrl.filteredList\">"+
    "              <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-attribute=\"name\" at-sortable>{{item.name}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Email\" at-sortable at-attribute=\"email\">{{item.email}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.isActive | status}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Ação\">"+
    "                <button ng-hide=\"true\" class=\"btn btn-primary btn-smn\"><i class=\"material-icons\">search</i></button>"+
    "                <button ng-click=\"adminsCtrl.active(item._id,item.email,item.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                  <i ng-if=\"item.isActive\" class=\"material-icons\">check_circle</i>"+
    "                  <i ng-if=\"!item.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "                </button>"+
    "              </td>"+
    "            </tr>"+
    "            </tbody>"+
    "          </table>"+
    ""+
    "          <table ng-if=\"adminsCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "            <thead>"+
    "              <tr>"+
    "                <th>Nome <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "                <th>Email <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "                <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "                <th>Ação </th>"+
    "              </tr>"+
    "            </thead>"+
    "            <tbody>"+
    "              <tr>"+
    "                <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "              </tr>"+
    "            </tbody>"+
    "          </table>"+
    ""+
    "          <div ng-if=\"adminsCtrl.showTable == true\" class=\"row controler-table\">"+
    "            <div class=\"col-md-3\">"+
    "              <div class=\"form-group\">"+
    "                <label>Ver </label>"+
    "                <select class=\"pagination-table custom-select\" ng-init=\"adminsCtrl.config.itemsPerPage = '10'\" ng-model=\"adminsCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                  <option value=\"5\">5</option>"+
    "                  <option value=\"10\">10</option>"+
    "                  <option value=\"20\">20</option>"+
    "                  <option value=\"50\">50</option>"+
    "                </select>"+
    "                <label>itens</label>"+
    "              </div>"+
    "            </div>"+
    "            <div ng-if=\"adminsCtrl.showTable == true\" class=\"col-md-9\">"+
    "              <at-pagination at-list=\"adminsCtrl.filteredList\" at-config=\"adminsCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "            </div>"+
    "          </div>"+
    ""+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/auth/activation.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/activation.html",
    "<div class=\"container-fluid pages\">"+
    "  <div class=\"nav-login\">"+
    "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">"+
    "  </div>"+
    "  <div ng-show=\"activationCtrl.success\" class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"activationCtrl.activationSuccess\" class=\"alert alert-success text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(0)\">&times;</span>"+
    "      <span>Your account has been successfully activated</span>"+
    "    </div>"+
    "    <div ng-show=\"activationCtrl.errLogin\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(2)\">&times;</span>"+
    "      <span>There was a problem with your login.</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h3 class=\"text-center card-title\">Log in</h3>"+
    "      <form  role=\"form\" name=\"ActLoginForm\" ng-submit=\"activationCtrl.submit()\" novalidate>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Email Address</label>"+
    "          <input type=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"you@example.com\" ng-model=\"activationCtrl.user.email\" ui-email required>"+
    "        </div>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Password</label>"+
    "          <input type=\"{{activationCtrl.hidepassword ? 'password' : 'text'}}\" name=\"password\" ng-model=\"activationCtrl.user.password\" class=\"form-control\" placeholder=\"Type your password\" required>"+
    "          <i ng-click=\"activationCtrl.toggle('hide')\" ng-show=\"activationCtrl.hide\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>"+
    "          <i ng-click=\"activationCtrl.toggle('show')\" ng-show=\"activationCtrl.show\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>"+
    "        </div>"+
    "        <button class=\"mybutton btn-primary btn-lg btn-block\">LOGIN</button>"+
    "        <br />"+
    "        <div class=\"row align-items-center\">"+
    "           <div class=\"col\">"+
    "             <a href=\"#/cadastrar\">Register</a>"+
    "           </div>"+
    "           <div class=\"col text-right\">"+
    "             <a href=\"#/recuperar\">Forgot your password?</a>"+
    "           </div>"+
    "        </div>"+
    "      </form>"+
    "    </div>"+
    "  </div>"+
    "  <div ng-show=\"activationCtrl.danger\" class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"activationCtrl.activationDanger\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(1)\">&times;</span>"+
    "      <span>Error there was trying to activate your account</span>"+
    "    </div>"+
    "    <div ng-show=\"activationCtrl.resend\" class=\"alert alert-warning text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(3)\">&times;</span>"+
    "      <span>Check your inbox for the next steps.</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h3 class=\"text-center card-title\">Resend new token</h3>"+
    "      <form role=\"form\" name=\"ActResendForm\" ng-submit=\"activationCtrl.send()\" novalidate>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Email Address</label>"+
    "          <input type=\"email\" name=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"you@example.com\" ng-model=\"activationCtrl.user.email\" ng-class=\"{'has-error': ActResendForm.email.$invalid && ActResendForm.email.$dirty}\" ui-email required>"+
    "          <div class=\"error-container\" ng-show=\"ActResendForm.email.$dirty && ActResendForm.email.$invalid\">"+
    "            <small ng-show=\"ActResendForm.email.$error.required\" class=\"form-text text-muted text-danger\">Your email is required.</small>"+
    "          </div>"+
    "        </div>"+
    "        <button class=\"mybutton btn-primary btn-block\" ng-disabled=\"ActResendForm.$invalid\" type=\"submit\" name=\"Resend\">RESEND</button>"+
    "        <br>"+
    "        <div class=\"row align-items-center\">"+
    "           <div class=\"col\">"+
    "             <a href=\"#/login\">Login</a>"+
    "           </div>"+
    "           <div class=\"col text-right\">"+
    "             <a href=\"#/cadastrar\">Register</a>"+
    "           </div>"+
    "        </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/auth/forgot.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/forgot.html",
    "<div class=\"container-fluid pages\">"+
    "  <div class=\"nav-login\">"+
    "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">"+
    "  </div>"+
    "  <div class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"forgotCtrl.send\" class=\"alert alert-warning text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"forgotCtrl.close()\">&times;</span>"+
    "      <span>Verifique a sua caixa de entrada para as próximas etapas.</span>"+
    "    </div>"+
    "    <div ng-show=\"forgotCtrl.err\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"forgotCtrl.close()\">&times;</span>"+
    "      <span>{{forgotCtrl.errDescription}}</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h3 class=\"text-center card-title\">Esqueci minha senha</h3>"+
    "      <form role=\"form\" name=\"ForgotForm\" ng-submit=\"forgotCtrl.submit()\" novalidate>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Endereço de Email</label>"+
    "          <input type=\"email\" name=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"email@exemplo.com.br\" ng-model=\"forgotCtrl.user.email\" ng-class=\"{'has-error': ForgotForm.email.$invalid && ForgotForm.email.$dirty}\" ui-email=\"no-registered\" required>"+
    "          <div class=\"error-container\" ng-show=\"ForgotForm.email.$dirty && ForgotForm.email.$invalid\">"+
    "            <small ng-show=\"ForgotForm.email.$error.required\" class=\"form-text text-muted text-danger\">Seu email é obrigatório.</small>"+
    "          </div>"+
    "        </div>"+
    "        <button class=\"mybutton btn-primary btn-block\" ng-disabled=\"ForgotForm.$invalid\" type=\"submit\" name=\"Forgot\">"+
    "          <div ng-show=\"forgotCtrl.start\" class=\"loader loader-btn\">"+
    "            <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "            </svg>"+
    "          </div>"+
    "          <span ng-show=\"!forgotCtrl.start\">ENVIAR</span>"+
    "        </button>"+
    "        <br>"+
    "        <div class=\"row align-items-center\">"+
    "           <div class=\"col\">"+
    "             <a href=\"#/login\">Login</a>"+
    "           </div>"+
    "           <div class=\"col text-right\">"+
    "             <a href=\"#/cadastrar\">Cadastre-se</a>"+
    "           </div>"+
    "        </div>"+
    "      </form>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/auth/login.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/login.html",
    "<div class=\"container-fluid pages\">"+
    "  <div class=\"nav-login\">"+
    "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">"+
    "  </div>"+
    "  <div class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"loginCtrl.errLogin\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"loginCtrl.close()\">&times;</span>"+
    "      <span>Houve um problema com o seu login.</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h3 class=\"text-center card-title\">Log in</h3>"+
    "      <form  role=\"form\" name=\"LoginForm\" ng-submit=\"loginCtrl.submit()\" novalidate>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Endereço de Email</label>"+
    "          <input type=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"email@exemplo.com.br\" ng-model=\"loginCtrl.user.email\" ui-email=\"no-registered\" required>"+
    "        </div>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Senha</label>"+
    "          <input type=\"{{loginCtrl.hidepassword ? 'password' : 'text'}}\" name=\"password\" ng-model=\"loginCtrl.user.password\" class=\"form-control\" placeholder=\"Digite sua senha aqui\" required>"+
    "          <i ng-click=\"loginCtrl.toggle('hide')\" ng-show=\"loginCtrl.hide\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>"+
    "          <i ng-click=\"loginCtrl.toggle('show')\" ng-show=\"loginCtrl.show\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>"+
    "        </div>"+
    "        <button class=\"mybutton btn-primary btn-lg btn-block\">"+
    "          <div ng-show=\"loginCtrl.start\" class=\"loader loader-btn\">"+
    "            <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "            </svg>"+
    "          </div>"+
    "          <span ng-show=\"!loginCtrl.start\">LOGIN</span>"+
    "        </button>"+
    "        <br />"+
    "        <div class=\"row align-items-center\">"+
    "           <div class=\"col\">"+
    "             <a href=\"#/cadastrar\">Cadastre-se</a>"+
    "           </div>"+
    "           <div class=\"col text-right\">"+
    "             <a href=\"#/recuperar\">Esqueceu sua senha?</a>"+
    "           </div>"+
    "        </div>"+
    "      </form>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/auth/register.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/register.html",
    "<div class=\"container-fluid pages\">"+
    "  <div class=\"nav-login\">"+
    "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">"+
    "  </div>"+
    "  <div ng-show=\"registerCtrl.create\" class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"registerCtrl.err\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"registerCtrl.close(2)\">&times;</span>"+
    "      <span>{{registerCtrl.errDescription}}</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h3 class=\"text-center card-title\">Cadastro</h3>"+
    "      <form role=\"form\" name=\"RegisterForm\" ng-submit=\"registerCtrl.submit()\" novalidate>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Nome</label>"+
    "          <input type=\"text\" name=\"name\" ng-model=\"registerCtrl.user.name\" class=\"form-control\" placeholder=\"Digite seu nome\" ng-class=\"{'has-error': RegisterForm.name.$invalid && RegisterForm.name.$dirty}\" ui-br-name required>"+
    "          <div class=\"error-container\" ng-show=\"RegisterForm.name.$dirty && RegisterForm.name.$invalid\">"+
    "            <small ng-show=\"RegisterForm.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "            <small ng-show=\"RegisterForm.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "          </div>"+
    "        </div>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Endereço de Email</label>"+
    "          <input type=\"email\" name=\"email\" ng-model=\"registerCtrl.user.email\" class=\"form-control\" placeholder=\"email@examplo.com.br\" ng-class=\"{'has-error': RegisterForm.email.$invalid && RegisterForm.email.$dirty}\" ui-email required>"+
    "          <div class=\"error-container\" ng-show=\"RegisterForm.email.$dirty && RegisterForm.email.$invalid\">"+
    "            <small ng-show=\"RegisterForm.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>"+
    "            <small ng-show=\"RegisterForm.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "            <small ng-show=\"RegisterForm.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "          </div>"+
    "        </div>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Senha</label>"+
    "          <input type=\"{{registerCtrl.hidepasswordA ? 'password' : 'text'}}\" name=\"password\" ng-model=\"registerCtrl.user.password\" class=\"form-control\" placeholder=\"Digite sua senha aqui\" ng-class=\"{'has-error': RegisterForm.password.$invalid && RegisterForm.password.$dirty}\" zxcvbn=\"registerCtrl.passwordStrength\" required>"+
    "          <i ng-click=\"registerCtrl.toggle('hideA')\" ng-show=\"registerCtrl.hideA\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>"+
    "          <i ng-click=\"registerCtrl.toggle('showA')\" ng-show=\"registerCtrl.showA\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>"+
    "          <div class=\"error-container\" ng-show=\"RegisterForm.password.$dirty && RegisterForm.password.$invalid\">"+
    "            <small ng-show=\"RegisterForm.password.$error.required\" class=\"form-text text-muted text-danger\">A senha é obrigatória.</small>"+
    "          </div>"+
    "          <div strength-password strength=\"registerCtrl.passwordStrength\"></div>"+
    "        </div>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Confirme sua senha</label>"+
    "          <input type=\"{{registerCtrl.hidepasswordB ? 'password' : 'text'}}\" name=\"confirmPassword\" ng-model=\"registerCtrl.user.confirmPassword\" class=\"form-control\" placeholder=\"Confirme sua senha aqui\" ng-class=\"{'has-error': RegisterForm.confirmPassword.$invalid && RegisterForm.confirmPassword.$dirty}\" match=\"registerCtrl.user.password\" required>"+
    "          <i ng-click=\"registerCtrl.toggle('hideB')\" ng-show=\"registerCtrl.hideB\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>"+
    "          <i ng-click=\"registerCtrl.toggle('showB')\" ng-show=\"registerCtrl.showB\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>"+
    "          <div class=\"error-container\" ng-show=\"RegisterForm.confirmPassword.$dirty && RegisterForm.confirmPassword.$invalid\">"+
    "            <small ng-show=\"RegisterForm.confirmPassword.$error.required\" class=\"form-text text-muted text-danger\">Confirmar a senha é obrigatório.</small>"+
    "            <small ng-show=\"RegisterForm.confirmPassword.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>"+
    "          </div>"+
    "        </div>"+
    "        <button class=\"mybutton btn-primary btn-lg btn-block\" ng-disabled=\"RegisterForm.$invalid\" type=\"submit\" name=\"Register\">"+
    "          <div ng-show=\"registerCtrl.start\" class=\"loader loader-btn\">"+
    "            <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "            </svg>"+
    "          </div>"+
    "          <span ng-show=\"!registerCtrl.start\">CADASTRAR</span>"+
    "        </button>"+
    "        <br>"+
    "        <div class=\"row align-items-center\">"+
    "           <div class=\"col\">"+
    "             <a href=\"#/login\">Login</a>"+
    "           </div>"+
    "           <div class=\"col text-right\">"+
    "             <a href=\"#/recuperar\">Esqueceu sua senha?</a>"+
    "           </div>"+
    "        </div>"+
    "      </form>"+
    "    </div>"+
    "  </div>"+
    "  <div ng-show=\"!registerCtrl.create\" class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"registerCtrl.sendSuccess\" class=\"alert alert-success text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"registerCtrl.close(0)\">&times;</span>"+
    "      <span>Seu novo token de ativação foi enviado com sucesso.</span>"+
    "    </div>"+
    "    <div ng-show=\"registerCtrl.sendDanger\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"registerCtrl.close(1)\">&times;</span>"+
    "      <span>Erro ao tentar reenviar um novo token de ativação.</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h2 class=\"text-center card-title\">Parabéns!</h2>"+
    "      <img src=\"app/assets/img/icons/send.png\" class=\"img img-responsive img-congrulations\"/>"+
    "      <p class=\"text-congrulations\">Sua conta foi <span class=\"text-bold\">criada com sucesso</span></p>"+
    "      <p class=\"text-congrulations\">Entre em contato com o <span calss=\"text-bold\">administrador</span> do sistema para os próximos passos.</p>"+
    "      <br>"+
    "      <div class=\"row align-items-center\">"+
    "         <div class=\"col\">"+
    "           <a href=\"#/login\">Login</a>"+
    "         </div>"+
    "         <div class=\"col text-right\">"+
    "           <a href=\"#/recuperar\">Esqueceu sua senha?</a>"+
    "         </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/auth/reset.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/reset.html",
    "<div class=\"container-fluid pages\">"+
    "  <div class=\"nav-login\">"+
    "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">"+
    "  </div>"+
    "  <div class=\"col col-sm-6 col-md-4 horizontal-align\">"+
    "    <div ng-show=\"resetCtrl.resetSuccess\" class=\"alert alert-success text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"resetCtrl.close(0)\">&times;</span>"+
    "      <span>Sua senha foi redefinida com sucesso.</span>"+
    "    </div>"+
    "    <div ng-show=\"resetCtrl.resetDanger\" class=\"alert alert-danger text-center\" role=\"alert\">"+
    "      <span class=\"alert-close-btn\" ng-click=\"resetCtrl.close(1)\">&times;</span>"+
    "      <span>{{resetCtrl.errDescription}}</span>"+
    "    </div>"+
    "    <div class=\"cards\">"+
    "      <h3 class=\"text-center card-title\">Redefinir senha</h3>"+
    "      <form role=\"form\" name=\"ResetForm\" ng-submit=\"resetCtrl.submit()\" novalidate>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Senha</label>"+
    "          <input type=\"{{resetCtrl.hidepasswordA ? 'password' : 'text'}}\" name=\"password\" ng-model=\"resetCtrl.user.password\" class=\"form-control\" placeholder=\"Digite sua nova senha aqui\" ng-class=\"{'has-error': ResetForm.password.$invalid && ResetForm.password.$dirty}\" zxcvbn=\"resetCtrl.passwordStrength\" required>"+
    "          <i ng-click=\"resetCtrl.toggle('hideA')\" ng-show=\"resetCtrl.hideA\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>"+
    "          <i ng-click=\"resetCtrl.toggle('showA')\" ng-show=\"resetCtrl.showA\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>"+
    "          <div class=\"error-container\" ng-show=\"ResetForm.password.$dirty && ResetForm.password.$invalid\">"+
    "            <small ng-show=\"ResetForm.password.$error.required\" class=\"form-text text-muted text-danger\">A senha é um item obrigatória.</small>"+
    "          </div>"+
    "          <div strength-password strength=\"resetCtrl.passwordStrength\"></div>"+
    "        </div>"+
    "        <div class=\"form-group\">"+
    "          <label class=\"card-label\" for=\"formGroupExampleInput\">Confirmar senha</label>"+
    "          <input type=\"{{resetCtrl.hidepasswordB ? 'password' : 'text'}}\" name=\"confirmPassword\" ng-model=\"resetCtrl.user.confirmPassword\" class=\"form-control\" placeholder=\"Digite novamente a senha\" ng-class=\"{'has-error': ResetForm.confirmPassword.$invalid && ResetForm.confirmPassword.$dirty}\" match=\"resetCtrl.user.password\" required>"+
    "          <i ng-click=\"resetCtrl.toggle('hideB')\" ng-show=\"resetCtrl.hideB\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>"+
    "          <i ng-click=\"resetCtrl.toggle('showB')\" ng-show=\"resetCtrl.showB\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>"+
    "          <div class=\"error-container\" ng-show=\"ResetForm.confirmPassword.$dirty && ResetForm.confirmPassword.$invalid\">"+
    "            <small ng-show=\"ResetForm.confirmPassword.$error.required\" class=\"form-text text-muted text-danger\">Confirmar a sua senha é um item obrigatório.</small>"+
    "            <small ng-show=\"ResetForm.confirmPassword.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>"+
    "          </div>"+
    "        </div>"+
    "        <button class=\"mybutton btn-primary btn-lg btn-block\" ng-disabled=\"ResetForm.$invalid\" type=\"submit\" name=\"Reset\">"+
    "          <div ng-show=\"resetCtrl.start\" class=\"loader loader-btn\">"+
    "            <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "            </svg>"+
    "          </div>"+
    "          <span ng-show=\"!resetCtrl.start\">RESETAR</span>"+
    "        </button>"+
    "        <br>"+
    "        <div class=\"row align-items-center\">"+
    "           <div class=\"col\">"+
    "             <a href=\"#/login\">Login</a>"+
    "           </div>"+
    "           <div class=\"col text-right\">"+
    "             <a href=\"#/cadastrar\">Cadastre-se</a>"+
    "           </div>"+
    "        </div>"+
    "      </form>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("directives/cardsBi/cardsBi.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/cardsBi.html",
    "<div class=\"card-heading\">"+
    "  <div class=\"card-box\">"+
    "    <i class=\"material-icons icon-card\">{{cardsBiCtrl.icon}}</i>"+
    "  </div>"+
    "  <div class=\"card-block\">"+
    "    <div ng-show=\"cardsBiCtrl.start\" class=\"loader\">"+
    "      <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "        <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "      </svg>"+
    "    </div>"+
    "    <h4 ng-show=\"!cardsBiCtrl.start\" class=\"cards-title\">{{cardsBiCtrl.value}}</h4>"+
    "    <p class=\"card-text\">{{cardsBiCtrl.label | biLabel}}</p>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/categories/categories.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/categories.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-header\">"+
    "        Tabela Gerencial de Categorias"+
    "      </div>"+
    "      <div class=\"card-block\">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <form class=\"form-inline\">"+
    "              <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                <input ng-model=\"categoriesCtrl.key\" ng-change=\"categoriesCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "              </div>"+
    "              <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"categoriesCtrl.selectedPredicate\" ng-change=\"categoriesCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in categoriesCtrl.predicates\" ng-selected=\"{{predicate.label == categoriesCtrl.selectedPredicate}}\"></select>"+
    "              <button ng-click=\"categoriesCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              <button ng-click=\"categoriesCtrl.create()\" type=\"button\" class=\"btn btn-primary btn-margin\">Novo</button>"+
    "            </form>"+
    "          </div>"+
    "        </div>"+
    ""+
    "        <table ng-if=\"categoriesCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"categoriesCtrl.filteredList\" at-config=\"categoriesCtrl.config\">"+
    "          <thead></thead>"+
    "          <tbody class=\"col-md-12\">"+
    "          <tr ng-repeat=\"item in categoriesCtrl.filteredList\">"+
    "            <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-sortable at-attribute=\"title\">{{item.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.isActive | status}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Data de criação\" at-sortable at-attribute=\"createdAt\">{{item.createdAt | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Ação\">"+
    "              <button ng-click=\"categoriesCtrl.edit(item._id,item.title)\" class=\"btn btn-info btn-smn\"><i class=\"material-icons\">mode_edit</i></button>"+
    "              <button ng-click=\"categoriesCtrl.active(item._id,item.title,item.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                <i ng-if=\"item.isActive\" class=\"material-icons\">check_circle</i>"+
    "                <i ng-if=\"!item.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "              </button>"+
    "            </td>"+
    "          </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <table ng-if=\"categoriesCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "          <thead>"+
    "            <tr>"+
    "              <th>Nome <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Data de criação <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Ação </th>"+
    "            </tr>"+
    "          </thead>"+
    "          <tbody>"+
    "            <tr>"+
    "              <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "            </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <div ng-if=\"categoriesCtrl.showTable == true\" class=\"row controler-table\">"+
    "          <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "              <label>Ver </label>"+
    "              <select class=\"pagination-table custom-select\" ng-init=\"categoriesCtrl.config.itemsPerPage = '10'\" ng-model=\"categoriesCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                <option value=\"5\">5</option>"+
    "                <option value=\"10\">10</option>"+
    "                <option value=\"20\">20</option>"+
    "                <option value=\"50\">50</option>"+
    "              </select>"+
    "              <label>itens</label>"+
    "            </div>"+
    "          </div>"+
    "          <div ng-if=\"categoriesCtrl.showTable == true\" class=\"col-md-6\">"+
    "            <at-pagination at-list=\"categoriesCtrl.filteredList\" at-config=\"categoriesCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "          </div>"+
    "        </div>"+
    ""+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("directives/cloudinary/cloudinary.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/cloudinary.html",
    "<slick settings=\"cloudinaryCtrl.slickConfig\" class=\"slick-cloudinary\">"+
    "  <div ng-repeat=\"url in cloudinaryCtrl.urls\">"+
    "    <div class=\"custom-zoom\">"+
    "      <img class=\"img slick-img\" ng-src=\"{{url.path}}\"/>"+
    "      <span class=\"custom-zoom-in\">"+
    "        <i ng-click=\"cloudinaryCtrl.zoom(url)\" class=\"material-icons\">zoom_in</i>"+
    "      </span>"+
    "    </div>"+
    "  </div>"+
    "</slick>"+
    ""+
    "<!-- modal -->"+
    "<div id=\"slick-cloudinary-modal\" class=\"slick-cloudinary-modal\">"+
    "  <div class=\"slick-modal-content\">"+
    "      <span ng-click=\"cloudinaryCtrl.close()\" class=\"slick-modal-close\" id=\"slick-modal-close\">Fechar</span>"+
    "      <figure class=\"slick-figure\">"+
    "          <img id=\"slick-figure-img\" src=\"{{cloudinaryCtrl.zoomImg}}\" class=\"slick-figure-img\">"+
    "          <div id=\"slick-infobox\" class=\"slick-infobox\">"+
    "            <span class=\"slick-infobox-icon\">"+
    "              <i class=\"fa fa-info-circle\"></i>"+
    "              <div class=\"slick-infobox-content\">"+
    "                <h4 id=\"slick-figure-title\">{{cloudinaryCtrl.title}}</h4>"+
    "                <p id=\"slick-figure-desc\">{{cloudinaryCtrl.description}}</p>"+
    "              </div>"+
    "            </span>"+
    "          </div>"+
    "      </figure>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/home/home.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/home.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"row\">"+
    "    <div class=\"col-lg-12\">"+
    "      <div class=\"cards-dash row\">"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/ofertas\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"offers\" bi-icon=\"shopping_cart\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/categorias\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"categories\" bi-icon=\"list\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/parceiros\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"partners\" bi-icon=\"contacts\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/planos\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"plans\" bi-icon=\"assignment\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "      </div>"+
    "      <div class=\"row card-row-style\">"+
    "        <div class=\"card card-style\">"+
    "          <div class=\"card-header\">"+
    "            Ofertas Cadastrados"+
    "          </div>"+
    "          <div class=\"card-block\">"+
    "            <canvas class=\"chart chart-line\" height=\"110\" chart-data=\"homeCtrl.data\" chart-labels=\"homeCtrl.labels\" chart-series=\"series\"></canvas>"+
    "          </div>"+
    "        </div>"+
    "        <div class=\"card card-style-graph\">"+
    "          <div class=\"card-header contet-gaph\">"+
    "            Estatísticas Gerais (%)"+
    "          </div>"+
    "          <div class=\"card-block\">"+
    "            <canvas class=\"chart chart-doughnut\" height=\"192\" chart-data=\"homeCtrl.donutData\" chart-labels=\"homeCtrl.donutLabels\" chart-colors=\"homeCtrl.colors\"></canvas>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("directives/menuDropdown/menuDropdown.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/menuDropdown.html",
    "<a class=\"nav-link\" href=\"#\" target=\"_self\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">"+
    "  <img class=\"rounded-circle\" ngf-thumbnail=\"menuDropdownCtrl.user.picture || '//placehold.it/40'\">"+
    "</a>"+
    "<div class=\"dropdown-menu dropdown-menu-right \" aria-labelledby=\"navbarDropdownMenuLink\">"+
    "    <div class=\"drop-title\">"+
    "      <img class=\"rounded-circle img-drop-title\" ngf-thumbnail=\"menuDropdownCtrl.user.picture || '//placehold.it/40'\">"+
    "      <span>{{menuDropdownCtrl.user.name}}</span>"+
    "      <div class=\"title-notify\">{{menuDropdownCtrl.user.email}}</div>"+
    "    </div>"+
    "    <a ng-hide=\"true\" class=\"dropdown-item\" href=\"#/perfil\"><i class=\"material-icons marg-r15\">account_box</i> Meu Perfil</a>"+
    "    <a class=\"dropdown-item\" href=\"#/settings\"><i class=\"material-icons marg-r15\">settings</i> Configurações</a>"+
    "    <div class=\"dropdown-divider\"></div>"+
    "    <a class=\"dropdown-item\" style=\"cursor: pointer;\" ng-click=\"menuDropdownCtrl.logout()\"><i class=\"material-icons marg-r15\">exit_to_app</i>Sair</a>"+
    "</div>"+
    "");
}]);
angular.module("directives/menuNavbar/menuNavbar.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/menuNavbar.html",
    "<nav ng-if=\"menuNavbarCtrl.logged==true\" class=\"navbar navbar-toggleable-sm bg-white\">"+
    "    <button id=\"toggler-button\" sidebar-toogler class=\"navbar-toggler toggle\" type=\"button\">"+
    "      &#9776;"+
    "    </button>"+
    "    <div class=\"navbar-collapse collapse\" id=\"navbar2\">"+
    "        <ul class=\"navbar-nav ml-auto\">"+
    "            <!-- <li ng-hide=\"true\" class=\"nav-item dropdown \">"+
    "                <a class=\"nav-link dropdown-toggle\" href=\"#\" target=\"_self\" data-toggle=\"dropdown\""+
    "                   aria-haspopup=\"true\" aria-expanded=\"false\">"+
    "                                <span><i class=\"material-icons navbar-icons\">notifications</i>"+
    "                                <span class=\"badge badge-danger\">4</span></span>"+
    "                </a>"+
    "                <div class=\"dropdown-menu notif-list dropdown-menu-right dropdownresp   \""+
    "                     aria-labelledby=\"navbarDropdownMenuLink\">"+
    "                    <div class=\"drop-title\">"+
    "                        <small>Notificações</small>"+
    "                    </div>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span class=\"message\">"+
    "                                  Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span class=\"message\">"+
    "                                  Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span class=\"message\">"+
    "                                  Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                </span>"+
    "                    </a>"+
    "                    <div class=\"drop-footer text-center\">"+
    "                        <a href=\"dropdown-item\" href=\"#\">"+
    "                            <small>Show all</small>"+
    "                        </a></div>"+
    "                </div>"+
    "            </li>"+
    "            <li ng-hide=\"true\" class=\"nav-item dropdown\">"+
    "                <a class=\"nav-link dropdown-toggle\" href=\"#\" target=\"_self\" data-toggle=\"dropdown\""+
    "                   aria-haspopup=\"true\" aria-expanded=\"false\">"+
    "                    <span><i class=\"material-icons navbar-icons\">mail</i></span>"+
    "                    <span class=\"badge badge-danger\">2</span></span>"+
    "                </a>"+
    "                <div class=\"dropdown-menu msg-list dropdown-menu-right\""+
    "                     aria-labelledby=\"navbarDropdownMenuLink\">"+
    "                    <div class=\"drop-title\">"+
    "                        <small>Mensagens</small>"+
    "                    </div>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span>"+
    "                                    <span>John Smith</span>"+
    "                                    <span class=\"time\">3 mins ago</span>"+
    "                                  </span>"+
    "                        <span class=\"message\">"+
    "                                    Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                  </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span>"+
    "                                    <span>John Smith</span>"+
    "                                    <span class=\"time\">3 mins ago</span>"+
    "                                  </span>"+
    "                        <span class=\"message\">"+
    "                                    Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                  </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span>"+
    "                                    <span>John Smith</span>"+
    "                                    <span class=\"time\">3 mins ago</span>"+
    "                                  </span>"+
    "                        <span class=\"message\">"+
    "                                    Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                  </span>"+
    "                    </a>"+
    "                    <div class=\"drop-footer text-center\">"+
    "                        <a href=\"dropdown-item\" href=\"#\">"+
    "                            <small>Show all</small>"+
    "                        </a></div>"+
    "                </div>"+
    "            </li> -->"+
    "            <li class=\"nav-item dropdown\">"+
    "              <menu-dropdown></menu-dropdown>"+
    "            </li>"+
    "        </ul>"+
    "    </div>"+
    "</nav>"+
    "");
}]);
angular.module("directives/menuSidebar/menuSidebar.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/menuSidebar.html",
    "<div id=\"sidebar\" class=\"sidebar sidebar-left sidebar-transition sidebar-size-3 sidebar-title\">"+
    "    <!-- Brand -->"+
    "    <a ng-href=\"#/\" class=\"sidebar-brand\"><img class=\"img img-responsive img-brand\" width=\"190\" src=\"app/assets/img/logos/nabudega.png\"/></a>"+
    "    <div class=\"sidebar-heading\">MENU</div>"+
    "    <ul class=\"sidebar-menu sidebar-text\">"+
    "      <li ng-repeat=\"menuItem in menuSidebarCtrl.menuItens\" class=\"sidebar-menu-item\">"+
    "        <div link-sidebar link-sidebar-close ng-if=\"!menuItem.hasSubmenu\" class=\"sidebar-menu-button\" data-toggle=\"sidebar-collapse\" href=\"{{menuItem.href}}\">"+
    "          <i class=\"sidebar-menu-icon material-icons\">{{menuItem.icon}}</i> {{menuItem.label}}"+
    "        </div>"+
    "        <span submenu-sidebar ng-if=\"menuItem.hasSubmenu\" class=\"sidebar-menu-button sidebar-menuItem-button\" data-toggle=\"sidebar-collapse\">"+
    "          <i class=\"sidebar-menu-icon material-icons\">{{menuItem.icon}}</i> {{menuItem.label}}"+
    "        </span>"+
    "        <ul ng-if=\"menuItem.hasSubmenu\" class=\"sidebar-submenu\">"+
    "          <li ng-repeat=\"submenuItem in menuItem.submenu\" class=\"sidebar-menu-item\">"+
    "              <div link-sidebar link-sidebar-close class=\"sidebar-menu-button\" href=\"{{submenuItem.href}}\">{{submenuItem.label}}</div>"+
    "          </li>"+
    "        </ul>"+
    "      </li>"+
    "    </ul>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/alert.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/alert.html",
    "<div class=\"modal fade \">"+
    "  <div class=\"modal-dialog\">"+
    "    <div class=\"modal-content\">"+
    "      <div class=\"modal-header\">"+
    "        <h4 class=\"modal-title\">{{alertModalCtrl.title}}</h4>"+
    "        <button type=\"button\" class=\"close\" ng-click=\"alertModalCtrl.close(false)\" data-dismiss=\"modal\"  aria-hidden=\"true\">&times;</button>"+
    "      </div>"+
    "      <div class=\"modal-body\">"+
    "        <p>{{alertModalCtrl.question}}</p>"+
    "        <p>{{alertModalCtrl.user}}</p>"+
    "      </div>"+
    "      <div class=\"modal-footer\">"+
    "        <button type=\"button\" ng-click=\"alertModalCtrl.close(true)\" class=\"btn btn-success\" data-dismiss=\"modal\"> Sim</button>"+
    "        <button type=\"button\" ng-click=\"alertModalCtrl.close(false)\" class=\"btn btn-danger\" data-dismiss=\"modal\"> Não</button>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/category-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/category-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{categoryFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"categoryFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"categoryFormModalCtrl.close(true)\" name=\"CategoryFormModal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Categoria</label>"+
    "                      <input type=\"text\" name=\"name\" ng-model=\"categoryFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': CategoryFormModal.name.$invalid && CategoryFormModal.name.$dirty}\" verify-category required>"+
    "                      <div class=\"error-container\" ng-show=\"CategoryFormModal.name.$dirty && CategoryFormModal.name.$invalid\">"+
    "                        <small ng-show=\"CategoryFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                        <small ng-show=\"CategoryFormModal.name.$error.categoryExists\" class=\"form-text text-muted text-danger\">Este nome já foi usado em outra categoria.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" ng-disabled=\"CategoryFormModal.$invalid\" class=\"btn btn-primary\">{{categoryFormModalCtrl.label}}</button>"+
    "                        <button type=\"button\" ng-click=\"categoryFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">Modal with Form</h4>"+
    "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"formModalCtrl.close(true)\" name=\"form-modal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                        <label for=\"email-input\">Email address</label>"+
    "                        <input ng-model=\"formModalCtrl.inputs.email\" type=\"email\" class=\"form-control\" id=\"email-input\" aria-describedby=\"email-help\" placeholder=\"Enter email\">"+
    "                        <small id=\"email-help\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small>"+
    "                    </div>"+
    "                    <div class=\"form-group\">"+
    "                        <label for=\"subject\">Subject</label>"+
    "                        <input ng-model=\"formModalCtrl.inputs.subject\" type=\"text\" class=\"form-control\" id=\"subject\" placeholder=\"Subject of your message\">"+
    "                    </div>"+
    "                    <div class=\"form-group\">"+
    "                        <label for=\"text-area\">Your message</label>"+
    "                        <textarea ng-model=\"formModalCtrl.inputs.message\" class=\"form-control\" id=\"text-area\" rows=\"3\"></textarea>"+
    "                    </div>"+
    "                    <div class=\"form-check\">"+
    "                        <label class=\"form-check-label\">"+
    "                          <input ng-model=\"formModalCtrl.inputs.checkbox\" type=\"checkbox\" class=\"form-check-input\">"+
    "                          Check me out"+
    "                        </label>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" class=\"btn btn-primary\">Send</button>"+
    "                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancel</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/info.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/info.html",
    "<div class=\"modal fade \">"+
    "  <div class=\"modal-dialog\">"+
    "    <div class=\"modal-content\">"+
    "      <div class=\"modal-header\">"+
    "        <h4 class=\"modal-title\">{{infoModalCtrl.title}}</h4>"+
    "        <button type=\"button\" class=\"close\" ng-click=\"infoModalCtrl.close(false)\" data-dismiss=\"modal\"  aria-hidden=\"true\">&times;</button>"+
    "      </div>"+
    "      <div class=\"modal-body\">"+
    "        <h5>{{infoModalCtrl.info}}</h5>"+
    "      </div>"+
    "      <div class=\"modal-footer\">"+
    "        <button type=\"button\" ng-click=\"infoModalCtrl.close(true)\" class=\"btn btn-primary\" data-dismiss=\"modal\"> Fechar</button>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/offers.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/offers.html",
    "<div ng-click=\"offersModalCtrl.close()\" class=\"modal fade\">"+
    "  <div ng-click=\"$event.stopPropagation()\" class=\"modal-dialog\">"+
    "    <div class=\"modal-content\">"+
    "      <div class=\"modal-header\">"+
    "        <h4 class=\"modal-title\">{{offersModalCtrl.title}}</h4>"+
    "        <button type=\"button\" ng-click=\"offersModalCtrl.close()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "      </div>"+
    "      <div class=\"modal-body\">"+
    "       <div class=\"row\">"+
    "        <div class=\"col-md-12\">"+
    "         <ul class=\"nav nav-tabs nav-justified\">"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(1) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(1)\" class=\"nav-link\" href>Parceiro</a>"+
    "          </li>"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(2) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(2)\" class=\"nav-link\" href>Oferta</a>"+
    "          </li>"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(3) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(3)\" class=\"nav-link\" href>Descrições</a>"+
    "          </li>"+
    "          <li ng-class=\"{ active: offersModalCtrl.isSet(4) }\" class=\"nav-item\">"+
    "           <a ng-click=\"offersModalCtrl.setTab(4)\" class=\"nav-link\" href>Subcategorias</a>"+
    "          </li>"+
    "         </ul>"+
    "        </div>"+
    "       </div>"+
    "       <form ng-submit=\"offersModalCtrl.close(true)\" name=\"OffersFormModal\" novalidate>"+
    "        <div ng-show=\"offersModalCtrl.isSet(1)\">"+
    "          <div class=\"row account-col\">"+
    "           <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "             <p class=\"font-weight-bold\">Configurações pessoais</p>"+
    "             <p class=\"font-weight-normal\">Informações básicas do parceiro.</p>"+
    "            </div>"+
    "           </div>"+
    "           <div class=\"col-md-9\">"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Nome</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.name}}</div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Email</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.email}}</div>"+
    "             </div>"+
    "             <div calss=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.phoneNumber | phoneNumber}}</div>"+
    "             </div>"+
    "             <div ng-if=\"offersModalCtrl.inputs.partner.cpf\" class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">CPF</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.cpf}}</div>"+
    "             </div>"+
    "             <div ng-if=\"offersModalCtrl.inputs.partner.cnpj\" class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">CNPJ</label>"+
    "              <div class=\"form-control\">{{offersModalCtrl.inputs.partner.cnpj}}</div>"+
    "             </div>"+
    "           </div>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"offersModalCtrl.isSet(2)\">"+
    "          <div class=\"row account-col\">"+
    "           <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "             <p class=\"font-weight-bold\">Configurações da Oferta</p>"+
    "             <p class=\"font-weight-normal\">Nesta seção você pode avaliar a oferta cadastrada.</p>"+
    "            </div>"+
    "           </div>"+
    "           <div class=\"col-md-9\">"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Título</label>"+
    "                <div class=\"form-control\">{{offersModalCtrl.inputs.title | commonNames}}</div>"+
    "              </div>"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Galeria</label><br>"+
    "                <cloudinary-render url=\"offersModalCtrl.inputs.pictures\" data=\"array\"></cloudinary-render>"+
    "              </div>"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Preço</label>"+
    "                <div class=\"form-control\">De {{offersModalCtrl.inputs.price.full | finance:true:2}} por {{offersModalCtrl.inputs.price.current | finance:true:2}}</div>"+
    "              </div>"+
    "              <div class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Duração da Oferta</label>"+
    "                <div class=\"form-control\">Válida até {{offersModalCtrl.inputs.duration.expireDate | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</div>"+
    "              </div>"+
    "              <div ng-if=\"!offersModalCtrl.inputs.coupons.isLimited\" class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Cupons Disponíveis</label>"+
    "                <div class=\"form-control\">{{offersModalCtrl.inputs.coupons.quantity}}</div>"+
    "              </div>"+
    "              <div ng-if=\"offersModalCtrl.inputs.coupons.isLimited\" class=\"form-group\">"+
    "                <label class=\"card-label\" for=\"formGroupExampleInput\">Cupons Disponíveis</label>"+
    "                <div class=\"form-control\">Ilimitado</div>"+
    "              </div>"+
    "           </div>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"offersModalCtrl.isSet(3)\">"+
    "          <div class=\"row account-col\">"+
    "           <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "             <p class=\"font-weight-bold\">Configurações de Textos</p>"+
    "             <p class=\"font-weight-normal\">Nesta seção você pode avaliar as informações de textos.</p>"+
    "            </div>"+
    "           </div>"+
    "           <div class=\"col-md-9\">"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Descrição do Produto</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.main\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Como usar o Produto</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.howToUse\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Onde usar o Produto</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.whenToUse\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Regras</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.rules\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Regras de Cobrança</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.chargeRules\"></div>"+
    "             </div>"+
    "             <div class=\"form-group\">"+
    "              <label class=\"card-label\" for=\"formGroupExampleInput\">Bom Saber</label>"+
    "              <div class=\"form-control\" ng-bind-html=\"offersModalCtrl.inputs.descriptions.goodToKnow\"></div>"+
    "             </div>"+
    "           </div>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"offersModalCtrl.isSet(4)\">"+
    "           <div class=\"row account-col\">"+
    "            <div class=\"col-md-3\">"+
    "             <div class=\"form-group\">"+
    "              <p class=\"font-weight-bold\">Lista de Subcategorias</p>"+
    "              <p class=\"font-weight-normal\">Nesta seção você pode verificar as subcategorias que está oferta irá aparecer.</p>"+
    "             </div>"+
    "            </div>"+
    "            <div class=\"col-md-9\">"+
    "              <div ng-repeat=\"subcategory in offersModalCtrl.inputs.subcategories\" class=\"form-group\">"+
    "                <div class=\"form-group\">"+
    "                 <label class=\"card-label\" for=\"formGroupExampleInput\">{{subcategory.category}}</label>"+
    "                 <div class=\"form-control\"><span class=\"font-weight-bold\">Subcategoria:</span> {{subcategory.title | commonNames}}</div>"+
    "                 <div class=\"form-control\"><span class=\"font-weight-bold\">Status:</span> {{subcategory.isActive | status}}</div>"+
    "                </div>"+
    "              </div>"+
    "            </div>"+
    "           </div>"+
    "        </div>"+
    "        <div class=\"modal-footer\">"+
    "         <button ng-if=\"offersModalCtrl.inputs.approval.status == 'reproved' ||offersModalCtrl.inputs.approval.status == 'pending' || offersModalCtrl.inputs.approval.status == 'reprov' || offersModalCtrl.inputs.approval.status == 'pend'\" type=\"button\" ng-click=\"offersModalCtrl.close(true)\" class=\"btn btn-success\" data-dismiss=\"modal\">"+
    "          <i class=\"material-icons\">thumb_up</i>"+
    "         </button>"+
    "         <button ng-if=\"offersModalCtrl.inputs.approval.status == 'pending' || offersModalCtrl.inputs.approval.status == 'pend'\" type=\"button\" ng-click=\"offersModalCtrl.close(false)\" class=\"btn btn-danger\" data-dismiss=\"modal\">"+
    "          <i class=\"material-icons\">thumb_down</i>"+
    "         </button>"+
    "         <button type=\"button\" ng-click=\"offersModalCtrl.close()\" class=\"btn btn-default\" data-dismiss=\"modal\"> Sair </button>"+
    "       </div>"+
    "       </form>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/partner-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/partner-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{partnerFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"partnerFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "              <div class=\"row\">"+
    "                <div class=\"col-md-12\">"+
    "                  <ul class=\"nav nav-tabs nav-justified\">"+
    "                    <li ng-class=\"{ active: partnerFormModalCtrl.isSet(1) }\" class=\"nav-item\">"+
    "                      <a ng-click=\"partnerFormModalCtrl.setTab(1)\" class=\"nav-link\" href>P. Física</a>"+
    "                    </li>"+
    "                    <li ng-class=\"{ active: partnerFormModalCtrl.isSet(2) }\" class=\"nav-item\">"+
    "                      <a ng-click=\"partnerFormModalCtrl.setTab(2)\" class=\"nav-link\" href>P. Jurídica</a>"+
    "                    </li>"+
    "                    <li ng-class=\"{ active: partnerFormModalCtrl.isSet(3) }\" class=\"nav-item\">"+
    "                      <a ng-click=\"partnerFormModalCtrl.setTab(3)\" class=\"nav-link\" href>Endereço</a>"+
    "                    </li>"+
    "                  </ul>"+
    "                </div>"+
    "              </div>"+
    "              <form ng-submit=\"partnerFormModalCtrl.close(true)\" name=\"PartnerFormModal\" novalidate>"+
    "                <div ng-show=\"partnerFormModalCtrl.isSet(1)\">"+
    "                  <div class=\"row account-col\">"+
    "                    <div class=\"col-md-3\">"+
    "                      <div class=\"form-group\">"+
    "                        <p class=\"font-weight-bold\">Configurações pessoais</p>"+
    "                        <p class=\"font-weight-normal\">Alguas dessas informações podem afetar o login do parceiro no sistema.</p>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"col-md-9\">"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Nome</label>"+
    "                          <input ng-disabled=\"true\" type=\"text\" name=\"name\" ng-model=\"partnerFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PartnerFormModal.name.$invalid && PartnerFormModal.name.$dirty}\" ui-br-name required>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.name.$dirty && PartnerFormModal.name.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                            <small ng-show=\"PartnerFormModal.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Email</label>"+
    "                          <input ng-disabled=\"true\" type=\"email\" name=\"email\" ng-model=\"partnerFormModalCtrl.inputs.email\" class=\"form-control\" placeholder=\"email@exemplo.com.br\" ng-class=\"{'has-error': PartnerFormModal.email.$invalid && PartnerFormModal.email.$dirty}\" ui-email=\"no-registered\" required>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.email.$dirty && PartnerFormModal.email.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>"+
    "                            <small ng-show=\"PartnerFormModal.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>"+
    "                          <input ng-disabled=\"true\" type=\"tel\" name=\"phoneNumber\" ng-model=\"partnerFormModalCtrl.inputs.phoneNumber\" class=\"form-control\" placeholder=\"Digite um número de celular\" ng-class=\"{'has-error': PartnerFormModal.phoneNumber.$invalid && PartnerFormModal.phoneNumber.$dirty}\" ui-br-cellphone required>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.phoneNumber.$dirty && PartnerFormModal.phoneNumber.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.phoneNumber.$error.required\" class=\"form-text text-muted text-danger\">O número de celular é obrigatório.</small>"+
    "                            <small ng-show=\"PartnerFormModal.phoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.phoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label style=\"margin-bottom: 10px;\" class=\"card-label\" for=\"formGroupExampleInput\">Avatar</label><br/>"+
    "                          <img ngf-thumbnail=\"partnerFormModalCtrl.inputs.profilePicture || '//placehold.it/160'\" width=\"160\" height=\"160\"/>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Plano</label>"+
    "                          <select name=\"planTitle\" class=\"form-control\" ng-model=\"partnerFormModalCtrl.inputs.plan.title\""+
    "                              ng-options=\"plan.title as plan.title for plan in partnerFormModalCtrl.plans\"></select>"+
    "                        </div>"+
    "                        <div ng-if=\"partnerFormModalCtrl.inputs.taxDocument.documentType === 'cpf'\" style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">CPF</label>"+
    "                          <input type=\"text\" name=\"cpf\" ng-model=\"partnerFormModalCtrl.inputs.taxDocument.documentNumber\" class=\"form-control\" placeholder=\"Digite o CPF\" ng-class=\"{'has-error': PartnerFormModal.cpf.$invalid && PartnerFormModal.cpf.$dirty}\" ui-br-cpf-mask>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.cpf.$dirty && PartnerFormModal.cpf.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.cpf.$error.cpf\" class=\"form-text text-muted text-danger\">Digite um CPF válido.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Representante</label>"+
    "                          <input type=\"text\" name=\"representativeName\" ng-model=\"partnerFormModalCtrl.inputs.representative.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PartnerFormModal.representativeName.$invalid && PartnerFormModal.representativeName.$dirty}\" ui-br-name>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.representativeName.$dirty && PartnerFormModal.representativeName.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.representativeName.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Contato do Representante</label>"+
    "                          <input type=\"tel\" name=\"representativePhoneNumber\" ng-model=\"partnerFormModalCtrl.inputs.representative.phoneNumber\" class=\"form-control\" placeholder=\"Digite um número de celular\" ui-br-phone-number>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.representativePhoneNumber.$dirty && PartnerFormModal.representativePhoneNumber.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.representativePhoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.representativePhoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                    </div>"+
    "                  </div>"+
    "                </div>"+
    "                <div ng-show=\"partnerFormModalCtrl.isSet(2)\">"+
    "                  <div class=\"row account-col\">"+
    "                    <div class=\"col-md-3\">"+
    "                      <div class=\"form-group\">"+
    "                        <p class=\"font-weight-bold\">Configurações jurídicas</p>"+
    "                        <p class=\"font-weight-normal\">Nesta seção você pode editar as informações pertinentes a empresa dos parceiros.</p>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"col-md-9\">"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Razão Social</label>"+
    "                          <input type=\"text\" name=\"companyName\" ng-model=\"partnerFormModalCtrl.inputs.companyName\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PartnerFormModal.companyName.$invalid && PartnerFormModal.companyName.$dirty}\" ui-common-name>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Nome Fantasia</label>"+
    "                          <input type=\"text\" name=\"tradingName\" ng-model=\"partnerFormModalCtrl.inputs.tradingName\" class=\"form-control\" placeholder=\"Digite o nome fantasia\" ng-class=\"{'has-error': PartnerFormModal.tradingName.$invalid && PartnerFormModal.tradingName.$dirty}\" ui-common-name>"+
    "                        </div>"+
    "                        <div ng-if=\"partnerFormModalCtrl.inputs.taxDocument.documentType === 'cnpj'\" calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">CNPJ</label>"+
    "                          <input type=\"text\" name=\"cnpj\" ng-model=\"partnerFormModalCtrl.inputs.taxDocument.documentNumber\" class=\"form-control\" placeholder=\"Digite o CNPJ\" ng-class=\"{'has-error': PartnerFormModal.cnpj.$invalid && PartnerFormModal.cnpj.$dirty}\" ui-br-cnpj-mask>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.cnpj.$dirty && PartnerFormModal.cnpj.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.cnpj.$error.cnpj\" class=\"form-text text-muted text-danger\">Digite um CNPJ válido.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Email</label>"+
    "                          <input type=\"email\" name=\"contactEmail\" ng-model=\"partnerFormModalCtrl.inputs.contact.email\" class=\"form-control\" placeholder=\"email@exemplo.com.br\" ng-class=\"{'has-error': PartnerFormModal.contactEmail.$invalid && PartnerFormModal.contactEmail.$dirty}\" ui-email=\"no-registered\">"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.contactEmail.$dirty && PartnerFormModal.contactEmail.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.contactEmail.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.contactEmail.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Telefone</label>"+
    "                          <input type=\"tel\" name=\"contactPhoneNumber\" ng-model=\"partnerFormModalCtrl.inputs.contact.phoneNumber2\" class=\"form-control\" placeholder=\"Digite um número de telefone\" ng-class=\"{'has-error': PartnerFormModal.contactPhoneNumber.$invalid && PartnerFormModal.contactPhoneNumber.$dirty}\" ui-br-phone-number>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.contactPhoneNumber.$dirty && PartnerFormModal.contactPhoneNumber.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.contactPhoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.contactPhoneNumber.$error.phoneNumber\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>"+
    "                          <input type=\"tel\" name=\"contactCellphone\" ng-model=\"partnerFormModalCtrl.inputs.contact.phoneNumber1\" class=\"form-control\" placeholder=\"Digite um número de celular\" ng-class=\"{'has-error': PartnerFormModal.contactCellphone.$invalid && PartnerFormModal.contactCellphone.$dirty}\" ui-br-cellphone>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.contactCellphone.$dirty && PartnerFormModal.contactCellphone.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.contactCellphone.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.contactCellphone.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Website</label>"+
    "                          <input type=\"url\" name=\"contactWebsite\" ng-model=\"partnerFormModalCtrl.inputs.contact.website\" class=\"form-control\" placeholder=\"Digite um website\">"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Facebook</label>"+
    "                          <input type=\"url\" name=\"facebook\" ng-model=\"partnerFormModalCtrl.inputs.contact.socialMedia[0]\" class=\"form-control\" placeholder=\"Digite o Facebook\">"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Instagram</label>"+
    "                          <input type=\"url\" name=\"instagram\" ng-model=\"partnerFormModalCtrl.inputs.contact.socialMedia[1]\" class=\"form-control\" placeholder=\"Digite o Instagram\">"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Twitter</label>"+
    "                          <input type=\"url\" name=\"twitter\" ng-model=\"partnerFormModalCtrl.inputs.contact.socialMedia[2]\" class=\"form-control\" placeholder=\"Digite o Twitter\">"+
    "                        </div>"+
    "                    </div>"+
    "                  </div>"+
    "                </div>"+
    "                <div ng-show=\"partnerFormModalCtrl.isSet(3)\">"+
    "                  <div class=\"row account-col\">"+
    "                    <div class=\"col-md-3\">"+
    "                      <div class=\"form-group\">"+
    "                        <p class=\"font-weight-bold\">Localização</p>"+
    "                        <p class=\"font-weight-normal\">Nesta seção você pode editar as informações de endereço do parceiro.</p>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"col-md-9\">"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">CEP</label>"+
    "                          <input type=\"text\" name=\"cep\" ng-model=\"partnerFormModalCtrl.inputs.address.cep\" class=\"form-control\" placeholder=\"Digite o CEP\" ng-class=\"{'has-error': PartnerFormModal.cep.$invalid && PartnerFormModal.cep.$dirty}\" ui-cep>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.cep.$dirty && PartnerFormModal.cep.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.cep.$error.cep\" class=\"form-text text-muted text-danger\">Digite um CEP válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.cep.$error.cepExists\" class=\"form-text text-muted text-danger\">O CEP digitado não foi encontrado.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Logradouro</label>"+
    "                          <input type=\"text\" name=\"addressLine1\" ng-model=\"partnerFormModalCtrl.inputs.address.addressLine1\" class=\"form-control\" placeholder=\"Digite o logradouro\" ui-common-name>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Complemento</label>"+
    "                          <input type=\"text\" name=\"addressLine2\" ng-model=\"partnerFormModalCtrl.inputs.address.addressLine2\" class=\"form-control\" placeholder=\"Digite o complemento\" ui-common-name>"+
    "                        </div>"+
    "                        <div calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Número</label>"+
    "                          <input type=\"text\" name=\"streetNumber\" ng-model=\"partnerFormModalCtrl.inputs.address.streetNumber\" class=\"form-control\" placeholder=\"Digite um número de celular\" ui-street-number>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Bairro</label>"+
    "                          <input type=\"text\" name=\"area\" ng-model=\"partnerFormModalCtrl.inputs.address.area\" class=\"form-control\" placeholder=\"Digite o nome do Bairro\" ui-common-name>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Cidade</label>"+
    "                          <input type=\"text\" name=\"city\" ng-model=\"partnerFormModalCtrl.inputs.address.city\" class=\"form-control\" placeholder=\"Digite a Cidade\" ui-common-name>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Estado</label>"+
    "                          <input type=\"text\" name=\"uf\" ng-model=\"partnerFormModalCtrl.inputs.address.uf\" class=\"form-control\" placeholder=\"Digite o Estado\" ui-common-name>"+
    "                        </div>"+
    "                    </div>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"modal-footer\">"+
    "                  <button type=\"submit\" ng-disabled=\"PartnerFormModal.$invalid\" class=\"btn btn-primary\">{{partnerFormModalCtrl.label}}</button>"+
    "                  <button type=\"button\" ng-click=\"partnerFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                </div>"+
    "              </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/plan-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/plan-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{planFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"planFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"planFormModalCtrl.close(true)\" name=\"PlanFormModal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Plano</label>"+
    "                      <input type=\"text\" name=\"name\" ng-model=\"planFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PlanFormModal.name.$invalid && PlanFormModal.name.$dirty}\" verify-plans required>"+
    "                      <div class=\"error-container\" ng-show=\"PlanFormModal.name.$dirty && PlanFormModal.name.$invalid\">"+
    "                        <small ng-show=\"PlanFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                        <small ng-show=\"PlanFormModal.name.$error.planExists\" class=\"form-text text-muted text-danger\">Este nome já foi usado em outra categoria.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Descrição</label>"+
    "                      <textarea ng-model=\"planFormModalCtrl.inputs.desc\" class=\"form-control\" id=\"exampleTextarea\" rows=\"4\" placeholder=\"Digite uma descrição para o plano\" ng-class=\"{'has-error': PlanFormModal.name.$invalid && PlanFormModal.name.$dirty}\" required></textarea>"+
    "                      <div class=\"error-container\" ng-show=\"PlanFormModal.name.$dirty && PlanFormModal.name.$invalid\">"+
    "                        <small ng-show=\"PlanFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" ng-disabled=\"PlanFormModal.$invalid\" class=\"btn btn-primary\">{{planFormModalCtrl.label}}</button>"+
    "                        <button type=\"button\" ng-click=\"planFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);
angular.module("views/modals/subcategory-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/subcategory-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{subcategoryFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"subcategoryFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"subcategoryFormModalCtrl.close(true)\" name=\"SubcategoryFormModal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Subcategoria</label>"+
    "                      <input type=\"text\" name=\"name\" ng-model=\"subcategoryFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': SubcategoryFormModal.name.$invalid && SubcategoryFormModal.name.$dirty}\" verify-subcategory required>"+
    "                      <div class=\"error-container\" ng-show=\"SubcategoryFormModal.name.$dirty && SubcategoryFormModal.name.$invalid\">"+
    "                        <small ng-show=\"SubcategoryFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                        <small ng-show=\"SubcategoryFormModal.name.$error.subcategoryExists\" class=\"form-text text-muted text-danger\">Este nome já foi usado em outra subcategoria.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Selecione a Categoria</label>"+
    "                      <select style=\"display: block;\" name=\"category\" class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"subcategoryFormModalCtrl.inputs.category\" ng-options=\"category.title as category.title for category in subcategoryFormModalCtrl.categories\" ng-selected=\"{{category.title == subcategoryFormModalCtrl.selectedCategory}}\" ng-class=\"{'has-error': SubcategoryFormModal.category.$invalid && SubcategoryFormModal.category.$dirty}\" verify-select-category ng-required=\"true\"></select>"+
    "                      <div class=\"error-container\" ng-show=\"SubcategoryFormModal.category.$dirty && SubcategoryFormModal.category.$invalid\">"+
    "                        <small ng-show=\"SubcategoryFormModal.category.$error.required\" class=\"form-text text-muted text-danger\">Selecionar uma categoria é obrigatório.</small>"+
    "                        <small ng-show=\"SubcategoryFormModal.category.$error.selecOtherCategory\" class=\"form-text text-muted text-danger\">Selecione uma categoria válida.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" ng-disabled=\"SubcategoryFormModal.$invalid\" class=\"btn btn-primary\">{{subcategoryFormModalCtrl.label}}</button>"+
    "                        <button type=\"button\" ng-click=\"subcategoryFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);
angular.module("views/offers/offers.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/offers.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-header\">"+
    "        Tabela Gerencial de Ofertas"+
    "      </div>"+
    "      <div class=\"card-block \">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <form class=\"form-inline\">"+
    "              <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                <input ng-model=\"offersCtrl.key\" ng-change=\"offersCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "              </div>"+
    "              <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"offersCtrl.selectedPredicate\" ng-change=\"offersCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in offersCtrl.predicates\" ng-selected=\"{{predicate.label == offersCtrl.selectedPredicate}}\"></select>"+
    "              <button ng-click=\"offersCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "            </form>"+
    "          </div>"+
    "        </div>"+
    ""+
    "        <table ng-if=\"offersCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"offersCtrl.filteredList\" at-config=\"offersCtrl.config\">"+
    "          <thead></thead>"+
    "          <tbody class=\"col-md-12\">"+
    "          <tr ng-repeat=\"item in offersCtrl.filteredList\">"+
    "            <td class=\"align-middle\" at-title=\"Oferta\" at-initial-sorting=\"asc\" at-sortable at-attribute=\"title\">{{item.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Parceiro\" at-sortable at-attribute=\"partner.companyName\">{{item.partner.companyName}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Duração da Oferta\" at-sortable at-attribute=\"duration.expireDate\">{{item.duration.expireDate | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"approval.status\">{{item.approval.status | status}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Ação\">"+
    "              <button ng-click=\"offersCtrl.view(item._id)\" class=\"btn btn-primary btn-smn\"><i class=\"material-icons\">search</i></button>"+
    "              <button ng-click=\"offersCtrl.active(item._id,item.title,item.approval.status)\" class=\"btn btn-primary btn-smn\">"+
    "                <i ng-if=\"item.approval.status=='approved' || item.approval.status=='approv'\" class=\"material-icons\">check_circle</i>"+
    "                <i ng-if=\"item.approval.status=='reproved' || item.approval.status=='reprov' || item.approval.status=='pending' || item.approval.status=='pend'\" class=\"material-icons\">radio_button_unchecked</i>"+
    "              </button>"+
    "              <button ng-hide=\"true\" class=\"btn btn-danger btn-smn\"><i class=\"material-icons\">delete_forever</i></button>"+
    "            </td>"+
    "          </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <table ng-if=\"offersCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "          <thead>"+
    "            <tr>"+
    "              <th>Oferta <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Parceiro <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Duração da Oferta <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Ação </th>"+
    "            </tr>"+
    "          </thead>"+
    "          <tbody>"+
    "            <tr>"+
    "              <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "            </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <div ng-if=\"offersCtrl.showTable == true\" class=\"row controler-table\">"+
    "          <div class=\"col-md-6\">"+
    "            <div class=\"form-group\">"+
    "              <label>Ver </label>"+
    "              <select class=\"pagination-table custom-select\" ng-init=\"offersCtrl.config.itemsPerPage = '10'\" ng-model=\"offersCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                <option value=\"5\">5</option>"+
    "                <option value=\"10\">10</option>"+
    "                <option value=\"20\">20</option>"+
    "                <option value=\"50\">50</option>"+
    "              </select>"+
    "              <label>itens</label>"+
    "            </div>"+
    "          </div>"+
    "          <div class=\"col-md-6\">"+
    "            <at-pagination at-list=\"offersCtrl.filteredList\" at-config=\"offersCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/partials/navbar.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/navbar.html",
    "<nav ng-if=\"navCtrl.logged==true\" class=\"navbar navbar-toggleable-sm bg-white\">"+
    "    <button sidebar-toogler class=\"navbar-toggler\" type=\"button\">"+
    "      &#9776;"+
    "    </button>"+
    "    <div class=\"navbar-collapse collapse\" id=\"navbar2\">"+
    "        <ul class=\"navbar-nav ml-auto\">"+
    "            <li ng-hide=\"true\" class=\"nav-item dropdown \">"+
    "                <a class=\"nav-link dropdown-toggle\" href=\"#\" target=\"_self\" data-toggle=\"dropdown\""+
    "                   aria-haspopup=\"true\" aria-expanded=\"false\">"+
    "                                <span><i class=\"material-icons navbar-icons\">notifications</i>"+
    "                                <span class=\"badge badge-danger\">4</span></span>"+
    "                </a>"+
    "                <div class=\"dropdown-menu notif-list dropdown-menu-right dropdownresp   \""+
    "                     aria-labelledby=\"navbarDropdownMenuLink\">"+
    "                    <div class=\"drop-title\">"+
    "                        <small>Notificações</small>"+
    "                    </div>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span class=\"message\">"+
    "                                  Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span class=\"message\">"+
    "                                  Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span class=\"message\">"+
    "                                  Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                </span>"+
    "                    </a>"+
    "                    <div class=\"drop-footer text-center\">"+
    "                        <a href=\"dropdown-item\" href=\"#\">"+
    "                            <small>Show all</small>"+
    "                        </a></div>"+
    "                </div>"+
    "            </li>"+
    "            <li ng-hide=\"true\" class=\"nav-item dropdown\">"+
    "                <a class=\"nav-link dropdown-toggle\" href=\"#\" target=\"_self\" data-toggle=\"dropdown\""+
    "                   aria-haspopup=\"true\" aria-expanded=\"false\">"+
    "                    <span><i class=\"material-icons navbar-icons\">mail</i></span>"+
    "                    <span class=\"badge badge-danger\">2</span></span>"+
    "                </a>"+
    "                <div class=\"dropdown-menu msg-list dropdown-menu-right\""+
    "                     aria-labelledby=\"navbarDropdownMenuLink\">"+
    "                    <div class=\"drop-title\">"+
    "                        <small>Mensagens</small>"+
    "                    </div>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span>"+
    "                                    <span>John Smith</span>"+
    "                                    <span class=\"time\">3 mins ago</span>"+
    "                                  </span>"+
    "                        <span class=\"message\">"+
    "                                    Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                  </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span>"+
    "                                    <span>John Smith</span>"+
    "                                    <span class=\"time\">3 mins ago</span>"+
    "                                  </span>"+
    "                        <span class=\"message\">"+
    "                                    Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                  </span>"+
    "                    </a>"+
    "                    <a class=\"dropdown-item\" href=\"#\">"+
    "                        <span class=\"image\"><img src=\"app/assets/img/icons/user_100_100.jpeg\" alt=\"Profile Image\"></span>"+
    "                        <span>"+
    "                                    <span>John Smith</span>"+
    "                                    <span class=\"time\">3 mins ago</span>"+
    "                                  </span>"+
    "                        <span class=\"message\">"+
    "                                    Film festivals used to be do-or-die moments for movie makers. They were where..."+
    "                                  </span>"+
    "                    </a>"+
    "                    <div class=\"drop-footer text-center\">"+
    "                        <a href=\"dropdown-item\" href=\"#\">"+
    "                            <small>Show all</small>"+
    "                        </a></div>"+
    "                </div>"+
    "            </li>"+
    "            <li class=\"nav-item dropdown\">"+
    "              <menu-dropdown></menu-dropdown>"+
    "            </li>"+
    "        </ul>"+
    "    </div>"+
    "</nav>"+
    "");
}]);
angular.module("views/partnes/partnes.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/partnes.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"row\">"+
    "    <div class=\"col-md-12\">"+
    "      <div class=\"card\">"+
    "        <div class=\"card-header\">"+
    "          Tabela Gerencial de Parceiros"+
    "        </div>"+
    "        <div class=\"card-block \">"+
    "          <div class=\"row\">"+
    "            <div class=\"col-md-12\">"+
    "              <form class=\"form-inline\">"+
    "                <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                  <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                  <input ng-model=\"partnesCtrl.key\" ng-change=\"partnesCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "                </div>"+
    "                <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"partnesCtrl.selectedPredicate\" ng-change=\"partnesCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in partnesCtrl.predicates\" ng-selected=\"{{predicate.label == partnesCtrl.selectedPredicate}}\"></select>"+
    "                <button ng-click=\"partnesCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              </form>"+
    "            </div>"+
    "          </div>"+
    ""+
    "          <table ng-if=\"partnesCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"partnesCtrl.filteredList\" at-config=\"partnesCtrl.config\">"+
    "            <thead></thead>"+
    "            <tbody class=\"col-md-12\">"+
    "            <tr ng-repeat=\"item in partnesCtrl.filteredList\">"+
    "              <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-attribute=\"name\" at-sortable>{{item.name}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Email\" at-sortable at-attribute=\"email\">{{item.email}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.isActive | status}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Ação\">"+
    "                <button ng-click=\"partnesCtrl.edit(item._id)\" class=\"btn btn-info btn-smn\"><i class=\"material-icons\">mode_edit</i></button>"+
    "                <button ng-click=\"partnesCtrl.active(item._id,item.email,item.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                  <i ng-if=\"item.isActive\" class=\"material-icons\">check_circle</i>"+
    "                  <i ng-if=\"!item.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "                </button>"+
    "                <button ng-hide=\"true\" class=\"btn btn-danger btn-smn\"><i class=\"material-icons\">delete_forever</i></button>"+
    "              </td>"+
    "            </tr>"+
    "            </tbody>"+
    "          </table>"+
    ""+
    "          <table ng-if=\"partnesCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "            <thead>"+
    "              <tr>"+
    "                <th>Nome <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "                <th>Email <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "                <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "                <th>Ação </th>"+
    "              </tr>"+
    "            </thead>"+
    "            <tbody>"+
    "              <tr>"+
    "                <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "              </tr>"+
    "            </tbody>"+
    "          </table>"+
    ""+
    "          <div ng-if=\"partnesCtrl.showTable == true\" class=\"row controler-table\">"+
    "            <div class=\"col-md-3\">"+
    "              <div class=\"form-group\">"+
    "                <label>Ver </label>"+
    "                <select class=\"pagination-table custom-select\" ng-init=\"partnesCtrl.config.itemsPerPage = '10'\" ng-model=\"partnesCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                  <option value=\"5\">5</option>"+
    "                  <option value=\"10\">10</option>"+
    "                  <option value=\"20\">20</option>"+
    "                  <option value=\"50\">50</option>"+
    "                </select>"+
    "                <label>itens</label>"+
    "              </div>"+
    "            </div>"+
    "            <div  ng-if=\"partnesCtrl.showTable == true\" class=\"col-md-9\">"+
    "              <at-pagination at-list=\"partnesCtrl.filteredList\" at-config=\"partnesCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "            </div>"+
    "          </div>"+
    ""+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/plans/plans.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/plans.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-header\">"+
    "        Tabela Gerencial de Planos"+
    "      </div>"+
    "      <div class=\"card-block \">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <form class=\"form-inline\">"+
    "              <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                <input ng-model=\"plansCtrl.key\" ng-change=\"plansCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "              </div>"+
    "              <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"plansCtrl.selectedPredicate\" ng-change=\"plansCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in plansCtrl.predicates\" ng-selected=\"{{predicate.label == plansCtrl.selectedPredicate}}\"></select>"+
    "              <button ng-click=\"plansCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              <button ng-click=\"plansCtrl.create()\" type=\"button\" class=\"btn btn-primary btn-margin\">Novo</button>"+
    "            </form>"+
    "          </div>"+
    "        </div>"+
    ""+
    "        <table ng-if=\"plansCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"plansCtrl.filteredList\" at-config=\"plansCtrl.config\">"+
    "          <thead></thead>"+
    "          <tbody class=\"col-md-12\">"+
    "          <tr ng-repeat=\"item in plansCtrl.filteredList track by $index\">"+
    "            <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-sortable at-attribute=\"title\">{{item.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.isActive | status}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Data de criação\" at-sortable at-attribute=\"createdAt\">{{item.createdAt | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Ação\">"+
    "              <button ng-click=\"plansCtrl.edit(item._id,item)\" class=\"btn btn-info btn-smn\"><i class=\"material-icons\">mode_edit</i></button>"+
    "              <button ng-click=\"plansCtrl.active(item._id,item.title,item.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                <i ng-if=\"item.isActive\" class=\"material-icons\">check_circle</i>"+
    "                <i ng-if=\"!item.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "              </button>"+
    "            </td>"+
    "          </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <table ng-if=\"plansCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "          <thead>"+
    "            <tr>"+
    "              <th>Nome <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Data de criação <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Ação </th>"+
    "            </tr>"+
    "          </thead>"+
    "          <tbody>"+
    "            <tr>"+
    "              <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "            </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <div ng-if=\"plansCtrl.showTable == true\" class=\"row controler-table\">"+
    "          <div class=\"col-md-3\">"+
    "            <div class=\"form-group\">"+
    "              <label>Ver </label>"+
    "              <select class=\"pagination-table custom-select\" ng-init=\"plansCtrl.config.itemsPerPage = '10'\" ng-model=\"plansCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                <option value=\"5\">5</option>"+
    "                <option value=\"10\">10</option>"+
    "                <option value=\"20\">20</option>"+
    "                <option value=\"50\">50</option>"+
    "              </select>"+
    "              <label>itens</label>"+
    "            </div>"+
    "          </div>"+
    "          <div ng-if=\"plansCtrl.showTable == true\" class=\"col-md-9\">"+
    "            <at-pagination at-list=\"plansCtrl.filteredList\" at-config=\"plansCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "          </div>"+
    "        </div>"+
    ""+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/profile/profile.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/profile.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "      <div class=\"card\">"+
    "          <div class=\"card-header\">"+
    "              Profile"+
    "          </div>"+
    "          <div class=\"card-block\">"+
    "              <h1>Profile Page</h1>"+
    "          </div>"+
    "      </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/profile/settings.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/settings.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-block\">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <ul class=\"nav nav-tabs nav-justified\">"+
    "              <li ng-class=\"{ active: settingsCtrl.isSet(1) }\" class=\"nav-item\">"+
    "                <a ng-click=\"settingsCtrl.setTab(1)\" class=\"nav-link\" href>Perfil</a>"+
    "              </li>"+
    "              <li ng-class=\"{ active: settingsCtrl.isSet(2) }\" class=\"nav-item\">"+
    "                <a ng-click=\"settingsCtrl.setTab(2)\" class=\"nav-link\" href>Senha</a>"+
    "              </li>"+
    "            </ul>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"settingsCtrl.isSet(1)\">"+
    "          <form role=\"form\" name=\"UpdateProfileForm\" ng-submit=\"settingsCtrl.updateProfile()\" novalidate>"+
    "            <div ng-show=\"settingsCtrl.alertMessage.show\" ng-class=\"'alert-' + (settingsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">"+
    "              <button ng-click=\"settingsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">"+
    "                <span aria-hidden=\"true\">&times;</span>"+
    "              </button>"+
    "              <strong> {{settingsCtrl.alertMessage.message}}"+
    "            </div>"+
    "            <div class=\"row account-col\">"+
    "              <div class=\"col-md-3\">"+
    "                <div class=\"form-group\">"+
    "                  <p class=\"font-weight-bold\">Imagem de perfil</p>"+
    "                  <p class=\"font-weight-normal\">Você pode alterar sua imagem de perfil aqui.</p>"+
    "                </div>"+
    "              </div>"+
    "              <div class=\"col-md-3 img-perfil\">"+
    "                <img ngf-thumbnail=\"settingsCtrl.pictures[0].url || '//placehold.it/160'\" width=\"160\" height=\"160\" class=\"rounded-circle\" />"+
    "              </div>"+
    "              <div class=\"col-md-3\">"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"subject\">Imagem</label>"+
    "                </div>"+
    "                <input ng-if=\"settingsCtrl.pictures\" id=\"uploadPicture\" type=\"button\" class=\"btn\" value=\"{{settingsCtrl.btn.name}}\" name=\"picture\" ngf-select=\"settingsCtrl.setInBuffer($files)\" ngf-select-disabled=\"settingsCtrl.btn.select\" ngf-accept=\"'image/*'\" ng-click=\"settingsCtrl.remove()\" ng-model=\"settingsCtrl.inputs.picture\">"+
    "              </div>"+
    "            </div>"+
    "            <div class=\"row account-col\">"+
    "              <div class=\"col-md-3\">"+
    "                <div class=\"form-group\">"+
    "                  <p class=\"font-weight-bold\">Configurações principais</p>"+
    "                  <p class=\"font-weight-normal\">Estas informações irão aparecer no seu perfil.</p>"+
    "                </div>"+
    "              </div>"+
    "              <div class=\"col-md-8\">"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"subject\">Seu nome</label>"+
    "                  <input ng-disabled=\"true\" type=\"text\" name=\"name\" ng-model=\"settingsCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite seu nome\" ng-class=\"{'has-error': UpdateProfileForm.name.$invalid && UpdateProfileForm.name.$dirty}\" ui-br-name required>"+
    "                  <div class=\"error-container\" ng-show=\"UpdateProfileForm.name.$dirty && UpdateProfileForm.name.$invalid\">"+
    "                    <small ng-show=\"UpdateProfileForm.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                    <small ng-show=\"UpdateProfileForm.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Endereço de email</label>"+
    "                  <input  ng-disabled=\"true\" type=\"email\" name=\"email\" ng-model=\"settingsCtrl.inputs.email\" class=\"form-control\" placeholder=\"email@examplo.com.br\" ng-class=\"{'has-error': UpdateProfileForm.email.$invalid && UpdateProfileForm.email.$dirty}\" ui-email=\"logged\" required>"+
    "                  <small id=\"emailHelp\" class=\"form-text text-muted\">Nós nunca compartilharemos seu email com ninguém.</small>"+
    "                  <div class=\"error-container\" ng-show=\"UpdateProfileForm.email.$dirty && UpdateProfileForm.email.$invalid\">"+
    "                    <small ng-show=\"UpdateProfileForm.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>"+
    "                    <small ng-show=\"UpdateProfileForm.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "                    <small ng-show=\"UpdateProfileForm.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <button type=\"submit\" ng-disabled=\"UpdateProfileForm.$invalid\" class=\"btn btn-primary\">"+
    "                  <div ng-show=\"settingsCtrl.start\" class=\"loader loader-btn\">"+
    "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "                      <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "                    </svg>"+
    "                  </div>"+
    "                  <span ng-show=\"!settingsCtrl.start\">Atualizar</span>"+
    "                </button>"+
    "              </div>"+
    "            </div>"+
    "          </form>"+
    "        </div>"+
    ""+
    "        <div ng-show=\"settingsCtrl.isSet(2)\">"+
    "          <div class=\"row account-col\">"+
    "            <div class=\"col-md-3\">"+
    "              <div class=\"form-group\">"+
    "                <p class=\"font-weight-bold\">Senha</p>"+
    "                <p class=\"font-weight-normal\">Após uma atualização de senha bem-sucedida, você será redirecionado para a página de login onde poderá fazer login com sua nova senha.</p>"+
    "              </div>"+
    "            </div>"+
    "            <div class=\"col-md-8\">"+
    "              <form role=\"form\" name=\"UpdatePassForm\" ng-submit=\"settingsCtrl.updatePassword()\" novalidate>"+
    "                <div ng-show=\"settingsCtrl.alertMessage.show\" ng-class=\"'alert-' + (settingsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">"+
    "                  <button ng-click=\"settingsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">"+
    "                    <span aria-hidden=\"true\">&times;</span>"+
    "                  </button>"+
    "                  <strong> {{settingsCtrl.alertMessage.message}}"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Senha atual</label>"+
    "                  <input ng-model=\"settingsCtrl.account.currentPassword\" type=\"password\" name=\"currentPassword\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.currentPassword.$invalid && UpdatePassForm.currentPassword.$dirty}\" aria-describedby=\"passwordHelp\">"+
    "                  <small id=\"passwordHelp\" class=\"form-text text-muted\">Você deve fornecer sua senha atual para alterá-la.</small>"+
    "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.currentPassword.$dirty && UpdatePassForm.currentPassword.$invalid\">"+
    "                    <small ng-show=\"UpdatePassForm.currentPassword.$error.required\" class=\"form-text text-muted text-danger\">É obrigatório digitar a senha atual para modificar a senha.</small>"+
    "                    <small ng-show=\"UpdatePassForm.currentPassword.$error.currentPassword\" class=\"form-text text-muted text-danger\">A senha digitada não corresponde a senha atual.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Nova senha</label>"+
    "                  <input ng-model=\"settingsCtrl.account.newPassword\" type=\"password\" name=\"newPassword\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.newPassword.$invalid && UpdatePassForm.newPassword.$dirty}\" aria-describedby=\"passwordHelp\" ui-password match=\"settingsCtrl.account.currentPassword\" not-match=\"true\" required>"+
    "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.newPassword.$dirty && UpdatePassForm.newPassword.$invalid\">"+
    "                    <small ng-show=\"UpdatePassForm.newPassword.$error.required\" class=\"form-text text-muted text-danger\">Este campo é obrigatório.</small>"+
    "                    <small ng-show=\"UpdatePassForm.newPassword.$error.weakPassword\" class=\"form-text text-muted text-danger\">A senha digitada é muito fraca.</small>"+
    "                    <small ng-show=\"UpdatePassForm.newPassword.$error.match\" class=\"form-text text-muted text-danger\">A nova senha não pode ser igual a senha atual.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Confirmar senha</label>"+
    "                  <input ng-model=\"settingsCtrl.account.newPasswordConf\" type=\"password\" name=\"newPasswordConf\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.newPasswordConf.$invalid && UpdatePassForm.newPasswordConf.$dirty}\" aria-describedby=\"newPasswordHelp\" match=\"settingsCtrl.account.newPassword\" required>"+
    "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.newPasswordConf.$dirty && UpdatePassForm.newPasswordConf.$invalid\">"+
    "                    <small ng-show=\"UpdatePassForm.newPasswordConf.$error.required\" class=\"form-text text-muted text-danger\">Este campo é obrigatório.</small>"+
    "                    <small ng-show=\"UpdatePassForm.newPasswordConf.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <button ng-disabled=\"UpdatePassForm.$invalid\" type=\"submit\" class=\"btn btn-primary\">"+
    "                  <div ng-show=\"settingsCtrl.start\" class=\"loader loader-btn\">"+
    "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "                      <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "                    </svg>"+
    "                  </div>"+
    "                  <span ng-show=\"!settingsCtrl.start\">Alterar senha</span>"+
    "                </button>"+
    "              </form>"+
    "            </div>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("directives/strengthPassword/strengthPassword.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/strengthPassword.html",
    "<div class=\"container-fluid clean-margin\">"+
    "  <div class=\"row justify-content-center clean-margin\">"+
    "    <div id=\"worst\" class=\"strength-meter strength-meter-default\"></div>"+
    "    <div id=\"bad\" class=\"strength-meter strength-meter-default\"></div>"+
    "    <div id=\"weak\" class=\"strength-meter strength-meter-default\"></div>"+
    "    <div id=\"good\" class=\"strength-meter strength-meter-default\"></div>"+
    "    <div id=\"strong\" class=\"strength-meter strength-meter-default\"></div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
angular.module("views/subcategories/subcategories.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/subcategories.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-header\">"+
    "        Tabela Gerencial de Subcategorias"+
    "      </div>"+
    "      <div class=\"card-block\">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <form class=\"form-inline\">"+
    "              <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                <input ng-model=\"subcategoriesCtrl.key\" ng-change=\"subcategoriesCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "              </div>"+
    "              <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"subcategoriesCtrl.selectedPredicate\" ng-change=\"subcategoriesCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in subcategoriesCtrl.predicates\" ng-selected=\"{{predicate.label == subcategoriesCtrl.selectedPredicate}}\"></select>"+
    "              <button ng-click=\"subcategoriesCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              <button ng-click=\"subcategoriesCtrl.create()\" type=\"button\" class=\"btn btn-primary btn-margin\">Novo</button>"+
    "            </form>"+
    "          </div>"+
    "        </div>"+
    ""+
    "        <table ng-if=\"subcategoriesCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"subcategoriesCtrl.filteredList\" at-config=\"subcategoriesCtrl.config\">"+
    "          <thead></thead>"+
    "          <tbody class=\"col-md-12\">"+
    "          <tr ng-repeat=\"item in subcategoriesCtrl.filteredList\">"+
    "            <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-sortable at-attribute=\"title\">{{item.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Categoria\" at-sortable at-attribute=\"category\">{{item.category.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.isActive | status}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Data de criação\" at-sortable at-attribute=\"createdAt\">{{item.createdAt | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Ação\">"+
    "              <button ng-click=\"subcategoriesCtrl.edit(item._id,item.category,item.title)\" class=\"btn btn-info btn-smn\"><i class=\"material-icons\">mode_edit</i></button>"+
    "              <button ng-click=\"subcategoriesCtrl.active(item._id,item.category,item.title,item.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                <i ng-if=\"item.isActive\" class=\"material-icons\">check_circle</i>"+
    "                <i ng-if=\"!item.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "              </button>"+
    "            </td>"+
    "          </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <table ng-if=\"subcategoriesCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "          <thead>"+
    "            <tr>"+
    "              <th>Nome <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Categoria <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Data de criação <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Ação </th>"+
    "            </tr>"+
    "          </thead>"+
    "          <tbody>"+
    "            <tr>"+
    "              <td colspan=\"6\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "            </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <div ng-if=\"subcategoriesCtrl.showTable == true\" class=\"row controler-table\">"+
    "          <div class=\"col-md-6\">"+
    "            <div class=\"form-group\">"+
    "              <label>Ver </label>"+
    "              <select class=\"pagination-table custom-select\" ng-init=\"subcategoriesCtrl.config.itemsPerPage = '10'\" ng-model=\"subcategoriesCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                <option value=\"5\">5</option>"+
    "                <option value=\"10\">10</option>"+
    "                <option value=\"20\">20</option>"+
    "                <option value=\"50\">50</option>"+
    "              </select>"+
    "              <label>itens</label>"+
    "            </div>"+
    "          </div>"+
    "          <div ng-if=\"subcategoriesCtrl.showTable == true\" class=\"col-md-6\">"+
    "            <at-pagination at-list=\"subcategoriesCtrl.filteredList\" at-config=\"subcategoriesCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "          </div>"+
    "        </div>"+
    ""+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);
(function(angular, undefined) {
  angular.module("dashboard")

.constant("url_base", "http://localhost:5000")

.constant("CloudinaryConstant", {
	"cloud_name": "eduhcastro",
	"secure": true,
	"upload_preset": "educastro_preset"
})

.constant("offPaths", [
	"/login",
	"/cadastrar",
	"/recuperar"
])

;
})(angular);