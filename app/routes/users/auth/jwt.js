const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.auth.mobile

  app.route('/users/auth/jwt/signin')
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
