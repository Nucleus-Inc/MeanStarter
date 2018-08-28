const { validationResult } = require('express-validator/check')

module.exports = app => {
  const User = app.models.user
  const random = app.libs.random
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const responses = app.libs.responses.users
  const errors = app.errors.custom
  const controller = {}

  controller.setPhoneChangeCode = async (req, res, next) => {
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
              'account.changeRequests.phoneNumber.newNumber':
                req.body.phoneNumber,
              'account.changeRequests.phoneNumber.token': await bcrypt.generateHash(
                code.toString()
              ),
              'account.changeRequests.phoneNumber.tokenExp': Date.now() + 300000
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
            recipient: user.account.changeRequests.phoneNumber.newNumber,
            username: user.account.name,
            code: code
          },
          {
            transport: 'sms'
          }
        )

        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  controller.updatePhone = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (
        (await bcrypt.compareHash(
          req.body.token.toString(),
          user.account.changeRequests.phoneNumber.token
        )) &&
        Date.now() < user.account.changeRequests.phoneNumber.tokenExp
      ) {
        let newNumber = user.account.changeRequests.phoneNumber.newNumber

        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              isActive: true,
              'account.phoneNumber': newNumber,
              'account.changeRequests.phoneNumber.newNumber': null,
              'account.changeRequests.phoneNumber.token': null,
              'account.changeRequests.phoneNumber.tokenExp': null
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
