const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const responses = app.libs.responses.users
  const controller = {}

  controller.updateUserPicture = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findByIdAndUpdate(req.params.id, {

        $set: {
          'profile.pictureUrl': req.body.pictureUrl
        }
      }, {
        new: true
      })
        .lean()

      res.send(responses.getProfile(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
