module.exports = app => {
  const lib = {}
  const logger = app.locals.logger

  lib.dumpError = err => {
    logger.error(err.stack || err)
  }

  return lib
}
