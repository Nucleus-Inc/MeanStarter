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

describe('Google OAuth2 Connect - Unauthorized', () => {
  it('should fail to login on /api/v1/users/auth/google/oauth2/connect GET', done => {
    chai
      .request(server)
      .get('/users/auth/google/oauth2/connect')
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })
  })
})

describe('Google OAuth2 Connect', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['google-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/google/oauth2/callback'

    strategy._profile = googleMockProfile

    User.create({
      'account.local.displayName': googleMockProfile.displayName,
      'account.local.email': googleMockProfile.emails[0].value,
      'account.local.photo': googleMockProfile.photos[0].value,
      'account.local.isActive': true
    }).then(result => {
      server.request.user = {
        id: result._id
      }
      server.request.user._id = result._id

      server.request.isAuthenticated = function () {
        return true
      }

      done()
    })
  })

  it('should successfully connect account on /users/auth/google/oauth2/connect GET', done => {
    chai
      .request(server)
      .get('/users/auth/google/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })
  it('should successfully create google account object', done => {
    User.findOne({
      'account.google.id': googleMockProfile.id
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
        result.account.should.have.property('google')
        result.account.google.should.be.a('object')
        result.account.google.should.have.property('id')
        result.account.google.id.should.be.eql(googleMockProfile.id)
        result.account.google.should.have.property('email')
        result.account.google.email.should.be.eql(
          googleMockProfile.emails[0].value
        )
        result.account.google.should.have.property('displayName')
        result.account.google.displayName.should.be.eql(
          googleMockProfile.displayName
        )
        result.account.google.should.have.property('photo')
        result.account.google.photo.should.be.eql(
          googleMockProfile.photos[0].value
        )
        done()
      })
  })

  after(done => {
    server.request.user = undefined

    server.request.isAuthenticated = function () {
      return false
    }

    User.remove({
      'account.google.id': googleMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 Connect - Error AUTH-007', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['google-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/google/oauth2/callback'

    strategy._profile = googleMockProfile

    User.create({
      'account.local.displayName': googleMockProfile.displayName,
      'account.local.email': googleMockProfile.emails[0].value,
      'account.local.photo': googleMockProfile.photos[0].value,
      'account.local.isActive': true,
      'account.google.id': googleMockProfile.id,
      'account.google.displayName': googleMockProfile.displayName,
      'account.google.email': googleMockProfile.emails[0].value,
      'account.google.photo': googleMockProfile.photos[0].value
    }).then(result => {})

    User.create({
      'account.local.displayName': 'Different User',
      'account.local.email': 'other.user@email.com',
      'account.local.isActive': true
    }).then(result => {
      server.request.user = {
        id: result._id,
        isActive: true
      }
      server.request.user._id = result._id

      server.request.isAuthenticated = function () {
        return true
      }

      done()
    })
  })

  it('should fail to login on /api/v1/users/auth/google/oauth2/connect GET', done => {
    chai
      .request(server)
      .get('/users/auth/google/oauth2')
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-007')
        done()
      })
  })

  after(done => {
    User.remove({
      $or: [
        {
          'account.google.id': googleMockProfile.id
        },
        {
          _id: server.request.user._id
        }
      ]
    }).then(result => {
      server.request.user = undefined

      server.request.isAuthenticated = function () {
        return false
      }
      done()
    })
  })
})
