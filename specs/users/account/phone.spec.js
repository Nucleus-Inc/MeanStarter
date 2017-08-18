var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()
var config = require('config/config.js')
var jwt = require('jsonwebtoken')

var user = {}

chai.use(chaiHttp)

describe('User Phone Number Change Request', function () {
  it('should successfully get a JWT on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
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

  it('should fail to get a code for phone number change with invalid phone number on /users/account/:id/account/phone-number PATCH', function (done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'phoneNumber': '5585999'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('phoneNumber')
        done()
      })
  })

  it('should successfully get a code for phone number change on /users/:id/account/phone-number PATCH', function (done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'phoneNumber': '5585999999995'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.phoneChangeCode = res.headers.code
        done()
      })
  })

  it('should fail to change phone number with invalid token on /users/:id/account/phone-number PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/phone-number')
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

  it('should successfully change phone number on /users/account/:id/account/phone-number PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.phoneChangeCode
      })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
})
