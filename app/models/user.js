const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
/* const sanitizerPlugin = require('mongoose-sanitizer') */

module.exports = () => {
  const schema = mongoose.Schema({
    account: {
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
      phoneNumber: {
        type: String,
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
            type: String,
            lowercase: true
          },
          token: {
            type: String
          },
          tokenExp: {
            type: Number
          }
        }
      }
    },
    profile: {
      profilePicture: {
        type: String
      }
    }
  }, {
    timestamps: true
  })

  /* schema.plugin(sanitizerPlugin) */
  schema.plugin(beautifyUnique)

  schema.methods.generateHash = (plainText) => {
    return bcrypt.hashSync(plainText, 10)
  }

  schema.methods.compareHash = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash)
  }

  return mongoose.model('User', schema)
}
