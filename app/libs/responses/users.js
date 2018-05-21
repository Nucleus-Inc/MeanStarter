
const _ = require('lodash')

module.exports = (app) => {
  const users = {}
  const keys = {
    account: ['_id', 'account.name', 'account.email', 'account.phoneNumber', 'account.isActive']
  }

  users.getAccount = function (data) {
    return _.pick(data, keys.account)
  }

  return users
}
