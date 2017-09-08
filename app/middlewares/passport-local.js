var passport = require('passport')

module.exports = function (req, res, next) {
  return {
    login: function () {
      return passport.authenticate('local-login', {
        /*  successRedirect: '/profile',
          failureRedirect: '/login',
          failureFlash: true // allow flash messages */
      })
    },
    logout: function (req, res, next) {
      req.logout()
      req.session.destroy(function (err) {
        if (err) {
          res.status(500).end()
        } else {
          res.status(200).clearCookie('connect.sid', {path: '/'}).end()
        }
      })
    },
    isAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.status(401).end()
    }
  }
}
