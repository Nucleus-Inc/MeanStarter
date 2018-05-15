module.exports = (app) => {
  const controller = {}

  controller.render = (req, res) => {
    res.render('index')
  }

  return controller
}
