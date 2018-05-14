const config = require('config/config.js')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')
const controller = {}

module.exports = function (app) {
  const User = app.models.user
  const random = app.libs.random

  controller.registerUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: new User().generateHash(req.body.password),
        token: new User().generateHash(code.toString()),
        tokenExp: Date.now() + 300000
      })

      let token = jwt.sign({
        _id: user._id,
        isActive: user.isActive
      }, config.jwt.jwtSecret, {
        expiresIn: '1h'
      })

      res.set('JWT', token)

      if (process.env.NODE_ENV !== 'production') {
        res.set('code', code)
      }

      res.status(201).send(user)
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
