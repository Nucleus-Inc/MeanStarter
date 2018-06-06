angular.module("directives/menuSidebar/menuSidebar.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/menuSidebar.html",
    "<div id=\"sidebar\" class=\"sidebar sidebar-left sidebar-transition sidebar-size-3 sidebar-title\">"+
    "    <!-- Brand -->"+
    "    <a ng-href=\"#/\" class=\"sidebar-brand\"><img class=\"img img-responsive img-brand\" width=\"190\" src=\"app/assets/img/logos/logo.png\"/></a>"+
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