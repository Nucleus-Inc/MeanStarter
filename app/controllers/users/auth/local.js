module.exports = function(app) {
  var controller = {}

  controller.login = function(req, res) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      memberSince: req.user.memberSince,
      isActive: req.user.isActive
    })
  }

  controller.isAuth = function(req, res) {
    res.end()
  }

  controller.logout = function(req, res) {
    res.end()
  }

  return controller
}
