var passportLocal = require('app/middlewares/passport-local.js')()

module.exports = (app) => {
  var controller = app.controllers.users.auth.local

  app.route('/users/auth/local/login')
    .post(passportLocal.login(), controller.login)
    .get(passportLocal.isAuth, controller.isAuth)

  app.route('/users/auth/local/logout')
    .post(passportLocal.logout, controller.logout)
}
