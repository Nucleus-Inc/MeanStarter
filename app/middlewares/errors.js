module.exports = function (app) {
  const errorFormatter = app.libs.errorFormatter

  app.use(function (err, req, res, next) {

    let formattedError = errorFormatter.format(err)

    res.status(formattedError.statusCode).send(formattedError.errorData)
  })
}
