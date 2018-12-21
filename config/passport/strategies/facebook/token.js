const FacebookTokenStrategy = require('passport-facebook-token')
const passportMock = require('passport-mock-strategies').OAuth2Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const passportLib = app.libs.passport.facebook
  const errors = app.locals.errors
  const config = app.locals.config

  let Strategy =
    process.env.NODE_ENV === 'production' ? FacebookTokenStrategy : passportMock

  passport.use(
    'facebook-token',
    new Strategy(
      {
        clientID: config.auth.facebook.clientID,
        clientSecret: config.auth.facebook.clientSecret,
        fbGraphVersion: 'v3.0',
        passReqToCallback: true
      },
      async (req, token, refreshToken, profile, done) => {
        try {
          /* User is logged in */
          if (req.user) {
            let user = await passportLib.findUserByFacebookId(profile.id)
            /* User doesn't exist or does exist and it's the same user logged in */
            if (!user || req.user._id.toString() === user._id.toString()) {
              /* Link provider */

              user = await passportLib.updateUser(req.user._id, profile)

              return done(null, user)

              /* User exists and it's not the same user logged in  */
            } else {
              /* Return auth error */
              return done(errors.AUT007)
            }
            /* User not logged in */
          } else {
            /* Find user with matching provider id or email address */
            let user = await passportLib.matchUser(profile)
            /* User doesn't exist */
            if (!user) {
              /* Create User and set default local data with provider info */
              user = await passportLib.createUser(profile)

              return done(null, user)
              /* User exists */
            } else if (
              !user.account.facebook.id ||
              user.account.facebook.id === profile.id
            ) {
              /* Link provider */
              user = await passportLib.updateUser(req.user._id, profile)

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
