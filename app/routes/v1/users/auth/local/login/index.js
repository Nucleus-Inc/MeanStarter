module.exports = app => {
  const controller = app.controllers.v1.users.auth.local.login.index
  const passportLocal = app.middlewares.users.auth.passportLocal
  const router = app.locals.routers.v1

  router
    .route('/users/auth/local/login')
    .post(passportLocal.login(), controller.login)
    .get(passportLocal.isAuth, controller.isAuth)
}
