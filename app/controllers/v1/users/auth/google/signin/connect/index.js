const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const responses = app.libs.responses.users
  const config = app.locals.config

  controller.signIn = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = req.user
      const token = jwt.sign(
        {
          _id: user._id,
          isActive: user.account.local.isActive
        },
        config.auth.local.jwt.jwtSecret,
        {
          expiresIn: config.auth.local.jwt.expires
        }
      )
      res.set('JWT', token)
      res.send(responses.getAccount(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
