angular.module("views/modals/partner-form-modal.html",[]).run(["$templateCache",function($templateCache){
    $templateCache.put("templates/partner-form-modal.html",
    "<div class=\"modal fade \">"+
    "    <div class=\"modal-dialog\">"+
    "        <div class=\"modal-content\">"+
    "            <div class=\"modal-header\">"+
    "                <h4 class=\"modal-title\">{{partnerFormModalCtrl.title}}</h4>"+
    "                <button type=\"button\" ng-click=\"partnerFormModalCtrl.close(false)\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
    "            </div>"+
    "            <div class=\"modal-body\">"+
    "              <div class=\"row\">"+
    "                <div class=\"col-md-12\">"+
    "                  <ul class=\"nav nav-tabs nav-justified\">"+
    "                    <li ng-class=\"{ active: partnerFormModalCtrl.isSet(1) }\" class=\"nav-item\">"+
    "                      <a ng-click=\"partnerFormModalCtrl.setTab(1)\" class=\"nav-link\" href>P. Física</a>"+
    "                    </li>"+
    "                    <li ng-class=\"{ active: partnerFormModalCtrl.isSet(2) }\" class=\"nav-item\">"+
    "                      <a ng-click=\"partnerFormModalCtrl.setTab(2)\" class=\"nav-link\" href>P. Jurídica</a>"+
    "                    </li>"+
    "                    <li ng-class=\"{ active: partnerFormModalCtrl.isSet(3) }\" class=\"nav-item\">"+
    "                      <a ng-click=\"partnerFormModalCtrl.setTab(3)\" class=\"nav-link\" href>Endereço</a>"+
    "                    </li>"+
    "                  </ul>"+
    "                </div>"+
    "              </div>"+
    "              <form ng-submit=\"partnerFormModalCtrl.close(true)\" name=\"PartnerFormModal\" novalidate>"+
    "                <div ng-show=\"partnerFormModalCtrl.isSet(1)\">"+
    "                  <div class=\"row account-col\">"+
    "                    <div class=\"col-md-3\">"+
    "                      <div class=\"form-group\">"+
    "                        <p class=\"font-weight-bold\">Configurações pessoais</p>"+
    "                        <p class=\"font-weight-normal\">Alguas dessas informações podem afetar o login do parceiro no sistema.</p>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"col-md-9\">"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Nome</label>"+
    "                          <input ng-disabled=\"true\" type=\"text\" name=\"name\" ng-model=\"partnerFormModalCtrl.inputs.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PartnerFormModal.name.$invalid && PartnerFormModal.name.$dirty}\" ui-br-name required>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.name.$dirty && PartnerFormModal.name.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.name.$error.required\" class=\"form-text text-muted text-danger\">O nome é obrigatório.</small>"+
    "                            <small ng-show=\"PartnerFormModal.name.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Email</label>"+
    "                          <input ng-disabled=\"true\" type=\"email\" name=\"email\" ng-model=\"partnerFormModalCtrl.inputs.email\" class=\"form-control\" placeholder=\"email@exemplo.com.br\" ng-class=\"{'has-error': PartnerFormModal.email.$invalid && PartnerFormModal.email.$dirty}\" ui-email=\"no-registered\" required>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.email.$dirty && PartnerFormModal.email.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.email.$error.required\" class=\"form-text text-muted text-danger\">O endereço de email é obrigatório.</small>"+
    "                            <small ng-show=\"PartnerFormModal.email.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.email.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>"+
    "                          <input ng-disabled=\"true\" type=\"tel\" name=\"phoneNumber\" ng-model=\"partnerFormModalCtrl.inputs.phoneNumber\" class=\"form-control\" placeholder=\"Digite um número de celular\" ng-class=\"{'has-error': PartnerFormModal.phoneNumber.$invalid && PartnerFormModal.phoneNumber.$dirty}\" ui-br-cellphone required>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.phoneNumber.$dirty && PartnerFormModal.phoneNumber.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.phoneNumber.$error.required\" class=\"form-text text-muted text-danger\">O número de celular é obrigatório.</small>"+
    "                            <small ng-show=\"PartnerFormModal.phoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.phoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label style=\"margin-bottom: 10px;\" class=\"card-label\" for=\"formGroupExampleInput\">Avatar</label><br/>"+
    "                          <img ngf-thumbnail=\"partnerFormModalCtrl.inputs.profilePicture || '//placehold.it/160'\" width=\"160\" height=\"160\"/>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Plano</label>"+
    "                          <select name=\"planTitle\" class=\"form-control\" ng-model=\"partnerFormModalCtrl.inputs.plan.title\""+
    "                              ng-options=\"plan.title as plan.title for plan in partnerFormModalCtrl.plans\"></select>"+
    "                        </div>"+
    "                        <div ng-if=\"partnerFormModalCtrl.inputs.taxDocument.documentType === 'cpf'\" style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">CPF</label>"+
    "                          <input type=\"text\" name=\"cpf\" ng-model=\"partnerFormModalCtrl.inputs.taxDocument.documentNumber\" class=\"form-control\" placeholder=\"Digite o CPF\" ng-class=\"{'has-error': PartnerFormModal.cpf.$invalid && PartnerFormModal.cpf.$dirty}\" ui-br-cpf-mask>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.cpf.$dirty && PartnerFormModal.cpf.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.cpf.$error.cpf\" class=\"form-text text-muted text-danger\">Digite um CPF válido.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Representante</label>"+
    "                          <input type=\"text\" name=\"representativeName\" ng-model=\"partnerFormModalCtrl.inputs.representative.name\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PartnerFormModal.representativeName.$invalid && PartnerFormModal.representativeName.$dirty}\" ui-br-name>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.representativeName.$dirty && PartnerFormModal.representativeName.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.representativeName.$error.minname\" class=\"form-text text-muted text-danger\">O campo deve ser composto por nome e sobrenome.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Contato do Representante</label>"+
    "                          <input type=\"tel\" name=\"representativePhoneNumber\" ng-model=\"partnerFormModalCtrl.inputs.representative.phoneNumber\" class=\"form-control\" placeholder=\"Digite um número de celular\" ui-br-phone-number>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.representativePhoneNumber.$dirty && PartnerFormModal.representativePhoneNumber.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.representativePhoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.representativePhoneNumber.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                    </div>"+
    "                  </div>"+
    "                </div>"+
    "                <div ng-show=\"partnerFormModalCtrl.isSet(2)\">"+
    "                  <div class=\"row account-col\">"+
    "                    <div class=\"col-md-3\">"+
    "                      <div class=\"form-group\">"+
    "                        <p class=\"font-weight-bold\">Configurações jurídicas</p>"+
    "                        <p class=\"font-weight-normal\">Nesta seção você pode editar as informações pertinentes a empresa dos parceiros.</p>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"col-md-9\">"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Razão Social</label>"+
    "                          <input type=\"text\" name=\"companyName\" ng-model=\"partnerFormModalCtrl.inputs.companyName\" class=\"form-control\" placeholder=\"Digite um nome\" ng-class=\"{'has-error': PartnerFormModal.companyName.$invalid && PartnerFormModal.companyName.$dirty}\" ui-common-name>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Nome Fantasia</label>"+
    "                          <input type=\"text\" name=\"tradingName\" ng-model=\"partnerFormModalCtrl.inputs.tradingName\" class=\"form-control\" placeholder=\"Digite o nome fantasia\" ng-class=\"{'has-error': PartnerFormModal.tradingName.$invalid && PartnerFormModal.tradingName.$dirty}\" ui-common-name>"+
    "                        </div>"+
    "                        <div ng-if=\"partnerFormModalCtrl.inputs.taxDocument.documentType === 'cnpj'\" calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">CNPJ</label>"+
    "                          <input type=\"text\" name=\"cnpj\" ng-model=\"partnerFormModalCtrl.inputs.taxDocument.documentNumber\" class=\"form-control\" placeholder=\"Digite o CNPJ\" ng-class=\"{'has-error': PartnerFormModal.cnpj.$invalid && PartnerFormModal.cnpj.$dirty}\" ui-br-cnpj-mask>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.cnpj.$dirty && PartnerFormModal.cnpj.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.cnpj.$error.cnpj\" class=\"form-text text-muted text-danger\">Digite um CNPJ válido.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Email</label>"+
    "                          <input type=\"email\" name=\"contactEmail\" ng-model=\"partnerFormModalCtrl.inputs.contact.email\" class=\"form-control\" placeholder=\"email@exemplo.com.br\" ng-class=\"{'has-error': PartnerFormModal.contactEmail.$invalid && PartnerFormModal.contactEmail.$dirty}\" ui-email=\"no-registered\">"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.contactEmail.$dirty && PartnerFormModal.contactEmail.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.contactEmail.$error.invalidEmail\" class=\"form-text text-muted text-danger\">Digite um endereço de email válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.contactEmail.$error.emailExists\" class=\"form-text text-muted text-danger\">Este endereço de email já foi utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Telefone</label>"+
    "                          <input type=\"tel\" name=\"contactPhoneNumber\" ng-model=\"partnerFormModalCtrl.inputs.contact.phoneNumber2\" class=\"form-control\" placeholder=\"Digite um número de telefone\" ng-class=\"{'has-error': PartnerFormModal.contactPhoneNumber.$invalid && PartnerFormModal.contactPhoneNumber.$dirty}\" ui-br-phone-number>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.contactPhoneNumber.$dirty && PartnerFormModal.contactPhoneNumber.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.contactPhoneNumber.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.contactPhoneNumber.$error.phoneNumber\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Celular</label>"+
    "                          <input type=\"tel\" name=\"contactCellphone\" ng-model=\"partnerFormModalCtrl.inputs.contact.phoneNumber1\" class=\"form-control\" placeholder=\"Digite um número de celular\" ng-class=\"{'has-error': PartnerFormModal.contactCellphone.$invalid && PartnerFormModal.contactCellphone.$dirty}\" ui-br-cellphone>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.contactCellphone.$dirty && PartnerFormModal.contactCellphone.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.contactCellphone.$error.invalidCellphone\" class=\"form-text text-muted text-danger\">Digite um número de celular válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.contactCellphone.$error.phoneNumberExists\" class=\"form-text text-muted text-danger\">O número digitado já está sendo utilizado por outra conta.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Website</label>"+
    "                          <input type=\"url\" name=\"contactWebsite\" ng-model=\"partnerFormModalCtrl.inputs.contact.website\" class=\"form-control\" placeholder=\"Digite um website\">"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Facebook</label>"+
    "                          <input type=\"url\" name=\"facebook\" ng-model=\"partnerFormModalCtrl.inputs.contact.socialMedia[0]\" class=\"form-control\" placeholder=\"Digite o Facebook\">"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Instagram</label>"+
    "                          <input type=\"url\" name=\"instagram\" ng-model=\"partnerFormModalCtrl.inputs.contact.socialMedia[1]\" class=\"form-control\" placeholder=\"Digite o Instagram\">"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Twitter</label>"+
    "                          <input type=\"url\" name=\"twitter\" ng-model=\"partnerFormModalCtrl.inputs.contact.socialMedia[2]\" class=\"form-control\" placeholder=\"Digite o Twitter\">"+
    "                        </div>"+
    "                    </div>"+
    "                  </div>"+
    "                </div>"+
    "                <div ng-show=\"partnerFormModalCtrl.isSet(3)\">"+
    "                  <div class=\"row account-col\">"+
    "                    <div class=\"col-md-3\">"+
    "                      <div class=\"form-group\">"+
    "                        <p class=\"font-weight-bold\">Localização</p>"+
    "                        <p class=\"font-weight-normal\">Nesta seção você pode editar as informações de endereço do parceiro.</p>"+
    "                      </div>"+
    "                    </div>"+
    "                    <div class=\"col-md-9\">"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">CEP</label>"+
    "                          <input type=\"text\" name=\"cep\" ng-model=\"partnerFormModalCtrl.inputs.address.cep\" class=\"form-control\" placeholder=\"Digite o CEP\" ng-class=\"{'has-error': PartnerFormModal.cep.$invalid && PartnerFormModal.cep.$dirty}\" ui-cep>"+
    "                          <div class=\"error-container\" ng-show=\"PartnerFormModal.cep.$dirty && PartnerFormModal.cep.$invalid\">"+
    "                            <small ng-show=\"PartnerFormModal.cep.$error.cep\" class=\"form-text text-muted text-danger\">Digite um CEP válido.</small>"+
    "                            <small ng-show=\"PartnerFormModal.cep.$error.cepExists\" class=\"form-text text-muted text-danger\">O CEP digitado não foi encontrado.</small>"+
    "                          </div>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Logradouro</label>"+
    "                          <input type=\"text\" name=\"addressLine1\" ng-model=\"partnerFormModalCtrl.inputs.address.addressLine1\" class=\"form-control\" placeholder=\"Digite o logradouro\" ui-common-name>"+
    "                        </div>"+
    "                        <div class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Complemento</label>"+
    "                          <input type=\"text\" name=\"addressLine2\" ng-model=\"partnerFormModalCtrl.inputs.address.addressLine2\" class=\"form-control\" placeholder=\"Digite o complemento\" ui-common-name>"+
    "                        </div>"+
    "                        <div calss=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Número</label>"+
    "                          <input type=\"text\" name=\"streetNumber\" ng-model=\"partnerFormModalCtrl.inputs.address.streetNumber\" class=\"form-control\" placeholder=\"Digite um número de celular\" ui-street-number>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Bairro</label>"+
    "                          <input type=\"text\" name=\"area\" ng-model=\"partnerFormModalCtrl.inputs.address.area\" class=\"form-control\" placeholder=\"Digite o nome do Bairro\" ui-common-name>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Cidade</label>"+
    "                          <input type=\"text\" name=\"city\" ng-model=\"partnerFormModalCtrl.inputs.address.city\" class=\"form-control\" placeholder=\"Digite a Cidade\" ui-common-name>"+
    "                        </div>"+
    "                        <div style=\"margin-top: 15px;\" class=\"form-group\">"+
    "                          <label class=\"card-label\" for=\"formGroupExampleInput\">Estado</label>"+
    "                          <input type=\"text\" name=\"uf\" ng-model=\"partnerFormModalCtrl.inputs.address.uf\" class=\"form-control\" placeholder=\"Digite o Estado\" ui-common-name>"+
    "                        </div>"+
    "                    </div>"+
    "                  </div>"+
    "                </div>"+
    "                <div class=\"modal-footer\">"+
    "                  <button type=\"submit\" ng-disabled=\"PartnerFormModal.$invalid\" class=\"btn btn-primary\">{{partnerFormModalCtrl.label}}</button>"+
    "                  <button type=\"button\" ng-click=\"partnerFormModalCtrl.close(false)\" class=\"btn btn-default\" data-dismiss=\"modal\"> Cancelar</button>"+
    "                </div>"+
    "              </form>"+
    "            </div>"+
    "        </div>"+
    "    </div>"+
    "</div>"+
    "");
}]);