module.exports = app => {
  require('./strategies/local/jwt.js')(app)
  require('./strategies/local/local.js')(app)
  require('./strategies/google/signin.js')(app)
  require('./strategies/google/oauth2.js')(app)
  require('./strategies/facebook/oauth2.js')(app)
  require('./strategies/facebook/token.js')(app)
  /*
  let fbMockProfile = {
    id: 1234,
    provider: 'facebook-oauth2',
    displayName: 'John Doe',
    emails: [{ value: 'john.doe@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  //
  let facebookOAuth2 = app.locals.passport.user._strategies['facebook-oauth2']

  facebookOAuth2._passAuthentication = true
  facebookOAuth2._redirectToCallback = true
  facebookOAuth2._callbackURL = '/users/auth/facebook/oauth2/callback'

  facebookOAuth2._profile = fbMockProfile

  //
  let facebookToken = app.locals.passport.user._strategies['facebook-token']

  facebookToken._passAuthentication = true
  facebookToken._redirectToCallback = false

  facebookToken._profile = fbMockProfile

  //

  let googleOAuth2 = app.locals.passport.user._strategies['google-oauth2']

  googleOAuth2._passAuthentication = true
  googleOAuth2._redirectToCallback = true
  googleOAuth2._callbackURL = '/users/auth/google/oauth2/callback'
  googleOAuth2._profile = {
    id: 1234,
    provider: 'facebook-oauth2',
    displayName: 'John Doe',
    emails: [{ value: 'john.doe@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  //

  let googleSignin = app.locals.passport.user._strategies['google-signin']

  googleSignin._passAuthentication = true
  googleSignin._parsedToken = {
    payload: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      picture: 'https://via.placeholder.com/350x150'
    }
  } */
}
