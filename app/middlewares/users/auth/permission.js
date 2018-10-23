module.exports = app => {
  const middleware = {}
  const errors = app.locals.errors

  middleware.isOwner = (req, res, next) => {
    if (req.params.id === req.user._id.toString()) {
      next()
    } else {
      res.status(errors.AUT002.httpCode).send(errors.AUT002.response)
    }
  }

  return middleware
}
