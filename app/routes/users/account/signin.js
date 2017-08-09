module.exports = function (app) {
  var controller = app.controllers.users.account.signin

  app.route('/users/account/signin')
    .post(controller.signIn)
}
