const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const ms = require('ms')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const random = app.libs.random.string
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const responses = app.libs.responses.users
  const config = app.locals.config

  controller.registerUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.create({
        account: {
          local: {
            displayName: req.body.displayName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: await bcrypt.generateHash(req.body.password),
            token: await bcrypt.generateHash(code.toString()),
            tokenExp:
              Date.now() + ms(config.auth.local.tokens.activation.expires)
          }
        }
      })

      let token = jwt.sign(
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

      if (process.env.NODE_ENV !== 'production') {
        res.set('code', code)
      }

      broadcast.sendCode(
        {
          recipient: user.account.local.email,
          username: user.account.local.displayName,
          code: code
        },
        {
          transport: 'nodemailer'
        }
      )

      res.status(201).send(responses.getAccount(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
