var async = require('async')
var zxcvbn = require('zxcvbn')

module.exports = function (app) {
  var controller = {}

  controller.validatePassword = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkBody({
          'password': {
            notEmpty: {
              errorMessage: 'Password is required'
            }
          }
        })
        if (req.validationErrors()) {
          res.status(400)
          res.json({
            code: 4000,
            errors: req.validationErrors()
          })
        } else {
          done(null)
        }
      },
      function (done) {
        res.json({
          score: zxcvbn(req.body.password).score
        })
      }
    ], function (err, result) {
      return err || result
    })
  }

  return controller
}
