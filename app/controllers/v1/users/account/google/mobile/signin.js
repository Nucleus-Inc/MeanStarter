const { validationResult } = require('express-validator/check')

module.exports = app => {
  const responses = app.libs.responses.users
  const controller = {}

  controller.signIn = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = req.user

      res.send(responses.getAccount(user))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
