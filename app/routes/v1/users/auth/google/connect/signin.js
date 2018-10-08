module.exports = app => {
  const passport = app.locals.passport.user
  const controller = app.controllers.v1.users.auth.google.connect.signin.index

  app.route('/users/auth/google/connect/signin').post(
    passport.authenticate('jwt', {
      session: false
    }),
    passport.authenticate('google-signin'),
    controller.signIn
  )
}
