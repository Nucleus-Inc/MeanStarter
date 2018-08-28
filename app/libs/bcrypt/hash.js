const bcrypt = require('bcryptjs')

module.exports = app => {
  const lib = {}

  lib.generateHash = async plainText => {
    const saltRounds = 10

    const hashedText = await new Promise((resolve, reject) => {
      bcrypt.hash(plainText, saltRounds, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })

    return hashedText
  }

  lib.compareHash = async (plainText, hash) => {
    const passwordCompare = await bcrypt.compare(plainText, hash)

    return passwordCompare
  }

  return lib
}
