var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()
var config = require('config/config.js')
var jwt = require('jsonwebtoken')

var user = {}

chai.use(chaiHttp)

describe('User Account Activation', function () {
  it('should successfully patch a JWT on /users/auth/mobile POST', function (done) {
    chai.request(server)
      .post('/users/auth/mobile')
      .send({
        'email': 'user@email.com',
        'password': 'us3r@2017'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        user.jwt = res.headers.jwt
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function (err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          user._id = decoded._id
          user.jwt = res.headers.jwt
          done()
        })
      })
  })

  it('should successfully patch a activation code on /users/account/activation/:id patch', function (done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.activationCode = res.headers.code
        done()
      })
  })

  it('should fail to activate an account with an invalid token on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': '1234557757'
      })
      .end(function (err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should fail to activate an account with a valid id and a missing token on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send()
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('token')
        done()
      })
  })

  it('should successfully activate an account on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.activationCode
      })
      .end(function (err, res) {
        res.should.have.status(200)
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function (err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })

  it('should fail to patch an activation code for an account that is already active on /users/account/activation/:id patch', function (done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4201)
        done()
      })
  })

  it('should fail to activate an account that is already active on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.activationCode
      })
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4201)
        done()
      })
  })

})
