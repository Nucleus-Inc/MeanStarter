const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

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
    'facebook-oauth2',
    new FacebookStrategy(
      {
        clientID: config.auth.facebook.clientID,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: config.auth.facebook.callbacks.user.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      async (token, refreshToken, profile, done) => {
        try {
          let user = await User.findOneAndUpdate(
            {
              'account.facebook.id': profile.id
            },
            {
              $set: {
                'account.facebook.id': profile.id,
                'account.facebook.email': profile.emails[0].value,
                'account.facebook.displayName': profile.displayName,
                'account.facebook.photo': profile.photos[0].value
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
