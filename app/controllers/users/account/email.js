
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const random = app.libs.random
  const broadcast = app.libs.broadcast.auth
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
        user = await User.findByIdAndUpdate(user._id, {
          $set: {
            'account.changeRequests.email.newEmail': req.body.email,
            'account.changeRequests.email.token': new User().generateHash(code.toString()),
            'account.changeRequests.email.tokenExp': Date.now() + 300000
          }
        }, {
          new: true
        })
          .lean()

        if (process.env.NODE_ENV !== 'production') {
          res.set('code', code)
        }

        broadcast.sendCode({
          recipient: user.account.changeRequests.email.newEmail,
          username: user.account.name,
          code: code
        }, {
          transport: 'email'
        })

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
      } else if (new User().compareHash(req.body.token.toString(), user.account.changeRequests.email.token) &&
        Date.now() < user.account.changeRequests.email.tokenExp) {
        let newEmail = user.account.changeRequests.email.newEmail

        user = await User.findByIdAndUpdate(user._id, {
          $set: {
            email: newEmail,
            isActive: true,
            'account.changeRequests.email.newEmail': null,
            'account.changeRequests.email.token': null,
            'account.changeRequests.email.tokenExp': null
          }
        }, {
          new: true
        })
          .lean()

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
