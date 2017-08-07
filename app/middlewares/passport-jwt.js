var passport = require('passport')

module.exports = function (req, res, next) {
  return {
    authenticate: function () {
      return passport.authenticate('jwt', {
        session: false
      })
    }
  }
}
