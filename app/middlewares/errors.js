module.exports = app => {
  const errorFormatter = app.libs.errorFormatter

  app.use((err, req, res, next) => {
    const config = app.locals.config
    const errorsLogger = app.libs.errors.log

    let formattedError = errorFormatter.format(err)

    if (
      config.mean.errors.logExceptionsOnConsole &&
      config.mean.errors.logUncaughtExeceptionsOnly &&
      formattedError.statusCode === 500
    ) {
      errorsLogger.dumpError(err)
    } else if (
      config.mean.errors.logExceptionsOnConsole &&
      !config.mean.errors.logUncaughtExeceptionsOnly
    ) {
      errorsLogger.dumpError(err)
    }

    res.status(formattedError.statusCode).send(formattedError.errorData)
  })
}
