module.exports = (app) => {
  const controller = app.controllers.users.index

  app.route('/users')
    .get(controller.getUsers)

}
