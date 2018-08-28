module.exports = app => {
  const mongoose = app.locals.mongoose

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

  return mongoose.model('User', schema)
}
