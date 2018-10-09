const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const responses = app.libs.responses.users

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
