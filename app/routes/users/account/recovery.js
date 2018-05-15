const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.account.recovery
  const customValidators = app.libs.validators.custom

  app.route('/users/account/recovery/:phoneNumber')
    .get([
      check('phoneNumber')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isPhoneNumber(req.params.phoneNumber)
        })
    ], controller.getRecoveryCode)
    .put([
      check('phoneNumber')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isPhoneNumber(req.params.phoneNumber)
        }),
      check('token')
        .exists(),
      check('newPassword')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isValidPassword(req.body.newPassword)
        })
    ], controller.recoverPassword)
}
