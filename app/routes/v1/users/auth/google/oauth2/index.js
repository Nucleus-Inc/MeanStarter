module.exports = app => {
  const passport = app.locals.passport.user
  const controller = app.controllers.v1.users.auth.google.oauth2.index
  const config = app.locals.config

  app.route('/users/auth/google/oauth2').get(
    passport.authenticate('google-oauth2', {
      scope: config.auth.google.scope
    })
  )

  app.route('/users/auth/google/oauth2/callback').get(controller.getCallback)
}
