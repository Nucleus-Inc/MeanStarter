module.exports = app => {
  const controller = {}
  const responses = app.libs.responses.users

  controller.login = (req, res) => {
    res.send(responses.getAccount(req.user))
  }

  controller.isAuth = (req, res) => {
    res.send(responses.getAccount(req.user))
  }

  return controller
}
