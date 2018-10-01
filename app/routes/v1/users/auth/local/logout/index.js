module.exports = app => {
  const controller = app.controllers.v1.users.auth.local.logout.index
  const passportLocal = app.middlewares.users.auth.passportLocal
  const router = app.locals.routers.v1

  router
    .route('/users/auth/local/logout')
    .post(passportLocal.logout, controller.logout)
}
