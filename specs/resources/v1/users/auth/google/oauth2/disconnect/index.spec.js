const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = require('chai')

const User = server.models.user

const googleMockProfile = {
  id: 'oauth-test',
  provider: 'google-oauth2',
  displayName: 'John Doe',
  emails: [{ value: 'john.doe@email.com' }],
  photos: [
    {
      value: 'https://via.placeholder.com/350x150'
    }
  ]
}

chai.use(chaiHttp)

describe('Google OAuth2 Disconnect - Unauthorized', () => {
  it('should fail to login on /api/v1/users/auth/google/oauth2/connect GET', done => {
    chai
      .request(server)
      .post('/users/auth/google/disconnect')
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })
  })
})

describe('Google OAuth2 Disconnect', () => {
  before(done => {
    User.create({
      'account.local.displayName': googleMockProfile.displayName,
      'account.local.email': googleMockProfile.emails[0].value,
      'account.local.photo': googleMockProfile.photos[0].value,
      'account.local.isActive': true,
      'account.google.id': googleMockProfile.id,
      'account.google.displayName': googleMockProfile.displayName,
      'account.google.email': googleMockProfile.emails[0].value,
      'account.google.photo': googleMockProfile.photos[0].value
    }).then(result => {
      server.request.user = {
        id: result._id,
        account: {
          google: {
            id: googleMockProfile.id
          }
        }
      }
      server.request.user._id = result._id

      server.request.isAuthenticated = function () {
        return true
      }

      done()
    })
  })

  it('should successfully disconnect account on /users/auth/google/oauth2/disconnect POST', done => {
    chai
      .request(server)
      .post('/users/auth/google/disconnect')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully delete google account object', done => {
    User.findOne({
      'account.local.email': googleMockProfile.emails[0].value
    })
      .lean()
      .then(result => {
        result.should.have.property('_id')
        result.should.have.property('account')
        result.account.should.be.a('object')
        result.account.should.have.property('local')
        result.account.local.should.be.a('object')
        result.account.local.should.have.property('email')
        result.account.local.email.should.be.eql(
          googleMockProfile.emails[0].value
        )
        result.account.local.should.have.property('displayName')
        result.account.local.displayName.should.be.eql(
          googleMockProfile.displayName
        )
        result.account.local.should.have.property('photo')
        result.account.local.photo.should.be.eql(
          googleMockProfile.photos[0].value
        )
        result.account.should.not.have.property('google')
        done()
      })
  })

  after(done => {
    User.remove({
      _id: server.request.user._id
    }).then(result => {
      server.request.user = undefined

      server.request.isAuthenticated = function () {
        return false
      }
      done()
    })
  })
})
