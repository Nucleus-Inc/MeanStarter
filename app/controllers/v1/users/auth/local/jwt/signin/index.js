const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const responses = app.libs.responses.users
  const bcrypt = app.libs.bcrypt.hash
  const config = app.locals.config
  const errors = app.errors.custom

  controller.signIn = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findOne({
        'account.local.email': req.body.email
      }).lean()

      if (
        user &&
        (await bcrypt.compareHash(
          req.body.password,
          user.account.local.password
        ))
      ) {
        const token = jwt.sign(
          {
            _id: user._id,
            isActive: user.account.local.isActive
          },
          config.jwt.jwtSecret,
          {
            expiresIn: config.jwt.expires
          }
        )
        res.set('JWT', token)
        res.send(responses.getAccount(user))
      } else {
        res.status(errors.AUT001.httpCode).send(errors.AUT001.response)
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
