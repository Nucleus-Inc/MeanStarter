var async = require('async')

module.exports = function (app) {
  var User = app.models.user
  var broadcast = app.libs.broadcast
  var controller = {}

  controller.setEmailChangeCode = function (req, res) {
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
        var code = app.libs.random.generate(4, 'numeric')
        User.findById(req.params.id).then(function (data) {
          if (!data) {
            res.status(404)
            res.end()
          } else {
            var changeRequests = data.changeRequests
            changeRequests.email.newEmail = req.body.email
            changeRequests.email.token = new User().generateHash(code.toString())
            changeRequests.email.tokenExp = Date.now() + 300000
            User.findByIdAndUpdate(data._id, {
              changeRequests: changeRequests
            }).then(function (data) {
              var mailOptions = {
                to: data.email,
                subject: 'Activate your account',
                template: 'email-inline',
                context: {
                  username: data.name,
                  message: 'Please confirm your account by clicking the link below',
                  link: 'http://' + req.headers.host + '/your-activation-link/' + code
                }
              }
              if (process.env.NODE_ENV !== 'production') {
                res.set('code', code)
              }
              if (process.env.NODE_ENV !== 'travis') {
                //broadcast.sendEmail(mailOptions)
              }
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
            status: 500,
            code: 5000
          })
        })
      }
    ], function (err, result) {
      return err || result
    })
  }

  controller.updateEmail = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkBody({
          'token': {
            notEmpty: true
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
          } else if (new User().compareHash(req.body.token.toString(), data.changeRequests.email.token) &&
            Date.now() < data.changeRequests.email.tokenExp) {
            var changeRequests = data.changeRequests
            var newEmail = changeRequests.email.newEmail
            changeRequests.email = {}
            User.findByIdAndUpdate(data._id, {
              isActive: true,
              email: newEmail,
              changeRequests: changeRequests
            }).then(function (data) {
              res.end()
            }).catch(function (err) {
              res.status(500)
              res.json({
                code: 5000
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
            code: 5000
          })
        })
      }
    ], function (err, result) {
      return err || result
    })
  }

  return controller
}
