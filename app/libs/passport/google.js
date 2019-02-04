module.exports = app => {
  const lib = {}
  const User = app.models.user

  lib.findUserByGoogleId = async googleId => {
    let query = await User.findOne({
      'account.google.id': googleId
    })

    return query
  }

  lib.matchUser = async (googleId, email) => {
    let queryParams = [{ 'account.google.id': googleId }]

    if (email && email.length !== 0) {
      queryParams.push({ 'account.local.email': email })
    }

    let query = await User.findOne({
      $or: queryParams
    })

    return query
  }

  lib.createUser = async data => {
    let userObj = {
      account: {
        local: {},
        google: {}
      }
    }

    if (data.email && data.email.length !== 0) {
      userObj.account.local.email = data.email
      userObj.account.local.isActive = true
    }

    userObj.account.local.displayName = data.displayName
    userObj.account.local.photo = data.photo

    userObj.account.google = {
      id: data.id,
      email: data.email,
      displayName: data.displayName,
      photo: data.photo
    }

    let query = await User.create(userObj)

    return query
  }

  lib.linkUser = async (_id, data) => {
    let query = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          'account.google.id': data.id,
          'account.google.email': data.email,
          'account.google.displayName': data.displayName,
          'account.google.photo': data.photo
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
