const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.name
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.auth.users.passportMult

  router
    .route('/users/:id/account/local/name')
    .put(
      [check('name').exists()],
      passportMult.isAuth,
      users.verifyOwner,
      controller.updateName
    )
}
