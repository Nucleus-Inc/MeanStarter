var config = require('config/config.js')
var passport = require('passport')
var passportJWT = require('passport-jwt')
var ExtractJwt = passportJWT.ExtractJwt
var JwtStrategy = passportJWT.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = config.jwt.jwtSecret

module.exports = function (User) {
  passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, next) {
    User.findById(jwtPayload._id).then(function (data) {
      if (data) {
        next(null, {user: jwtPayload._id})
      } else {
        next(null, false)
      }
    })
  }))
}
