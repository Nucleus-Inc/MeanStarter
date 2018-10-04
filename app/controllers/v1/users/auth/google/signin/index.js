module.exports = app => {
  const passport = app.locals.passport.user
  const responses = app.libs.responses.users
  const controller = {}

  controller.signIn = (req, res, next) => {
    passport.authenticate('google-signin', async (err, user) => {
      if (err) {
        next(err)
      } else {
        let user = req.user

        res.send(responses.getAccount(user))
      }
    })(req, res, next)
  }

  return controller
}
