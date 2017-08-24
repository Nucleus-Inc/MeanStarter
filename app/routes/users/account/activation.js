var passportMult = require('app/middlewares/passport-mult.js')
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.activation

  app.route('/users/:id/account/activation')
    .get(passportMult.isAuth, users.verifyOwner, controller.getActivationCode)
    .put(passportMult.isAuth, users.verifyOwner, controller.activateUser)
}
