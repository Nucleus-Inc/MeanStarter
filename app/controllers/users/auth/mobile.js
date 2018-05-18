const jwt = require('jsonwebtoken')
const config = require('config/config.js')
const { validationResult } = require('express-validator/check')

module.exports = (app) => {
  const User = app.models.user
  const errors = app.errors.custom
  const controller = {}

  controller.signIn = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findOne({
        email: req.body.email
      })
        .lean()

      if (user && new User().compareHash(req.body.password, user.password)) {
        const token = jwt.sign({
          _id: user._id,
          isActive: user.isActive
        }, config.jwt.jwtSecret, {
          expiresIn: '1h'
        })
        res.set('JWT', token)
        res.send(user)
      } else {
        res.status(errors.AUT001.httpCode).send(errors.AUT001.response)
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
