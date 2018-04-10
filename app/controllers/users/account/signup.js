const config = require('config/config.js')
const jwt = require('jsonwebtoken')
const controller = {}

module.exports = function (app) {
  const User = app.models.user
  const random = app.libs.random
  // const broadcast = app.libs.broadcast

  controller.registerUser = async (req, res, next) => {
    try {
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

      const validationResult = await req.getValidationResult()

      if (!validationResult.isEmpty()) {
        throw {
          apiError: 'Validation',
          data: validationResult.array()
        }
      }

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
    } catch (e) {
      next(e)
    }
  }

  return controller
}
