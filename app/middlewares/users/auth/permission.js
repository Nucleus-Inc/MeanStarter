module.exports = app => {
  const middleware = {}

  middleware.isOwner = (req, res, next) => {
    if (req.params.id === req.user._id.toString()) {
      next()
    } else {
      res.status(403)
      res.json({
        code: 4300
      })
    }
  }

  return middleware
}
