module.exports = app => {
  const passport = app.locals.passport.user
  const passportJWT = app.middlewares.users.auth.passportJWT
  const controller = app.controllers.v1.users.auth.facebook.token.connect.index

  app.route('/users/auth/facebook/token/connect').post(
    passportJWT.isAuth,
    passport.authenticate('facebook-token', {
      session: false
    }),
    controller.connect
  )
}
