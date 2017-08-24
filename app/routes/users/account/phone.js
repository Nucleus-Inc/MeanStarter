var passportMult = require('app/middlewares/passport-mult.js')
var users = require('app/middlewares/users.js')

module.exports = function (app) {
  var controller = app.controllers.users.account.phone

  app.route('/users/:id/account/phone-number')
    .patch(passportMult.isAuth, users.verifyOwner, controller.setPhoneChangeCode)
    .put(passportMult.isAuth, users.verifyOwner, controller.updatePhone)
}
