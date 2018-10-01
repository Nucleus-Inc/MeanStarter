const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.index
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
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
    permission.isOwner,
    controller.getAccount
  )
}
