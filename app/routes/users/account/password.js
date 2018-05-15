const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.account.password
  const customValidators = app.libs.validators.custom

  app.route('/users/:id/account/password')
    .put([
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        }),
      check('currentPassword')
        .exists(),
      check('newPassword')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isValidPassword(req.body.newPassword)
        })
    ], passportMult.isAuth, users.verifyOwner, controller.updatePassword)
}
