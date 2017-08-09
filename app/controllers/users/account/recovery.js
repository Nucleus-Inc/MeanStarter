var async = require('async')

module.exports = function (app) {
  var User = app.models.user
  var broadcast = app.libs.broadcast
  var random = app.libs.random
  var controller = {}

  controller.getRecoveryCode = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkParams({
          'phoneNumber': {
            notEmpty: {
              errorMessage: 'Phone number is required'
            },
            isPhoneNumber: {
              number: req.body.phoneNumber,
              errorMessage: 'Invalid phone number'
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
        User.findOne({
          phoneNumber: req.params.phoneNumber
        }).then(function (data) {
          if (!data) {
            res.set('code', code)
            res.end()
          } else {
            User.findByIdAndUpdate(data._id, {
              token: new User().generateHash(code.toString()),
              tokenExp: Date.now() + 300000
            }).then(function (data) {
              if (req.query.option && req.query.option === 'email') {
                var mailOptions = {
                  to: data.email,
                  subject: 'Reset your account password',
                  template: 'email-inline',
                  context: {
                    username: data.name,
                    message: 'Reset your password account by clicking the link below',
                    link: 'http://' + req.headers.host + '/password-reset-link/' + code
                  }
                }
                broadcast.sendEmail(mailOptions)
                res.end()
              } else if (process.env.NODE_ENV === 'production') {
                done(null, code)
              } else {
                res.set('code', code)
                res.end()
              }
            }).catch(function (err) {
              res.status(500)
              res.json({
                code: 5000,
                error: err
              })
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
      },
      function (code, done) {
        // Your code for sending sms here
        res.end()
      }
    ],
    function (err, result) {
      return err || result
    })
  }

  controller.recoverPassword = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkParams({
          'phoneNumber': {
            notEmpty: {
              errorMessage: 'Phone number is required'
            },
            isPhoneNumber: {
              number: req.body.phoneNumber,
              errorMessage: 'Invalid phone number'
            }
          }
        })
        req.checkBody({
          'token': {
            notEmpty: true
          },
          'newPassword': {
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
        User.findOne({
          phoneNumber: req.params.phoneNumber
        }).then(function (data) {
          if (!data) {
            res.status(403)
            res.json({
              status: 403,
              code: 4301
            })
          } else if (new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.tokenExp) {
            User.findByIdAndUpdate(data._id, {
              token: null,
              tokenExp: null,
              isActive: true,
              password: new User().generateHash(req.body.newPassword)
            }).then(function (data) {
              res.end()
            }).catch(function (err) {
              res.status(500)
              res.json({
                code: 5000,
                error: err
              })
            })
          } else {
            res.status(403)
            res.json({
              status: 403,
              code: 4301
            })
          }
          return null
        }).catch(function (err) {
          res.status(500)
          res.json({
            status: 500,
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
