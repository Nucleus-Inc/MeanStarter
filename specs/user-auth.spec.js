var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app.js')
should = chai.should()
var config = require('../config/config.js')
var jwt = require('jsonwebtoken')

var userModel = server.models.user

var user = {}

chai.use(chaiHttp)

describe('User Signup', function () {
  it('should successfully add a user on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@2017',
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
          user._id = decoded._id
          done()
        })
      })
  })

  it('should fail to add a user with invalid fields on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmywmlaw.com',
        'password': 'upme', // Weak Password
        'phoneNumber': '55859999'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('email')
        res.body.errors[1].param.should.be.eql('phoneNumber')
        res.body.errors[2].param.should.be.eql('password')
        done()
      })
  })

  it('should fail to add a user with duplicate email on /users/account/signup POST', function (done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@2017',
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
        'name': 'Jimmy McGuill',
        'email': 'jimmy2@wmlaw.com',
        'password': 'upm3@2017',
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

describe('User SignIn', function () {
  it('should successfully get a JWT on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@2017'
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

  it('should fail to get a JWT with invalid credentials on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@20'
      })
      .end(function (err, res) {
        res.should.have.status(401)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4100)
        done()
      })
  })
})

describe('User Account Activation', function () {
  it('should successfully get a activation code on /users/account/activation/:id GET', function (done) {
    chai.request(server)
      .get('/users/' + user._id + '/account/activation')
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.activationCode = res.headers.code
        done()
      })
  })

  it('should fail to get a activation code with invalid _id on /users/account/activation/:id GET', function (done) {
    chai.request(server)
      .get('/users/5931972a29/account/activation')
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('id')
        done()
      })
  })

  it('should fail to get an activation code with valid but non-existent _id on /users/account/activation/:id GET', function (done) {
    chai.request(server)
      .get('/users/59397de5f3700d641faaab09/account/activation')
      .end(function (err, res) {
        res.should.have.status(404)
        done()
      })
  })

  it('should fail to activate an account with an invalid token on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
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

  it('should fail to activate an account with an invalid id on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/5931972a29/account/activation')
      .send({
        'token': user.activationCode
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('id')
        done()
      })
  })

  it('should fail to activate an account with a valid id and a missing token on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .send()
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('token')
        done()
      })
  })

  it('should fail to activate an account with valid but non-existent _id on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/59397de5f3700d641faaab09/account/activation')
      .send({
        'token': user.activationCode
      })
      .end(function (err, res) {
        res.should.have.status(404)
        done()
      })
  })

  it('should successfully activate an account on /users/account/activation/:id PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
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

  it('should fail to get an activation code for an account that is already active on /users/account/activation/:id GET', function (done) {
    chai.request(server)
      .get('/users/' + user._id + '/account/activation')
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
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('phoneNumber')
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
        'new_password': 'upm3@n3w2018'
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
        'new_password': 'upm3@n3w2018'
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
        'token': '',
        'new_password': 'upm3@n3w2018'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('phoneNumber')
        res.body.errors[1].param.should.be.eql('token')
        done()
      })
  })

  it('should fail to recover an account with valid phoneNumber and token but weak password on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': user.recoveryCode,
        'new_password': '1234'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('new_password')
        done()
      })
  })

  it('should successfully recover an account on /users/account/recovery/:phoneNumber PUT', function (done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': user.recoveryCode,
        'new_password': 'upm3@n3w2018'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully get a JWT with the new credentials on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@n3w2018'
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

after(function (done) {
  userModel.remove({}, function (err, docs) {
    done()
  })
})
