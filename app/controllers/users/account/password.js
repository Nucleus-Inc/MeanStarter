const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const controller = {}

  controller.updatePassword = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (!new User().compareHash(req.body.currentPassword, user.password)) {
        res.status(401)
        res.json({
          code: 4100
        })
      } else if (new User().compareHash(req.body.newPassword, user.password)) {
        res.status(422).send({
          code: 4200
        })
      } else {
        await User.findByIdAndUpdate(user._id, {
          password: new User().generateHash(req.body.newPassword)
        }, {
          new: true
        })
          .lean()

        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
