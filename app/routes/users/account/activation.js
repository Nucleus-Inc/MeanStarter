const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.account.activation
  const customValidators = app.libs.validators.custom

  app.route('/users/:id/account/activation')
    .patch([
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        })
    ], controller.setActivationCode)
    .put([
      check('id')
        .exists()
        .custom((value, { req }) => {
          return customValidators.isObjectId(req.params.id)
        }),
      check('token')
        .exists()
    ], controller.activateUser)
}
