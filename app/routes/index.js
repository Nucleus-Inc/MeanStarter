module.exports = function (app) {
  var controller = app.controllers.index

  app.route('/')
    .get(controller.render)
}
