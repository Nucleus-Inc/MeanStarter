angular.module("views/modals/plan-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/plan-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{planFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"planFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "                <form ng-submit=\"planFormModalCtrl.close(true)\" name=\"PlanFormModal\" novalidate>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Plano</label>"+
    "                      <input type=\"text\" name=\"name\" ng-model=\"planFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PlanFormModal.name.$invalid && PlanFormModal.name.$dirty}\" verify-plans required>"+
    "                      <div class=\"error-container\" ng-show=\"PlanFormModal.name.$dirty && PlanFormModal.name.$invalid\">"+
    "                        <small ng-show=\"PlanFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                        <small ng-show=\"PlanFormModal.name.$error.planExists\" class=\"form-text text-muted text-danger\">Este nome já foi usado em outra categoria.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"form-group\">"+
    "                      <label class=\"card-label\" for=\"formGroupExampleInput\">Descrição</label>"+
    "                      <textarea ng-model=\"planFormModalCtrl.inputs.desc\" class=\"form-control\" id=\"exampleTextarea\" rows=\"4\" placeholder=\"Digite uma descrição para o plano\" ng-class=\"{'has-error': PlanFormModal.name.$invalid && PlanFormModal.name.$dirty}\" required></textarea>"+
    "                      <div class=\"error-container\" ng-show=\"PlanFormModal.name.$dirty && PlanFormModal.name.$invalid\">"+
    "                        <small ng-show=\"PlanFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"modal-footer\">"+
    "                        <button type=\"submit\" ng-disabled=\"PlanFormModal.$invalid\" class=\"btn btn-primary\">{{planFormModalCtrl.label}}</button>"+
    "                        <button type=\"button\" ng-click=\"planFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                    </div>"+
    "                </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);