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