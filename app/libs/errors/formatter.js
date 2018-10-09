const _ = require('lodash')

module.exports = app => {
  const lib = {}
  const errors = app.locals.errors

  lib.format = err => {
    let response = {}

    /* REQ-001 error (Validation errors) */
    if (_.has(err, 'mapped')) {
      response = {
        statusCode: errors.REQ001.httpCode,
        errorData: {
          errorCode: errors.REQ001.response.errorCode,
          description: errors.REQ001.response.description,
          errors: err.mapped()
        }
      }
      /* REQ-003 error (Mongoose duplicated key) */
    } else if (
      _.isObject(err) &&
      _.has(err, 'name') &&
      err.name === 'MongoError' &&
      _.has(err, 'code') &&
      err.code === 11000 &&
      _.has(err, 'errmsg')
    ) {
      let value = err.errmsg.substring(
        err.errmsg.lastIndexOf('{') + 1,
        err.errmsg.lastIndexOf('}')
      )

      let key = err.errmsg.match(/(index:.+ dup key)/g)

      err.value = value.replace(/"|:| /g, '')
      err.key = key[0].replace(/index|:|dup|key|_|[0-9]+| /g, '')

      response = {
        statusCode: errors.REQ003.httpCode,
        errorData: {
          errorCode: errors.REQ003.response.errorCode,
          description: errors.REQ003.response.description,
          errors: [err.key]
        }
      }
      /* AUT-007 error */
    } else if (_.has(err, 'response') && err.response.errorCode === 'AUT-007') {
      response = {
        statusCode: errors.AUT007.httpCode,
        errorData: errors.AUT007.response
      }
      /* Unknown errors will be treated as SRV-001 error */
    } else {
      response = {
        statusCode: errors.SRV001.httpCode,
        errorData: errors.SRV001.response
      }
    }

    return response
  }
  return lib
}
