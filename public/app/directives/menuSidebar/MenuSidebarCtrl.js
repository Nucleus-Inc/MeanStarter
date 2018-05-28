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
