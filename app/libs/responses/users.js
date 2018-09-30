const _ = require('lodash')

module.exports = app => {
  const users = {}
  const keys = {
    account: [
      '_id',
      'account.local.name',
      'account.local.email',
      'account.local.phoneNumber',
      'account.local.isActive',
      'account.local.profile',
      'account.google.email',
      'account.google.displayName',
      'account.google.phoneNumber',
      'account.google.photo',
      'createdAt',
      'updatedAt'
    ],
    profile: ['_id', 'account.local.profile']
  }

  users.getAccount = function (data) {
    return _.pick(data, keys.account)
  }

  users.getProfile = function (data) {
    return _.pick(data, keys.profile)
  }

  return users
}
