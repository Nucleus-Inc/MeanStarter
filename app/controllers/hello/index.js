const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}

  controller.getHello = async (req, res, next) => {
    try {
      validationResult(req).throw()

      console.log(req.body)

      res.end()
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
