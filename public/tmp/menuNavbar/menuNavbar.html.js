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