const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const User = app.models.user

  controller.validateUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let query = {
        email: req.query.email || '',
        phoneNumber: req.query.phoneNumber || ''
      }

      let user = await User.findOne({
        $or: [
          {
            'account.local.email': query.email
          },
          {
            'account.local.phoneNumber': query.phoneNumber
          }
        ]
      }).lean()

      if (user) {
        res.status(422).end()
      } else {
        res.status(404).end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
