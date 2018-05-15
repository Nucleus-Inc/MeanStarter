var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()
var config = require('config/config.js')
var jwt = require('jsonwebtoken')

var user = {}

chai.use(chaiHttp)

describe('User Email Change Request', function () {
  it('should successfully get a JWT on /users/auth/mobile POST', function (done) {
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

  it('should fail to get a code for email change with invalid email on /users/account/:id/email PATCH', function (done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'email': 'user@'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('email')
        done()
      })
  })

  it('should successfully get a code for email change on /users/account/:id/account/email PATCH', function (done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'email': 'user@email.com'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.emailChangeCode = res.headers.code
        done()
      })
  })

  it('should fail to change email with invalid token on /users/account/:id/account/email PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/email')
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

  it('should successfully change email on /users/account/:id/account/email PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.emailChangeCode
      })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
})
