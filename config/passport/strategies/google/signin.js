const GoogleTokenStrategy = require('passport-google-id-token')

module.exports = app => {
  const passport = app.locals.passport.user
  const User = app.models.user
  const errors = app.libs.errors.custom
  const config = app.locals.config

  passport.use(
    'google-signin',
    new GoogleTokenStrategy(
      {
        clientID: config.auth.google.clientID,
        passReqToCallback: true
      },
      async (req, parsedToken, googleId, done) => {
        try {
          /* User is logged in */
          if (req.user) {
            let user = await User.findOne({
              'account.google.id': googleId
            })
            /* User doesn't exist or does exist and it's the same user logged in */
            if (!user || req.user._id.toString() === user._id.toString()) {
              /* Link provider */

              user = await User.findByIdAndUpdate(
                req.user._id,
                {
                  $set: {
                    'account.google.id': googleId,
                    'account.google.email': parsedToken.payload.email,
                    'account.google.displayName': parsedToken.payload.name,
                    'account.google.photo': parsedToken.payload.picture
                  }
                },
                {
                  new: true
                }
              )

              return done(errors.AUT007)

              /* User exists and it's not the same user logged in  */
            } else {
              /* Return auth error */
              return done(errors.AUT007)
            }
            /* User not logged in */
          } else {
            /* Find user with matching provider id or email address */
            let user = await User.findOne({
              $or: [
                { 'account.google.id': googleId },
                { 'account.local.email': parsedToken.payload.email },
                { 'account.google.email': parsedToken.payload.email },
                { 'account.facebook.email': parsedToken.payload.email }
              ]
            })
            /* User doesn't exist */
            if (!user) {
              /* Create User and set default local data with provider info */
              user = await User.create({
                'account.local.email': parsedToken.payload.email,
                'account.local.displayName': parsedToken.payload.name,
                'account.google.id': googleId,
                'account.google.email': parsedToken.payload.email,
                'account.google.displayName': parsedToken.payload.name,
                'account.google.photo': parsedToken.payload.picture
              })
              //    return done({ errorCode: 'test' })
              return done(null, user)
              /* User exists */
            } else {
              /* Link provider */
              user = await User.findByIdAndUpdate(
                user._id,
                {
                  $set: {
                    'account.google.id': googleId,
                    'account.google.email': parsedToken.payload.email,
                    'account.google.displayName': parsedToken.payload.name,
                    'account.google.photo': parsedToken.payload.picture
                  }
                },
                {
                  new: true
                }
              )
              return done(null, user)
            }
          }
        } catch (ex) {
          return done(ex)
        }
      }
    )
  )
}
