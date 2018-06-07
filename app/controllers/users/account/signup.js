const config = require('config/config.js')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const random = app.libs.random
  const broadcast = app.libs.broadcast.auth
  const responses = app.libs.responses.users
  const controller = {}

  controller.registerUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.create({
        account: {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: new User().generateHash(req.body.password),
          token: new User().generateHash(code.toString()),
          tokenExp: Date.now() + 300000
        }
      })

      let token = jwt.sign({
        _id: user._id,
        isActive: user.account.isActive
      }, config.jwt.jwtSecret, {
        expiresIn: '1h'
      })

      res.set('JWT', token)

      if (process.env.NODE_ENV !== 'production') {
        res.set('code', code)
      }

      broadcast.sendCode({
        recipient: user.account.email,
        username: user.account.name,
        code: code
      }, {
        transport: 'email'
      })

      res.status(201).send(responses.getAccount(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
