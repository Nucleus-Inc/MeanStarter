const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = (User) => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({
      'email': email
    }, (err, user) => {
      if (err) {
        return done(err)
      } else if (user && new User().compareHash(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
