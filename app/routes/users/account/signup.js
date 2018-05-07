const { check } = require('express-validator/check')

module.exports = function (app) {
  var controller = app.controllers.users.account.signup

  app.route('/users/account/signup')
    .post([
      check('email').isEmail(),
      // check('password').isValidPassword()
    ]
      , controller.registerUser)
}
