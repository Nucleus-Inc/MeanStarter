angular.module("views/profile/settings.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/settings.html",
    "<div id=\"content\" class=\"container-fluid side-toogle\">"+
    "  <div class=\"col-md-12\">"+
    "    <div class=\"card\">"+
    "      <div class=\"card-block\">"+
    "        <div class=\"row\">"+
    "          <div class=\"col-md-12\">"+
    "            <ul class=\"nav nav-tabs nav-justified\">"+
    "              <li ng-class=\"{ active: settingsCtrl.isSet(1) }\" class=\"nav-item\">"+
    "                <a ng-click=\"settingsCtrl.setTab(1)\" class=\"nav-link\" href>Perfil</a>"+
    "              </li>"+
    "              <li ng-class=\"{ active: settingsCtrl.isSet(2) }\" class=\"nav-item\">"+
    "                <a ng-click=\"settingsCtrl.setTab(2)\" class=\"nav-link\" href>Senha</a>"+
    "              </li>"+
    "            </ul>"+
    "          </div>"+
    "        </div>"+
    "        <div ng-show=\"settingsCtrl.isSet(1)\">"+
    "          <form role=\"form\" name=\"UpdateProfileForm\" ng-submit=\"settingsCtrl.updateProfile()\" novalidate>"+
    "            <div ng-show=\"settingsCtrl.alertMessage.show\" ng-class=\"'alert-' + (settingsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">"+
    "              <button ng-click=\"settingsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">"+
    "                <span aria-hidden=\"true\">&times;</span>"+
    "              </button>"+
    "              <strong> {{settingsCtrl.alertMessage.message}}"+
    "            </div>"+
    "            <div class=\"row account-col\">"+
    "              <div class=\"col-md-3\">"+
    "                <div class=\"form-group\">"+
    "                  <p class=\"font-weight-bold\">Imagem de perfil</p>"+
    "                  <p class=\"font-weight-normal\">Você pode alterar sua imagem de perfil aqui.</p>"+
    "                </div>"+
    "              </div>"+
    "              <div class=\"col-md-3 img-perfil\">"+
    "                <img ngf-thumbnail=\"settingsCtrl.pictures[0].url || '//placehold.it/160'\" width=\"160\" height=\"160\" class=\"rounded-circle\" />"+
    "              </div>"+
    "              <div class=\"col-md-3\">"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"subject\">Imagem</label>"+
    "                </div>"+
    "                <input ng-if=\"settingsCtrl.pictures\" id=\"uploadPicture\" type=\"button\" class=\"btn\" value=\"{{settingsCtrl.btn.name}}\" name=\"picture\" ngf-select=\"settingsCtrl.setInBuffer($files)\" ngf-select-disabled=\"settingsCtrl.btn.select\" ngf-accept=\"'image/*'\" ng-click=\"settingsCtrl.remove()\" ng-model=\"settingsCtrl.inputs.picture\">"+
    "              </div>"+
    "            </div>"+
    "            <div class=\"row account-col\">"+
    "              <div class=\"col-md-3\">"+
    "                <div class=\"form-group\">"+
    "                  <p class=\"font-weight-bold\">Configurações principais</p>"+
    "                  <p class=\"font-weight-normal\">Estas informações irão aparecer no seu perfil.</p>"+
    "                </div>"+
    "              </div>"+
    "              <div class=\"col-md-8\">"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"subject\">Seu nome</label>"+
    "                  <input ng-disabled=\"true\" type=\"text\" name=\"name\" ng-model=\"settingsCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite seu nome\" ng-class=\"{'has-error': UpdateProfileForm.name.$invalid && UpdateProfileForm.name.$dirty}\" ui-br-name required>"+
    "                  <div class=\"error-container\" ng-show=\"UpdateProfileForm.name.$dirty && UpdateProfileForm.name.$invalid\">"+
    "                    <small ng-show=\"UpdateProfileForm.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                    <small ng-show=\"UpdateProfileForm.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Endereço de email</label>"+
    "                  <input  ng-disabled=\"true\" type=\"email\" name=\"email\" ng-model=\"settingsCtrl.inputs.email\" class=\"form-control\" placeholder=\"email@examplo.com.br\" ng-class=\"{'has-error': UpdateProfileForm.email.$invalid && UpdateProfileForm.email.$dirty}\" ui-email=\"logged\" required>"+
    "                  <small id=\"emailHelp\" class=\"form-text text-muted\">Nós nunca compartilharemos seu email com ninguém.</small>"+
    "                  <div class=\"error-container\" ng-show=\"UpdateProfileForm.email.$dirty && UpdateProfileForm.email.$invalid\">"+
    "                    <small ng-show=\"UpdateProfileForm.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>"+
    "                    <small ng-show=\"UpdateProfileForm.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "                    <small ng-show=\"UpdateProfileForm.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Celular</label>"+
    "                  <input  ng-disabled=\"true\" type=\"tel\" name=\"phoneNumber\" ng-model=\"settingsCtrl.inputs.phoneNumber\" class=\"form-control\" placeholder=\"(xx) XXXXX-XXXX\" ng-class=\"{'has-error': UpdateProfileForm.phoneNumber.$invalid && UpdateProfileForm.phoneNumber.$dirty}\" ui-email=\"logged\" required>"+
    "                  <small id=\"phoneHelp\" class=\"form-text text-muted\">Nós nunca compartilharemos seu celular com ninguém.</small>"+
    "                  <div class=\"error-container\" ng-show=\"RegisterForm.phoneNumber.$dirty && RegisterForm.phoneNumber.$invalid\">"+
    "                    <small ng-show=\"RegisterForm.phoneNumber.$error.required\" class=\"form-text text-muted text-danger\">O celular é obrigatório.</small>"+
    "                    <small ng-show=\"RegisterForm.phoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um celular válido.</small>"+
    "                    <small ng-show=\"RegisterForm.phoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">Este celular já foi utilizado por outra conta.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <button type=\"submit\" ng-disabled=\"UpdateProfileForm.$invalid\" class=\"btn btn-primary\">"+
    "                  <div ng-show=\"settingsCtrl.start\" class=\"loader loader-btn\">"+
    "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "                      <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "                    </svg>"+
    "                  </div>"+
    "                  <span ng-show=\"!settingsCtrl.start\">Atualizar</span>"+
    "                </button>"+
    "              </div>"+
    "            </div>"+
    "          </form>"+
    "        </div>"+
    ""+
    "        <div ng-show=\"settingsCtrl.isSet(2)\">"+
    "          <div class=\"row account-col\">"+
    "            <div class=\"col-md-3\">"+
    "              <div class=\"form-group\">"+
    "                <p class=\"font-weight-bold\">Senha</p>"+
    "                <p class=\"font-weight-normal\">Após uma atualização de senha bem-sucedida, você será redirecionado para a página de login onde poderá fazer login com sua nova senha.</p>"+
    "              </div>"+
    "            </div>"+
    "            <div class=\"col-md-8\">"+
    "              <form role=\"form\" name=\"UpdatePassForm\" ng-submit=\"settingsCtrl.updatePassword()\" novalidate>"+
    "                <div ng-show=\"settingsCtrl.alertMessage.show\" ng-class=\"'alert-' + (settingsCtrl.alertMessage.type)\" class=\"alert alert-dismissible fade show\" role=\"alert\">"+
    "                  <button ng-click=\"settingsCtrl.closeAlert()\" type=\"button\" class=\"close\" aria-label=\"Close\">"+
    "                    <span aria-hidden=\"true\">&times;</span>"+
    "                  </button>"+
    "                  <strong> {{settingsCtrl.alertMessage.message}}"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Senha atual</label>"+
    "                  <input ng-model=\"settingsCtrl.account.currentPassword\" type=\"password\" name=\"currentPassword\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.currentPassword.$invalid && UpdatePassForm.currentPassword.$dirty}\" aria-describedby=\"passwordHelp\">"+
    "                  <small id=\"passwordHelp\" class=\"form-text text-muted\">Você deve fornecer sua senha atual para alterá-la.</small>"+
    "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.currentPassword.$dirty && UpdatePassForm.currentPassword.$invalid\">"+
    "                    <small ng-show=\"UpdatePassForm.currentPassword.$error.required\" class=\"form-text text-muted text-danger\">É obrigatório digitar a senha atual para modificar a senha.</small>"+
    "                    <small ng-show=\"UpdatePassForm.currentPassword.$error.currentPassword\" class=\"form-text text-muted text-danger\">A senha digitada não corresponde a senha atual.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Nova senha</label>"+
    "                  <input ng-model=\"settingsCtrl.account.newPassword\" type=\"password\" name=\"newPassword\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.newPassword.$invalid && UpdatePassForm.newPassword.$dirty}\" aria-describedby=\"passwordHelp\" ui-password match=\"settingsCtrl.account.currentPassword\" not-match=\"true\" required>"+
    "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.newPassword.$dirty && UpdatePassForm.newPassword.$invalid\">"+
    "                    <small ng-show=\"UpdatePassForm.newPassword.$error.required\" class=\"form-text text-muted text-danger\">Este campo é obrigatório.</small>"+
    "                    <small ng-show=\"UpdatePassForm.newPassword.$error.weakPassword\" class=\"form-text text-muted text-danger\">A senha digitada é muito fraca.</small>"+
    "                    <small ng-show=\"UpdatePassForm.newPassword.$error.match\" class=\"form-text text-muted text-danger\">A nova senha não pode ser igual a senha atual.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"form-group\">"+
    "                  <label for=\"exampleInputEmail1\">Confirmar senha</label>"+
    "                  <input ng-model=\"settingsCtrl.account.newPasswordConf\" type=\"password\" name=\"newPasswordConf\" class=\"form-control\" ng-class=\"{'has-error': UpdatePassForm.newPasswordConf.$invalid && UpdatePassForm.newPasswordConf.$dirty}\" aria-describedby=\"newPasswordHelp\" match=\"settingsCtrl.account.newPassword\" required>"+
    "                  <div class=\"error-container\" ng-show=\"UpdatePassForm.newPasswordConf.$dirty && UpdatePassForm.newPasswordConf.$invalid\">"+
    "                    <small ng-show=\"UpdatePassForm.newPasswordConf.$error.required\" class=\"form-text text-muted text-danger\">Este campo é obrigatório.</small>"+
    "                    <small ng-show=\"UpdatePassForm.newPasswordConf.$error.match\" class=\"form-text text-muted text-danger\">As senhas não correspondem.</small>"+
    "                  </div>"+
    "                </div>"+
    "                <button ng-disabled=\"UpdatePassForm.$invalid\" type=\"submit\" class=\"btn btn-primary\">"+
    "                  <div ng-show=\"settingsCtrl.start\" class=\"loader loader-btn\">"+
    "                    <svg class=\"circular\" viewBox=\"25 25 50 50\">"+
    "                      <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>"+
    "                    </svg>"+
    "                  </div>"+
    "                  <span ng-show=\"!settingsCtrl.start\">Alterar senha</span>"+
    "                </button>"+
    "              </form>"+
    "            </div>"+
    "          </div>"+
    "        </div>"+
    "      </div>"+
    "    </div>"+
    "  </div>"+
    "</div>"+
    "");
}]);