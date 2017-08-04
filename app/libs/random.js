var randomstring = require('randomstring')

module.exports = function (app) {
  var random = {}

  random.generate = function (_length, _charset) {
    return randomstring.generate({
      length: _length,
      charset: _charset
    })
  }

  return random
}
