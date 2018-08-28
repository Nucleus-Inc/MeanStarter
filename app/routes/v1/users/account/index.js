const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.index
  const router = app.locals.routers.v1
  const customValidators = app.libs.validators.custom

  router.route('/users/:id/account').get(
    [
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        })
    ],
    passportMult.isAuth,
    users.verifyOwner,
    controller.getAccount
  )
}
