module.exports = app => {
  const passport = app.locals.passport.user
  // const responses = app.libs.responses.users
  const controller = {}

  controller.signIn = (req, res, next) => {
    res.send(req.user)
  }

  return controller
}
