module.exports = app => {
  const controller = {}
  const User = app.models.user

  controller.getUsers = async (req, res, next) => {
    let users = await User.find().lean()
    res.send(users)
  }

  return controller
}
