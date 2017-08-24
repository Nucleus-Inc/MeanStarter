var passportMult = require('app/middlewares/passport-mult.js')
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.email

  app.route('/users/:id/account/email')
    .patch(passportMult.isAuth, users.verifyOwner, controller.setEmailChangeCode)
    .put(passportMult.isAuth, users.verifyOwner, controller.updateEmail)
}
