const FacebookStrategy = require('passport-facebook').Strategy
const MockStrategy = require('passport-mocked').Strategy

module.exports = app => {
  const passport = app.locals.passport.user
  const User = app.models.user
  const errors = app.locals.errors
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
          /* User is logged in */
          if (req.user) {
            let user = await User.findOne({
              'account.facebook.id': profile.id
            })
            /* User doesn't exist or does exist and it's the same user logged in */
            if (!user || req.user._id.toString() === user._id.toString()) {
              /* Link provider */

              user = await User.findByIdAndUpdate(
                req.user._id,
                {
                  $set: {
                    'account.facebook.id': profile.id,
                    'account.facebook.email': profile.emails[0].value,
                    'account.facebook.displayName': profile.displayName,
                    'account.facebook.photo': profile.photos[0].value
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
                { 'account.facebook.id': profile.id },
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
                'account.facebook.id': profile.id,
                'account.facebook.email': profile.emails[0].value,
                'account.facebook.displayName': profile.displayName,
                'account.facebook.photo': profile.photos[0].value
              })

              return done(null, user)
              /* User exists */
            } else if (
              !user.account.facebook.id ||
              user.account.facebook.id === profile.id
            ) {
              /* Link provider */
              user = await User.findByIdAndUpdate(
                user._id,
                {
                  $set: {
                    'account.facebook.id': profile.id,
                    'account.facebook.email': profile.emails[0].value,
                    'account.facebook.displayName': profile.displayName,
                    'account.facebook.photo': profile.photos[0].value
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
