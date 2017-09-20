var config = require('config/config.js')
var async = require('async')
var jwt = require('jsonwebtoken')

module.exports = function (app) {
  var User = app.models.user
  var broadcast = app.libs.broadcast
  var random = app.libs.random
  var controller = {}

  controller.setActivationCode = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkParams({
          'id': {
            notEmpty: true,
            isObjectId: {
              _id: req.params.id
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
        var code = req.query.option && req.query.option === 'email'
          ? random.generate(20, 'alphanumeric') : random.generate(4, 'numeric')

        User.findById(req.params.id).then(function (data) {
          if (!data) {
            res.status(404)
            res.end()
          } else if (data.isActive) {
            res.status(422)
            res.json({
              code: 4201
            })
          } else {
            User.findByIdAndUpdate(data._id, {
              token: new User().generateHash(code.toString()),
              tokenExp: Date.now() + 300000
            }).then(function (data) {
              if (req.query.option && req.query.option === 'email') {
                var mailOptions = {
                  to: data.email,
                  subject: 'Activate your account',
                  template: 'email-inline',
                  context: {
                    username: data.name,
                    message: 'Please confirm your account by clicking the link below.',
                    link: 'http://' + req.headers.host +
                    '/#/account/' + data._id + '/activate?' + 'token=' + code
                  }
                }
                broadcast.sendEmail(mailOptions)
                res.end()
              } else {
                done(null, data.phone_number, code)
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
      function (recipient, code, done) {
        if (process.env.NODE_ENV != 'production') {
          res.set('code', code)
        } else {
          broadcast.sendSms(recipient, config.smsMessages.registration.msg + code)
        }
        res.end()
      }
    ], function (err, result) {
      return err || result
    })
  }

  controller.activateUser = function (req, res) {
    async.waterfall([
      function (done) {
        req.checkParams({
          'id': {
            notEmpty: true,
            isObjectId: {
              _id: req.params.id
            }
          }
        })
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
          } else if (data.isActive) {
            res.status(422)
            res.json({
              code: 4201
            })
          } else if (data.token && new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.tokenExp) {
            User.findByIdAndUpdate(data._id, {
              token: null,
              tokenExp: null,
              isActive: true
            }, {
              new: true
            }).then(function (data) {
              var token = jwt.sign({
                _id: data._id,
                isActive: data.isActive
              }, config.jwt.jwtSecret, {
                expiresIn: '1h'
              })
              res.set('JWT', token)
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
