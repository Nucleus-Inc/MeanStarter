const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.name
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const router = app.locals.routers.v1

  router
    .route('/users/:id/account/local/name')
    .put(
      [check('name').exists()],
      passportMult.isAuth,
      permission.isOwner,
      controller.updateName
    )
}
