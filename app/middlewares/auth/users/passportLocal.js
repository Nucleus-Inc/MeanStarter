module.exports = app => {
  const middleware = {}
  const passport = app.locals.passport.user

  middleware.login = (req, res, next) => {
    return passport.authenticate('local-login', {})
  }

  middleware.logout = (req, res, next) => {
    req.logout()
    req.session.destroy(err => {
      if (err) {
        res.status(500).end()
      } else {
        res.status(200).end()
      }
    })
  }

  middleware.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).end()
  }

  return middleware
}
