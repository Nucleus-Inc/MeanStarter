module.exports = app => {
  require('./strategies/local/jwt.js')(app)
  require('./strategies/local/local.js')(app)
  require('./strategies/google/signin.js')(app)
  require('./strategies/google/oauth2.js')(app)
  require('./strategies/facebook/oauth2.js')(app)
  require('./strategies/facebook/token.js')(app)

  /* let strategy = app.locals.passport.user._strategies['facebook-oauth2']

  strategy._token_response = {
    access_token: 'at-1234',
    expires_in: 3600
  }

  strategy._profile = {
    id: 1234,
    provider: 'facebook-oauth2',
    displayName: 'Igor Lopes',
    emails: [{ value: 'igor.lopes@gmail.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  } */
}
