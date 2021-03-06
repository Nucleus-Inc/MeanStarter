const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.users.auth.jwt
  const router = app.locals.routers.v1

  router.route('/users/auth/jwt/signin').post(
    [
      check('email')
        .exists()
        .isEmail()
        .trim()
        .normalizeEmail({
          gmail_remove_dots: false,
          gmail_remove_subaddress: false,
          outlookdotcom_remove_subaddress: false,
          yahoo_remove_subaddress: false,
          icloud_remove_subaddress: false
        }),
      check('password').exists()
    ],
    controller.signIn
  )
}
