const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()
const config = require('config/config.js')
const jwt = require('jsonwebtoken')

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Account Recovery', () => {
  it('should successfully get a recovery code on /api/v1/users/account/recovery PATCH', done => {
    chai
      .request(server)
      .patch('/api/v1/users/account/recovery')
      .send({
        recoveryKey: user.phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.recoveryCode = res.headers.code
        done()
      })
  })

  it('should successfully recover an account on /api/v1/users/account/recovery PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/account/recovery')
      .send({
        recoveryKey: user.phoneNumber,
        token: user.recoveryCode,
        newPassword: 'us3r@recov3r'
      })
      .end((err, res) => {
        res.should.have.status(200)
        user.password = 'us3r@recov3r'
        done()
      })
  })

  it('should successfully get a JWT with the new credentials on /api/v1/users/auth/jwt/signin POST', done => {
    chai
      .request(server)
      .post('/api/v1/users/auth/jwt/signin')
      .send({
        email: user.email,
        password: user.password
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, (err, decoded) => {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })
})
