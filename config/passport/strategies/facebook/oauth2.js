const FacebookStrategy = require('passport-facebook').Strategy
const MockStrategy = require('passport-mocked').Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const User = app.models.user
  const config = app.locals.config

  let Strategy =
    process.env.NODE_ENV === 'production' || 'development'
      ? FacebookStrategy
      : MockStrategy

  passport.use(
    'facebook-oauth2',
    new Strategy(
      {
        clientID: config.auth.facebook.clientID,
        clientSecret: config.auth.facebook.clientSecret,
        callbackURL: config.auth.facebook.callbacks.user.callbackURL,
        profileFields: config.auth.facebook.profileFields,
        passReqToCallback: true
      },
      async (req, token, refreshToken, profile, done) => {
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
