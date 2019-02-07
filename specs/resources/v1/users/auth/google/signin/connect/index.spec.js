const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = require('chai')
const jwt = require('jsonwebtoken')
const config = require('config/config')

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

let userId = null

let signin = null

chai.use(chaiHttp)

describe('Google Token Connect - Unauthorized', () => {
  it('should fail to login on /api/v1/users/auth/google/signin/connect POST', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin/connect')
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })
  })
})

describe('Google Token Connect', () => {
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
      signin = jwt.sign(
        {
          _id: result._id,
          isActive: true
        },
        config.auth.local.jwt.jwtSecret,
        {
          expiresIn: config.auth.local.jwt.expires
        }
      )

      done()
    })
  })

  it('should successfully connect account on /users/auth/google/signin/connect POST', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin/connect')
      .set('Authorization', 'JWT ' + signin)
      .end((err, res) => {
        jwt.verify(
          res.headers.jwt,
          config.auth.local.jwt.jwtSecret,
          (err, decoded) => {
            decoded.should.have.property('_id')
            decoded.should.have.property('isActive')
            decoded.should.have.property('iat')
            decoded.should.have.property('exp')
            done()
          }
        )
      })
  })
  it('should successfully create google account object', done => {
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
        result.account.google.id.should.be.eql(googleParsedToken.payload.id)
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
      'account.google.id': googleParsedToken.payload.id
    }).then(result => {
      done()
    })
  })
})

describe('Google Token Connect - Error AUTH-007', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['google-signin']

    strategy._passAuthentication = true
    strategy._parsedToken = googleParsedToken
    strategy._googleId = googleMockId

    User.create({
      'account.local.displayName': googleParsedToken.payload.name,
      'account.local.email': googleParsedToken.payload.email,
      'account.local.photo': googleParsedToken.payload.picture,
      'account.local.isActive': true,
      'account.google.id': googleParsedToken.payload.id,
      'account.google.displayName': googleParsedToken.payload.name,
      'account.google.email': googleParsedToken.payload.email,
      'account.google.photo': googleParsedToken.payload.picture
    }).then(result => {})

    User.create({
      'account.local.displayName': 'Different User',
      'account.local.email': 'other.john.doe.connect.signin@email.com',
      'account.local.isActive': true
    }).then(result => {
      signin = jwt.sign(
        {
          _id: result._id,
          isActive: true
        },
        config.auth.local.jwt.jwtSecret,
        {
          expiresIn: config.auth.local.jwt.expires
        }
      )

      userId = result._id

      done()
    })
  })

  it('should fail to login on /api/v1/users/auth/google/signin/connect POST', done => {
    chai
      .request(server)
      .post('/users/auth/google/signin/connect')
      .set('Authorization', 'JWT ' + signin)
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
          'account.google.id': googleParsedToken.payload.id
        },
        {
          _id: userId
        }
      ]
    }).then(result => {
      done()
    })
  })
})
