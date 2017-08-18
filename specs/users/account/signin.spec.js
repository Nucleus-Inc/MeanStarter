var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()
var config = require('config/config.js')
var jwt = require('jsonwebtoken')

var user = {}

chai.use(chaiHttp)

describe('User SignIn', function () {
  it('should successfully get a JWT on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
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
          done()
        })
      })
  })

  it('should fail to get a JWT with invalid credentials on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'user@email.com',
        'password': 'inv4lidPwD'
      })
      .end(function (err, res) {
        res.should.have.status(401)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4100)
        done()
      })
  })
})
