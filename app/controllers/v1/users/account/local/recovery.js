const { validationResult } = require('express-validator/check')
const ms = require('ms')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const random = app.libs.random.string
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const config = app.locals.config
  const errors = app.locals.errors

  controller.getRecoveryCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findOne({
        $or: [
          {
            'account.local.email': req.body.recoveryKey
          },
          {
            'account.local.phoneNumber': req.body.recoveryKey
          }
        ]
      })

      if (!user) {
        res.set('code', code).end()
      } else {
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.local.token': await bcrypt.generateHash(code.toString()),
              'account.local.tokenExp':
                Date.now() + ms(config.auth.local.tokens.recovery.expires)
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

  controller.recoverPassword = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findOne({
        $or: [
          {
            'account.local.email': req.body.recoveryKey
          },
          {
            'account.local.phoneNumber': req.body.recoveryKey
          }
        ]
      }).lean()

      if (!user) {
        res.status(403)
        res.json({
          status: 403,
          code: 4301
        })
      } else if (
        (await bcrypt.compareHash(
          req.body.token.toString(),
          user.account.local.token
        )) &&
        Date.now() < user.account.local.tokenExp
      ) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.local.token': null,
              'account.local.tokenExp': null,
              'account.local.isActive': true,
              'account.local.password': await bcrypt.generateHash(
                req.body.newPassword
              )
            }
          },
          {
            new: true
          }
        ).lean()

        res.end()
      } else {
        res.status(errors.AUT004.httpCode).send(errors.AUT004.response)
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
