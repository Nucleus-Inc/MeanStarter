const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.name
  const router = app.locals.routers.v1

  router
    .route('/users/:id/account/name')
    .put(
      [check('name').exists()],
      passportMult.isAuth,
      users.verifyOwner,
      controller.updateName
    )
}
