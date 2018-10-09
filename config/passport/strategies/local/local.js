const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const User = app.models.user
  const bcrypt = app.libs.bcrypt.hash

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id)

      done(null, user)
    } catch (ex) {
      done(ex, null)
    }
  })

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          let user = await User.findOne({
            'account.local.email': email
          })

          if (
            user &&
            user.account.local.password &&
            (await bcrypt.compareHash(password, user.account.local.password))
          ) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        } catch (ex) {
          return done(ex)
        }
      }
    )
  )
}
