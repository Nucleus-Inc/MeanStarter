var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// Serialize the user
module.exports = function (User) {
  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  // Deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    // By default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({
      'email': email
    }, function (err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err)
      } else
      // if no user is found, return the message
      if (user && new User().compareHash(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
