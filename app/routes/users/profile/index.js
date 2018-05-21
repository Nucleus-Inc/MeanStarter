const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.profile.index
  const customValidators = app.libs.validators.custom

  app.route('/users/:id/profile')
    .get([
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        })
    ], controller.getProfile)
}
