module.exports = app => {
  const controller = {}

  controller.getCallback = (req, res) => {
    req.session.strategy = 'google'
    res.redirect('/')
  }

  return controller
}
