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

describe('Google OAuth2 - New User', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['google-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/google/oauth2/callback'

    strategy._profile = googleMockProfile

    done()
  })

  it('should successfully login on /api/v1/users/auth/google/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/google/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })

  it('should successfully create a new local and google account objects with Google info', done => {
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
    User.remove({
      'account.google.id': googleMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 - Existing Local User Account', () => {
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
      done()
    })
  })

  it('should successfully login on /api/v1/users/auth/google/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/google/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })

  it('should successfully add google account object to matching local account', done => {
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
    User.remove({
      'account.google.id': googleMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 - Update Existing Google Object', () => {
  const fbMockProfileUpdated = {
    id: 'oauth-test',
    provider: 'google-oauth2',
    displayName: 'John Doe Update',
    emails: [{ value: 'john.doe.update@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150/update'
      }
    ]
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['google-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/google/oauth2/callback'

    strategy._profile = fbMockProfileUpdated

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
      done()
    })
  })

  it('should successfully login on /api/v1/users/auth/google/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/google/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })

  it('should successfully update google account object', done => {
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
          fbMockProfileUpdated.emails[0].value
        )
        result.account.google.should.have.property('displayName')
        result.account.google.displayName.should.be.eql(
          fbMockProfileUpdated.displayName
        )
        result.account.google.should.have.property('photo')
        result.account.google.photo.should.be.eql(
          fbMockProfileUpdated.photos[0].value
        )
        done()
      })
  })
  after(done => {
    User.remove({
      'account.google.id': googleMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 - Error AUTH-007', () => {
  const fbMockProfileDifferentId = {
    id: 'oauth-test-different-id',
    provider: 'google-oauth2',
    displayName: 'John Doe',
    emails: [{ value: 'john.doe@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['google-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/google/oauth2/callback'

    strategy._profile = fbMockProfileDifferentId

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
      done()
    })
  })

  it('should fail to login on /api/v1/users/auth/google/oauth2 GET', done => {
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
      'account.google.id': googleMockProfile.id
    }).then(result => {
      done()
    })
  })
})
