var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()
var config = require('config/config.js')
var jwt = require('jsonwebtoken')

var user = {}

chai.use(chaiHttp)

describe('User Account Recovery', function () {
  it('should successfully get a recovery code on /users/account/recovery/:phoneNumber GET', function (done) {
    chai.request(server)
      .get('/users/account/recovery/5585999999999')
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.recoveryCode = res.headers.code
        done()
      })
  })

  it('should fail to get a recovery code with invalid phoneNumber on /users/account/activation/:phoneNumber GET', function (done) {
    chai.request(server)
      .get('/users/account/recovery/55859999')
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('phoneNumber')
        done()
      })
  })

  it('should still get a recovery code with valid but non-existent phoneNumber on /users/account/activation/:phoneNumber GET', function (done) {
    chai.request(server)
      .get('/users/account/recovery/5585999999990')
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        done()
      })
  })

  it('should fail to recover an account with an invalid token and valid phoneNumber on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': '1234567890',
        'newPassword': 'us3r@recov3r'
      })
      .end(function (err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should fail to recover an account with a valid but non-existent phoneNumber and an invalid token on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999990')
      .send({
        'token': '1234567890',
        'newPassword': 'us3r@recov3r'
      })
      .end(function (err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should fail to recover an account with invalid phoneNumber and token on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/55859999')
      .send({
        'newPassword': 'us3r@recov3r'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('phoneNumber')
        res.body.errors.should.have.property('token')
        done()
      })
  })

  it('should fail to recover an account with valid phoneNumber and token but weak password on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': user.recoveryCode,
        'newPassword': 'lame'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('newPassword')
        done()
      })
  })

  it('should successfully recover an account on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': user.recoveryCode,
        'newPassword': 'us3r@recov3r'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully get a JWT with the new credentials on /users/auth/mobile POST', function (done) {
    chai.request(server)
      .post('/users/auth/mobile')
      .send({
        'email': 'user@email.com',
        'password': 'us3r@recov3r'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function (err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })
})
