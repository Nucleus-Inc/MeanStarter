var async = require('async')

module.exports = function (app) {
  var User = app.models.user
  var controller = {}

  controller.updatePassword = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkBody({
          'currentPassword': {
            notEmpty: {
              errorMessage: 'Password is required'
            }
          },
          'newPassword': {
            notEmpty: {
              errorMessage: 'Password is required'
            },
            isValidPassword: {
              password: req.body.newPassword,
              errorMessage: 'Password is weak or invalid'
            }
          }
        })
        req.getValidationResult().then(function (result) {
          if (!result.isEmpty()) {
            res.status(400)
            res.json({
              code: 4000,
              errors: result.array()
            })
          } else {
            done(null)
          }
        })
      },
      function (done) {
        User.findById(req.params.id).then(function (data) {
          if (!data) {
            res.status(404)
            res.end()
          } else if (!new User().compareHash(req.body.currentPassword, data.password)) {
            res.status(401)
            res.json({
              code: 4100
            })
          } else if (new User().compareHash(req.body.newPassword, data.password)) {
            res.status(422)
            res.json({
              code: 4200
            })
          } else {
            User.findByIdAndUpdate(data._id, {
              password: new User().generateHash(req.body.newPassword)
            }).then(function (data) {
              res.end()
            }).catch(function (err) {
              res.status(500)
              res.json({
                code: 5000,
                err
              })
            })
          }
          return null
        }).catch(function (err) {
          res.status(500)
          res.json({
            code: 5000,
            err
          })
        })
      }
    ], function (err, result) {
      return err || result
    })
  }

  return controller
}
