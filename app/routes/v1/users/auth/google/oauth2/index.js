const passport = require('passport')

module.exports = app => {
  const controller = app.controllers.v1.users.auth.google.oauth2.index

  app.route('/users/auth/google/oauth2').get(
    passport.authenticate('google-oauth2', {
      scope: ['profile', 'email']
    })
  )

  app
    .route('/users/auth/google/callback')
    .get(
      passport.authenticate('google-oauth2', { failureRedirect: '#/signIn' }),
      controller.getCallback
    )
}
