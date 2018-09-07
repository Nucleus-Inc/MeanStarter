const passport = require('passport')
const GoogleTokenStrategy = require('passport-google-id-token')

module.exports = app => {
  const User = app.models.user
  const config = app.locals.config

  passport.use(
    'google-id-token',
    new GoogleTokenStrategy(
      {
        clientID: config.auth.google.clientID
      },
      async (parsedToken, googleId, done) => {
        try {
          let user = await User.findOneAndUpdate(
            {
              'account.google.id': googleId
            },
            {
              $set: {
                'account.google.id': googleId,
                'account.google.email': parsedToken.payload.email,
                'account.google.displayName': parsedToken.payload.name,
                'account.google.photo': parsedToken.payload.picture
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
