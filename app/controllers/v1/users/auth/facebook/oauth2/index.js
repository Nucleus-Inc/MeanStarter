module.exports = app => {
  const controller = {}

  controller.getCallback = (req, res) => {
    req.session.strategy = 'facebook'
    res.redirect('/')
  }

  return controller
}
