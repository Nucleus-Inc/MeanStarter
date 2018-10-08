module.exports = app => {
  const passportJWT = app.middlewares.users.auth.passportJWT
  const controller =
    app.controllers.v1.users.auth.google.signin.disconnect.index

  app
    .route('/users/auth/google/signin/disconnect')
    .post(passportJWT.isAuth, controller.disconnect)
}
