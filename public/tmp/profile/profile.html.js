angular.module("views/profile/profile.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/profile.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "      <div class=\"card\">"+
    "          <div class=\"card-header\">"+
    "              Profile"+
    "          </div>"+
    "          <div class=\"card-block\">"+
    "              <h1>Profile Page</h1>"+
    "          </div>"+
    "      </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);