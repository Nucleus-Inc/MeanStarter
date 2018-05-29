angular.module("directives/menuNavbar/menuNavbar.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/menuNavbar.html",
    "<nav ng-if=\"menuNavbarCtrl.logged==true\" class=\"navbar navbar-toggleable-sm bg-white\">"+
    "    <button id=\"toggler-button\" sidebar-toogler class=\"navbar-toggler toggle\" type=\"button\">"+
    "      &#9776;"+
    "    </button>"+
    "    <menu-dropdown></menu-dropdown>"+
    "    <!-- <div class=\"navbar-collapse collapse\" id=\"navbar2\">"+
    "        <ul class=\"navbar-nav ml-auto\">"+
    "            <li class=\"nav-item dropdown\">"+
    ""+
    "            </li>"+
    "        </ul>"+
    "    </div> -->"+
    "</nav>"+
    "");
}]);