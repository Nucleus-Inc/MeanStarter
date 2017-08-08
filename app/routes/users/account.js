var jwt = require('../../middlewares/passport-jwt.js')()

module.exports = function (app) {
  var controller = app.controllers.users.account

  app.route('/users/account/signin')
    .post(controller.signIn)

  app.route('/users/account/signup')
    .post(controller.registerUser)

  app.route('/users/:id/account/activation')
    .get(controller.getActivationCode)
    .put(controller.activateUser)

  app.route('/users/account/recovery/:phoneNumber')
    .get(controller.getRecoveryCode)
    .put(controller.recoverPassword)

  app.route('/users/account/zxcvbn')
    .post(controller.validatePassword)
}
