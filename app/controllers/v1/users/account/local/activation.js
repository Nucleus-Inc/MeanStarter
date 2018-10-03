const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const ms = require('ms')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const random = app.libs.random.string
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const config = app.locals.config
  const responses = app.libs.responses.users
  const errors = app.errors.custom

  controller.setActivationCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (user.account.local.isActive) {
        res.status(errors.AUT006.httpCode).send(errors.AUT006.response)
      } else {
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.local.token': await bcrypt.generateHash(code.toString()),
              'account.local.tokenExp':
                Date.now() + ms(config.auth.local.tokens.activation.expires)
            }
          },
          {
            new: true
          }
        ).lean()

        if (process.env.NODE_ENV !== 'production') {
          res.set('code', code)
        }

        broadcast.sendCode(
          {
            recipient: user.account.local.email,
            username: user.account.local.name,
            code: code
          },
          {
            transport: 'email'
          }
        )

        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  controller.activateUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (user.account.local.isActive) {
        res.status(errors.AUT006.httpCode).send(errors.AUT006.response)
      } else if (
        user.account.local.token &&
        (await bcrypt.compareHash(
          req.body.token.toString(),
          user.account.local.token
        )) &&
        Date.now() < user.account.local.tokenExp
      ) {
        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.local.token': null,
              'account.local.tokenExp': null,
              'account.local.isActive': true
            }
          },
          {
            new: true
          }
        ).lean()

        let token = jwt.sign(
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
        res.status(errors.AUT004.httpCode).send(errors.AUT004.response)
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
