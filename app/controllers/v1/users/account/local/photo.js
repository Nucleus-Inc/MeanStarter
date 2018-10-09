const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const responses = app.libs.responses.users

  controller.updatePhoto = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'account.local.photo': req.body.photo
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
