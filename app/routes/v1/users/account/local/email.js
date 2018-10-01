const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.email
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const customValidators = app.libs.validators.custom

  router
    .route('/users/:id/account/local/email')
    .patch(
      [
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
          })
      ],
      passportMult.isAuth,
      permission.isOwner,
      controller.setEmailChangeCode
    )
    .put(
      [
        check('id')
          .exists()
          .custom((value, { req }) => {
            return customValidators.isObjectId(req.params.id)
          }),
        check('token').exists()
      ],
      passportMult.isAuth,
      permission.isOwner,
      controller.updateEmail
    )
}
