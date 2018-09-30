const passportLocal = require('app/middlewares/passport-local.js')()

module.exports = app => {
  const controller = app.controllers.v1.users.auth.local.logout.index
  const router = app.locals.routers.v1

  router
    .route('/users/auth/local/logout')
    .post(passportLocal.logout, controller.logout)
}
