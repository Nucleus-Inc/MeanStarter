const passport = require('passport')

module.exports = app => {
  const controller = app.controllers.v1.users.auth.google.signin.index

  app
    .route('/users/auth/google/signin')
    .post(passport.authenticate('google-signin'), controller.signIn)
}
