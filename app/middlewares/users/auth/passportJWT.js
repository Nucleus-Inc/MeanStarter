module.exports = app => {
  const middleware = {}
  const passport = app.locals.passport.user

  middleware.isAuth = (req, res, next) => {
    if (req.headers.authorization) {
      passport.authenticate(
        'jwt',
        {
          session: false
        },
        (err, user) => {
          if (!err && user) {
            req.user = user
            return next()
          }
          res.status(401).end()
        }
      )(req, res, next)
    } else {
      res.status(401).end()
    }
  }

  return middleware
}
