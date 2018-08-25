const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
/* const sanitizerPlugin = require('mongoose-sanitizer') */

module.exports = () => {
  const schema = mongoose.Schema(
    {
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
        pictureUrl: {
          type: String
        }
      }
    },
    {
      timestamps: true
    }
  )

  /* schema.plugin(sanitizerPlugin) */
  schema.plugin(beautifyUnique)

  return mongoose.model('User', schema)
}
