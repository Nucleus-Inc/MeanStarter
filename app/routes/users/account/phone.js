var jwt = require('app/middlewares/passport-jwt.js')()

module.exports = function (app) {
  var controller = app.controllers.users.account.phone

  app.route('/users/:id/account/phone-number')
    .patch(jwt.authenticate(), controller.setPhoneChangeCode)
    .put(jwt.authenticate(), controller.updatePhone)
}
