const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.account.signup
  const customValidators = app.libs.validators.custom

  app.route('/users/account/signup')
    .post([
      check('name')
        .exists(),
      check('email')
        .exists()
        .isEmail()
        .trim()
        .normalizeEmail(),
      check('phoneNumber')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isPhoneNumber(req.body.phoneNumber)
        }),
      check('password')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isValidPassword(req.body.password)
        })
    ], controller.registerUser)
}
