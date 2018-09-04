const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')
const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.profile.picture
  const router = app.locals.routers.v1
  const customValidators = app.libs.validators.custom

  router.route('/users/:id/profile').put(
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
    users.verifyOwner,
    controller.updateUserPicture
  )
}
