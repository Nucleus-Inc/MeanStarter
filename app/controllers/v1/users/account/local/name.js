const { validationResult } = require('express-validator/check')

module.exports = app => {
  const User = app.models.user
  const responses = app.libs.responses.users
  const controller = {}

  controller.updateName = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'account.local.name': req.body.name
          }
        },
        {
          new: true
        }
      ).lean()

      res.send(responses.getAccount(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
