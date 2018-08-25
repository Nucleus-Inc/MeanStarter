module.exports = app => {
  app.use((err, req, res, next) => {
    const config = app.locals.config
    const errorsLogger = app.libs.errors.logger
    const errorFormatter = app.libs.errors.formatter

    let formattedError = errorFormatter.format(err)

    if (
      config.mean.errors.dumpExceptions &&
      config.mean.errors.dumpUnkownExeceptionsOnly &&
      formattedError.statusCode === 500
    ) {
      errorsLogger.dumpError(err)
    } else if (
      config.mean.errors.dumpExceptions &&
      !config.mean.errors.dumpUnkownExeceptionsOnly
    ) {
      errorsLogger.dumpError(err)
    }

    res.status(formattedError.statusCode).send(formattedError.errorData)
  })
}
