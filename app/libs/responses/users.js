const _ = require('lodash')

module.exports = app => {
  const lib = {}

  const keys = {
    account: [
      '_id',
      'account.local.displayName',
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

  lib.getAccount = function (data) {
    return _.pick(data, keys.account)
  }

  return lib
}
