const passportLocal = require('app/middlewares/passport-local.js')()

module.exports = app => {
  const controller = app.controllers.v1.users.auth.local
  const router = app.locals.routers.v1

  router
    .route('/users/auth/local/login')
    .post(passportLocal.login(), controller.login)
    .get(passportLocal.isAuth, controller.isAuth)

  router
    .route('/users/auth/local/logout')
    .post(passportLocal.logout, controller.logout)
}
