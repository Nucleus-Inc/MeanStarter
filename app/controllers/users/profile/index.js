const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const responses = app.libs.responses.users
  const controller = {}

  controller.getProfile = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      res.send(responses.getProfile(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
