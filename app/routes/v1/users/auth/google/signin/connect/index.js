module.exports = app => {
  const passport = app.locals.passport.user
  const passportJWT = app.middlewares.users.auth.passportJWT
  const controller = app.controllers.v1.users.auth.google.signin.connect.index

  app
    .route('/users/auth/google/signin/connect')
    .post(
      passportJWT.isAuth,
      passport.authenticate('google-signin'),
      controller.signIn
    )
}
