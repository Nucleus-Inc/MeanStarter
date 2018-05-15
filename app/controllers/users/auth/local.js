module.exports = (app) => {
  const controller = {}

  controller.login = (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      memberSince: req.user.memberSince,
      isActive: req.user.isActive
    })
  }

  controller.isAuth = (req, res) => {
    res.end()
  }

  controller.logout = (req, res) => {
    res.end()
  }

  return controller
}
