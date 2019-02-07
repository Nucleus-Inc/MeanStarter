module.exports = app => {
  const passport = app.locals.passport.user
  const passportLocal = app.middlewares.users.auth.passportLocal
  const config = app.locals.config

  app.route('/users/auth/facebook/oauth2/connect').get(
    passportLocal.isAuth,
    passport.authenticate('facebook-oauth2', {
      scope: config.auth.facebook.scope,
      failureRedirect: '/'
    })
  )
}
