var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()
var config = require('config/config.js')
var jwt = require('jsonwebtoken')

chai.use(chaiHttp)

describe('User Signup', function () {
  it('should successfully add a user on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'User name',
        'email': 'user@email.com',
        'password': 'us3r@2017',
        'phoneNumber': '5585999999999'
      })
      .end(function (err, res) {
        res.should.have.status(201)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function (err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })

  it('should fail to add a user with invalid fields on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'User name',
        'email': 'user@',
        'password': 'lame',
        'phoneNumber': '55859999999'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('email')
        res.body.errors.should.have.property('phoneNumber')
        res.body.errors.should.have.property('password')
        done()
      })
  })

  it('should fail to add a user with duplicate email on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'User name',
        'email': 'user@email.com',
        'password': 'us3r@2017',
        'phoneNumber': '5585999999999'
      })
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].should.be.eql('email')
        done()
      })
  })

  it('should fail to add a user with duplicate phoneNumber on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'User name',
        'email': 'user2@email.com',
        'password': 'us3r@2017',
        'phoneNumber': '5585999999999'
      })
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].should.be.eql('phoneNumber')
        done()
      })
  })
})
