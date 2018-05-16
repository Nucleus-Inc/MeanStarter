
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const random = app.libs.random
  const broadcast = app.libs.broadcast
  const controller = {}

  controller.getRecoveryCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findOne({
        $or: [{
          'email': req.body.recoveryKey
        },
        {
          'phoneNumber': req.body.recoveryKey
        }]
      }, {
        new: true
      })
        .lean()

      if (!user) {
        res.set('code', code).end()
      } else {
        await User.findByIdAndUpdate(user._id, {
          token: new User().generateHash(code.toString()),
          tokenExp: Date.now() + 300000
        }, {
          new: true
        })
          .lean()

        if (process.env.NODE_ENV != 'production') {
          res.set('code', code)
        }

        broadcast.sendCode({
          recipient: user.email,
          username: user.name,
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

  controller.recoverPassword = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findOne({
        $or: [{
          'email': req.body.recoveryKey
        },
        {
          'phoneNumber': req.body.recoveryKey
        }]
      })
        .lean()

      if (!user) {
        res.status(403)
        res.json({
          status: 403,
          code: 4301
        })
      } else if (new User().compareHash(req.body.token.toString(), user.token) && Date.now() < user.tokenExp) {
        await User.findByIdAndUpdate(user._id, {
          token: null,
          tokenExp: null,
          isActive: true,
          password: new User().generateHash(req.body.newPassword)
        }, {
          new: true
        })
          .lean()

        res.end()
      } else {
        res.status(403)
        res.json({
          status: 403,
          code: 4301
        })
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
