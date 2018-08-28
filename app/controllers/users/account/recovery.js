const { validationResult } = require('express-validator/check')

module.exports = app => {
  const User = app.models.user
  const random = app.libs.random
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const errors = app.errors.custom
  const controller = {}

  controller.getRecoveryCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findOne({
        $or: [
          {
            'account.email': req.body.recoveryKey
          },
          {
            'account.phoneNumber': req.body.recoveryKey
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
              'account.token': await bcrypt.generateHash(code.toString()),
              'account.tokenExp': Date.now() + 300000
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
            recipient: user.account.email,
            username: user.account.name,
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
            'account.email': req.body.recoveryKey
          },
          {
            'account.phoneNumber': req.body.recoveryKey
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
          user.account.token
        )) &&
        Date.now() < user.account.tokenExp
      ) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.token': null,
              'account.tokenExp': null,
              'account.isActive': true,
              'account.password': await bcrypt.generateHash(
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
