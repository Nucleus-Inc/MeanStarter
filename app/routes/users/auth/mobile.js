const { check } = require('express-validator/check')

module.exports = function (app) {
  const controller = app.controllers.users.auth.mobile

  app.route('/users/auth/mobile')
    .post([
      check('email')
        .exists()
        .isEmail()
        .trim()
        .normalizeEmail(),
      check('password')
        .exists()
    ], controller.signIn)
}
