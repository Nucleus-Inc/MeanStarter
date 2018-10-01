const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.activation
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const customValidators = app.libs.validators.custom

  router
    .route('/users/:id/account/local/activation')
    .patch(
      [
        check('id')
          .exists()
          .custom((value, { req }) => {
            return customValidators.isObjectId(req.params.id)
          })
      ],
      controller.setActivationCode
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
      controller.activateUser
    )
}
