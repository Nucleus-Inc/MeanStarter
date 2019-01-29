module.exports = app => {
  const lib = {}
  const User = app.models.user

  lib.findUserByFacebookId = async facebookId => {
    let query = await User.findOne({
      'account.facebook.id': facebookId
    })

    return query
  }

  lib.matchUser = async (facebookId, email) => {
    let queryParams = [{ 'account.facebook.id': facebookId }]

    if (email && email.length !== 0) {
      queryParams.push({ 'account.local.email': email })
    }

    let query = await User.findOne({
      $or: queryParams
    })

    return query
  }

  lib.createUser = async (facebookId, data) => {
    let userObj = {
      account: {
        local: {},
        facebook: {}
      }
    }

    if (data.email && data.email.length !== 0) {
      userObj.account.local.email = data.email
      userObj.account.local.isActive = true
    }

    userObj.account.local.displayName = data.displayName
    userObj.account.local.photo = data.photo

    userObj.account.facebook = {
      id: facebookId,
      email: data.email,
      displayName: data.displayName,
      photo: data.photo
    }

    let query = await User.create(userObj)

    return query
  }

  lib.updateUser = async (_id, facebookId, data) => {
    let query = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          'account.facebook.id': facebookId,
          'account.facebook.email': data.email,
          'account.facebook.displayName': data.displayName,
          'account.facebook.photo': data.photo
        }
      },
      {
        new: true
      }
    )

    return query
  }

  return lib
}
