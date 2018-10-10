module.exports = app => {
  const passport = app.locals.passport.user
  const passportLocal = app.middlewares.users.auth.passportLocal

  app.route('/users/auth/google/oauth2/connect').get(
    passportLocal.isAuth,
    passport.authenticate('google-oauth2', {
      scope: ['profile', 'email']
    })
  )
}
