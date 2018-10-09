module.exports = app => {
  const passport = app.locals.passport.user
  const controller = app.controllers.v1.users.auth.facebook.token.index

  app.route('/users/auth/facebook/token').post(
    passport.authenticate('facebook-token', {
      session: false
    }),
    controller.signIn
  )
}
