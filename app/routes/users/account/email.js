var jwt = require('app/middlewares/passport-jwt.js')()
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.email

  app.route('/users/:id/account/email')
    .patch(jwt.authenticate(), users.verifyOwner, controller.setEmailChangeCode)
    .put(jwt.authenticate(), users.verifyOwner, controller.updateEmail)
}
