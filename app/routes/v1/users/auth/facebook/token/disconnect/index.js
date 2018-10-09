module.exports = app => {
  const passportJWT = app.middlewares.users.auth.passportJWT
  const controller =
    app.controllers.v1.users.auth.facebook.token.disconnect.index

  app
    .route('/users/auth/facebook/token/disconnect')
    .post(passportJWT.isAuth, controller.disconnect)
}
