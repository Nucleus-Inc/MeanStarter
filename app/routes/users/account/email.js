const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.account.email
  const customValidators = app.libs.validators.custom

  app.route('/users/:id/account/email')
    .patch([
      check('email')
        .exists()
        .isEmail()
        .trim()
        .normalizeEmail()
    ], passportMult.isAuth, users.verifyOwner, controller.setEmailChangeCode)
    .put([
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        }),
      check('token')
        .exists()
    ], passportMult.isAuth, users.verifyOwner, controller.updateEmail)
}
