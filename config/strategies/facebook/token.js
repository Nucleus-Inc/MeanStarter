const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')

module.exports = app => {
  const User = app.models.user
  const config = app.locals.config

  passport.use(
    'facebook-token',
    new FacebookTokenStrategy(
      {
        clientID: config.auth.facebook.clientID
      },
      async (accessToken, refreshToken, profile, done) => {
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
