module.exports = (config, errors) => {
  const middleware = (err, req, res, next) => {
    /* Bypass CSRF validation if session cookie is not in request */
    if (!req.cookies[config.modules.expressSession.name]) return next()

    /* Pass other errors to handler middleware */
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    /* Custom error */
    res.status(errors.AUT002.httpCode).send(errors.AUT002.response)
  }

  return middleware
}
