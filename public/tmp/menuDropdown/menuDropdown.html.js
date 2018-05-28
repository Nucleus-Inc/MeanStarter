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