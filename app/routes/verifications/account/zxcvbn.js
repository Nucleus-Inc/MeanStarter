module.exports = function (app) {
  var controller = app.controllers.verifications.account.password

  app.route('/verifications/account/password')
    .post(controller.validatePassword)
}
