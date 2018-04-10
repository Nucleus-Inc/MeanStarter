const _ = require('lodash')

module.exports = function (app) {
  var errorFormatter = {}

  errorFormatter.format = (err) => {

    if (_.isObject(err) && _.has(err, 'errors') && _.has(err, ['code']) && err.code === 11000) {

      return {
        statusCode: 422,
        errorData: {
          code: 4200,
          errors: err.fields
        }
      }

    } else if (_.isObject(err) && _.has(err, 'apiError') && _.has(err, 'data')) {

      return {
        statusCode: 400,
        errorData: {
          code: 4000,
          errors: err.data
        }
      }
    }
  }

  return errorFormatter
}
