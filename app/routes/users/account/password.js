var jwt = require('app/middlewares/passport-jwt.js')()
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.password

  app.route('/users/:id/account/password')
    .put(jwt.authenticate(), users.verifyOwner, controller.updatePassword)
}
