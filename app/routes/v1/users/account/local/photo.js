const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.photo
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const customValidators = app.libs.validators.custom

  router.route('/users/:id/account/local/photo').put(
    [
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        }),
      check('photo')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isUrl(req.body.photo)
        })
    ],
    passportMult.isAuth,
    permission.isOwner,
    controller.updatePhoto
  )
}
