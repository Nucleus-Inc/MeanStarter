angular.module("directives/cardsBi/cardsBi.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/cardsBi.html",
    "<div class=\"card-heading\">"+
    "  <div class=\"card-box\">"+
    "    <i class=\"material-icons icon-card\">{{cardsBiCtrl.icon}}</i>"+
    "  </div>"+
    "  <div class=\"card-block\">"+
    "    <div ng-show=\"cardsBiCtrl.start\" class=\"loader\">"+
    "      <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "        <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "      </svg>"+
    "    </div>"+
    "    <h4 ng-show=\"!cardsBiCtrl.start\" class=\"cards-title\">{{cardsBiCtrl.value}}</h4>"+
    "    <p class=\"card-text\">{{cardsBiCtrl.label | biLabel}}</p>"+
    "  </div>"+
    "</div>"+
    "");
}]);