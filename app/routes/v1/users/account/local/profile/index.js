const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.account.local.profile.index
  const router = app.locals.routers.v1
  const passportMult = app.middlewares.users.auth.passportMult
  const permission = app.middlewares.users.auth.permission
  const customValidators = app.libs.validators.custom

  router.route('/users/:id/account/local/profile').put(
    [
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        }),
      check('pictureUrl')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isUrl(req.body.pictureUrl)
        })
    ],
    passportMult.isAuth,
    permission.isOwner,
    controller.updateProfile
  )
}
