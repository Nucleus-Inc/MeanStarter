const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.profile.picture
  const customValidators = app.libs.validators.custom

  app.route('/users/:id/profile')
    .put([
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
    ], controller.updateUserPicture)
}
