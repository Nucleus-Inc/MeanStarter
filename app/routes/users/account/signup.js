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
        .normalizeEmail({
          gmail_remove_dots: false,
          gmail_remove_subaddress: false,
          outlookdotcom_remove_subaddress: false,
          yahoo_remove_subaddress: false,
          icloud_remove_subaddress: false
        }),
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
