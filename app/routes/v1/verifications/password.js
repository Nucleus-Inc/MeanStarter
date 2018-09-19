const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.verifications.password
  const router = app.locals.routers.v1

  router
    .route('/verifications/password')
    .post([check('password').exists()], controller.validatePassword)
}
