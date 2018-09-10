const passport = require('passport')

module.exports = app => {
  const controller = app.controllers.v1.users.auth.facebook.oauth2.index

  app
    .route('/users/auth/facebook/oauth2')
    .get(passport.authenticate('facebook-oauth2'))

  app
    .route('/users/auth/facebook/oauth2/callback')
    .get(
      passport.authenticate('facebook-oauth2', { failureRedirect: '#/signIn' }),
      controller.getCallback
    )
}
