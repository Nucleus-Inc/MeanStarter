const GoogleTokenStrategy = require('passport-google-id-token')
const passportMock = require('passport-mock-strategies').GoogleTokenStrategy

module.exports = app => {
  const passport = app.locals.passport.user
  const passportLib = app.libs.passport.google
  const errors = app.locals.errors
  const config = app.locals.config

  let Strategy =
    process.env.NODE_ENV === 'production' ? GoogleTokenStrategy : passportMock

  passport.use(
    'google-signin',
    new Strategy(
      {
        clientID: config.auth.google.clientID,
        passReqToCallback: true
      },
      async (req, parsedToken, googleId, done) => {
        try {
          let userData = {
            email: parsedToken.payload.email || null,
            displayName: parsedToken.payload.name,
            photo: parsedToken.payload.picture || null
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
