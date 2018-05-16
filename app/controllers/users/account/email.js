
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const random = app.libs.random
  const controller = {}

  controller.setEmailChangeCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else {
        await User.findByIdAndUpdate(user._id, {
          $set: {
            'changeRequests.email.newEmail': req.body.email,
            'changeRequests.email.token': new User().generateHash(code.toString()),
            'changeRequests.email.tokenExp': Date.now() + 300000
          }
        }, {
          new: true
        })
          .lean()

        if (process.env.NODE_ENV !== 'production') {
          res.set('code', code)
        }

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
      } else if (new User().compareHash(req.body.token.toString(), user.changeRequests.email.token) &&
        Date.now() < user.changeRequests.email.tokenExp) {
        let newEmail = user.changeRequests.email.newEmail

        await User.findByIdAndUpdate(user._id, {
          $set: {
            email: newEmail,
            isActive: true,
            'changeRequests.email.newEmail': null,
            'changeRequests.email.token': null,
            'changeRequests.email.tokenExp': null
          }
        }, {
          new: true
        })
          .lean()

        res.end()
      } else {
        res.status(403).send({
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
