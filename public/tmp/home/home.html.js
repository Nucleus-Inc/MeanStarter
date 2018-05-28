angular.module("views/home/home.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/home.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"row\">"+
    "    <div class=\"col-lg-12\">"+
    "      <div class=\"cards-dash row\">"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/ofertas\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"offers\" bi-icon=\"shopping_cart\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/categorias\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"categories\" bi-icon=\"list\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/parceiros\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"partners\" bi-icon=\"contacts\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "        <div class=\"col-lg-3 col-md-6\">"+
    "          <a href=\"#/planos\" class=\"card\">"+
    "            <cards-bi bi-data=\"homeCtrl.numbers\" bi-name=\"plans\" bi-icon=\"assignment\"></cards-bi>"+
    "          </a>"+
    "        </div>"+
    "      </div>"+
    "      <div class=\"row card-row-style\">"+
    "        <div class=\"card card-style\">"+
    "          <div class=\"card-header\">"+
    "            Ofertas Cadastrados"+
    "          </div>"+
    "          <div class=\"card-block\">"+
    "            <canvas class=\"chart chart-line\" height=\"110\" chart-data=\"homeCtrl.data\" chart-labels=\"homeCtrl.labels\" chart-series=\"series\"></canvas>"+
    "          </div>"+
    "        </div>"+
    "        <div class=\"card card-style-graph\">"+
    "          <div class=\"card-header contet-gaph\">"+
    "            Estatísticas Gerais (%)"+
    "          </div>"+
    "          <div class=\"card-block\">"+
    "            <canvas class=\"chart chart-doughnut\" height=\"192\" chart-data=\"homeCtrl.donutData\" chart-labels=\"homeCtrl.donutLabels\" chart-colors=\"homeCtrl.colors\"></canvas>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);