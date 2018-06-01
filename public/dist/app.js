'use strict';

/**
 * @ngdoc overview
 * @name dashboard
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */

angular.module('dashboard', ['ngRoute', 'ngStorage', 'chart.js', 'angularModalService', 'angular-table', 'cgNotify', 'alexjoffroy.angular-loaders', 'ngMessages', 'ngAnimate', 'ngSanitize', 'ui.utils.masks', 'idf.br-filters', 'zxcvbn', 'validation.match', 'ngFileUpload', 'angularMoment', 'slickCarousel', 'cloudinary']).config(function ($routeProvider, $locationProvider, $httpProvider, cloudinaryProvider, CloudinaryConstant) {

  // Remove '!' from path
  $locationProvider.hashPrefix('');

  // Allow cross domain requests
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  cloudinaryProvider.set("cloud_name", CloudinaryConstant.cloud_name).set("secure", CloudinaryConstant.secure).set("upload_preset", CloudinaryConstant.upload_preset);

  $routeProvider.when('/', {
    templateUrl: 'app/views/home/home.html',
    controller: 'HomeCtrl as homeCtrl',
    resolve: {
      access: function access(Auth) {
        return Auth.isAuthenticated();
      }
    }
  }).when('/usuarios', {
    templateUrl: 'app/views/users/users.html',
    controller: 'UsersCtrl as usersCtrl',
    resolve: {
      access: function access(Auth) {
        return Auth.isAuthenticated();
      }
    }
  }).when('/perfil', {
    templateUrl: 'app/views/profile/profile.html',
    controller: 'ProfileCtrl as profileCtrl',
    resolve: {
      access: function access(Auth) {
        return Auth.isAuthenticated();
      }
    }
  }).when('/settings', {
    templateUrl: 'app/views/profile/settings.html',
    controller: 'SettingsCtrl as settingsCtrl',
    resolve: {
      access: function access(Auth) {
        return Auth.isAuthenticated();
      }
    }
  }).when('/problemas', {
    templateUrl: 'app/views/report/report.html',
    controller: 'ReportCtrl as reportCtrl',
    resolve: {
      access: function access(Auth) {
        return Auth.isAuthenticated();
      }
    }
  }).when('/login', {
    templateUrl: 'app/views/auth/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'loginCtrl'
  }).when('/cadastrar', {
    templateUrl: 'app/views/auth/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'registerCtrl'
  }).when('/recuperar', {
    templateUrl: 'app/views/auth/forgot.html',
    controller: 'ForgotCtrl',
    controllerAs: 'forgotCtrl'
  }).when('/consultores/:recoveryKey/redefinir-senha/:token', {
    templateUrl: 'app/views/auth/reset.html',
    controller: 'ResetCtrl',
    controllerAs: 'resetCtrl'
  }).when('/activation/:token', {
    templateUrl: 'app/views/auth/activation.html',
    controller: 'ActivationCtrl',
    controllerAs: 'activationCtrl'
  }).otherwise({
    redirectTo: '/'
  });
}).run(function ($rootScope, $location, amMoment) {

  amMoment.changeLocale('pt-br');

  /* Route events */
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    // console.log("Route Start")
  });

  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    // console.log("Route Change Error: " + JSON.stringify(rejection))
    $location.path("/login");
  });

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    // if (typeof previous != 'undefined')
    // console.log("Previous Url: " + previous.originalPath)
    // console.log("Current Url: " + current.originalPath)
  });
});
'use strict';

(function () {
  angular.module('dashboard').directive('atTranslate', function ($compile) {
    return {
      restrict: 'AEC',
      scope: true,
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        angular.forEach(angular.element('.pagination'), function (values, keys, arrays) {
          angular.forEach(angular.element(values.children), function (value, key, array) {
            if (angular.element(value).children().text() === '{{getPaginatorLabels().first}}') {
              angular.element(value).children().text("Início");
            }
            if (angular.element(value).children().text() === '{{getPaginatorLabels().last}}') {
              angular.element(value).children().text("Fim");
            }
          });
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').filter('biLabel', function () {
    return function (string) {
      if (string === 'admins') return 'Operadores';
      if (string === 'customers') return 'Clientes';
      if (string === 'partners') return 'Parceiros';
      if (string === 'services') return 'Serviços';
      if (string === 'categories') return 'Categorias';
      if (string === 'plans') return 'Planos';
      if (string === 'offers') return 'Ofertas';
      if (string === 'clients') return 'Clientes';
      if (string === 'sales') return 'Vendas';
      if (string === 'users') return 'Usuários';
      if (string === 'example1') return 'Exemplo #1';
      if (string === 'example2') return 'Exemplo #2';
      if (string === 'example3') return 'Exemplo #3';
      return string;
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('CardsBiCtrl', ['$scope', 'Bi', function ($scope, Bi) {

    var vm = this;
    vm.start = true;

    $scope.setColor = function (iElement, color) {
      angular.element(iElement).addClass(color);
    };

    $scope.setLabel = function (label) {
      vm.label = label;
    };

    $scope.setIcon = function (icon) {
      vm.icon = icon;
    };

    $scope.setValue = function (value) {
      vm.start = false;
      vm.value = value;
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('cardsBi', function () {
    return {
      restrict: 'AEC',
      scope: {
        biData: '=?',
        biName: '@',
        biIcon: '@',
        biColor: '@'
      },
      templateUrl: 'app/directives/cardsBi/cardsBi.html',
      controller: 'CardsBiCtrl as cardsBiCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        scope.setColor(iElement.children().children()[0], scope.biColor);
        scope.setIcon(scope.biIcon);
        scope.setLabel(scope.biName);
        scope.$watch('biData', function (newVal, oldVal) {
          if (newVal != undefined) scope.setValue(newVal[scope.biName]);
        }, true);
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('CloudinaryCtrl', ['$scope', function ($scope) {

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

    vm.zoom = function (url) {
      var top = angular.element('.modal').scrollTop();
      angular.element('#slick-cloudinary-modal').css({
        'top': top + 'px'
      });
      angular.element('#slick-cloudinary-modal').addClass('active');
      angular.element('.modal').addClass('overflow-h');
      angular.element('#slick-figure-img').attr("src", url.path.replace('/w_340,h_192,c_pad,b_rgb:15b0c7', '/w_1024,h_576,c_pad,b_rgb:15b0c7'));
      angular.element('#slick-figure-title').text(url.title);
      angular.element('#slick-figure-desc').text(url.description);
      if (url.title == null) angular.element('#slick-infobox').css("display", "none");else angular.element('#slick-infobox').css("display", "block");
    };

    vm.close = function () {
      angular.element('#slick-cloudinary-modal').removeClass('active');
      angular.element('.modal').removeClass('overflow-h');
    };

    $scope.setUrl = function (url) {
      if (url) {
        var search = url.search('/w_340,h_192,c_pad,b_rgb:15b0c7');
        if (search > -1) {
          return url;
        } else {
          var pos = url.lastIndexOf("/upload/");
          var res = url.slice(0, pos + 8);
          var posRes = url.slice(pos + 7, url.length);
          res = res + 'w_340,h_192,c_pad,b_rgb:15b0c7';
          return res + posRes;
        }
      } else return "https://dummyimage.com/340x16:9/";
    };

    $scope.show = function (urls) {
      vm.urls = urls;
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('cloudinaryRender', function ($window) {
    return {
      restrict: 'AEC',
      scope: {
        url: '='
      },
      templateUrl: 'app/directives/cloudinary/cloudinary.html',
      controller: 'CloudinaryCtrl as cloudinaryCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var urls = [];
        if (iAttrs.data == 'json') {
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
        } else {
          for (var i = 0; i < scope.url.length; i++) {
            urls.push({
              'path': scope.setUrl(scope.url[i].url),
              'title': scope.url[i].title,
              'description': scope.url[i].desc
            });
          }
        }
        scope.show(urls);
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('CurrentPasswordCtrl', ['$scope', 'Auth', function ($scope, Auth) {

    $scope.checkPassword = function (value, email) {
      return Auth.login(email, value).then(function (res) {
        return res.status == 200 ? true : false;
      }).catch(function (err) {
        return false;
      });
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('currentPassword', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'CurrentPasswordCtrl as currentPasswordCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("currentPassword", true);
          if (value) {
            scope.checkPassword(value, iAttrs.currentEmail).then(function (res) {
              ngModelCtrl.$setValidity('currentPassword', res);
            });
          }
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('LinkSidebarCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.path = function (href) {
      $location.path(href);
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('linkSidebar', function () {
    return {
      restrict: 'AEC',
      priority: 200,
      controller: 'LinkSidebarCtrl as linkSidebarCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click', function () {
          scope.$apply(function () {
            scope.path(iAttrs.href);
          });
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('LinkSidebarCloseCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.dimension = function (width) {
      setTimeout(function () {
        if (width < 767) {
          angular.element('#sidebar').removeClass('sidebar-visible');
          angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
          $scope.$apply();
        }
      }, 1);
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('linkSidebarClose', function () {
    return {
      restrict: 'AEC',
      priority: 100,
      controller: 'LinkSidebarCloseCtrl as linkSidebarCloseCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        scope.dimension(width);

        iElement.bind('click', function () {
          scope.dimension(width);
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('MenuDropdownCtrl', ['$scope', '$window', '$location', 'Auth', 'Profile', 'Socket', function ($scope, $window, $location, Auth, Profile, Socket) {

    var vm = this;

    Socket.on('change profile', function (msg) {
      var formatedImage = formatImage(msg);
      var cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile');
      if (msg != cachedFile) $window.localStorage.setItem('persistentCache:imageNavProfile', formatedImage);
      vm.user.picture = formatedImage;
    });

    Socket.on('login success', function (msg) {
      $scope.display();
    });

    $scope.display = function () {
      Auth.isAuthenticated().then(function (res) {
        vm.user = {
          '_id': res.data._id,
          'name': res.data.account.name,
          'email': res.data.account.email,
          'phoneNumber': res.data.account.phoneNumber,
          'isActive': res.data.account.isActive
        };
        var cachedFile = $window.localStorage.getItem('persistentCache:imageNavProfile');
        if (cachedFile == null || cachedFile === '') {
          Profile.getProfile(res.data._id).then(function (res) {
            if (res.data.profile != null && res.data.profile.profilePicture) {
              var formatedImage = formatImage(res.data.profile.profilePicture);
              $window.localStorage.setItem('persistentCache:imageNavProfile', formatedImage);
              vm.user.picture = formatedImage;
            }
          });
        } else vm.user.picture = cachedFile;
      });
    };

    vm.logout = function () {
      Auth.logout().then(function (res) {
        Socket.emit('logout success', res.data);
        $window.localStorage.setItem('persistentCache:imageNavProfile', '');
        $window.localStorage.setItem('persistentCache:imageProfile', '');
        vm.user.picture = undefined;
        $location.path('/login');
      });
    };

    var formatImage = function formatImage(url) {
      if (url) {
        var search = url.search('/w_40,h_40,c_pad,b_rgb:31000f');
        if (search > -1) {
          return url;
        } else {
          var pos = url.lastIndexOf("/upload/");
          var res = url.slice(0, pos + 8);
          var posRes = url.slice(pos + 7, url.length);
          res = res + 'w_40,h_40,c_pad,b_rgb:31000f';
          return res + posRes;
        }
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('menuDropdown', function () {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuDropdown/menuDropdown.html',
      controller: 'MenuDropdownCtrl as menuDropdownCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        scope.display();
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('MenuNavbarCtrl', ['$scope', 'Socket', 'Auth', '$location', 'offPaths', function ($scope, Socket, Auth, $location, offPaths) {

    var vm = this;

    var path = $location.path();

    if (offPaths.includes($location.path())) vm.logged = false;else Auth.isAuthenticated().then(function (res) {
      vm.logged = true;
    }).catch(function (err) {
      vm.logged = false;
    });

    Socket.on('login success', function (msg) {
      vm.logged = true;
    });

    Socket.on('logout success', function (msg) {
      vm.logged = false;
    });
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('menuNavbar', function () {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuNavbar/menuNavbar.html',
      controller: 'MenuNavbarCtrl as menuNavbarCtrl'
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('MenuSidebarCtrl', [function () {

    var vm = this;

    vm.menuItens = [{
      "icon": "dashboard",
      "label": "Home",
      "href": "/",
      "hasSubmenu": false,
      "submenu": []
    }, {
      "icon": "list",
      "label": "Usuários",
      "href": "/usuarios",
      "hasSubmenu": false,
      "submenu": []
    }, {
      "icon": "shopping_cart",
      "label": "Exemplo #1",
      "href": "",
      "hasSubmenu": true,
      "submenu": [{
        "label": "Pendentes",
        "href": "/exemplo/pendentes"
      }, {
        "label": "Geral",
        "href": "/exemplo"
      }]
    }, {
      "icon": "contacts",
      "label": "Exemplo #2",
      "href": "",
      "hasSubmenu": true,
      "submenu": [{
        "label": "Pendentes",
        "href": "/parceiros/pendentes"
      }, {
        "label": "Geral",
        "href": "/parceiros"
      }]
    }, {
      "icon": "assignment",
      "label": "Exemplo #3",
      "href": "",
      "hasSubmenu": true,
      "submenu": [{
        "label": "Pendentes",
        "href": "/servicos/pendentes"
      }, {
        "label": "Geral",
        "href": "/servicos"
      }]
    }];
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('menuSidebar', ['Socket', 'Auth', '$location', 'offPaths', function (Socket, Auth, $location, offPaths, $timeout) {
    return {
      restrict: 'AEC',
      templateUrl: 'app/directives/menuSidebar/menuSidebar.html',
      controller: 'MenuSidebarCtrl as menuSidebarCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        var width = angular.element(window).width();

        var addSidebar = function addSidebar() {
          angular.element('#sidebar').addClass('sidebar-visible');
          angular.element('#navbarContainer').addClass('layout-sidebar-l3-md-up');
          angular.element('#toggler-button').addClass('toggle');
        };

        var removeSidebar = function removeSidebar() {
          angular.element('#sidebar').removeClass('sidebar-visible');
          angular.element('#navbarContainer').removeClass('layout-sidebar-l3-md-up');
        };

        var toggleSidebar = function toggleSidebar() {
          angular.element('#sidebar').toggleClass('sidebar-visible');
          angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
        };

        if (offPaths.includes($location.path())) removeSidebar();else {
          Auth.isAuthenticated().then(function (res) {
            width >= 767 ? addSidebar() : removeSidebar();
            angular.element('.no-login').removeClass('full-height');
          }).catch(function (err) {
            removeSidebar();
          });
        }

        Socket.on('login success', function (msg) {
          width >= 767 ? addSidebar() : removeSidebar();
          angular.element('.no-login').removeClass('full-height');
        });

        Socket.on('logout success', function (msg) {
          removeSidebar();
          angular.element('.no-login').addClass('full-height');
        });

        angular.element('.layout-content').bind('click', function () {
          if (angular.element('#sidebar').hasClass('sidebar-visible') && width < 767 && angular.element('#toggler-button').hasClass('toggle')) removeSidebar();else {
            if (width < 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height')) addSidebar();else {
              if (width >= 767 && !angular.element('#toggler-button').hasClass('toggle') && !angular.element('.no-login').hasClass('full-height')) {
                angular.element('#toggler-button').addClass('toggle');
                toggleSidebar();
              }
            }
          }
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('sidebarToogler', function () {
    return {
      restrict: 'AEC',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        iElement.bind('click', function () {
          setTimeout(function () {
            angular.element('#navbarContainer').toggleClass('layout-sidebar-l3-md-up');
            angular.element('#sidebar').toggleClass('sidebar-visible');
          }, 1);
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').directive('strengthPassword', function () {
    return {
      restrict: 'AEC',
      scope: {
        strength: '='
      },
      templateUrl: 'app/directives/strengthPassword/strengthPassword.html',
      link: function link(scope, iElement, iAttrs, ctrl) {

        var removeColor = function removeColor(meter) {
          angular.element('#worst').removeClass('strength-meter-' + meter);
          angular.element('#bad').removeClass('strength-meter-' + meter);
          angular.element('#weak').removeClass('strength-meter-' + meter);
          angular.element('#good').removeClass('strength-meter-' + meter);
          angular.element('#strong').removeClass('strength-meter-' + meter);
        };

        var clear = function clear() {
          removeColor('worst');
          removeColor('bad');
          removeColor('weak');
          removeColor('good');
          removeColor('strong');
        };

        scope.$watch('strength', function (value) {

          clear();

          if (value.password) {
            if (value.score == 0) {
              angular.element('#worst').addClass('strength-meter-worst');
            }
            if (value.score == 1) {
              angular.element('#worst').addClass('strength-meter-bad');
              angular.element('#bad').addClass('strength-meter-bad');
            }
            if (value.score == 2) {
              angular.element('#worst').addClass('strength-meter-weak');
              angular.element('#bad').addClass('strength-meter-weak');
              angular.element('#weak').addClass('strength-meter-weak');
            }
            if (value.score == 3) {
              angular.element('#worst').addClass('strength-meter-good');
              angular.element('#bad').addClass('strength-meter-good');
              angular.element('#weak').addClass('strength-meter-good');
              angular.element('#good').addClass('strength-meter-good');
            }
            if (value.score == 4) {
              angular.element('#worst').addClass('strength-meter-strong');
              angular.element('#bad').addClass('strength-meter-strong');
              angular.element('#weak').addClass('strength-meter-strong');
              angular.element('#good').addClass('strength-meter-strong');
              angular.element('#strong').addClass('strength-meter-strong');
            }
          } else clear();
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').directive('submenuSidebar', function () {
    return {
      restrict: 'AEC',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        var clear = function clear() {
          var items = angular.element('.sidebar-menuItem-button');
          angular.forEach(items, function (item) {
            angular.element(item).parent().removeClass('open');
          });
        };
        iElement.bind('click', function () {
          if (!angular.element(iElement).parent().hasClass('open')) clear();
          angular.element(iElement).parent().toggleClass('open');
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('UiBrCellphoneCtrl', ['$scope', 'Verification', function ($scope, Verification) {

    $scope.verifyPhoneNumber = function (value) {
      var phoneNumber = '55' + value.toString().replace(/[^0-9]/g, '');
      return Verification.userVerifyPhoneNumber(phoneNumber).then(function (result) {
        return result;
      });
    };
  }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  angular.module('dashboard').directive('uiBrCellphone', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiBrCellphoneCtrl as uiBrCellphoneCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        var phoneMask8D = {
          countryCode: new StringMask('+00 (00) 0000-0000'), //with country code
          areaCode: new StringMask('(00) 0000-0000'), //with area code
          simple: new StringMask('0000-0000') //without area code
        },
            phoneMask9D = {
          countryCode: new StringMask('+00 (00) 00000-0000'), //with country code
          areaCode: new StringMask('(00) 00000-0000'), //with area code
          simple: new StringMask('00000-0000') //without area code
        },
            phoneMask0800 = {
          countryCode: null, //N/A
          areaCode: null, //N/A
          simple: new StringMask('0000-000-0000') //N/A, so it's "simple"
        };

        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 13);
        };

        var format = function format(cleanValue) {
          var formattedValue = void 0;
          if (cleanValue.indexOf('0800') === 0) {
            formattedValue = phoneMask0800.simple.apply(cleanValue);
          } else if (cleanValue.length < 9) {
            formattedValue = phoneMask8D.simple.apply(cleanValue) || '';
          } else if (cleanValue.length < 10) {
            formattedValue = phoneMask9D.simple.apply(cleanValue);
          } else if (cleanValue.length < 11) {
            formattedValue = phoneMask8D.areaCode.apply(cleanValue);
          } else if (cleanValue.length < 12) {
            formattedValue = phoneMask9D.areaCode.apply(cleanValue);
          } else if (cleanValue.length < 13) {
            formattedValue = phoneMask8D.countryCode.apply(cleanValue);
          } else {
            formattedValue = phoneMask9D.countryCode.apply(cleanValue);
          }
          return formattedValue.trim().replace(/[^0-9]$/, '');
        };

        var getModelValue = function getModelValue(formattedValue, originalModelType) {
          var cleanValue = undefined.clearValue(formattedValue);
          return originalModelType === 'number' ? parseInt(cleanValue) : cleanValue;
        };

        var validations = function validations(value) {
          var valueLength = value && value.toString().length;
          //8- 8D without AC
          //9- 9D without AC
          //10- 8D with AC
          //11- 9D with AC and 0800
          //12- 8D with AC plus CC
          //13- 9D with AC plus CC
          return valueLength >= 10 && valueLength <= 13;
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
            ngModelCtrl.$setValidity('phoneNumberExists', true);
            ngModelCtrl.$setValidity('invalidCellphone', true);
            return value;
          }
          var cleanValue = clearValue(value.toString());
          var formattedValue = format(cleanValue);
          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('invalidCellphone', false);
            ngModelCtrl.$setValidity('phoneNumberExists', true);
          } else {
            ngModelCtrl.$setValidity('invalidCellphone', true);
            scope.verifyPhoneNumber(cleanValue).then(function (res) {
              if (res.status == 422) ngModelCtrl.$setValidity('phoneNumberExists', false);else ngModelCtrl.$setValidity('phoneNumberExists', true);
            }).catch(function (err) {
              if (err.status == 422) ngModelCtrl.$setValidity('phoneNumberExists', false);else ngModelCtrl.$setValidity('phoneNumberExists', true);
            });
          }
          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }
          if (angular.isUndefined(ngModelCtrl.getModelValue)) {
            return cleanValue;
          }
          var actualModelType = _typeof(ngModelCtrl.$modelValue);
          return ngModelCtrl.getModelValue(formattedValue, actualModelType);
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').directive('uiBrName', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        //Disable keyup press of the numbers in input
        var parserName = function parserName(textName) {
          var input = textName.replace(/[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+$]/g, '');
          if (input !== textName) {
            ngModelCtrl.$setViewValue(input);
            ngModelCtrl.$render();
          }
          return String(input);
        };
        ngModelCtrl.$parsers.push(parserName);
        //Capitalize first letter the person names
        scope.$watch('ngModel', function (value) {
          if (value) {
            var textValue = "" + value;
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase();
            });
            var space = scope.ngModel.search(" ");
            if (space == -1) ngModelCtrl.$setValidity("minname", false);else ngModelCtrl.$setValidity("minname", true);
          } else {
            ngModelCtrl.$setValidity("minname", true);
          }
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').service('PostmonService', ['$http', function ($http) {

    return {
      getCep: function getCep(cep) {
        return $http.get('http://api.postmon.com.br/v1/cep/' + cep, { withCredentials: false }).then(function success(response) {
          return response;
        }, function error(response) {
          return response;
        });
      },
      getTrackingData: function getTrackingData(provider, code) {
        return $http.get('http://api.postmon.com.br/v1/rastreio/' + provider + '/' + code, { withCredentials: false }).then(function success(response) {
          return response;
        }, function error(response) {
          return response;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('UiCepCtrl', ['$scope', 'PostmonService', 'Socket', function ($scope, PostmonService, Socket) {

    $scope.getCEP = function (value) {
      return PostmonService.getCep(value).then(function (res) {
        if (res.status == 200) Socket.emit('cep complete', res.data);
        return res;
      }).catch(function (res) {
        return res;
      });
    };
  }]);
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  angular.module('dashboard').directive('uiCep', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiCepCtrl as uiCepCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        var cepMask = new StringMask('00000-000');

        var clearValue = function clearValue(rawValue) {
          return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8);
        };

        var format = function format(cleanValue) {
          return (cepMask.apply(cleanValue) || '').replace(/[^0-9]$/, '');
        };

        var validations = function validations(value) {
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
          if (!validations(cleanValue)) {
            ngModelCtrl.$setValidity('invalidCep', false);
            ngModelCtrl.$setValidity('cepExists', true);
          } else {
            ngModelCtrl.$setValidity('cepExists', true);
            scope.getCEP(cleanValue).then(function (res) {
              if (res.status == 200) ngModelCtrl.$setValidity('cepExists', true);else ngModelCtrl.$setValidity('cepExists', false);
            });
          }
          if (ngModelCtrl.$viewValue !== formattedValue) {
            ngModelCtrl.$setViewValue(formattedValue);
            ngModelCtrl.$render();
          }
          if (angular.isUndefined(ngModelCtrl.getModelValue)) {
            return cleanValue;
          }
          var actualModelType = _typeof(ngModelCtrl.$modelValue);
          return ngModelCtrl.getModelValue(formattedValue, actualModelType);
        });

        ngModelCtrl.$validators['cep'] = function validator(modelValue) {
          return ngModelCtrl.$isEmpty(modelValue) || validations(modelValue);
        };
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').directive('uiCommonName', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        //Capitalize first letter the names
        scope.$watch('ngModel', function (value) {
          if (value) {
            var textValue = value.toString();
            scope.ngModel = textValue.replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase();
            });
          }
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('UiEmailCtrl', ['$scope', 'Verification', 'Auth', 'Account', function ($scope, Verification, Auth, Account) {

    $scope.userVerifyEmail = function (email) {
      return Verification.userVerifyEmail(email).then(function (res) {
        return true;
      }).catch(function (err) {
        return err.status == 422 ? false : true;
      });
    };

    $scope.verifyEmail = function (email) {
      return Auth.isAuthenticated().then(function (res) {
        Account.getAccount(res.data._id).then(function (res) {
          return res.data.email === email ? true : false;
        });
      }).catch(function (err) {
        return $scope.userVerifyEmail(email);
      });
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('uiEmail', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiEmailCtrl as uiEmailCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        scope.$watch('ngModel', function (value) {
          if (value) {
            //exists an input value
            var str = value.toString();
            var res = str.match(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/);
            if (res) {
              //email is match
              ngModelCtrl.$setValidity("emailExists", true);
              ngModelCtrl.$setValidity("invalidEmail", true);
              if (iAttrs.uiEmail) {
                //uiEmail defined .catch((err) => { ngModelCtrl.$setValidity("emailExists", res)  })
                if (iAttrs.uiEmail == 'registered') {
                  //uiEmail equals registered
                  scope.userVerifyEmail(scope.ngModel).then(function (res) {
                    ngModelCtrl.$setValidity("emailExists", res);
                  });
                } else {
                  if (iAttrs.uiEmail == 'no-registered') {
                    //uiEmail equals no-registered
                    verifyEmail = true;
                  } else {
                    if (iAttrs.uiEmail == 'logged') {
                      scope.userVerifyEmail(scope.ngModel).then(function (res) {
                        ngModelCtrl.$setValidity("emailExists", res);
                      });
                    } else {
                      //uiEmail exists and is empty
                      scope.userVerifyEmail(scope.ngModel).then(function (res) {
                        ngModelCtrl.$setValidity("emailExists", res);
                      });
                    }
                  }
                }
              } else //uiEmail no defined
                scope.userVerifyEmail(scope.ngModel).then(function (res) {
                  ngModelCtrl.$setValidity("emailExists", res);
                });
            } else {
              //email no match
              ngModelCtrl.$setValidity("invalidEmail", false);
              ngModelCtrl.$setValidity("emailExists", true);
            }
          } else {
            //no input value
            ngModelCtrl.$setValidity("invalidEmail", true);
            ngModelCtrl.$setValidity("emailExists", true);
          }
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('UiPasswordCtrl', ['$scope', 'Verification', function ($scope, Verification) {

    $scope.checkPassword = function (value) {
      return Verification.verifyPassword(value).then(function (res) {
        return res.data.score > 1 ? true : false;
      });
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').directive('uiPassword', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      controller: 'UiPasswordCtrl as uiPasswordCtrl',
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {
        scope.$watch('ngModel', function (value) {
          ngModelCtrl.$setValidity("weakPassword", true);
          if (value) {
            scope.checkPassword(value).then(function (res) {
              ngModelCtrl.$setValidity('weakPassword', res);
            });
          }
        });
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').directive('uiStreetNumber', function () {
    return {
      restrict: 'AEC',
      require: 'ngModel',
      scope: {
        ngModel: '=ngModel'
      },
      link: function link(scope, iElement, iAttrs, ngModelCtrl) {

        //Input accept numbers-only
        var parserName = function parserName(number) {
          var input = number.replace(/[^0-9]/g, '');
          if (input !== number) {
            ngModelCtrl.$setViewValue(input);
            ngModelCtrl.$render();
          }
          return Number(input);
        };
        ngModelCtrl.$parsers.push(parserName);
      }
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').controller('ActivationCtrl', ['$scope', function ($scope) {

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

    vm.toggle = function (param) {
      if (param === 'show') {
        vm.hidepassword = false;
        vm.show = false;
        vm.hide = true;
      } else {
        vm.hidepassword = true;
        vm.show = true;
        vm.hide = false;
      }
    };

    vm.close = function (code) {
      if (code == 0) vm.activationSuccess = false;else if (code == 1) vm.activationDanger = false;else if (code == 2) vm.errLogin = false;else vm.resend = false;
    };

    vm.submit = function () {
      vm.activationSuccess = false;
      vm.errLogin = true;
    };

    vm.send = function () {
      vm.activationDanger = false;
      vm.resend = true;
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('ForgotCtrl', ['$scope', 'Account', '$compile', function ($scope, Account, $compile) {

    var vm = this;

    vm.send = false;
    vm.start = false;
    vm.err = false;
    vm.errDescription = "";

    vm.close = function () {
      vm.send = false;
      vm.err = false;
    };

    vm.submit = function () {
      if (!$scope.ForgotForm.$invalid) {
        vm.start = true;
        Account.setRecoveryToken({
          'recoveryKey': vm.user.email
        }).then(function (res) {
          if (res.status == 200) {
            vm.send = true;
            vm.err = false;
            $scope.ForgotForm.$setPristine();
            vm.user.email = '';
          } else {
            vm.err = true;
            vm.errDescription = "Não foi possível enviar o seu email de recuperação de senha, tente novamente mais tarde";
          }
          vm.start = false;
        }).catch(function (err) {
          vm.errDescription = err.data.error.description;
          vm.start = false;
          vm.err = true;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('LoginCtrl', ['$scope', 'Auth', '$location', 'Socket', 'Config', '$localStorage', function ($scope, Auth, $location, Socket, Config, $localStorage) {

    var vm = this;

    vm.hidepassword = true;
    vm.show = true;
    vm.hide = false;
    vm.errLogin = false;
    vm.start = false;

    vm.toggle = function (param) {
      if (param === 'show') {
        vm.hidepassword = false;
        vm.show = false;
        vm.hide = true;
      } else {
        vm.hidepassword = true;
        vm.show = true;
        vm.hide = false;
      }
    };

    vm.close = function () {
      vm.errLogin = false;
    };

    vm.submit = function () {
      if (!$scope.LoginForm.$invalid) {
        vm.start = true;
        Auth.login(vm.user.email, vm.user.password).then(function (res) {
          if (res.status == 200 && res.data) {
            $localStorage.id = res.data._id;
            Socket.emit('login success', res.data);
            $location.path('/');
          } else vm.errLogin = true;
          vm.start = false;
        }).catch(function (err) {
          vm.errLogin = true;
          vm.start = false;
        });
      } else {
        vm.errLogin = true;
        vm.start = false;
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('RegisterCtrl', ['$scope', 'Account', 'Socket', function ($scope, Account, Socket) {

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

    vm.toggle = function (param) {
      if (param === 'showA') {
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      } else {
        if (param === 'hideA') {
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        } else {
          if (param === 'showB') {
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          } else {
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function () {
      if (!$scope.RegisterForm.$invalid) {
        vm.start = true;
        var phoneNumber = '55' + vm.user.phoneNumber.toString().replace(/[^0-9]/g, '');
        Account.signup(vm.user.name, vm.user.email, phoneNumber, vm.user.password).then(function (res) {
          if (res.data) {
            _id = res.data._id;
            vm.user._id = _id;
            vm.user.isActive = false;
            Socket.emit('admin add', vm.user);
          }
          vm.create = false;
          vm.start = false;
          vm.err = false;
        }).catch(function (err) {
          vm.errDescription = err.data.error.description;
          vm.err = true;
          vm.start = false;
        });
      }
    };

    vm.close = function (code) {
      if (code == 0) vm.sendSuccess = false;else if (code == 1) vm.sendDanger = false;else vm.err = false;
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('ResetCtrl', ['$scope', 'Account', '$routeParams', '$location', function ($scope, Account, $routeParams, $location) {

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

    vm.toggle = function (param) {
      if (param === 'showA') {
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      } else {
        if (param === 'hideA') {
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        } else {
          if (param === 'showB') {
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          } else {
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function () {
      if (!$scope.ResetForm.$invalid) {
        vm.start = true;
        Account.recoverPassword($routeParams.recoveryKey, $routeParams.token, vm.user.password).then(function (res) {
          vm.resetSuccess = true;
          vm.resetDanger = false;
          $location.path('/login');
          vm.start = false;
        }).catch(function (err) {
          vm.errDescription = err.data.error.description;
          vm.resetSuccess = false;
          vm.resetDanger = true;
          vm.start = false;
        });
      } else {
        vm.errDescription = "Erro ao tentar redefinir sua senha. Tente novamente mais tarde.";
        vm.resetSuccess = false;
        vm.resetDanger = true;
        vm.start = false;
      }
    };

    vm.close = function (code) {
      if (code = 0) vm.resetSuccess = false;else vm.resetDanger = false;
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('HomeCtrl', [function () {

    var vm = this;

    var total = 10;

    vm.numbers = {
      'users': 2,
      'example1': 4,
      'example2': 3,
      'example3': 1
    };

    vm.donutLabels = ['Usuários', 'Exemplo #1', 'Exemplo #2', 'Exemplo #3'];
    vm.donutData = [parseFloat(vm.numbers.users / total * 100).toFixed(2), parseFloat(vm.numbers.example1 / total * 100).toFixed(2), parseFloat(vm.numbers.example2 / total * 100).toFixed(2), parseFloat(vm.numbers.example3 / total * 100).toFixed(2)];

    vm.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    vm.series = ['Ativados', 'Desativados'];
    vm.data = [[10, 20, 30, 40, 20, 30, 20, 10, 0, 0, 0, 0], [-10, -20, 0, 30, 70, 90, 60, 30, 0, 0, 0, 0]];

    vm.colors = ["rgb(255,193,7)", "rgb(32,168,216)", "rgb(79,255,135)", "rgb(99,194,222)"];

    vm.onClick = function (points, evt) {};
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('AlertModalCtrl', ['$scope', 'ModalService', 'close', 'title', 'question', 'user', function ($scope, ModalService, close, title, question, user) {

    var vm = this;

    vm.title = title;
    vm.question = question;
    vm.user = user;

    vm.close = function (result) {
      close({ 'status': result }, 500); // close, but give 500ms for bootstrap to animate
      angular.element('.modal').modal('hide');
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('FormModalCtrl', ['$scope', 'ModalService', 'close', function ($scope, ModalService, close) {

    var vm = this;

    vm.inputs = [];

    vm.title = 'My Title';
    vm.question = 'My Question';

    vm.close = function (result) {
      close(vm.inputs, 500); // close, but give 500ms for bootstrap to animate
      angular.element('.modal').modal('hide');
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('InfoModalCtrl', ['close', 'title', 'info', function (close, title, info) {

    var vm = this;

    vm.title = title;
    vm.info = info;

    vm.close = function (result) {
      close({ 'status': result }, 500);
      angular.element('.modal').modal('hide');
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('UsersCtrl', ['$scope', '$filter', 'Users', 'Account', 'ModalService', 'Socket', 'Tables', 'Notify', function ($scope, $filter, Users, Account, ModalService, Socket, Tables, Notify) {

    var vm = this;

    vm.predicates = [{
      _id: 0,
      value: null,
      label: 'Filtros'
    }, {
      _id: 1,
      value: true,
      label: 'Consultores Ativos'
    }, {
      _id: 2,
      value: false,
      label: 'Consultores Pendentes'
    }];
    vm.selectedPredicate = vm.predicates[0].label;

    vm.config = {
      itemsPerPage: 10
    };

    var buffer = [];
    vm.filteredList = [];
    Users.getUsers().then(function (res) {
      for (var i = 0; i < res.data.length; i++) {
        vm.filteredList.push(res.data[i]);
      }buffer = vm.filteredList;
    });

    Socket.on('admin add', function (msg) {
      var flag = true;
      vm.filteredList.filter(function (item) {
        if (item._id === msg.id) flag = false;
      });
      if (flag) vm.filteredList.push(msg);
    });

    Socket.on('admin active', function (msg) {
      vm.filteredList.filter(function (item) {
        if (item._id === msg) item.account.isActive = true;
      });
    });

    Socket.on('admin inactivate', function (msg) {
      vm.filteredList.filter(function (item) {
        if (item._id === msg) item.account.isActive = false;
      });
    });

    var search = function search(value) {
      Tables.search([value.name, value.email], vm.key, function (res) {
        if (res) {
          buffer.filter(function (item) {
            if (item.account.email == value.email) {
              vm.filteredList.push(item);
            }
          });
        }
      });
    };

    vm.update = function () {
      Tables.condition(vm.predicates, vm.selectedPredicate, function (condition) {
        var account = [];
        buffer.filter(function (item) {
          account.push(item.account);
        });
        vm.filteredList = [];
        Tables.update(account, vm.predicates, vm.selectedPredicate, condition, function (res) {
          if (res != null) search(res);
        });
      });
    };

    vm.clean = function () {
      Tables.clean(vm, buffer, function (res) {});
    };

    vm.active = function (id, email, isActive) {
      ModalService.showModal({
        templateUrl: 'app/views/modals/alert.html',
        controller: 'AlertModalCtrl as alertModalCtrl',
        inputs: {
          title: isActive ? 'Desativar usuário' : 'Ativar usuário',
          question: isActive ? 'Você desja realmente Desativar este usuário?' : 'Você deseja realmente ativar este usuário?',
          user: email
        }
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (result) {
          if (result && result.status) {
            if (isActive) {
              Account.inactivate(id).then(function (res) {
                Notify.run('Usuário desativado com sucesso', 'alert-success', null, null, null, function (res) {
                  if (res) Socket.emit('admin inactivate', id);
                });
              });
            } else {
              Account.active(id).then(function (res) {
                Notify.run('Usuário ativado com sucesso', 'alert-success', null, null, null, function (res) {
                  if (res) Socket.emit('admin active', id);
                });
              });
            }
          }
        });
      });
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('ProfileCtrl', ['$scope', function ($scope) {

    var vm = this;
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').controller('SettingsCtrl', ['$scope', '$timeout', '$window', 'Upload', 'Account', 'Profile', 'notify', '$localStorage', 'Config', 'Auth', '$location', 'cloudinary', 'ModalService', 'Socket', function ($scope, $timeout, $window, Upload, Account, Profile, notify, $localStorage, Config, Auth, $location, cloudinary, ModalService, Socket) {

    var vm = this;

    vm.tab = 1;
    vm.start = false;
    vm.alertMessage = {};
    vm.btn = {
      'name': '',
      'select': false
    };

    Auth.isAuthenticated().then(function (res) {
      vm.inputs = {
        '_id': res.data._id,
        'name': res.data.account.name,
        'email': res.data.account.email,
        'phoneNumber': res.data.account.phoneNumber,
        'isActive': res.data.account.isActive
      };
      var cachedFile = $window.localStorage.getItem('persistentCache:imageProfile');
      if (cachedFile == null || cachedFile === '') {
        Profile.getProfile(res.data._id).then(function (result) {
          if (res.data.profile != null && result.data.profilePicture) {
            $window.localStorage.setItem('persistentCache:imageProfile', result.data.profile.profilePicture);
            display(result.data.profile.profilePicture, true);
          } else display(null, false);
        }).catch(function (err) {
          display(null, false);
        });
      } else display(cachedFile, true);
    }).catch(function (err) {
      vm.alertMessage.show = true;
      vm.alertMessage.type = 'danger';
      vm.alertMessage.message = err.data.error.description;
    });

    vm.updatePassword = function () {
      if (!$scope.UpdatePassForm.$invalid) {
        vm.start = true;
        Account.updatePassword(vm.inputs._id, vm.account.currentPassword, vm.account.newPassword).then(function (data) {
          ModalService.showModal({
            templateUrl: 'app/views/modals/info.html',
            controller: 'InfoModalCtrl as infoModalCtrl',
            inputs: {
              title: 'Senha Alterada',
              info: 'Você será direcionado para o Login para que possa entrar novamente na aplicação.'
            }
          }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
              if (result && result.status) {
                vm.start = false;
                Auth.logout().then(function (res) {
                  Socket.emit('logout success', res.data);
                  $location.path('/login');
                }).catch(function (err) {
                  vm.alertMessage.show = true;
                  vm.alertMessage.type = 'warning';
                  vm.alertMessage.message = 'Sua senha foi atualizada por isso é altamente recomendável que você faça login novamente.';
                });
              }
            });
          });
        }).catch(function (err) {
          vm.start = false;
          vm.alertMessage.show = true;
          vm.alertMessage.type = 'danger';
          vm.alertMessage.message = err.data.error.description;
        });
      } else {
        vm.start = false;
        vm.alertMessage.show = true;
        vm.alertMessage.type = 'danger';
        vm.alertMessage.message = err.data.error.description;
      }
    };

    vm.updateProfile = function () {
      if (vm.pictures.length > 0) {
        vm.upload(vm.pictures);
      }
    };

    vm.upload = function (files) {
      files.filter(function (item, index) {
        if (!item.flag) {
          Upload.upload({
            url: 'https://api.cloudinary.com/v1_1/' + cloudinary.config().cloud_name + '/upload/',
            withCredentials: false,
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'profile',
              file: item.url
            }
          }).then(function (res) {
            Account.updatePicture(vm.inputs._id, res.data.secure_url).then(function (res) {
              vm.alertMessage.show = true;
              if (res.status == 200) {
                cacheUpdate(res.data.profilePicture);
                Socket.emit('change profile', res.data.profilePicture);
                vm.alertMessage.type = 'success';
                vm.alertMessage.message = 'Perfil atualizado com sucesso';
              } else {
                vm.alertMessage.type = 'danger';
                vm.alertMessage.message = 'Erro ao atualizar perfil';
              }
              vm.start = false;
            }).catch(function (err) {
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

    vm.setInBuffer = function (files) {
      if (files) {
        angular.forEach(files, function (file) {
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

    vm.remove = function () {
      if (vm.btn.select) {
        vm.pictures = [];
        vm.btn.name = 'Adicionar';
        vm.btn.select = false;
        angular.element('#uploadPicture').addClass('btn-primary');
        angular.element('#uploadPicture').removeClass('btn-danger');
      }
    };

    vm.closeAlert = function () {
      vm.alertMessage.show = false;
    };

    vm.setTab = function (newTab) {
      vm.alertMessage.show = false;
      vm.start = false;
      vm.tab = newTab;
    };

    vm.isSet = function (tabNum) {
      return vm.tab === tabNum;
    };

    var display = function display(cachedFile, remove) {
      if (remove) {
        vm.btn.name = 'Remover';
        vm.btn.select = true;
        $timeout(function () {
          angular.element('#uploadPicture').removeClass('btn-primary');
          angular.element('#uploadPicture').addClass('btn-danger');
          $scope.$apply();
        }, 5);
      } else {
        vm.btn.name = 'Adicionar';
        vm.btn.select = false;
        $timeout(function () {
          angular.element('#uploadPicture').addClass('btn-primary');
          angular.element('#uploadPicture').removeClass('btn-danger');
          $scope.$apply();
        }, 5);
      }
      vm.pictures = [];
      vm.pictures.push({ 'url': cachedFile });
    };

    var cacheUpdate = function cacheUpdate(url) {
      $window.localStorage.setItem('persistentCache:imageProfile', url);
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').factory('Notify', ['notify', function (notify) {

    var position = 'center';
    var duration = '3000';
    var template = '';

    return {
      set: function set(pos, dur, tem, callback) {
        position = pos;
        duration = dur;
        template = tem;
        return callback(position != undefined && duration != undefined && template != undefined ? true : false);
      },
      get: function get(callback) {
        return callback({
          'position': position,
          'duratiom': duration,
          'template': template
        });
      },
      run: function run(msg, cls, pos, dur, tem, callback) {
        if (msg == undefined || cls == undefined) return callback(false);else {
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
})();
'use strict';

(function () {
  angular.module('dashboard').factory('Config', ['url_base', function (url_base) {
    return {
      'url_base': url_base,
      _id: ''
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').factory('Socket', ['$rootScope', function ($rootScope) {
    var _arguments = arguments;

    var socket = io.connect();
    return {
      on: function on(eventName, callback) {
        socket.on(eventName, function () {
          var args = _arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function emit(eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = _arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').factory('Tables', ['$filter', function ($filter) {

    return {
      search: function search(args, key, callback) {

        var i = 0;
        var item = args[i];
        var k = key;

        if (k != undefined) k = k.toLowerCase();

        var s = item.search(k);

        do {
          var _item = args[i];
          if (_item != undefined && typeof _item != "boolean") {
            _item = args[i].toLowerCase();
            s = _item.search(k);
          }
          i++;
        } while (s < 0 && i < args.length);

        return callback(s > -1 ? true : false);
      },
      update: function update(buffer, args, key, conditions, callback) {

        buffer.filter(function (item) {

          var i = 0;
          var arg = args[i].label.toLowerCase();
          var k = key;

          if (k != undefined) k = k.toLowerCase();

          do {
            arg = args[i].label.toLowerCase();
            i++;
          } while (arg.search(k) < 0 && i < args.length);

          var value = args[i == 0 ? 0 : i - 1].value;

          return callback(value != null ? item[conditions] == value ? item : null : item);
        });
      },
      condition: function condition(buffer, key, callback) {

        var i = 0;
        var item = buffer[i];

        do {
          item = buffer[i];
          i++;
        } while (i < buffer.length && item.label != key);

        return callback(item._id == 1 || item._id == 2 || item._id == 0 ? 'isActive' : 'status');
      },
      clean: function clean(scope, args, callback) {

        scope.key = '';
        scope.selectedPredicate = scope.predicates[0].label;
        scope.filteredList = args;

        return callback(true);
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').service('Users', ['$http', 'Config', function ($http, Config) {

    var url_base = Config.url_base;

    return {
      getUsers: function getUsers() {
        return $http.get(url_base + '/users').then(function (result) {
          return result;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').service('Verification', ['$http', 'Config', function ($http, Config) {

    var url_base = Config.url_base;

    return {
      userVerifyEmail: function userVerifyEmail(email) {
        return $http.get(url_base + '/verifications/user?email=' + email).then(function (result) {
          return result;
        });
      },
      userVerifyPhoneNumber: function userVerifyPhoneNumber(phoneNumber) {
        return $http.get(url_base + '/verifications/user?phoneNumber=' + phoneNumber).then(function (result) {
          return result;
        });
      },
      verifyPassword: function verifyPassword(password) {
        return $http.post(url_base + '/verifications/password', {
          'password': password
        }).then(function (result) {
          return result;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').filter('phoneNumber', function () {
    return function (string) {
      var state = '(' + str.slice(2, 4) + ')';
      var initial = str.slice(4, 9);
      var finish = str.slice(9, 13);
      return state + ' ' + initial + '-' + finish;
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').filter('commonNames', function () {
    return function (string) {
      if (!angular.isString(string)) return string;
      return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      });
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').filter('status', function () {
    return function (string) {
      if (string == true) return 'Ativo';
      if (string == false) return 'Inativo';
      if (string === 'new') return 'Novo';
      if (string === 'rejected') return 'Rejeitado';
      if (string === 'approved' || string === 'approv') return 'Aprovado';
      if (string === 'reproved' || string === 'reprov') return 'Reprovado';
      if (string === 'banned') return 'Banido';
      return 'Pendente';
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').filter('subscription', function () {
    return function (string) {
      if (string == 'premium') return 'Premium';
      return "Gratuito";
    };
  });
})();
'use strict';

(function () {
  angular.module('dashboard').service('Account', ['$http', '$q', 'Config', function ($http, $q, Config) {

    var url_base = Config.url_base;

    return {
      signup: function signup(name, email, phoneNumber, password) {
        return $http.post(url_base + '/users/account/signup', {
          'name': name,
          'email': email,
          'phoneNumber': phoneNumber,
          'password': password
        }).then(function (result) {
          return result;
        });
      },
      active: function active(_id) {
        return $http.put(url_base + '/users/' + _id + '/account/activation').then(function (result) {
          return result;
        }).catch(function (err) {
          return err;
        });
      },
      inactivate: function inactivate(_id) {
        return $http.put(url_base + '/users/' + _id + '/account/inactivation').then(function (result) {
          return result;
        });
      },
      setActivationCode: function setActivationCode(_id) {
        return $http.put(url_base + '/users/' + _id + '/account/activation').then(function (result) {
          return result;
        });
      },
      setRecoveryToken: function setRecoveryToken(recoveryKey, token, newPassword) {
        return $http.patch(url_base + '/users/account/recovery', recoveryKey).then(function (result) {
          return result;
        });
      },
      recoverPassword: function recoverPassword(recoveryKey, token, newPassword) {
        return $http.put(url_base + '/users/account/recovery', {
          'recoveryKey': recoveryKey,
          'token': token,
          'newPassword': newPassword
        }).then(function (result) {
          return result;
        });
      },
      setEmailChangeToken: function setEmailChangeToken(id, email) {
        return $http.patch(url_base + '/users/' + id + '/account/email', {
          'email': email
        }).then(function (result) {
          return result;
        });
      },
      updateEmail: function updateEmail(id, email) {
        return $http.put(url_base + '/users/' + id + '/account/email', {
          'token': token
        }).then(function (result) {
          return result;
        });
      },
      updatePassword: function updatePassword(id, currentPassword, newPassword) {
        return $http.put(url_base + '/users/' + id + '/account/password', {
          'currentPassword': currentPassword,
          'newPassword': newPassword
        }).then(function (result) {
          return result;
        });
      },
      getAccount: function getAccount(id) {
        return $http.get(url_base + '/users/' + id + '/account').then(function (result) {
          return result;
        });
      },
      updatePicture: function updatePicture(id, profilePicture) {
        return $http.put(url_base + '/users/' + id + '/account/picture', {
          'profilePicture': profilePicture
        }).then(function (result) {
          return result;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').service('Profile', ['$http', 'Config', function ($http, Config) {

    var url_base = Config.url_base;

    return {
      updatePicture: function updatePicture(_id, pictureUrl) {
        return $http.put(url_base + '/users/' + _id + '/profile/picture', pictureUrl).then(function (result) {
          return result;
        });
      },
      deletePicture: function deletePicture(_id) {
        return $http.delete(url_base + '/users/' + _id + '/profile/picture').then(function (result) {
          return result;
        });
      },
      getProfile: function getProfile(_id) {
        return $http.get(url_base + '/users/' + _id + '/profile').then(function (result) {
          return result;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').service('Auth', ['$http', '$q', 'Config', function ($http, $q, Config) {

    var url_base = Config.url_base;

    return {
      login: function login(email, password) {
        return $http.post(url_base + '/users/auth/local/login', {
          'email': email,
          'password': password
        }).then(function (result) {
          return result;
        });
      },
      isAuthenticated: function isAuthenticated() {
        return $http.get(url_base + '/users/auth/local/login').then(function (result) {
          return result.status == 200 ? result : $q.reject("Not Authenticated");
        });
      },
      logout: function logout() {
        return $http.post(url_base + '/users/auth/local/logout').then(function (result) {
          return result;
        });
      }
    };
  }]);
})();
'use strict';

(function () {
  angular.module('dashboard').service('Bi', ['$http', 'Config', function ($http, Config) {

    var url_base = Config.url_base;

    return {
      getNumbers: function getNumbers() {
        return $http.get(url_base + '/users/management/bi/numbers').then(function (result) {
          return result;
        });
      }
    };
  }]);
})();
"use strict";

angular.module("directives/cardsBi/cardsBi.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/cardsBi.html", "<div class=\"card-heading\">" + "  <div class=\"card-box\">" + "    <i class=\"material-icons icon-card\">{{cardsBiCtrl.icon}}</i>" + "  </div>" + "  <div class=\"card-block\">" + "    <div ng-show=\"cardsBiCtrl.start\" class=\"loader\">" + "      <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "        <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "      </svg>" + "    </div>" + "    <h4 ng-show=\"!cardsBiCtrl.start\" class=\"cards-title\">{{cardsBiCtrl.value}}</h4>" + "    <p class=\"card-text\">{{cardsBiCtrl.label | biLabel}}</p>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/auth/activation.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/activation.html", "<div class=\"container-fluid pages\">" + "  <div class=\"nav-login\">" + "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">" + "  </div>" + "  <div ng-show=\"activationCtrl.success\" class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"activationCtrl.activationSuccess\" class=\"alert alert-success text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(0)\">&times;</span>" + "      <span>Your account has been successfully activated</span>" + "    </div>" + "    <div ng-show=\"activationCtrl.errLogin\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(2)\">&times;</span>" + "      <span>There was a problem with your login.</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h3 class=\"text-center card-title\">Log in</h3>" + "      <form  role=\"form\" name=\"ActLoginForm\" ng-submit=\"activationCtrl.submit()\" novalidate>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Email Address</label>" + "          <input type=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"you@example.com\" ng-model=\"activationCtrl.user.email\" ui-email required>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Password</label>" + "          <input type=\"{{activationCtrl.hidepassword ? 'password' : 'text'}}\" name=\"password\" ng-model=\"activationCtrl.user.password\" class=\"form-control\" placeholder=\"Type your password\" required>" + "          <i ng-click=\"activationCtrl.toggle('hide')\" ng-show=\"activationCtrl.hide\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>" + "          <i ng-click=\"activationCtrl.toggle('show')\" ng-show=\"activationCtrl.show\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>" + "        </div>" + "        <button class=\"mybutton btn-primary btn-lg btn-block\">LOGIN</button>" + "        <br />" + "        <div class=\"row align-items-center\">" + "           <div class=\"col\">" + "             <a href=\"#/cadastrar\">Register</a>" + "           </div>" + "           <div class=\"col text-right\">" + "             <a href=\"#/recuperar\">Forgot your password?</a>" + "           </div>" + "        </div>" + "      </form>" + "    </div>" + "  </div>" + "  <div ng-show=\"activationCtrl.danger\" class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"activationCtrl.activationDanger\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(1)\">&times;</span>" + "      <span>Error there was trying to activate your account</span>" + "    </div>" + "    <div ng-show=\"activationCtrl.resend\" class=\"alert alert-warning text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"activationCtrl.close(3)\">&times;</span>" + "      <span>Check your inbox for the next steps.</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h3 class=\"text-center card-title\">Resend new token</h3>" + "      <form role=\"form\" name=\"ActResendForm\" ng-submit=\"activationCtrl.send()\" novalidate>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Email Address</label>" + "          <input type=\"email\" name=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"you@example.com\" ng-model=\"activationCtrl.user.email\" ng-class=\"{'has-error': ActResendForm.email.$invalid && ActResendForm.email.$dirty}\" ui-email required>" + "          <div class=\"error-container\" ng-show=\"ActResendForm.email.$dirty && ActResendForm.email.$invalid\">" + "            <small ng-show=\"ActResendForm.email.$error.required\" class=\"form-text text-muted text-danger\">Your email is required.</small>" + "          </div>" + "        </div>" + "        <button class=\"mybutton btn-primary btn-block\" ng-disabled=\"ActResendForm.$invalid\" type=\"submit\" name=\"Resend\">RESEND</button>" + "        <br>" + "        <div class=\"row align-items-center\">" + "           <div class=\"col\">" + "             <a href=\"#/login\">Login</a>" + "           </div>" + "           <div class=\"col text-right\">" + "             <a href=\"#/cadastrar\">Register</a>" + "           </div>" + "        </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/auth/forgot.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/forgot.html", "<div class=\"container-fluid pages\">" + "  <div class=\"nav-login\">" + "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">" + "  </div>" + "  <div class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"forgotCtrl.send\" class=\"alert alert-warning text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"forgotCtrl.close()\">&times;</span>" + "      <span>Verifique a sua caixa de entrada para as próximas etapas.</span>" + "    </div>" + "    <div ng-show=\"forgotCtrl.err\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"forgotCtrl.close()\">&times;</span>" + "      <span>{{forgotCtrl.errDescription}}</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h3 class=\"text-center card-title\">Esqueci minha senha</h3>" + "      <form role=\"form\" name=\"ForgotForm\" ng-submit=\"forgotCtrl.submit()\" novalidate>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Endereço de Email</label>" + "          <input type=\"email\" name=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"email@exemplo.com.br\" ng-model=\"forgotCtrl.user.email\" ng-class=\"{'has-error': ForgotForm.email.$invalid && ForgotForm.email.$dirty}\" ui-email=\"no-registered\" required>" + "          <div class=\"error-container\" ng-show=\"ForgotForm.email.$dirty && ForgotForm.email.$invalid\">" + "            <small ng-show=\"ForgotForm.email.$error.required\" class=\"form-text text-muted text-danger\">Seu email é obrigatório.</small>" + "          </div>" + "        </div>" + "        <button class=\"mybutton btn-primary btn-block\" ng-disabled=\"ForgotForm.$invalid\" type=\"submit\" name=\"Forgot\">" + "          <div ng-show=\"forgotCtrl.start\" class=\"loader loader-btn\">" + "            <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "            </svg>" + "          </div>" + "          <span ng-show=\"!forgotCtrl.start\">ENVIAR</span>" + "        </button>" + "        <br>" + "        <div class=\"row align-items-center\">" + "           <div class=\"col\">" + "             <a href=\"#/login\">Login</a>" + "           </div>" + "           <div class=\"col text-right\">" + "             <a href=\"#/cadastrar\">Cadastre-se</a>" + "           </div>" + "        </div>" + "      </form>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/auth/login.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/login.html", "<div class=\"container-fluid pages\">" + "  <div class=\"nav-login\">" + "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">" + "  </div>" + "  <div class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"loginCtrl.errLogin\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"loginCtrl.close()\">&times;</span>" + "      <span>Houve um problema com o seu login.</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h3 class=\"text-center card-title\">Log in</h3>" + "      <form  role=\"form\" name=\"LoginForm\" ng-submit=\"loginCtrl.submit()\" novalidate>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Endereço de Email</label>" + "          <input type=\"email\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"email@exemplo.com.br\" ng-model=\"loginCtrl.user.email\" ui-email=\"no-registered\" required>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Senha</label>" + "          <input type=\"{{loginCtrl.hidepassword ? 'password' : 'text'}}\" name=\"password\" ng-model=\"loginCtrl.user.password\" class=\"form-control\" placeholder=\"Digite sua senha aqui\" required>" + "          <i ng-click=\"loginCtrl.toggle('hide')\" ng-show=\"loginCtrl.hide\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>" + "          <i ng-click=\"loginCtrl.toggle('show')\" ng-show=\"loginCtrl.show\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>" + "        </div>" + "        <button class=\"mybutton btn-primary btn-lg btn-block\">" + "          <div ng-show=\"loginCtrl.start\" class=\"loader loader-btn\">" + "            <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "            </svg>" + "          </div>" + "          <span ng-show=\"!loginCtrl.start\">LOGIN</span>" + "        </button>" + "        <br />" + "        <div class=\"row align-items-center\">" + "           <div class=\"col\">" + "             <a href=\"#/cadastrar\">Cadastre-se</a>" + "           </div>" + "           <div class=\"col text-right\">" + "             <a href=\"#/recuperar\">Esqueceu sua senha?</a>" + "           </div>" + "        </div>" + "      </form>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/auth/register.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/register.html", "<div class=\"container-fluid pages\">" + "  <div class=\"nav-login\">" + "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">" + "  </div>" + "  <div ng-show=\"registerCtrl.create\" class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"registerCtrl.err\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"registerCtrl.close(2)\">&times;</span>" + "      <span>{{registerCtrl.errDescription}}</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h3 class=\"text-center card-title\">Cadastro</h3>" + "      <form role=\"form\" name=\"RegisterForm\" ng-submit=\"registerCtrl.submit()\" novalidate>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Nome</label>" + "          <input type=\"text\" name=\"name\" ng-model=\"registerCtrl.user.name\" class=\"form-control\" placeholder=\"Digite seu nome\" ng-class=\"{'has-error': RegisterForm.name.$invalid && RegisterForm.name.$dirty}\" ui-br-name required>" + "          <div class=\"error-container\" ng-show=\"RegisterForm.name.$dirty && RegisterForm.name.$invalid\">" + "            <small ng-show=\"RegisterForm.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>" + "            <small ng-show=\"RegisterForm.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>" + "          </div>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Endereço de Email</label>" + "          <input type=\"email\" name=\"email\" ng-model=\"registerCtrl.user.email\" class=\"form-control\" placeholder=\"email@examplo.com.br\" ng-class=\"{'has-error': RegisterForm.email.$invalid && RegisterForm.email.$dirty}\" ui-email required>" + "          <div class=\"error-container\" ng-show=\"RegisterForm.email.$dirty && RegisterForm.email.$invalid\">" + "            <small ng-show=\"RegisterForm.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>" + "            <small ng-show=\"RegisterForm.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>" + "            <small ng-show=\"RegisterForm.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>" + "          </div>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>" + "          <input type=\"tel\" name=\"phoneNumber\" ng-model=\"registerCtrl.user.phoneNumber\" class=\"form-control\" placeholder=\"(xx) XXXXX-XXXX\" ng-class=\"{'has-error': RegisterForm.phoneNumber.$invalid && RegisterForm.phoneNumber.$dirty}\" ui-br-cellphone required>" + "          <div class=\"error-container\" ng-show=\"RegisterForm.phoneNumber.$dirty && RegisterForm.phoneNumber.$invalid\">" + "            <small ng-show=\"RegisterForm.phoneNumber.$error.required\" class=\"form-text text-muted text-danger\">O celular é obrigatório.</small>" + "            <small ng-show=\"RegisterForm.phoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um celular válido.</small>" + "            <small ng-show=\"RegisterForm.phoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">Este celular já foi utilizado por outra conta.</small>" + "          </div>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Senha</label>" + "          <input type=\"{{registerCtrl.hidepasswordA ? 'password' : 'text'}}\" name=\"password\" ng-model=\"registerCtrl.user.password\" class=\"form-control\" placeholder=\"Digite sua senha aqui\" ng-class=\"{'has-error': RegisterForm.password.$invalid && RegisterForm.password.$dirty}\" zxcvbn=\"registerCtrl.passwordStrength\" required>" + "          <i ng-click=\"registerCtrl.toggle('hideA')\" ng-show=\"registerCtrl.hideA\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>" + "          <i ng-click=\"registerCtrl.toggle('showA')\" ng-show=\"registerCtrl.showA\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>" + "          <div class=\"error-container\" ng-show=\"RegisterForm.password.$dirty && RegisterForm.password.$invalid\">" + "            <small ng-show=\"RegisterForm.password.$error.required\" class=\"form-text text-muted text-danger\">A senha é obrigatória.</small>" + "          </div>" + "          <div strength-password strength=\"registerCtrl.passwordStrength\"></div>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Confirme sua senha</label>" + "          <input type=\"{{registerCtrl.hidepasswordB ? 'password' : 'text'}}\" name=\"confirmPassword\" ng-model=\"registerCtrl.user.confirmPassword\" class=\"form-control\" placeholder=\"Confirme sua senha aqui\" ng-class=\"{'has-error': RegisterForm.confirmPassword.$invalid && RegisterForm.confirmPassword.$dirty}\" match=\"registerCtrl.user.password\" required>" + "          <i ng-click=\"registerCtrl.toggle('hideB')\" ng-show=\"registerCtrl.hideB\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>" + "          <i ng-click=\"registerCtrl.toggle('showB')\" ng-show=\"registerCtrl.showB\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>" + "          <div class=\"error-container\" ng-show=\"RegisterForm.confirmPassword.$dirty && RegisterForm.confirmPassword.$invalid\">" + "            <small ng-show=\"RegisterForm.confirmPassword.$error.required\" class=\"form-text text-muted text-danger\">Confirmar a senha é obrigatório.</small>" + "            <small ng-show=\"RegisterForm.confirmPassword.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>" + "          </div>" + "        </div>" + "        <button class=\"mybutton btn-primary btn-lg btn-block\" ng-disabled=\"RegisterForm.$invalid\" type=\"submit\" name=\"Register\">" + "          <div ng-show=\"registerCtrl.start\" class=\"loader loader-btn\">" + "            <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "            </svg>" + "          </div>" + "          <span ng-show=\"!registerCtrl.start\">CADASTRAR</span>" + "        </button>" + "        <br>" + "        <div class=\"row align-items-center\">" + "           <div class=\"col\">" + "             <a href=\"#/login\">Login</a>" + "           </div>" + "           <div class=\"col text-right\">" + "             <a href=\"#/recuperar\">Esqueceu sua senha?</a>" + "           </div>" + "        </div>" + "      </form>" + "    </div>" + "  </div>" + "  <div ng-show=\"!registerCtrl.create\" class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"registerCtrl.sendSuccess\" class=\"alert alert-success text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"registerCtrl.close(0)\">&times;</span>" + "      <span>Seu novo token de ativação foi enviado com sucesso.</span>" + "    </div>" + "    <div ng-show=\"registerCtrl.sendDanger\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"registerCtrl.close(1)\">&times;</span>" + "      <span>Erro ao tentar reenviar um novo token de ativação.</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h2 class=\"text-center card-title\">Parabéns!</h2>" + "      <img src=\"app/assets/img/icons/send.png\" class=\"img img-responsive img-congrulations\"/>" + "      <p class=\"text-congrulations\">Sua conta foi <span class=\"text-bold\">criada com sucesso</span></p>" + "      <p class=\"text-congrulations\">Entre em contato com o <span calss=\"text-bold\">administrador</span> do sistema para os próximos passos.</p>" + "      <br>" + "      <div class=\"row align-items-center\">" + "         <div class=\"col\">" + "           <a href=\"#/login\">Login</a>" + "         </div>" + "         <div class=\"col text-right\">" + "           <a href=\"#/recuperar\">Esqueceu sua senha?</a>" + "         </div>" + "      </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/auth/reset.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/reset.html", "<div class=\"container-fluid pages\">" + "  <div class=\"nav-login\">" + "    <img class=\"img-login\" src=\"app/assets/img/logos/icon.png\">" + "  </div>" + "  <div class=\"col col-sm-6 col-md-4 horizontal-align\">" + "    <div ng-show=\"resetCtrl.resetSuccess\" class=\"alert alert-success text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"resetCtrl.close(0)\">&times;</span>" + "      <span>Sua senha foi redefinida com sucesso.</span>" + "    </div>" + "    <div ng-show=\"resetCtrl.resetDanger\" class=\"alert alert-danger text-center\" role=\"alert\">" + "      <span class=\"alert-close-btn\" ng-click=\"resetCtrl.close(1)\">&times;</span>" + "      <span>{{resetCtrl.errDescription}}</span>" + "    </div>" + "    <div class=\"cards\">" + "      <h3 class=\"text-center card-title\">Redefinir senha</h3>" + "      <form role=\"form\" name=\"ResetForm\" ng-submit=\"resetCtrl.submit()\" novalidate>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Senha</label>" + "          <input type=\"{{resetCtrl.hidepasswordA ? 'password' : 'text'}}\" name=\"password\" ng-model=\"resetCtrl.user.password\" class=\"form-control\" placeholder=\"Digite sua nova senha aqui\" ng-class=\"{'has-error': ResetForm.password.$invalid && ResetForm.password.$dirty}\" zxcvbn=\"resetCtrl.passwordStrength\" required>" + "          <i ng-click=\"resetCtrl.toggle('hideA')\" ng-show=\"resetCtrl.hideA\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>" + "          <i ng-click=\"resetCtrl.toggle('showA')\" ng-show=\"resetCtrl.showA\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>" + "          <div class=\"error-container\" ng-show=\"ResetForm.password.$dirty && ResetForm.password.$invalid\">" + "            <small ng-show=\"ResetForm.password.$error.required\" class=\"form-text text-muted text-danger\">A senha é um item obrigatória.</small>" + "          </div>" + "          <div strength-password strength=\"resetCtrl.passwordStrength\"></div>" + "        </div>" + "        <div class=\"form-group\">" + "          <label class=\"card-label\" for=\"formGroupExampleInput\">Confirmar senha</label>" + "          <input type=\"{{resetCtrl.hidepasswordB ? 'password' : 'text'}}\" name=\"confirmPassword\" ng-model=\"resetCtrl.user.confirmPassword\" class=\"form-control\" placeholder=\"Digite novamente a senha\" ng-class=\"{'has-error': ResetForm.confirmPassword.$invalid && ResetForm.confirmPassword.$dirty}\" match=\"resetCtrl.user.password\" required>" + "          <i ng-click=\"resetCtrl.toggle('hideB')\" ng-show=\"resetCtrl.hideB\" class=\"fa fa-eye-slash fa-position\" aria-hidden=\"true\"></i>" + "          <i ng-click=\"resetCtrl.toggle('showB')\" ng-show=\"resetCtrl.showB\" class=\"fa fa-eye fa-position\" aria-hidden=\"true\"></i>" + "          <div class=\"error-container\" ng-show=\"ResetForm.confirmPassword.$dirty && ResetForm.confirmPassword.$invalid\">" + "            <small ng-show=\"ResetForm.confirmPassword.$error.required\" class=\"form-text text-muted text-danger\">Confirmar a sua senha é um item obrigatório.</small>" + "            <small ng-show=\"ResetForm.confirmPassword.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>" + "          </div>" + "        </div>" + "        <button class=\"mybutton btn-primary btn-lg btn-block\" ng-disabled=\"ResetForm.$invalid\" type=\"submit\" name=\"Reset\">" + "          <div ng-show=\"resetCtrl.start\" class=\"loader loader-btn\">" + "            <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "              <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "            </svg>" + "          </div>" + "          <span ng-show=\"!resetCtrl.start\">RESETAR</span>" + "        </button>" + "        <br>" + "        <div class=\"row align-items-center\">" + "           <div class=\"col\">" + "             <a href=\"#/login\">Login</a>" + "           </div>" + "           <div class=\"col text-right\">" + "             <a href=\"#/cadastrar\">Cadastre-se</a>" + "           </div>" + "        </div>" + "      </form>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("directives/cloudinary/cloudinary.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/cloudinary.html", "<slick settings=\"cloudinaryCtrl.slickConfig\" class=\"slick-cloudinary\">" + "  <div ng-repeat=\"url in cloudinaryCtrl.urls\">" + "    <div class=\"custom-zoom\">" + "      <img class=\"img slick-img\" ng-src=\"{{url.path}}\"/>" + "      <span class=\"custom-zoom-in\">" + "        <i ng-click=\"cloudinaryCtrl.zoom(url)\" class=\"material-icons\">zoom_in</i>" + "      </span>" + "    </div>" + "  </div>" + "</slick>" + "" + "<!-- modal -->" + "<div id=\"slick-cloudinary-modal\" class=\"slick-cloudinary-modal\">" + "  <div class=\"slick-modal-content\">" + "      <span ng-click=\"cloudinaryCtrl.close()\" class=\"slick-modal-close\" id=\"slick-modal-close\">Fechar</span>" + "      <figure class=\"slick-figure\">" + "          <img id=\"slick-figure-img\" src=\"{{cloudinaryCtrl.zoomImg}}\" class=\"slick-figure-img\">" + "          <div id=\"slick-infobox\" class=\"slick-infobox\">" + "            <span class=\"slick-infobox-icon\">" + "              <i class=\"fa fa-info-circle\"></i>" + "              <div class=\"slick-infobox-content\">" + "                <h4 id=\"slick-figure-title\">{{cloudinaryCtrl.title}}</h4>" + "                <p id=\"slick-figure-desc\">{{cloudinaryCtrl.description}}</p>" + "              </div>" + "            </span>" + "          </div>" + "      </figure>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/home/home.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/home.html", "<div id=\"content\" class=\"container-fluid side-toogle\">" + "  <div class=\"row\">" + "    <div class=\"col-lg-12\">" + "      <div class=\"cards-dash row\">" + "        <div class=\"col-lg-3 col-md-6\">" + "          <a href=\"#/usuarios\" class=\"card\">" + "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"users\" bi-icon=\"list\" bi-color=\"bg-berlim\"></cards-bi>" + "          </a>" + "        </div>" + "        <div class=\"col-lg-3 col-md-6\">" + "          <a href=\"#/exemplo1\" class=\"card\">" + "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"example1\" bi-icon=\"shopping_cart\" bi-color=\"bg-tokyo\"></cards-bi>" + "          </a>" + "        </div>" + "        <div class=\"col-lg-3 col-md-6\">" + "          <a href=\"#/exemplo2\" class=\"card\">" + "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"example2\" bi-icon=\"contacts\" bi-color=\"bg-nairobi\"></cards-bi>" + "          </a>" + "        </div>" + "        <div class=\"col-lg-3 col-md-6\">" + "          <a href=\"#/exemplo3\" class=\"card\">" + "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"example3\" bi-icon=\"assignment\" bi-color=\"bg-rio\"></cards-bi>" + "          </a>" + "        </div>" + "      </div>" + "      <div class=\"row card-row-style\">" + "        <div class=\"card card-style\">" + "          <div class=\"card-header\">" + "            Dados de Usuários" + "          </div>" + "          <div class=\"card-block\">" + "            <canvas class=\"chart chart-line\" height=\"110\" chart-data=\"homeCtrl.data\" chart-labels=\"homeCtrl.labels\" chart-series=\"series\"></canvas>" + "          </div>" + "        </div>" + "        <div class=\"card card-style-graph\">" + "          <div class=\"card-header contet-gaph\">" + "            Estatísticas Gerais (%)" + "          </div>" + "          <div class=\"card-block\">" + "            <canvas class=\"chart chart-doughnut\" height=\"192\" chart-data=\"homeCtrl.donutData\" chart-labels=\"homeCtrl.donutLabels\" chart-colors=\"homeCtrl.colors\"></canvas>" + "          </div>" + "        </div>" + "      </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("directives/menuDropdown/menuDropdown.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/menuDropdown.html", "<a class=\"nav-link\" href=\"#\" target=\"_self\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" + "  <img class=\"rounded-circle\" ngf-thumbnail=\"menuDropdownCtrl.user.picture || 'https://placehold.it/40'\">" + "</a>" + "<div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navbarDropdownMenuLink\">" + "    <div class=\"drop-title\">" + "      <img class=\"rounded-circle img-drop-title\" ngf-thumbnail=\"menuDropdownCtrl.user.picture || 'https://placehold.it/40'\">" + "      <span>{{menuDropdownCtrl.user.name}}</span>" + "      <div class=\"title-notify\">{{menuDropdownCtrl.user.email}}</div>" + "    </div>" + "    <a ng-hide=\"true\" class=\"dropdown-item\" href=\"#/perfil\"><i class=\"material-icons marg-r15\">account_box</i> Meu Perfil</a>" + "    <a class=\"dropdown-item\" href=\"#/settings\"><i class=\"material-icons marg-r15\">settings</i> Configurações</a>" + "    <div class=\"dropdown-divider\"></div>" + "    <a class=\"dropdown-item\" style=\"cursor: pointer;\" ng-click=\"menuDropdownCtrl.logout()\"><i class=\"material-icons marg-r15\">exit_to_app</i>Sair</a>" + "</div>" + "");
}]);
"use strict";

angular.module("directives/menuNavbar/menuNavbar.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/menuNavbar.html", "<nav ng-if=\"menuNavbarCtrl.logged==true\" class=\"navbar navbar-toggleable-sm bg-white\">" + "    <button id=\"toggler-button\" sidebar-toogler class=\"navbar-toggler toggle\" type=\"button\">" + "      &#9776;" + "    </button>" + "    <menu-dropdown></menu-dropdown>" + "    <!-- <div class=\"navbar-collapse collapse\" id=\"navbar2\">" + "        <ul class=\"navbar-nav ml-auto\">" + "            <li class=\"nav-item dropdown\">" + "" + "            </li>" + "        </ul>" + "    </div> -->" + "</nav>" + "");
}]);
"use strict";

angular.module("directives/menuSidebar/menuSidebar.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/menuSidebar.html", "<div id=\"sidebar\" class=\"sidebar sidebar-left sidebar-transition sidebar-size-3 sidebar-title\">" + "    <!-- Brand -->" + "    <a ng-href=\"#/\" class=\"sidebar-brand\"><img class=\"img img-responsive img-brand\" width=\"190\" src=\"app/assets/img/logos/logo.png\"/></a>" + "    <div class=\"sidebar-heading\">MENU</div>" + "    <ul class=\"sidebar-menu sidebar-text\">" + "      <li ng-repeat=\"menuItem in menuSidebarCtrl.menuItens\" class=\"sidebar-menu-item\">" + "        <div link-sidebar link-sidebar-close ng-if=\"!menuItem.hasSubmenu\" class=\"sidebar-menu-button\" data-toggle=\"sidebar-collapse\" href=\"{{menuItem.href}}\">" + "          <i class=\"sidebar-menu-icon material-icons\">{{menuItem.icon}}</i> {{menuItem.label}}" + "        </div>" + "        <span submenu-sidebar ng-if=\"menuItem.hasSubmenu\" class=\"sidebar-menu-button sidebar-menuItem-button\" data-toggle=\"sidebar-collapse\">" + "          <i class=\"sidebar-menu-icon material-icons\">{{menuItem.icon}}</i> {{menuItem.label}}" + "        </span>" + "        <ul ng-if=\"menuItem.hasSubmenu\" class=\"sidebar-submenu\">" + "          <li ng-repeat=\"submenuItem in menuItem.submenu\" class=\"sidebar-menu-item\">" + "              <div link-sidebar link-sidebar-close class=\"sidebar-menu-button\" href=\"{{submenuItem.href}}\">{{submenuItem.label}}</div>" + "          </li>" + "        </ul>" + "      </li>" + "    </ul>" + "</div>" + "");
}]);
"use strict";

angular.module("directives/strengthPassword/strengthPassword.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/strengthPassword.html", "<div class=\"container-fluid clean-margin\">" + "  <div class=\"row justify-content-center clean-margin\">" + "    <div id=\"worst\" class=\"strength-meter strength-meter-default\"></div>" + "    <div id=\"bad\" class=\"strength-meter strength-meter-default\"></div>" + "    <div id=\"weak\" class=\"strength-meter strength-meter-default\"></div>" + "    <div id=\"good\" class=\"strength-meter strength-meter-default\"></div>" + "    <div id=\"strong\" class=\"strength-meter strength-meter-default\"></div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/modals/alert.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/alert.html", "<div class=\"modal fade \">" + "  <div class=\"modal-dialog\">" + "    <div class=\"modal-content\">" + "      <div class=\"modal-header\">" + "        <h4 class=\"modal-title\">{{alertModalCtrl.title}}</h4>" + "        <button type=\"button\" class=\"close\" ng-click=\"alertModalCtrl.close(false)\" data-dismiss=\"modal\"  aria-hidden=\"true\">&times;</button>" + "      </div>" + "      <div class=\"modal-body\">" + "        <p>{{alertModalCtrl.question}}</p>" + "        <p>{{alertModalCtrl.user}}</p>" + "      </div>" + "      <div class=\"modal-footer\">" + "        <button type=\"button\" ng-click=\"alertModalCtrl.close(true)\" class=\"btn btn-success\" data-dismiss=\"modal\"> Sim</button>" + "        <button type=\"button\" ng-click=\"alertModalCtrl.close(false)\" class=\"btn btn-danger\" data-dismiss=\"modal\"> Não</button>" + "      </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/modals/form-modal.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/form-modal.html", "<div class=\"modal fade \">" + "    <div class=\"modal-dialog\">" + "        <div class=\"modal-content\">" + "            <div class=\"modal-header\">" + "                <h4 class=\"modal-title\">Modal with Form</h4>" + "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>" + "            </div>" + "            <div class=\"modal-body\">" + "                <form ng-submit=\"formModalCtrl.close(true)\" name=\"form-modal\" novalidate>" + "                    <div class=\"form-group\">" + "                        <label for=\"email-input\">Email address</label>" + "                        <input ng-model=\"formModalCtrl.inputs.email\" type=\"email\" class=\"form-control\" id=\"email-input\" aria-describedby=\"email-help\" placeholder=\"Enter email\">" + "                        <small id=\"email-help\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small>" + "                    </div>" + "                    <div class=\"form-group\">" + "                        <label for=\"subject\">Subject</label>" + "                        <input ng-model=\"formModalCtrl.inputs.subject\" type=\"text\" class=\"form-control\" id=\"subject\" placeholder=\"Subject of your message\">" + "                    </div>" + "                    <div class=\"form-group\">" + "                        <label for=\"text-area\">Your message</label>" + "                        <textarea ng-model=\"formModalCtrl.inputs.message\" class=\"form-control\" id=\"text-area\" rows=\"3\"></textarea>" + "                    </div>" + "                    <div class=\"form-check\">" + "                        <label class=\"form-check-label\">" + "                          <input ng-model=\"formModalCtrl.inputs.checkbox\" type=\"checkbox\" class=\"form-check-input\">" + "                          Check me out" + "                        </label>" + "                    </div>" + "                    <div class=\"modal-footer\">" + "                        <button type=\"submit\" class=\"btn btn-primary\">Send</button>" + "                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancel</button>" + "                    </div>" + "                </form>" + "            </div>" + "        </div>" + "    </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/modals/info.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/info.html", "<div class=\"modal fade \">" + "  <div class=\"modal-dialog\">" + "    <div class=\"modal-content\">" + "      <div class=\"modal-header\">" + "        <h4 class=\"modal-title\">{{infoModalCtrl.title}}</h4>" + "        <button type=\"button\" class=\"close\" ng-click=\"infoModalCtrl.close(false)\" data-dismiss=\"modal\"  aria-hidden=\"true\">&times;</button>" + "      </div>" + "      <div class=\"modal-body\">" + "        <h5>{{infoModalCtrl.info}}</h5>" + "      </div>" + "      <div class=\"modal-footer\">" + "        <button type=\"button\" ng-click=\"infoModalCtrl.close(true)\" class=\"btn btn-primary\" data-dismiss=\"modal\"> Fechar</button>" + "      </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/users/users.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/users.html", "<div id=\"content\" class=\"container-fluid side-toogle\">" + "  <div class=\"row\">" + "    <div class=\"col-md-12\">" + "      <div class=\"card\">" + "        <div class=\"card-header at-no-border\">" + "          Tabela Gerencial de Consultores" + "        </div>" + "        <div class=\"card-block \">" + "          <div class=\"row\">" + "            <div class=\"col-md-12\">" + "              <form class=\"form-inline\">" + "                <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">" + "                  <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>" + "                  <input ng-model=\"usersCtrl.key\" ng-change=\"usersCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">" + "                </div>" + "                <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"usersCtrl.selectedPredicate\" ng-change=\"usersCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in usersCtrl.predicates\" ng-selected=\"{{predicate.label == usersCtrl.selectedPredicate}}\"></select>" + "                <button ng-click=\"usersCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>" + "              </form>" + "            </div>" + "          </div>" + "          <table class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"usersCtrl.filteredList\" at-config=\"usersCtrl.config\">" + "            <thead></thead>" + "            <tbody class=\"col-md-12\">" + "            <tr ng-repeat=\"item in usersCtrl.filteredList\">" + "              <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-attribute=\"name\" at-sortable>{{item.account.name}}</td>" + "              <td class=\"align-middle\" at-title=\"Email\" at-sortable at-attribute=\"email\">{{item.account.email}}</td>" + "              <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.account.isActive | status}}</td>" + "              <td class=\"align-middle\" at-title=\"Ação\">" + "                <button ng-hide=\"true\" class=\"btn btn-primary btn-smn\"><i class=\"material-icons\">search</i></button>" + "                <button ng-click=\"usersCtrl.active(item._id,item.account.email,item.account.isActive)\" class=\"btn btn-primary btn-smn\">" + "                  <i ng-if=\"item.account.isActive\" class=\"material-icons\">check_circle</i>" + "                  <i ng-if=\"!item.account.isActive\" class=\"material-icons\">radio_button_unchecked</i>" + "                </button>" + "                <button ng-hide=\"true\" class=\"btn btn-danger btn-smn\"><i class=\"material-icons\">delete_forever</i></button>" + "              </td>" + "            </tr>" + "            </tbody>" + "          </table>" + "          <div class=\"row controler-table\">" + "            <div class=\"col-md-6\">" + "              <div class=\"at-select-page form-group\">" + "                <label class=\"at-label\">Ver </label>" + "                <select class=\"pagination-table custom-select\" ng-init=\"usersCtrl.config.itemsPerPage = '10'\" ng-model=\"usersCtrl.config.itemsPerPage\" class=\"form-control\">" + "                  <option value=\"5\">5</option>" + "                  <option value=\"10\">10</option>" + "                  <option value=\"20\">20</option>" + "                  <option value=\"50\">50</option>" + "                </select>" + "                <label class=\"at-label\">itens</label>" + "              </div>" + "            </div>" + "            <div class=\"col-md-6\">" + "              <at-pagination at-list=\"usersCtrl.filteredList\" at-config=\"usersCtrl.config\" class=\"pag-table at-pagination\"></at-pagination>" + "            </div>" + "          </div>" + "        </div>" + "      </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/profile/profile.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/profile.html", "<div id=\"content\" class=\"container-fluid side-toogle\">" + "  <div class=\"col-md-12\">" + "      <div class=\"card\">" + "          <div class=\"card-header\">" + "              Profile" + "          </div>" + "          <div class=\"card-block\">" + "              <h1>Profile Page</h1>" + "          </div>" + "      </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

angular.module("views/profile/settings.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/settings.html", "<div id=\"content\" class=\"container-fluid side-toogle\">" + "  <div class=\"col-md-12\">" + "    <div class=\"card\">" + "      <div class=\"card-block\">" + "        <div class=\"row\">" + "          <div class=\"col-md-12\">" + "            <ul class=\"nav nav-tabs nav-justified\">" + "              <li ng-class=\"{ active: settingsCtrl.isSet(1) }\" class=\"nav-item\">" + "                <a ng-click=\"settingsCtrl.setTab(1)\" class=\"nav-link\" href>Perfil</a>" + "              </li>" + "              <li ng-class=\"{ active: settingsCtrl.isSet(2) }\" class=\"nav-item\">" + "                <a ng-click=\"settingsCtrl.setTab(2)\" class=\"nav-link\" href>Senha</a>" + "              </li>" + "            </ul>" + "          </div>" + "        </div>" + "        <div ng-show=\"settingsCtrl.isSet(1)\">" + "          <form role=\"form\" name=\"UpdateProfileForm\" ng-submit=\"settingsCtrl.updateProfile()\" novalidate>" + "            <div ng-show=\"settingsCtrl.alertMessage.show\" ng-class=\"'alert-' + (settingsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">" + "              <button ng-click=\"settingsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">" + "                <span aria-hidden=\"true\">&times;</span>" + "              </button>" + "              <strong> {{settingsCtrl.alertMessage.message}}" + "            </div>" + "            <div class=\"row account-col\">" + "              <div class=\"col-md-3\">" + "                <div class=\"form-group\">" + "                  <p class=\"font-weight-bold\">Imagem de perfil</p>" + "                  <p class=\"font-weight-normal\">Você pode alterar sua imagem de perfil aqui.</p>" + "                </div>" + "              </div>" + "              <div class=\"col-md-3 img-perfil\">" + "                <img ngf-thumbnail=\"settingsCtrl.pictures[0].url || '//placehold.it/160'\" width=\"160\" height=\"160\" class=\"rounded-circle\" />" + "              </div>" + "              <div class=\"col-md-3\">" + "                <div class=\"form-group\">" + "                  <label for=\"subject\">Imagem</label>" + "                </div>" + "                <input ng-if=\"settingsCtrl.pictures\" id=\"uploadPicture\" type=\"button\" class=\"btn\" value=\"{{settingsCtrl.btn.name}}\" name=\"picture\" ngf-select=\"settingsCtrl.setInBuffer($files)\" ngf-select-disabled=\"settingsCtrl.btn.select\" ngf-accept=\"'image/*'\" ng-click=\"settingsCtrl.remove()\" ng-model=\"settingsCtrl.inputs.picture\">" + "              </div>" + "            </div>" + "            <div class=\"row account-col\">" + "              <div class=\"col-md-3\">" + "                <div class=\"form-group\">" + "                  <p class=\"font-weight-bold\">Configurações principais</p>" + "                  <p class=\"font-weight-normal\">Estas informações irão aparecer no seu perfil.</p>" + "                </div>" + "              </div>" + "              <div class=\"col-md-8\">" + "                <div class=\"form-group\">" + "                  <label for=\"subject\">Seu nome</label>" + "                  <input ng-disabled=\"true\" type=\"text\" name=\"name\" ng-model=\"settingsCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite seu nome\" ng-class=\"{'has-error': UpdateProfileForm.name.$invalid && UpdateProfileForm.name.$dirty}\" ui-br-name required>" + "                  <div class=\"error-container\" ng-show=\"UpdateProfileForm.name.$dirty && UpdateProfileForm.name.$invalid\">" + "                    <small ng-show=\"UpdateProfileForm.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>" + "                    <small ng-show=\"UpdateProfileForm.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>" + "                  </div>" + "                </div>" + "                <div class=\"form-group\">" + "                  <label for=\"exampleInputEmail1\">Endereço de email</label>" + "                  <input  ng-disabled=\"true\" type=\"email\" name=\"email\" ng-model=\"settingsCtrl.inputs.email\" class=\"form-control\" placeholder=\"email@examplo.com.br\" ng-class=\"{'has-error': UpdateProfileForm.email.$invalid && UpdateProfileForm.email.$dirty}\" ui-email=\"logged\" required>" + "                  <small id=\"emailHelp\" class=\"form-text text-muted\">Nós nunca compartilharemos seu email com ninguém.</small>" + "                  <div class=\"error-container\" ng-show=\"UpdateProfileForm.email.$dirty && UpdateProfileForm.email.$invalid\">" + "                    <small ng-show=\"UpdateProfileForm.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>" + "                    <small ng-show=\"UpdateProfileForm.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>" + "                    <small ng-show=\"UpdateProfileForm.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>" + "                  </div>" + "                </div>" + "                <div class=\"form-group\">" + "                  <label for=\"exampleInputEmail1\">Celular</label>" + "                  <input  ng-disabled=\"true\" type=\"tel\" name=\"phoneNumber\" ng-model=\"settingsCtrl.inputs.phoneNumber\" class=\"form-control\" placeholder=\"(xx) XXXXX-XXXX\" ng-class=\"{'has-error': UpdateProfileForm.phoneNumber.$invalid && UpdateProfileForm.phoneNumber.$dirty}\" ui-br-cellphone required>" + "                  <small id=\"phoneHelp\" class=\"form-text text-muted\">Nós nunca compartilharemos seu celular com ninguém.</small>" + "                  <div class=\"error-container\" ng-show=\"RegisterForm.phoneNumber.$dirty && RegisterForm.phoneNumber.$invalid\">" + "                    <small ng-show=\"RegisterForm.phoneNumber.$error.required\" class=\"form-text text-muted text-danger\">O celular é obrigatório.</small>" + "                    <small ng-show=\"RegisterForm.phoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um celular válido.</small>" + "                    <small ng-show=\"RegisterForm.phoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">Este celular já foi utilizado por outra conta.</small>" + "                  </div>" + "                </div>" + "                <button type=\"submit\" ng-disabled=\"UpdateProfileForm.$invalid\" class=\"btn btn-primary\">" + "                  <div ng-show=\"settingsCtrl.start\" class=\"loader loader-btn\">" + "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "                      <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "                    </svg>" + "                  </div>" + "                  <span ng-show=\"!settingsCtrl.start\">Atualizar</span>" + "                </button>" + "              </div>" + "            </div>" + "          </form>" + "        </div>" + "" + "        <div ng-show=\"settingsCtrl.isSet(2)\">" + "          <div class=\"row account-col\">" + "            <div class=\"col-md-3\">" + "              <div class=\"form-group\">" + "                <p class=\"font-weight-bold\">Senha</p>" + "                <p class=\"font-weight-normal\">Após uma atualização de senha bem-sucedida, você será redirecionado para a página de login onde poderá fazer login com sua nova senha.</p>" + "              </div>" + "            </div>" + "            <div class=\"col-md-8\">" + "              <form role=\"form\" name=\"UpdatePassForm\" ng-submit=\"settingsCtrl.updatePassword()\" novalidate>" + "                <div ng-show=\"settingsCtrl.alertMessage.show\" ng-class=\"'alert-' + (settingsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">" + "                  <button ng-click=\"settingsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">" + "                    <span aria-hidden=\"true\">&times;</span>" + "                  </button>" + "                  <strong> {{settingsCtrl.alertMessage.message}}" + "                </div>" + "                <div class=\"form-group\">" + "                  <label for=\"exampleInputEmail1\">Senha atual</label>" + "                  <input ng-model=\"settingsCtrl.account.currentPassword\" type=\"password\" name=\"currentPassword\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.currentPassword.$invalid && UpdatePassForm.currentPassword.$dirty}\" current-password current-email=\"{{settingsCtrl.inputs.email}}\" aria-describedby=\"passwordHelp\" required>" + "                  <small id=\"passwordHelp\" class=\"form-text text-muted\">Você deve fornecer sua senha atual para alterá-la.</small>" + "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.currentPassword.$dirty && UpdatePassForm.currentPassword.$invalid\">" + "                    <small ng-show=\"UpdatePassForm.currentPassword.$error.required\" class=\"form-text text-muted text-danger\">É obrigatório digitar a senha atual para modificar a senha.</small>" + "                    <small ng-show=\"UpdatePassForm.currentPassword.$error.currentPassword\" class=\"form-text text-muted text-danger\">A senha digitada não corresponde a senha atual.</small>" + "                  </div>" + "                </div>" + "                <div class=\"form-group\">" + "                  <label for=\"exampleInputEmail1\">Nova senha</label>" + "                  <input ng-model=\"settingsCtrl.account.newPassword\" type=\"password\" name=\"newPassword\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.newPassword.$invalid && UpdatePassForm.newPassword.$dirty}\" aria-describedby=\"passwordHelp\" ui-password match=\"settingsCtrl.account.currentPassword\" not-match=\"true\" required>" + "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.newPassword.$dirty && UpdatePassForm.newPassword.$invalid\">" + "                    <small ng-show=\"UpdatePassForm.newPassword.$error.required\" class=\"form-text text-muted text-danger\">Este campo é obrigatório.</small>" + "                    <small ng-show=\"UpdatePassForm.newPassword.$error.weakPassword\" class=\"form-text text-muted text-danger\">A senha digitada é muito fraca.</small>" + "                    <small ng-show=\"UpdatePassForm.newPassword.$error.match\" class=\"form-text text-muted text-danger\">A nova senha não pode ser igual a senha atual.</small>" + "                  </div>" + "                </div>" + "                <div class=\"form-group\">" + "                  <label for=\"exampleInputEmail1\">Confirmar senha</label>" + "                  <input ng-model=\"settingsCtrl.account.newPasswordConf\" type=\"password\" name=\"newPasswordConf\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.newPasswordConf.$invalid && UpdatePassForm.newPasswordConf.$dirty}\" aria-describedby=\"newPasswordHelp\" match=\"settingsCtrl.account.newPassword\" required>" + "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.newPasswordConf.$dirty && UpdatePassForm.newPasswordConf.$invalid\">" + "                    <small ng-show=\"UpdatePassForm.newPasswordConf.$error.required\" class=\"form-text text-muted text-danger\">Este campo é obrigatório.</small>" + "                    <small ng-show=\"UpdatePassForm.newPasswordConf.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>" + "                  </div>" + "                </div>" + "                <button ng-disabled=\"UpdatePassForm.$invalid\" type=\"submit\" class=\"btn btn-primary\">" + "                  <div ng-show=\"settingsCtrl.start\" class=\"loader loader-btn\">" + "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">" + "                      <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>" + "                    </svg>" + "                  </div>" + "                  <span ng-show=\"!settingsCtrl.start\">Alterar senha</span>" + "                </button>" + "              </form>" + "            </div>" + "          </div>" + "        </div>" + "      </div>" + "    </div>" + "  </div>" + "</div>" + "");
}]);
"use strict";

(function (angular, undefined) {
	angular.module("dashboard").constant("url_base", "http://localhost:5000").constant("CloudinaryConstant", {
		"cloud_name": "test",
		"secure": true,
		"upload_preset": "test_preset"
	}).constant("offPaths", ["/login", "/cadastrar", "/recuperar"]);
})(angular);