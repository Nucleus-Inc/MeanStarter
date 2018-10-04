module.exports = app => {
  const controller = {}
  const passport = app.locals.passport.user

  controller.getCallback = (req, res, next) => {
    passport.authenticate('google-oauth2', async (err, user) => {
      if (err) {
        next(err)
      } else {
        req.logIn(user, err => {
          if (err) {
            next(err)
          }
          res.redirect('/')
        })
      }
    })(req, res, next)
  }

  return controller
}
