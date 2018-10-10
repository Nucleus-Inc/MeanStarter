const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const User = app.models.user
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
          /* User is logged in */
          if (req.user) {
            let user = await User.findOne({
              'account.google.id': profile.id
            })
            /* User doesn't exist or does exist and it's the same user logged in */
            if (!user || req.user._id.toString() === user._id.toString()) {
              /* Link provider */

              user = await User.findByIdAndUpdate(
                req.user._id,
                {
                  $set: {
                    'account.google.id': profile.id,
                    'account.google.email': profile.emails[0].value,
                    'account.google.displayName': profile.displayName,
                    'account.google.photo': profile.photos[0].value
                  }
                },
                {
                  new: true
                }
              )

              return done(null, user)

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
                { 'account.google.id': profile.id },
                { 'account.local.email': profile.emails[0].value }
              ]
            })
            /* User doesn't exist */
            if (!user) {
              /* Create User and set default local data with provider info */
              user = await User.create({
                'account.local.email': profile.emails[0].value,
                'account.local.displayName': profile.displayName,
                'account.local.photo': profile.photos[0].value,
                'account.google.id': profile.id,
                'account.google.email': profile.emails[0].value,
                'account.google.displayName': profile.displayName,
                'account.google.photo': profile.photos[0].value
              })

              return done(null, user)
              /* User exists */
            } else if (
              !user.account.google.id ||
              user.account.google.id === profile.id
            ) {
              /* Link provider */
              user = await User.findByIdAndUpdate(
                user._id,
                {
                  $set: {
                    'account.google.id': profile.id,
                    'account.google.email': profile.emails[0].value,
                    'account.google.displayName': profile.displayName,
                    'account.google.photo': profile.photos[0].value
                  }
                },
                {
                  new: true
                }
              )
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
