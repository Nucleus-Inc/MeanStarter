const passport = require('passport')

module.exports = app => {
  const controller = app.controllers.v1.users.account.google.mobile.signin

  app
    .route('/users/account/google/mobile/signin')
    .post(passport.authenticate('google-id-token'), controller.signIn)
}
