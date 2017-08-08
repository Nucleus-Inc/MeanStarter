module.exports = function (app) {
  var controller = app.controllers.verifications.account

  app.route('/verifications/account/zxcvbn')
    .post(controller.validatePassword)
}
