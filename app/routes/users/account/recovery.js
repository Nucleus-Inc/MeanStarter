module.exports = function (app) {
  var controller = app.controllers.users.account.recovery

  app.route('/users/account/recovery/:phoneNumber')
    .get(controller.getRecoveryCode)
    .put(controller.recoverPassword)
}
