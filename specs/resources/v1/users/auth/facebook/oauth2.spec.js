const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

// let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User SignIn', () => {
  before(() => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']
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
    }
  })
  it('should successfully login on /api/v1/users/auth/facebook/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        console.log('######################################')
        console.log(res.body)
        done()
      })
  })
})
