const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.recovery
  const router = app.locals.routers.v1
  const customValidators = app.libs.validators.custom

  router
    .route('/users/account/recovery')
    .patch(
      [
        check('recoveryKey')
          .exists()
          .trim()
      ],
      controller.getRecoveryCode
    )
    .put(
      [
        check('recoveryKey')
          .exists()
          .trim(),
        check('token').exists(),
        check('newPassword')
          .exists()
          .custom((value, { req }) => {
            return customValidators.isValidPassword(req.body.newPassword)
          })
      ],
      controller.recoverPassword
    )
}
