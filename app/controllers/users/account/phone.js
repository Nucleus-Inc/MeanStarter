var async = require('async')

module.exports = function (app) {
  var User = app.models.user
  var broadcast = app.libs.broadcast
  var random = app.libs.random
  var controller = {}

  controller.setPhoneChangeCode = function (req, res) {
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
        User.findById(req.params.id).then(function (data) {
          if (!data) {
            res.status(404)
            res.end()
          } else {
            var changeRequests = data.changeRequests
            changeRequests.phoneNumber.newNumber = req.body.phoneNumber
            changeRequests.phoneNumber.token = new User().generateHash(code.toString())
            changeRequests.phoneNumber.tokenExp = Date.now() + 300000
            User.findByIdAndUpdate(data._id, {
              changeRequests: changeRequests
            }).then(function (data) {
              done(null, changeRequests.phoneNumber.newNumber, code)
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

  controller.updatePhone = function (req, res) {
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
          } else if (new User().compareHash(req.body.token.toString(), data.changeRequests.phoneNumber.token) &&
            Date.now() < data.changeRequests.phoneNumber.tokenExp) {
            var changeRequests = data.changeRequests
            var newNumber = changeRequests.phoneNumber.newNumber
            changeRequests.phoneNumber = {}
            User.findByIdAndUpdate(data._id, {
              isActive: true,
              phoneNumber: newNumber,
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
