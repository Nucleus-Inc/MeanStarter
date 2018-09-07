const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
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
            'account.email': email
          })

          if (
            user &&
            (await bcrypt.compareHash(password, user.account.password))
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
