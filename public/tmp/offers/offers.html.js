angular.module("views/offers/offers.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/offers.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-header\">"+
    "        Tabela Gerencial de Ofertas"+
    "      </div>"+
    "      <div class=\"card-block \">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <form class=\"form-inline\">"+
    "              <div class=\"input-group mb-4 mr-sm-4 mb-sm-0\">"+
    "                <div class=\"input-group-addon\"><i class=\"material-icons\">search</i></div>"+
    "                <input ng-model=\"offersCtrl.key\" ng-change=\"offersCtrl.update()\" type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"Pesquisa ...\">"+
    "              </div>"+
    "              <select class=\"custom-select mb-sm-0 mr-sm-2 input-md\" id=\"predicate\" ng-model=\"offersCtrl.selectedPredicate\" ng-change=\"offersCtrl.update()\" ng-options=\"predicate.label as predicate.label for predicate in offersCtrl.predicates\" ng-selected=\"{{predicate.label == offersCtrl.selectedPredicate}}\"></select>"+
    "              <button ng-click=\"offersCtrl.clean()\" type=\"button\" class=\"btn btn-default\">Limpar filtro</button>"+
    "            </form>"+
    "          </div>"+
    "        </div>"+
    ""+
    "        <table ng-if=\"offersCtrl.showTable == true\" class=\"table table-striped table-responsive\" at-table at-paginated at-list=\"offersCtrl.filteredList\" at-config=\"offersCtrl.config\">"+
    "          <thead></thead>"+
    "          <tbody class=\"col-md-12\">"+
    "          <tr ng-repeat=\"item in offersCtrl.filteredList\">"+
    "            <td class=\"align-middle\" at-title=\"Oferta\" at-initial-sorting=\"asc\" at-sortable at-attribute=\"title\">{{item.title}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Parceiro\" at-sortable at-attribute=\"partner.companyName\">{{item.partner.companyName}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Duração da Oferta\" at-sortable at-attribute=\"duration.expireDate\">{{item.duration.expireDate | amUtcOffset:'-0300' | amDateFormat:'DD/MM/YYYY'}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Status\" at-sortable at-attribute=\"approval.status\">{{item.approval.status | status}}</td>"+
    "            <td class=\"align-middle\" at-title=\"Ação\">"+
    "              <button ng-click=\"offersCtrl.view(item._id)\" class=\"btn btn-primary btn-smn\"><i class=\"material-icons\">search</i></button>"+
    "              <button ng-click=\"offersCtrl.active(item._id,item.title,item.approval.status)\" class=\"btn btn-primary btn-smn\">"+
    "                <i ng-if=\"item.approval.status=='approved' || item.approval.status=='approv'\" class=\"material-icons\">check_circle</i>"+
    "                <i ng-if=\"item.approval.status=='reproved' || item.approval.status=='reprov' || item.approval.status=='pending' || item.approval.status=='pend'\" class=\"material-icons\">radio_button_unchecked</i>"+
    "              </button>"+
    "              <button ng-hide=\"true\" class=\"btn btn-danger btn-smn\"><i class=\"material-icons\">delete_forever</i></button>"+
    "            </td>"+
    "          </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <table ng-if=\"offersCtrl.showTable == false\" class=\"table table-striped table-responsive\">"+
    "          <thead>"+
    "            <tr>"+
    "              <th>Oferta <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Parceiro <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Duração da Oferta <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Status <i style=\"margin-left: 10px;\" class=\"fa fa-minus\"></i></th>"+
    "              <th>Ação </th>"+
    "            </tr>"+
    "          </thead>"+
    "          <tbody>"+
    "            <tr>"+
    "              <td colspan=\"5\" class=\"text-center\"><i class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px; margin-right: 10px;\"></i> <span style=\"vertical-align: 25%;\">Aguarde um instante..</span></td>"+
    "            </tr>"+
    "          </tbody>"+
    "        </table>"+
    ""+
    "        <div ng-if=\"offersCtrl.showTable == true\" class=\"row controler-table\">"+
    "          <div class=\"col-md-6\">"+
    "            <div class=\"form-group\">"+
    "              <label>Ver </label>"+
    "              <select class=\"pagination-table custom-select\" ng-init=\"offersCtrl.config.itemsPerPage = '10'\" ng-model=\"offersCtrl.config.itemsPerPage\" class=\"form-control\">"+
    "                <option value=\"5\">5</option>"+
    "                <option value=\"10\">10</option>"+
    "                <option value=\"20\">20</option>"+
    "                <option value=\"50\">50</option>"+
    "              </select>"+
    "              <label>itens</label>"+
    "            </div>"+
    "          </div>"+
    "          <div class=\"col-md-6\">"+
    "            <at-pagination at-list=\"offersCtrl.filteredList\" at-config=\"offersCtrl.config\" class=\"pag-table\" at-translate></at-pagination>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);