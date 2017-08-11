var jwt = require('app/middlewares/passport-jwt.js')()
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.activation

  app.route('/users/:id/account/activation')
    .get(jwt.authenticate(), users.verifyOwner, controller.getActivationCode)
    .put(jwt.authenticate(), users.verifyOwner, controller.activateUser)
}
