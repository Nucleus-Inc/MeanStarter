module.exports = app => {
  const passport = app.locals.passport.user
  const passportMult = app.middlewares.users.auth.passportMult
  const controller = app.controllers.v1.users.auth.google.connect.signin.index

  app
    .route('/users/auth/google/connect/signin')
    .post(
      passportMult.isAuth,
      passport.authenticate('google-signin'),
      controller.signIn
    )
}
