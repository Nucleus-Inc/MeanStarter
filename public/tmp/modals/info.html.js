angular.module("views/modals/info.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/info.html",
    "<div class=\"modal fade \">"+
    "  <div class=\"modal-dialog\">"+
    "    <div class=\"modal-content\">"+
    "      <div class=\"modal-header\">"+
    "        <h4 class=\"modal-title\">{{infoModalCtrl.title}}</h4>"+
    "        <button type=\"button\" class=\"close\" ng-click=\"infoModalCtrl.close(false)\" data-dismiss=\"modal\"  aria-hidden=\"true\">&times;</button>"+
    "      </div>"+
    "      <div class=\"modal-body\">"+
    "        <h5>{{infoModalCtrl.info}}</h5>"+
    "      </div>"+
    "      <div class=\"modal-footer\">"+
    "        <button type=\"button\" ng-click=\"infoModalCtrl.close(true)\" class=\"btn btn-primary\" data-dismiss=\"modal\"> Fechar</button>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);