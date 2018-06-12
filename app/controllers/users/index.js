module.exports = (app) => {
  const User = app.models.user
  const controller = {}

  controller.getUsers = async (req, res, next) => {
    let users = await User.find().lean()
    res.send(users)
  }

  return controller
}
