(() => {
  angular.module('dashboard').controller('MenuSidebarCtrl', [ function() {

    let vm = this

    vm.menuItens = [
      {
        "icon": "dashboard",
        "label": "Home",
        "href": "/",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "list",
        "label": "Usuários",
        "href": "/usuarios",
        "hasSubmenu": false,
        "submenu": []
      },
      {
        "icon": "shopping_cart",
        "label": "Exemplo #1",
        "href": "",
        "hasSubmenu": true,
        "submenu": [
          {
            "label": "Pendentes",
            "href": "/exemplo/pendentes"
          },
          {
            "label": "Geral",
            "href": "/exemplo"
          }
        ]
      },
      {
        "icon": "contacts",
        "label": "Exemplo #2",
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
        "icon": "assignment",
        "label": "Exemplo #3",
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
      }
    ]

  }])
})()
