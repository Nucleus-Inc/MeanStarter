const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.password
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const customValidators = app.libs.validators.custom

  router.route('/users/:id/account/local/password').put(
    [
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        }),
      check('currentPassword').exists(),
      check('newPassword')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isValidPassword(req.body.newPassword)
        })
    ],
    passportMult.isAuth,
    permission.isOwner,
    controller.updatePassword
  )
}
