var jwt = require('app/middlewares/passport-jwt.js')()
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.phone

  app.route('/users/:id/account/phone-number')
    .patch(jwt.authenticate(), users.verifyOwner, controller.setPhoneChangeCode)
    .put(jwt.authenticate(), users.verifyOwner, controller.updatePhone)
}
