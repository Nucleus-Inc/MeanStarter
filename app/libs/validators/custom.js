const mongoose = require('mongoose')
const zxcvbn = require('zxcvbn')

module.exports = (app) => {

    const custom = {

        isObjectId: (_id) => {
            return mongoose.Types.ObjectId.isValid(_id)
        },
        isValidPassword: (password) => {
            return !!(password && zxcvbn(password).score >= 2)
        },
        isPhoneNumber: (number) => {
            var numberExp = new RegExp(/(55)[0-9]{11}/)
            return numberExp.test(number)
        }

    }

    return custom
} 