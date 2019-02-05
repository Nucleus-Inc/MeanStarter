const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = require('chai')

const User = server.models.user

const googleMockId = 'google-signin-test'

const googleParsedToken = {
  header: {
    alg: 'RS256',
    kid: '6fb05f742366ee4',
    typ: 'JWT'
  },
  payload: {
    iss: 'https://accounts.google.com',
    azp: '818817473054.apps.googleusercontent.com',
    aud: '818817473054.apps.googleusercontent.com',
    sub: '10673069690211',
    hd: 'johndoe.com',
    email: 'john.doe@email.com',
    email_verified: true,
    name: 'John Doe',
    picture: 'https://via.placeholder.com/350x150',
    given_name: 'John',
    family_name: 'Doe',
    locale: 'pt-BR',
    iat: 1549288404,
    exp: 1549292004
  },
  signature: 'SO_Opm768fGibznnKXSEi'
}

chai.use(chaiHttp)

describe('Google OAuth2 - New User', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['google-signin']

    strategy._passAuthentication = true
    strategy._parsedToken = googleParsedToken
    strategy._googleId = googleMockId

    done()
  })

  it('should successfully login on /api/v1/users/auth/google/signin GET', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully create a new local and google account objects with Google info', done => {
    User.findOne({
      'account.google.id': googleMockId
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
          googleParsedToken.payload.email
        )
        result.account.local.should.have.property('displayName')
        result.account.local.displayName.should.be.eql(
          googleParsedToken.payload.name
        )
        result.account.local.should.have.property('photo')
        result.account.local.photo.should.be.eql(
          googleParsedToken.payload.picture
        )
        result.account.should.have.property('google')
        result.account.google.should.be.a('object')
        result.account.google.should.have.property('id')
        result.account.google.id.should.be.eql(googleMockId)
        result.account.google.should.have.property('email')
        result.account.google.email.should.be.eql(
          googleParsedToken.payload.email
        )
        result.account.google.should.have.property('displayName')
        result.account.google.displayName.should.be.eql(
          googleParsedToken.payload.name
        )
        result.account.google.should.have.property('photo')
        result.account.google.photo.should.be.eql(
          googleParsedToken.payload.picture
        )
        done()
      })
  })

  after(done => {
    User.remove({
      'account.google.id': googleMockId
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 - Existing Local User Account', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['google-signin']

    strategy._passAuthentication = true
    strategy._parsedToken = googleParsedToken
    strategy._googleId = googleMockId

    User.create({
      'account.local.displayName': googleParsedToken.payload.name,
      'account.local.email': googleParsedToken.payload.email,
      'account.local.photo': googleParsedToken.payload.picture,
      'account.local.isActive': true
    }).then(result => {
      done()
    })
  })

  it('should successfully login on /api/v1/users/auth/google/signin GET', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully add google account object to matching local account', done => {
    User.findOne({
      'account.google.id': googleMockId
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
          googleParsedToken.payload.email
        )
        result.account.local.should.have.property('displayName')
        result.account.local.displayName.should.be.eql(
          googleParsedToken.payload.name
        )
        result.account.local.should.have.property('photo')
        result.account.local.photo.should.be.eql(
          googleParsedToken.payload.picture
        )
        result.account.should.have.property('google')
        result.account.google.should.be.a('object')
        result.account.google.should.have.property('id')
        result.account.google.id.should.be.eql(googleMockId)
        result.account.google.should.have.property('email')
        result.account.google.email.should.be.eql(
          googleParsedToken.payload.email
        )
        result.account.google.should.have.property('displayName')
        result.account.google.displayName.should.be.eql(
          googleParsedToken.payload.name
        )
        result.account.google.should.have.property('photo')
        result.account.google.photo.should.be.eql(
          googleParsedToken.payload.picture
        )
        done()
      })
  })

  after(done => {
    User.remove({
      'account.google.id': googleMockId
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 - Update Existing Google Object', () => {
  const parsedTokenUpdated = {
    header: {
      alg: 'RS256',
      kid: '6fb05f742366ee4',
      typ: 'JWT'
    },
    payload: {
      iss: 'https://accounts.google.com',
      azp: '818817473054.apps.googleusercontent.com',
      aud: '818817473054.apps.googleusercontent.com',
      sub: '10673069690211',
      hd: 'johndoe.com',
      email: 'john.doe.update@email.com',
      email_verified: true,
      name: 'John Doe Update',
      picture: 'https://via.placeholder.com/350x150/update',
      given_name: 'John',
      family_name: 'Doe Update',
      locale: 'pt-BR',
      iat: 1549288404,
      exp: 1549292004
    },
    signature: 'SO_Opm768fGibznnKXSEi'
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['google-signin']

    strategy._passAuthentication = true
    strategy._parsedToken = parsedTokenUpdated
    strategy._googleId = googleMockId

    User.create({
      'account.local.displayName': googleParsedToken.payload.name,
      'account.local.email': googleParsedToken.payload.email,
      'account.local.photo': googleParsedToken.payload.picture,
      'account.local.isActive': true,
      'account.google.id': googleMockId,
      'account.google.displayName': googleParsedToken.payload.name,
      'account.google.email': googleParsedToken.payload.email,
      'account.google.photo': googleParsedToken.payload.picture
    }).then(result => {
      done()
    })
  })

  it('should successfully login on /api/v1/users/auth/google/signin GET', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully update google account object', done => {
    User.findOne({
      'account.google.id': googleMockId
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
          googleParsedToken.payload.email
        )
        result.account.local.should.have.property('displayName')
        result.account.local.displayName.should.be.eql(
          googleParsedToken.payload.name
        )
        result.account.local.should.have.property('photo')
        result.account.local.photo.should.be.eql(
          googleParsedToken.payload.picture
        )
        result.account.should.have.property('google')
        result.account.google.should.be.a('object')
        result.account.google.should.have.property('id')
        result.account.google.id.should.be.eql(googleMockId)
        result.account.google.should.have.property('email')
        result.account.google.email.should.be.eql(
          parsedTokenUpdated.payload.email
        )
        result.account.google.should.have.property('displayName')
        result.account.google.displayName.should.be.eql(
          parsedTokenUpdated.payload.name
        )
        result.account.google.should.have.property('photo')
        result.account.google.photo.should.be.eql(
          parsedTokenUpdated.payload.picture
        )
        done()
      })
  })
  after(done => {
    User.remove({
      'account.google.id': googleMockId
    }).then(result => {
      done()
    })
  })
})

describe('Google OAuth2 - Error AUTH-007', () => {
  const googleDifferentId = 'google-signin-test-different-id'

  before(done => {
    let strategy = server.locals.passport.user._strategies['google-signin']

    strategy._passAuthentication = true
    strategy._parsedToken = googleParsedToken
    strategy._googleId = googleDifferentId

    User.create({
      'account.local.displayName': googleParsedToken.payload.name,
      'account.local.email': googleParsedToken.payload.email,
      'account.local.photo': googleParsedToken.payload.picture,
      'account.local.isActive': true,
      'account.google.id': googleMockId,
      'account.google.displayName': googleParsedToken.payload.name,
      'account.google.email': googleParsedToken.payload.email,
      'account.google.photo': googleParsedToken.payload.picture
    }).then(result => {
      done()
    })
  })

  it('should fail to login on /api/v1/users/auth/google/signin GET', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin')
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-007')
        done()
      })
  })

  after(done => {
    User.remove({
      'account.google.id': googleMockId
    }).then(result => {
      done()
    })
  })
})
