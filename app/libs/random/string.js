const randomstring = require('randomstring')

module.exports = (app) => {
  const random = {}

  random.generate = (_length, _charset) => {
    return randomstring.generate({
      length: _length,
      charset: _charset
    })
  }

  return random
}
