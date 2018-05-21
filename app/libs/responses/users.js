
const _ = require('lodash')

module.exports = (app) => {
  const users = {}
  const keys = {
    account: ['_id', 'account.name', 'account.email', 'account.phoneNumber', 'account.isActive'],
    profile: ['_id', 'profile.pictureUrl']
  }

  users.getAccount = function (data) {
    return _.pick(data, keys.account)
  }

  users.getProfile = function (data) {
    return _.pick(data, keys.profile)
  }

  return users
}
