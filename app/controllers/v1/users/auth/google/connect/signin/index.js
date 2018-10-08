module.exports = app => {
  const responses = app.libs.responses.users
  const controller = {}

  controller.signIn = (req, res, next) => {
    res.send(responses.getAccount(req.user))
  }

  return controller
}
