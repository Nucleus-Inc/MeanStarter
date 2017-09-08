var passportMult = require('app/middlewares/passport-mult.js')
var users = require('app/middlewares/users.js')

module.exports = function(app) {
  var controller = app.controllers.users.account.activation

  app.route('/users/:id/account/activation')
    .patch(controller.setActivationCode)
    .put(controller.activateUser)

}
