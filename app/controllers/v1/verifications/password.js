const zxcvbn = require('zxcvbn')
const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}

  controller.validatePassword = (req, res, next) => {
    try {
      validationResult(req).throw()

      res.send({
        score: zxcvbn(req.body.password).score
      })
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
