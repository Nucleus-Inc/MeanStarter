const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const bcrypt = app.libs.bcrypt.hash
  const errors = app.locals.errors

  controller.updatePassword = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (
        !(await bcrypt.compareHash(
          req.body.currentPassword,
          user.account.local.password
        ))
      ) {
        res.status(errors.AUT001.httpCode).send(errors.AUT001.response)
      } else if (
        await bcrypt.compareHash(
          req.body.newPassword,
          user.account.local.password
        )
      ) {
        res.status(errors.REQ003.httpCode).send(errors.REQ003.response)
      } else {
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.local.password': await bcrypt.generateHash(
                req.body.newPassword
              )
            }
          },
          {
            new: true
          }
        ).lean()

        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
