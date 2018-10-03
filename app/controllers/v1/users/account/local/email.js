const { validationResult } = require('express-validator/check')
const ms = require('ms')

module.exports = app => {
  const User = app.models.user
  const random = app.libs.random.string
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const config = app.locals.config
  const responses = app.libs.responses.users
  const errors = app.errors.custom
  const controller = {}

  controller.setEmailChangeCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else {
        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.local.changeRequests.email.newEmail': req.body.email,
              'account.local.changeRequests.email.token': await bcrypt.generateHash(
                code.toString()
              ),
              'account.local.changeRequests.email.tokenExp':
                Date.now() + ms(config.auth.local.tokens.confirmation.expires)
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
            recipient: user.account.local.changeRequests.email.newEmail,
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

  controller.updateEmail = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (
        (await bcrypt.compareHash(
          req.body.token.toString(),
          user.account.local.changeRequests.email.token
        )) &&
        Date.now() < user.account.local.changeRequests.email.tokenExp
      ) {
        let newEmail = user.account.local.changeRequests.email.newEmail

        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              isActive: true,
              'account.local.email': newEmail,
              'account.local.changeRequests.email.newEmail': null,
              'account.local.changeRequests.email.token': null,
              'account.local.changeRequests.email.tokenExp': null
            }
          },
          {
            new: true
          }
        ).lean()

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
