const _ = require('lodash')

module.exports = function (app) {
  const errorFormatter = {}

  errorFormatter.format = (err) => {

    let response = {}

    if (_.has(err, 'mapped')) {

      response = {
        statusCode: 400,
        errorData: {
          code: 4000,
          errors: err.mapped()
        }
      }

    } else if (_.isObject(err) && _.has(err, 'errors') && _.has(err, ['code']) && err.code === 11000) {

      response = {
        statusCode: 422,
        errorData: {
          code: 4200,
          errors: err.fields
        }
      }

    } else if (_.isObject(err) && _.has(err, 'apiError') && _.has(err, 'data')) {

      response = {
        statusCode: 400,
        errorData: {
          code: 4000,
          errors: err.data
        }
      }
    } else {

      response = {
        statusCode: 500,
        errorData: {
          code: 5000
        }
      }
    }

    return response
  }
  return errorFormatter
}
