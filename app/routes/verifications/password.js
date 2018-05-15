const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.verifications.password

  app.route('/verifications/password')
    .post([
      check('password')
        .exists()
    ], controller.validatePassword)
}
