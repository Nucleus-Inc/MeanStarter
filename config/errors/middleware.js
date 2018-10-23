module.exports = app => {
  const middleware = (err, req, res, next) => {
    const errorsLogger = app.libs.errors.logger
    const errorFormatter = app.libs.errors.formatter

    let formattedError = errorFormatter.format(err)

    if (formattedError.statusCode === 500) {
      errorsLogger.dumpError(err)
    }

    res.status(formattedError.statusCode).send(formattedError.errorData)
  }

  return middleware
}
