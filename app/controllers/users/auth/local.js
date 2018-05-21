module.exports = (app) => {
  const responses = app.libs.responses.users
  const controller = {}

  controller.login = (req, res) => {
    res.send(responses.getAccount(req.user))
  }

  controller.isAuth = (req, res) => {
    res.end()
  }

  controller.logout = (req, res) => {
    res.end()
  }

  return controller
}
