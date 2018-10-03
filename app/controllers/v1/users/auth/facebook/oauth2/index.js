module.exports = app => {
  const controller = {}

  controller.getCallback = (req, res) => {
    res.redirect('/')
  }

  return controller
}
