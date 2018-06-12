const mongoose = require('mongoose')
const zxcvbn = require('zxcvbn')
const validator = require('validator')

module.exports = (app) => {
  const custom = {

    isObjectId: (_id) => {
      return mongoose.Types.ObjectId.isValid(_id)
    },
    isValidPassword: (password) => {
      return !!(password && zxcvbn(password).score >= 2)
    },
    isPhoneNumber: (number) => {
      let numberExp = new RegExp(/(55)[0-9]{11}/)
      return numberExp.test(number)
    },
    isUrl: (url) => {
      return !!(validator.isURL(url))
    }
  }

  return custom
}
