const { check, oneOf } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.verifications.user
  const customValidators = app.libs.validators.custom

  app.route('/verifications/user')
    .get(oneOf([
      check('email')
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
        .custom((value, { req }) => {
          return customValidators.isPhoneNumber(req.query.phoneNumber)
        })
    ]), controller.validateUser)
}
