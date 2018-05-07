const mongoose = require('mongoose')

module.exports = function (app) {

    const customValidators = {
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

    return customValidators
}