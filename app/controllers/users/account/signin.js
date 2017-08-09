var jwt = require('jsonwebtoken')
var config = require('config/config.js')
var async = require('async')

module.exports = function (app) {
  var User = app.models.user
  var controller = {}

  controller.signIn = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkBody({
          'email': {
            notEmpty: {
              errorMessage: 'Email address is required'
            },
            isEmail: {
              errorMessage: 'Invalid email address'
            }
          },
          'password': {
            notEmpty: {
              errorMessage: 'Password is required'
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
        User.findOne({
          email: req.body.email
        }).then(function (data) {
          if (data && new User().compareHash(req.body.password, data.password)) {
            var token = jwt.sign({
              _id: data._id,
              isActive: data.isActive
            }, config.jwt.jwtSecret, {
              expiresIn: '1h'
            })
            res.set('JWT', token)
            res.end()
          } else {
            res.status(401)
            res.json({
              code: 4100
            })
          }
          return null
        }).catch(function (err) {
          res.status(500)
          res.json({
            code: 5000,
            error: err
          })
        })
      }
    ], function (err, result) {
      return err || result
    })
  }

  return controller
}
