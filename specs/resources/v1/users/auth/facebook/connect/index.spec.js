const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = require('chai')

const User = server.models.user

chai.use(chaiHttp)

describe('Facebook OAuth2 - Connect', () => {
  const fbMockProfile = {
    id: 'oauth-test-3',
    provider: 'facebook-oauth2',
    displayName: 'John Doe3',
    emails: [{ value: 'john.doe3@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfile

    User.create({
      'account.local.displayName': fbMockProfile.displayName,
      'account.local.email': fbMockProfile.emails[0].value,
      'account.local.photo': fbMockProfile.photos[0].value,
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

  it('should successfully connect account on /users/auth/facebook/oauth2/connect GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })
  it('should successfully create facebook account object', done => {
    User.findOne({
      'account.facebook.id': fbMockProfile.id
    })
      .lean()
      .then(result => {
        result.should.have.property('_id')
        result.should.have.property('account')
        result.account.should.be.a('object')
        result.account.should.have.property('local')
        result.account.local.should.be.a('object')
        result.account.local.should.have.property('email')
        result.account.local.email.should.be.eql(fbMockProfile.emails[0].value)
        result.account.local.should.have.property('displayName')
        result.account.local.displayName.should.be.eql(
          fbMockProfile.displayName
        )
        result.account.local.should.have.property('photo')
        result.account.local.photo.should.be.eql(fbMockProfile.photos[0].value)
        result.account.should.have.property('facebook')
        result.account.facebook.should.be.a('object')
        result.account.facebook.should.have.property('id')
        result.account.facebook.id.should.be.eql(fbMockProfile.id)
        result.account.facebook.should.have.property('email')
        result.account.facebook.email.should.be.eql(
          fbMockProfile.emails[0].value
        )
        result.account.facebook.should.have.property('displayName')
        result.account.facebook.displayName.should.be.eql(
          fbMockProfile.displayName
        )
        result.account.facebook.should.have.property('photo')
        result.account.facebook.photo.should.be.eql(
          fbMockProfile.photos[0].value
        )
        done()
      })
  })
})

describe('Facebook OAuth2 - Connect auth error AUTH-007', () => {
  const fbMockProfile = {
    id: 'oauth-test-3',
    provider: 'facebook-oauth2',
    displayName: 'John Doe3',
    emails: [{ value: 'john.doe3@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfile

    User.create({
      'account.local.displayName': fbMockProfile.displayName,
      'account.local.email': 'john.doe4@email.com',
      'account.local.photo': 'https://via.placeholder.com/350x150',
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

  it('should fail to login on /api/v1/users/auth/facebook/oauth2/connect GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-007')
        done()
      })
  })
})
