const passport = require('passport')

module.exports = app => {
  const controller = app.controllers.hello.index

  app
    .route('/hello')
    .get(passport.authenticate('google-id-token'), controller.getHello)
}
