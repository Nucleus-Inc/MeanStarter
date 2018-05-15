const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()
const config = require('config/config.js')
const jwt = require('jsonwebtoken')

let user = {}

chai.use(chaiHttp)

describe('User SignIn', () => {
  it('should successfully get a JWT on /users/auth/mobile POST', (done) => {
    chai.request(server)
      .post('/users/auth/mobile')
      .send({
        'email': 'user@email.com',
        'password': 'us3r@2017'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        user.jwt = res.headers.jwt
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, (err, decoded) => {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })

  it('should fail to get a JWT with invalid credentials on /users/auth/mobile POST', (done) => {
    chai.request(server)
      .post('/users/auth/mobile')
      .send({
        'email': 'user@email.com',
        'password': 'inv4lidPwD'
      })
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4100)
        done()
      })
  })
})
