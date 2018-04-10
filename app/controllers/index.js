module.exports = function (app) {
  const controller = {}

  controller.render = (req, res) => {
    res.render('index')
  }

  return controller
}
