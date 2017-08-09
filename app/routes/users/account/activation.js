var jwt = require('app/middlewares/passport-jwt.js')()

module.exports = function (app) {
  var controller = app.controllers.users.account.activation

  app.route('/users/:id/account/activation')
    .get(jwt.authenticate(), controller.getActivationCode)
    .put(jwt.authenticate(), controller.activateUser)
}
