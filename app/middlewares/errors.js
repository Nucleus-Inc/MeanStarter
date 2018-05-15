module.exports = (app) => {
  const errorFormatter = app.libs.errorFormatter

  app.use((err, req, res, next) => {
    let formattedError = errorFormatter.format(err)

    res.status(formattedError.statusCode).send(formattedError.errorData)
  })
}
