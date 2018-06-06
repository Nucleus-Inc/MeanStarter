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