module.exports = app => {
  const controller = app.controllers.v1.users.auth.local.login.index
  const router = app.locals.routers.v1
  const passportLocal = app.middlewares.auth.users.passportLocal

  router
    .route('/users/auth/local/login')
    .post(passportLocal.login(), controller.login)
    .get(passportLocal.isAuth, controller.isAuth)
}
