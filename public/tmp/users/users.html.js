angular.module("views/users/users.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/users.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"row\">"+
    "    <div class=\"col-md-12\">"+
    "      <div class=\"card\">"+
    "        <div class=\"card-header\">"+
    "          Tabela Gerencial de Consultores"+
    "        </div>"+
    "        <div class=\"card-block \">"+
    "          <div class=\"row\">"+
    "            <div class=\"col-md-12\">"+
    "              <form class=\"form-inline\">"+
    "                <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                  <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                  <input ng-model=\"usersCtrl.key\" ng-change=\"usersCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "                </div>"+
    "                <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"usersCtrl.selectedPredicate\" ng-change=\"usersCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in usersCtrl.predicates\" ng-selected=\"{{predicate.label == usersCtrl.selectedPredicate}}\"></select>"+
    "                <button ng-click=\"usersCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "              </form>"+
    "            </div>"+
    "          </div>"+
    "          <table class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"usersCtrl.filteredList\" at-config=\"usersCtrl.config\">"+
    "            <thead></thead>"+
    "            <tbody class=\"col-md-12\">"+
    "            <tr ng-repeat=\"item in usersCtrl.filteredList\">"+
    "              <td class=\"align-middle\" at-title=\"Nome\" at-initial-sorting=\"asc\" at-attribute=\"name\" at-sortable>{{item.account.name}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Email\" at-sortable at-attribute=\"email\">{{item.account.email}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"isActive\">{{item.account.isActive | status}}</td>"+
    "              <td class=\"align-middle\" at-title=\"Ação\">"+
    "                <button ng-hide=\"true\" class=\"btn btn-primary btn-smn\"><i class=\"material-icons\">search</i></button>"+
    "                <button ng-click=\"usersCtrl.active(item._id,item.account.email,item.account.isActive)\" class=\"btn btn-primary btn-smn\">"+
    "                  <i ng-if=\"item.account.isActive\" class=\"material-icons\">check_circle</i>"+
    "                  <i ng-if=\"!item.account.isActive\" class=\"material-icons\">radio_button_unchecked</i>"+
    "                </button>"+
    "                <button ng-hide=\"true\" class=\"btn btn-danger btn-smn\"><i class=\"material-icons\">delete_forever</i></button>"+
    "              </td>"+
    "            </tr>"+
    "            </tbody>"+
    "          </table>"+
    "          <div class=\"row controler-table\">"+
    "            <div class=\"col-md-6\">"+
    "              <div class=\"form-group\">"+
    "                <label>Ver </label>"+
    "                <select class=\"pagination-table custom-select\" ng-init=\"usersCtrl.config.itemsPerPage = '10'\" ng-model=\"usersCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                  <option value=\"5\">5</option>"+
    "                  <option value=\"10\">10</option>"+
    "                  <option value=\"20\">20</option>"+
    "                  <option value=\"50\">50</option>"+
    "                </select>"+
    "                <label>itens</label>"+
    "              </div>"+
    "            </div>"+
    "            <div class=\"col-md-6\">"+
    "              <at-pagination at-list=\"usersCtrl.filteredList\" at-config=\"usersCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "            </div>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);