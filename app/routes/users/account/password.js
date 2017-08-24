var passportMult = require('app/middlewares/passport-mult.js')
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.password

  app.route('/users/:id/account/password')
    .put(passportMult.isAuth, users.verifyOwner, controller.updatePassword)
}
