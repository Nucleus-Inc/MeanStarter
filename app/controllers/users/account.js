var config = require('../../../config/config.js')
var async = require('async')
var jwt = require('jsonwebtoken')

module.exports = function(app) {
  var User = app.models.user
  var broadcast = app.libs.broadcast
  var random = app.libs.random
  var controller = {}

  controller.signIn = function(req, res) {
    async.waterfall([
      function(done) {
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        User.findOne({
          email: req.body.email
        }).then(function(data) {
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
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000,
            error: err
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.registerUser = function(req, res) {
    async.waterfall([
      function(done) {
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        var code = random.generate(4, 'numeric')
        User.create({
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: new User().generateHash(req.body.password),
          token: new User().generateHash(code.toString()),
          tokenExp: Date.now() + 300000
        }).then(function(data) {
          res.status(201)
          var token = jwt.sign({
            _id: data._id,
            isActive: data.isActive
          }, config.jwt.jwtSecret, {
            expiresIn: '1h'
          })
          res.set('JWT', token)
          if (process.env.NODE_ENV === 'production') {
            done(null, code)
          } else {
            res.set('code', code)
            res.end()
          }
        }).catch(function(err) {
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
      function(code, done) {
        // Your code for sending sms here
        res.end()
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.getActivationCode = function(req, res) {
    async.waterfall([
      function(done) {
        req.checkParams({
          'id': {
            notEmpty: true,
            isObjectId: {
              _id: req.params.id
            }
          }
        })
        req.getValidationResult().then(function(result) {
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
      function(done) {
        var code = random.generate(4, 'numeric')
        User.findById(req.params.id).then(function(data) {
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
            }).then(function(data) {
              if (req.query.option && req.query.option === 'email') {
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
                broadcast.sendEmail(mailOptions)
                res.end()
              } else if (process.env.NODE_ENV === 'production') {
                done(null, code)
              } else {
                res.set('code', code)
                res.end()
              }
            }).catch(function(err) {
              res.status(500)
              res.json({
                code: 5000,
                error: err
              })
            })
          }
          return null
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000,
            error: err
          })
        })
      },
      function(code, done) {
        // Your code for sending sms here
        res.end()
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.activateUser = function(req, res) {
    async.waterfall([
      function(done) {
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        User.findById(req.params.id).then(function(data) {
          if (!data) {
            res.status(404)
            res.end()
          } else if (data.isActive) {
            res.status(422)
            res.json({
              code: 4201
            })
          } else if (new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.tokenExp) {
            User.findByIdAndUpdate(data._id, {
              token: null,
              tokenExp: null,
              isActive: true
            }, {
              new: true
            }).then(function(data) {
              var token = jwt.sign({
                _id: data._id,
                isActive: data.isActive
              }, config.jwt.jwtSecret, {
                expiresIn: '1h'
              })
              res.set('JWT', token)
              res.end()
            }).catch(function(err) {
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
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000,
            error: err
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.getRecoveryCode = function(req, res) {
    async.waterfall([
        function(done) {
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
          req.getValidationResult().then(function(result) {
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
        function(done) {
          var code = random.generate(4, 'numeric')
          User.findOne({
            phoneNumber: req.params.phoneNumber
          }).then(function(data) {
            if (!data) {
              res.set('code', code)
              res.end()
            } else {
              User.findByIdAndUpdate(data._id, {
                token: new User().generateHash(code.toString()),
                tokenExp: Date.now() + 300000
              }).then(function(data) {
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
              }).catch(function(err) {
                res.status(500)
                res.json({
                  code: 5000,
                  error: err
                })
              })
            }
            return null
          }).catch(function(err) {
            res.status(500)
            res.json({
              code: 5000,
              error: err
            })
          })
        },
        function(code, done) {
          // Your code for sending sms here
          res.end()
        }
      ],
      function(err, result) {
        return err || result
      })
  }

  controller.recoverPassword = function(req, res) {
    async.waterfall([
      function(done) {
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        User.findOne({
          phoneNumber: req.params.phoneNumber
        }).then(function(data) {
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
            }).then(function(data) {
              res.end()
            }).catch(function(err) {
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
        }).catch(function(err) {
          res.status(500)
          res.json({
            status: 500,
            code: 5000,
            error: err
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.updatePassword = function(req, res) {
    async.waterfall([
      function(done) {
        req.checkParams({
          'id': {
            notEmpty: true,
            isObjectId: {
              _id: req.params.id
            }
          }
        })
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        User.findById(req.params.id).then(function(data) {
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
            }).then(function(data) {
              res.end()
            }).catch(function(err) {
              res.status(500)
              res.json({
                code: 5000,
                err
              })
            })
          }
          return null
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000,
            err
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.setPhoneChangeCode = function(req, res) {
    async.waterfall([
      function(done) {
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        var code = app.libs.random.generate(4, 'numeric')
        User.findById(req.params.id).then(function(data) {
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
            }).then(function(data) {
              done(null, changeRequests.phoneNumber.newNumber, code)
              res.end()
            }).catch(function(err) {
              res.status(500)
              res.json({
                code: 5000,
                err
              })
            })
          }
          return null
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000,
            err
          })
        })
      },
      function(recipient, code, done) {
        if (process.env.NODE_ENV != 'production') {
          res.set('code', code)
        }
        res.end()
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.updatePhone = function(req, res) {
    async.waterfall([
      function(done) {
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
        req.getValidationResult().then(function(result) {
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
      function(done) {
        User.findById(req.params.id).then(function(data) {
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
            }).then(function(data) {
              res.end()
            }).catch(function(err) {
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
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.setEmailChangeCode = function(req, res) {
    async.waterfall([
      function(done) {
        req.checkParams({
          'id': {
            notEmpty: true,
            isObjectId: {
              _id: req.params.id
            }
          }
        })
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
      function(done) {
        var code = app.libs.random.generate(4, 'numeric')
        User.findById(req.params.id).then(function(data) {
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
            }).then(function(data) {
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
              // broadcast.sendEmail(mailOptions)
              res.set('code', code)
              res.end()
            }).catch(function(err) {
              res.status(500)
              res.json({
                code: 5000
              })
            })
          }
          return null
        }).catch(function(err) {
          res.status(500)
          res.json({
            status: 500,
            code: 5000
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  controller.updateEmail = function(req, res) {
    async.waterfall([
      function(done) {
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
      function(done) {
        User.findById(req.params.id).then(function(data) {
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
            }).then(function(data) {
              res.end()
            }).catch(function(err) {
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
        }).catch(function(err) {
          res.status(500)
          res.json({
            code: 5000
          })
        })
      }
    ], function(err, result) {
      return err || result
    })
  }

  return controller
}
