const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

// let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('Facebook Authentication', () => {
  before(() => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    const fbMockProfile = {
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

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfile
  })

  it('should successfully login on /api/v1/users/auth/facebook/oauth2 and create User account GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
