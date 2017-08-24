var passportLocal = require('app/middlewares/passport-local.js')()
module.exports = function (app) {
  var controller = app.controllers.users.auth.local

  app.route('/users/auth/web')
    .post(passportLocal.login(), controller.login)
}
