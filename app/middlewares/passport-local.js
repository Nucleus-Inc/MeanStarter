var passport = require('passport')

module.exports = (req, res, next) => {
  return {
    login: () => {
      return passport.authenticate('local-login', {
        /*  successRedirect: '/profile',
          failureRedirect: '/login',
          failureFlash: true // allow flash messages */
      })
    },
    logout: (req, res, next) => {
      req.logout()
      req.session.destroy((err) => {
        if (err) {
          res.status(500).end()
        } else {
          res.status(200).clearCookie('connect.sid', { path: '/' }).end()
        }
      })
    },
    isAuth: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      res.status(401).end()
    }
  }
}
