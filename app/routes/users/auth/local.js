const passportLocal = require('app/middlewares/passport-local.js')()

module.exports = (app) => {
  const controller = app.controllers.users.auth.local

  app.route('/users/auth/local/login')
    .post(passportLocal.login(), controller.login)
    .get(passportLocal.isAuth, controller.isAuth)

  app.route('/users/auth/local/logout')
    .post(passportLocal.logout, controller.logout)
}
