const config = require('config/config.js')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const random = app.libs.random
  const broadcast = app.libs.broadcast.auth
  const errors = app.errors.custom
  const controller = {}

  controller.setActivationCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = req.query.option && req.query.option === 'email' ? random.generate(20, 'alphanumeric') : random.generate(4, 'numeric')

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (user.isActive) {
        res.status(errors.AUT006.httpCode).send(errors.AUT006.response)
      } else {
        await User.findByIdAndUpdate(user._id, {
          token: new User().generateHash(code.toString()),
          tokenExp: Date.now() + 300000
        }, {
          new: true
        })
          .lean()

        if (process.env.NODE_ENV != 'production') {
          res.set('code', code)
        }

        broadcast.sendCode({
          recipient: user.email,
          username: user.name,
          code: code
        }, {
          transport: 'email'
        })

        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  controller.activateUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (user.isActive) {
        res.status(errors.AUT006.httpCode).send(errors.AUT006.response)
      } else if (user.token && new User().compareHash(req.body.token.toString(), user.token) && Date.now() < user.tokenExp) {
        await User.findByIdAndUpdate(user._id, {
          token: null,
          tokenExp: null,
          isActive: true
        }, {
          new: true
        })
          .lean()

        let token = jwt.sign({
          _id: user._id,
          isActive: user.isActive
        }, config.jwt.jwtSecret, {
          expiresIn: '1h'
        })

        res.set('JWT', token).end()
      } else {
        res.status(errors.AUT004.httpCode).send(errors.AUT004.response)
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
