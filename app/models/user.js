const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const sanitizerPlugin = require('mongoose-sanitizer')

module.exports = function () {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    token: {
      type: String
    },
    tokenExp: {
      type: Number
    },
    changeRequests: {
      phoneNumber: {
        newNumber: {
          type: String
        },
        token: {
          type: String
        },
        tokenExp: {
          type: Number
        }
      },
      email: {
        newEmail: {
          type: String
        },
        token: {
          type: String
        },
        tokenExp: {
          type: Number
        }
      }
    },
    genre: {
      type: String,
      enum: ['male', 'female']
    },
    profilePicture: {
      type: String
    },
    phoneNumber: {
      type: String,
      index: {
        unique: true
      }
    },
    memberSince: {
      type: Date,
      default: Date.now
    }
  })

  schema.plugin(sanitizerPlugin)
  schema.plugin(beautifyUnique)

  schema.methods.generateHash = function (plainText) {
    return bcrypt.hashSync(plainText, 10)
  }

  schema.methods.compareHash = function (plainText, hash) {
    return bcrypt.compareSync(plainText, hash)
  }

  return mongoose.model('User', schema)
}
