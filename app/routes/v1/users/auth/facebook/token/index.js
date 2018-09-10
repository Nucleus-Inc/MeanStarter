const passport = require('passport')

module.exports = app => {
  const controller = app.controllers.v1.users.auth.facebook.token.index

  app
    .route('/users/auth/facebook/token')
    .get(passport.authenticate('facebook-token'), controller.signIn)
}
