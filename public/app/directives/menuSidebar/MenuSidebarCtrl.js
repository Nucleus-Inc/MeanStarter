(function() {
  angular.module('dashboard').controller('MenuSidebarCtrl', [function() {

    var vm = this;

    vm.menuItens = [
      {
        "icon": "dashboard",
        "label": "Home",
        "href": "/",
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
      {
        "icon": "face",
        "label": "Clientes",
        "href": "",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Pendentes",
            "href": "/clientes/pendentes"
          },
          {
            "label": "Geral",
            "href": "/clientes"
          }
        ]
      },
      {
        "icon": "store_mall_directory",
        "label": "Parceiros",
        "href": "",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Pendentes",
            "href": "/parceiros/pendentes"
          },
          {
            "label": "Geral",
            "href": "/parceiros"
          }
        ]
      },
      {
        "icon": "content_cut",
        "label": "Serviços",
        "href": "",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Pendentes",
            "href": "/servicos/pendentes"
          },
          {
            "label": "Geral",
            "href": "/servicos"
          }
        ]
      },
      {
        "icon": "code",
        "label": "Desenvolvimento",
        "href": "",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Suporte",
            "href": "/suporte"
          },
          {
            "label": "Log de Erros",
            "href": "/logs"
          }
        ]
      }
    ];

  }]);
}());
