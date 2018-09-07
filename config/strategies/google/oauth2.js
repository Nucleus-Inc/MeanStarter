const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = app => {
  const User = app.models.user
  const config = app.locals.config

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
    'google-oauth2',
    new GoogleStrategy(
      {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbacks.user.callbackURL
      },
      async (token, refreshToken, profile, done) => {
        try {
          let user = await User.findOneAndUpdate(
            {
              'account.google.id': profile.id
            },
            {
              $set: {
                'account.google.id': profile.id,
                'account.google.token': token,
                'account.google.email': profile.emails[0].value,
                'account.google.displayName': profile.displayName,
                'account.google.photo': profile.photos[0].value
              }
            },
            {
              new: true,
              upsert: true
            }
          )

          if (user) {
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
