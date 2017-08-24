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
    isAuth: function () {
      if (req.isAuthenticated()) {
        return next()
      }
      res.status(401).json({
        message: 'Local auth failed.'
      })
    }
  }
}
