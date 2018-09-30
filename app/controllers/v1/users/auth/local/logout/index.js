module.exports = app => {
  const controller = {}

  controller.logout = (req, res) => {
    res.end()
  }

  return controller
}
