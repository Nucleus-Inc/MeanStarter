
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const random = app.libs.random
  const controller = {}

  controller.setPhoneChangeCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findById(req.params.id)

      if (!user) {
        res.status(404).end()
      } else {
        // let changeRequests = user.changeRequests
        /* changeRequests.phoneNumber.newNumber = req.body.phoneNumber
        changeRequests.phoneNumber.token = new User().generateHash(code.toString())
        changeRequests.phoneNumber.tokenExp = Date.now() + 300000 */
        await User.findByIdAndUpdate(user._id, {
          $set: {
            'changeRequests.phoneNumber.newNumber': req.body.phoneNumber,
            'changeRequests.phoneNumber.token': new User().generateHash(code.toString()),
            'changeRequests.phoneNumber.tokenExp': Date.now() + 300000
          }
        }, {
          new: true
        })

        if (process.env.NODE_ENV !== 'production') {
          res.set('code', code)
        }
        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  controller.updatePhone = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id)

      if (!user) {
        res.status(404).end()
      } else if (new User().compareHash(req.body.token.toString(), user.changeRequests.phoneNumber.token) &&
        Date.now() < user.changeRequests.phoneNumber.tokenExp) {
        let newNumber = user.changeRequests.phoneNumber.newNumber

        await User.findByIdAndUpdate(user._id, {
          $set: {
            isActive: true,
            phoneNumber: newNumber,
            'changeRequests.phoneNumber.newNumber': null,
            'changeRequests.phoneNumber.token': null,
            'changeRequests.phoneNumber.tokenExp': null
          }
        })

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
