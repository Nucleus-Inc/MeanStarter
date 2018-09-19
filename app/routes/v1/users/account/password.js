const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.password
  const router = app.locals.routers.v1
  const customValidators = app.libs.validators.custom

  router.route('/users/:id/account/password').put(
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
    users.verifyOwner,
    controller.updatePassword
  )
}
