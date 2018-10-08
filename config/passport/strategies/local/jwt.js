const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const User = app.models.user
  const config = app.locals.config

  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
  jwtOptions.secretOrKey = config.auth.local.jwt.jwtSecret

  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
      let user = await User.findById(jwtPayload._id)
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
  )
}
