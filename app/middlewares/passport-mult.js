var passport = require('passport')

module.exports = {

  isAuth: function (req, res, next) {
    if (req.headers.authorization) {
      passport.authenticate('jwt', {
        session: false
      }, function (err, user) {
        if (!err && user) {
          req.user = user
          return next()
        }
        res.status(401).json({
          message: 'JWT auth failed.'
        })
      })(req, res, next)
    } else {
      if (req.isAuthenticated()) {
        return next()
      }
      res.status(401).json({
        message: 'Local auth failed.'
      })
    }
  }
}
