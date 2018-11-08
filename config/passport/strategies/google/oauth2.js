const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const passportLib = app.libs.passport.google
  const errors = app.locals.errors
  const config = app.locals.config

  passport.use(
    'google-oauth2',
    new GoogleStrategy(
      {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbacks.user.callbackURL,
        passReqToCallback: true
      },
      async (req, token, refreshToken, profile, done) => {
        try {
          let googleId = profile.id

          let userData = {
            email: profile.emails.length >= 1 ? profile.emails[0].value : null,
            displayName: profile.displayName,
            photo: profile.photos.length >= 1 ? profile.photos[0].value : null
          }

          /* User is logged in */
          if (req.user) {
            let userId = req.user._id

            let user = await passportLib.findUserByGoogleId(googleId)
            /* User doesn't exist or does exist and it's the same user logged in */
            if (!user || req.user._id.toString() === user._id.toString()) {
              /* Link provider */
              user = await passportLib.updateUser(userId, googleId, userData)

              return done(null, user)

              /* User exists and it's not the same user logged in  */
            } else {
              /* Return auth error */
              return done(errors.AUT007)
            }
            /* User not logged in */
          } else {
            /* Find user with matching provider id or email address */
            let user = await passportLib.matchUser(googleId, userData.email)
            /* User doesn't exist */
            if (!user) {
              /* Create User and set default local data with provider info */
              user = await passportLib.createUser(googleId, userData)

              return done(null, user)
              /* User exists */
            } else if (
              !user.account.google.id ||
              user.account.google.id === googleId
            ) {
              /* Link provider */
              user = await passportLib.updateUser(user._id, googleId, userData)
              return done(null, user)
            } else {
              return done(errors.AUT007)
            }
          }
        } catch (ex) {
          return done(ex)
        }
      }
    )
  )
}
