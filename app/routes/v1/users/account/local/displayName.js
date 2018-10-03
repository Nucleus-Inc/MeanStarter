const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.displayName
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const router = app.locals.routers.v1

  router
    .route('/users/:id/account/local/displayName')
    .put(
      [check('displayName').exists()],
      passportMult.isAuth,
      permission.isOwner,
      controller.updateDisplayName
    )
}
