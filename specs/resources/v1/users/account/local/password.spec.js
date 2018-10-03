const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()
const config = require('config/config.js')
const jwt = require('jsonwebtoken')

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Account Password Update', () => {
  it('should fail to update account new password with current password on /api/v1/users/account/:id/account/local/password PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        currentPassword: user.password,
        newPassword: user.password
      })
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('REQ-003')
        done()
      })
  })

  it('should fail to update account password with invalid current password on /api/v1/users/account/:id/account/local/password PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        currentPassword: 'us3r',
        newPassword: 'us3r@2017'
      })
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-001')
        done()
      })
  })

  it('should fail to update account new password with weak password on /api/v1/users/account/:id/account/local/password PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        currentPassword: user.password,
        newPassword: 'weak'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('newPassword')
        done()
      })
  })

  it('should successfully update account password on /api/v1/users/account/:id/account/local/password PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        currentPassword: user.password,
        newPassword: 'us3r@NeW'
      })
      .end((err, res) => {
        res.should.have.status(200)
        user.password = 'us3r@NeW'
        done()
      })
  })

  it('should successfully get a JWT with new password on /api/v1/users/auth/jwt/signin POST', done => {
    chai
      .request(server)
      .post('/api/v1/users/auth/local/jwt/signin')
      .send({
        email: user.email,
        password: user.password
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        user.jwt = res.headers.jwt
        res.headers.jwt.should.be.a('string')
        jwt.verify(
          res.headers.jwt,
          config.auth.local.jwt.jwtSecret,
          (err, decoded) => {
            decoded.should.have.property('_id')
            decoded.should.have.property('iat')
            decoded.should.have.property('exp')
            done()
          }
        )
      })
  })
})
