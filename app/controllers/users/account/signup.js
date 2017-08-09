var config = require('config/config.js')
var async = require('async')
var jwt = require('jsonwebtoken')

module.exports = function (app) {
  var User = app.models.user
  var broadcast = app.libs.broadcast
  var random = app.libs.random
  var controller = {}

  controller.registerUser = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkBody({
          'name': {
            notEmpty: {
              errorMessage: 'Name is required'
            }
          },
          'email': {
            notEmpty: {
              errorMessage: 'Email address is required'
            },
            isEmail: {
              errorMessage: 'Invalid email address'
            }
          },
          'phoneNumber': {
            notEmpty: {
              errorMessage: 'Phone number is required'
            },
            isPhoneNumber: {
              number: req.body.phoneNumber,
              errorMessage: 'Invalid phone number'
            }
          },
          'password': {
            notEmpty: {
              errorMessage: 'Password is required'
            },
            isValidPassword: {
              password: req.body.password,
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
        var code = random.generate(4, 'numeric')
        User.create({
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: new User().generateHash(req.body.password),
          token: new User().generateHash(code.toString()),
          tokenExp: Date.now() + 300000
        }).then(function (data) {
          res.status(201)
          var token = jwt.sign({
            _id: data._id,
            isActive: data.isActive
          }, config.jwt.jwtSecret, {
            expiresIn: '1h'
          })
          res.set('JWT', token)
          done(null, req.body.phoneNumber, code)
        }).catch(function (err) {
          if (err.code === 11000) {
            res.status(422)
            res.json({
              code: 4200,
              errors: err.fields
            })
          } else {
            res.status(500)
            res.json({
              code: 5000,
              error: err
            })
          }
        })
      },
      function (recipient, code, done) {
        if (process.env.NODE_ENV !== 'production') {
          res.set('code', code)
        }
        broadcast.sendSms(recipient, 'Your confirmation code is ' + code)
        res.end()
      }
    ], function (err, result) {
      return err || result
    })
  }

  return controller
}
