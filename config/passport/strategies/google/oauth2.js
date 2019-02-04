const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const passportMock = require('passport-mock-strategies').OAuth2Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const passportLib = app.libs.passport.google
  const errors = app.locals.errors
  const config = app.locals.config

  let Strategy =
    process.env.NODE_ENV === 'production' ? GoogleStrategy : passportMock

  passport.use(
    'google-oauth2',
    new Strategy(
      {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbacks.user.callbackURL,
        passReqToCallback: true
      },
      async (req, token, refreshToken, profile, done) => {
        try {
          let userData = {
            id: profile.id,
            email: profile.emails.length >= 1 ? profile.emails[0].value : null,
            displayName: profile.displayName,
            photo: profile.photos.length >= 1 ? profile.photos[0].value : null
          }

          /* User is logged in */
          if (req.user) {
            let userId = req.user._id

            let user = await passportLib.findUserByGoogleId(userData.id)
            /* User doesn't exist or does exist and it's the same user logged in */
            if (!user || req.user._id.toString() === user._id.toString()) {
              /* Link provider */
              user = await passportLib.linkUser(userId, userData)

              return done(null, user)

              /* User exists and it's not the same user logged in  */
            } else {
              /* Return auth error */
              return done(errors.AUT007)
            }
            /* User not logged in */
          } else {
            /* Find user with matching provider id or email address */
            let user = await passportLib.matchUser(userData.id, userData.email)
            /* User doesn't exist */
            if (!user) {
              /* Create User and set default local data with provider info */
              user = await passportLib.createUser(userData)

              return done(null, user)
              /* User exists */
            } else if (
              !user.account.google.id ||
              user.account.google.id === userData.id
            ) {
              /* Link provider */
              user = await passportLib.linkUser(user._id, userData)
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
