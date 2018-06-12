const config = require('config/config.js')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = config.jwt.jwtSecret

module.exports = (User) => {
  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
    let user = await User.findById(jwtPayload._id)

    if (user) {
      next(null, {
        user: jwtPayload._id
      })
    } else {
      next(null, false)
    }
  }))
}
