var jwt = require('app/middlewares/passport-jwt.js')()

module.exports = function (app) {
  var controller = app.controllers.users.account.email

  app.route('/users/:id/account/email')
    .patch(jwt.authenticate(), controller.setEmailChangeCode)
    .put(jwt.authenticate(), controller.updateEmail)
}
